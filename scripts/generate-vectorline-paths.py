#!/usr/bin/env python3
"""Generowanie wektorowych centerline paths z fontu Geomanist Thin za pomoca fonttools.

Podejscie:
1. Wyciagamy kontury glifow z TrueType (fonttools RecordingPen)
2. Samplujemy kontury na geste punkty
3. Dzielimy kontur na dwie strony cienkiej kreski
4. Usredniamy odpowiadajace sobie punkty -> centerline
5. Upraszczamy do bezier SVG paths (M/L/Q)
6. Zapisujemy jako mape znakow w JSON

Obslugiwane znaki: A-Z, a-z, 0-9, polskie znaki, spacja, znaki interpunkcyjne.

Specjalne przypadki TrueType:
- qCurveTo z None jako endpoint = kontur zaczyna sie od off-curve points (implicit on-curve start)
- Kontury bez moveTo = kontur zlozony wylacznie z off-curve points
"""

import json
import math
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

# ------- KONFIGURACJA -------

FONT_PATH = "fonts/Geomanist-Thin-Webfont/geomanist-thin-webfont.ttf"
OUTPUT_PATH = "src/components/ui/handwrite-paths.json"

# Znaki do wygenerowania
CHARSET = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    "0123456789"
    "\u0105\u0107\u0119\u0142\u0144\u00f3\u015b\u017a\u017c"  # acelnoszz
    "\u0104\u0106\u0118\u0141\u0143\u00d3\u015a\u0179\u017b"  # ACELNOSZZ
    ".,!?:;-\u2013\u2014'\"()/"
)

# Parametry samplowania i upraszczania
SAMPLE_DENSITY = 0.5  # punktow na jednostke UPM dlugosci konturu
SIMPLIFY_TOLERANCE = 12.0  # tolerancja Ramer-Douglas-Peucker w UPM
MIN_SEGMENT_LENGTH = 15.0  # minimalna dlugosc segmentu w UPM (filtruje artefakty)

# ------- NARZEDZIA GEOMETRYCZNE -------

def lerp(a, b, t):
    """Interpolacja liniowa."""
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)

def dist(a, b):
    """Odleglosc euklidesowa."""
    return math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)

def midpoint(a, b):
    """Punkt srodkowy."""
    return ((a[0]+b[0])/2, (a[1]+b[1])/2)

def sample_line(p0, p1, density):
    """Sampluj odcinek liniowy na geste punkty."""
    length = dist(p0, p1)
    n = max(2, int(length * density))
    return [lerp(p0, p1, i/(n-1)) for i in range(n)]

def de_casteljau_quad(p0, p1, p2, t):
    """Ewaluacja kwadratowego beziera w punkcie t."""
    a = lerp(p0, p1, t)
    b = lerp(p1, p2, t)
    return lerp(a, b, t)

def sample_quadratic(p0, p1, p2, density):
    """Sampluj kwadratowy bezier na geste punkty."""
    chord = dist(p0, p2)
    poly = dist(p0, p1) + dist(p1, p2)
    length = (chord + poly) / 2
    n = max(3, int(length * density))
    return [de_casteljau_quad(p0, p1, p2, i/(n-1)) for i in range(n)]

def expand_tt_qcurve_to_quadratics(start_pt, args):
    """Rozwin TrueType qCurveTo na serie prostych quadratic bezierow.

    TrueType qCurveTo: (cp1, cp2, ..., cpN, endpoint)
    - endpoint moze byc None (implicit on-curve = midpoint pierwszych dwoch off-curve)
    - Miedzy kolejnymi off-curve jest implicit on-curve w srodku
    - Zwraca liste trojek (p0, p1, p2) - kazda to quadratic bezier

    UWAGA: Jesli endpoint to None, to wszystkie args to off-curve,
    a start_pt to implicit midpoint ostatniego i pierwszego off-curve.
    """
    all_pts = list(args)

    # Obsluga None endpoint (TrueType: kontur zlozony z samych off-curve)
    if all_pts[-1] is None:
        # Wszystkie punkty to off-curve
        off_pts = all_pts[:-1]

        # Implicit on-curve start = midpoint ostatniego i pierwszego off-curve
        implicit_start = midpoint(off_pts[-1], off_pts[0])

        # Generuj implicit on-curve miedzy kolejnymi off-curve
        on_pts = [implicit_start]
        for i in range(len(off_pts) - 1):
            on_pts.append(midpoint(off_pts[i], off_pts[i+1]))
        on_pts.append(implicit_start)  # zamknij

        # Serie quadratic bezierow
        quads = []
        for i in range(len(off_pts)):
            quads.append((on_pts[i], off_pts[i], on_pts[i+1]))
        return quads, implicit_start
    else:
        # Normalny qCurveTo
        endpoint = all_pts[-1]
        off_pts = all_pts[:-1]

        if len(off_pts) == 0:
            # Degenerowany - linia
            return [], endpoint
        elif len(off_pts) == 1:
            return [(start_pt, off_pts[0], endpoint)], endpoint
        else:
            # Implicit on-curve miedzy off-curve
            implicit_on = []
            for i in range(len(off_pts) - 1):
                implicit_on.append(midpoint(off_pts[i], off_pts[i+1]))

            starts = [start_pt] + implicit_on
            ends = implicit_on + [endpoint]

            quads = []
            for i in range(len(off_pts)):
                quads.append((starts[i], off_pts[i], ends[i]))
            return quads, endpoint

def sample_contour_segments(segments, density):
    """Sampluj caly kontur (lista segmentow z RecordingPen) na geste punkty.

    Obsluguje specjalne przypadki TrueType:
    - qCurveTo z None endpoint (kontury z samych off-curve)
    - Kontury bez moveTo
    """
    points = []
    current = None

    for op, args in segments:
        if op == 'moveTo':
            current = args[0]
            points.append(current)
        elif op == 'lineTo':
            if current is None:
                current = args[0]
                points.append(current)
                continue
            target = args[0]
            sampled = sample_line(current, target, density)
            points.extend(sampled[1:])
            current = target
        elif op == 'qCurveTo':
            if current is None and args[-1] is None:
                # Kontur zaczynajacy sie od qCurveTo z None endpoint
                # Wszystkie punkty sa off-curve
                quads, implicit_start = expand_tt_qcurve_to_quadratics(None, args)
                current = implicit_start
                points.append(current)
                for p0, p1, p2 in quads:
                    sampled = sample_quadratic(p0, p1, p2, density)
                    points.extend(sampled[1:])
                    current = p2
            elif current is None:
                # qCurveTo bez moveTo ale z normalnym endpoint
                current = args[-1]
                points.append(current)
            else:
                quads, new_endpoint = expand_tt_qcurve_to_quadratics(current, args)
                if not quads:
                    # Degenerowany - linia
                    sampled = sample_line(current, new_endpoint, density)
                    points.extend(sampled[1:])
                else:
                    for p0, p1, p2 in quads:
                        sampled = sample_quadratic(p0, p1, p2, density)
                        points.extend(sampled[1:])
                current = new_endpoint
        elif op == 'closePath' or op == 'endPath':
            pass

    return points

def rdp_simplify(points, tolerance):
    """Uproszczenie polilinii algorytmem Ramer-Douglas-Peucker."""
    if len(points) <= 2:
        return points

    start = points[0]
    end = points[-1]

    max_dist = 0
    max_idx = 0

    dx = end[0] - start[0]
    dy = end[1] - start[1]
    line_len = math.sqrt(dx*dx + dy*dy)

    for i in range(1, len(points) - 1):
        if line_len < 1e-6:
            d = dist(points[i], start)
        else:
            d = abs(dy * points[i][0] - dx * points[i][1] + end[0]*start[1] - end[1]*start[0]) / line_len
        if d > max_dist:
            max_dist = d
            max_idx = i

    if max_dist > tolerance:
        left = rdp_simplify(points[:max_idx+1], tolerance)
        right = rdp_simplify(points[max_idx:], tolerance)
        return left[:-1] + right
    else:
        return [start, end]

# ------- EKSTRAKCJA CENTERLINE -------

def get_glyph_segments(font, glyph_name):
    """Wyciagnij segmenty konturu glifu przez RecordingPen."""
    pen = RecordingPen()
    gs = font.getGlyphSet()
    gs[glyph_name].draw(pen)
    return pen.value

def split_into_contours(segments):
    """Podziel segmenty na osobne kontury.

    Dzieli po moveTo ORAZ po closePath/endPath (dla konturow bez moveTo).
    """
    contours = []
    current = []

    for op, args in segments:
        if op == 'moveTo' and current:
            contours.append(current)
            current = []
        current.append((op, args))
        if op in ('closePath', 'endPath'):
            contours.append(current)
            current = []

    if current:
        contours.append(current)

    return contours

def find_split_point_single_contour(points):
    """Znajdz punkt podzialu konturu 1-konturowego glifu na dwie strony.

    Heurystyka: kontur opisuje obie strony cienkiej kreski.
    Szukamy dwoch punktow ktore sa najblizej siebie i dziela kontur na dwie polowki.
    """
    n = len(points)
    if n < 6:
        return 0, n // 2

    min_dist = float('inf')
    best_pair = (0, n // 2)
    min_gap = max(4, n // 5)

    for i in range(n):
        for j in range(i + min_gap, min(n, i + n - min_gap + 1)):
            d = dist(points[i], points[j])
            if d < min_dist:
                min_dist = d
                best_pair = (i, j)

    return best_pair

def compute_centerline_single_contour(points, split_i, split_j):
    """Oblicz centerline dla 1-konturowego glifu."""
    n = len(points)

    if split_j > split_i:
        side_a = points[split_i:split_j+1]
    else:
        side_a = points[split_i:] + points[:split_j+1]

    if split_i > split_j:
        side_b = points[split_j:split_i+1]
    else:
        side_b = points[split_j:] + points[:split_i+1]
    side_b = list(reversed(side_b))

    target_n = max(len(side_a), len(side_b))
    side_a_resampled = resample_polyline(side_a, target_n)
    side_b_resampled = resample_polyline(side_b, target_n)

    centerline = []
    for a, b in zip(side_a_resampled, side_b_resampled):
        centerline.append(midpoint(a, b))

    return centerline

def resample_polyline(points, target_n):
    """Resample polilinii na dokladnie target_n punktow, rownomiernie rozlozonych."""
    if len(points) < 2:
        return points * target_n if points else []

    cum_lengths = [0.0]
    for i in range(1, len(points)):
        cum_lengths.append(cum_lengths[-1] + dist(points[i-1], points[i]))

    total_length = cum_lengths[-1]
    if total_length < 1e-6:
        return [points[0]] * target_n

    result = []
    for i in range(target_n):
        target_dist = (i / max(1, target_n - 1)) * total_length

        seg_idx = 0
        for j in range(1, len(cum_lengths)):
            if cum_lengths[j] >= target_dist:
                seg_idx = j - 1
                break
        else:
            seg_idx = len(cum_lengths) - 2

        seg_length = cum_lengths[seg_idx + 1] - cum_lengths[seg_idx]
        if seg_length < 1e-6:
            result.append(points[seg_idx])
        else:
            t = (target_dist - cum_lengths[seg_idx]) / seg_length
            result.append(lerp(points[seg_idx], points[seg_idx + 1], t))

    return result

def polyline_length(points):
    """Oblicz calkowita dlugosc polilinii."""
    total = 0
    for i in range(1, len(points)):
        total += dist(points[i-1], points[i])
    return total

# ------- STRATEGIA PER-GLIF -------

def analyze_glyph_type(segments):
    """Analizuj typ glifu na podstawie segmentow."""
    contours = split_into_contours(segments)

    if len(contours) == 0:
        return 'empty', contours

    has_curves = any(op == 'qCurveTo' for c in contours for op, _ in c)

    if len(contours) == 1 and not has_curves:
        return 'simple_lines', contours
    elif len(contours) == 1:
        return 'single_contour', contours
    else:
        return 'multi_contour', contours

def extract_centerline_for_glyph(font, char, glyph_name, density=SAMPLE_DENSITY):
    """Glowna funkcja: wyciagnij centerline paths dla jednego glifu."""
    segments = get_glyph_segments(font, glyph_name)
    glyph_type, contours = analyze_glyph_type(segments)

    if glyph_type == 'empty':
        return []

    if glyph_type == 'simple_lines':
        return extract_centerline_simple_lines(contours[0])

    if glyph_type == 'single_contour':
        return extract_centerline_single(contours[0], density)

    return extract_centerline_multi(contours, density)

def extract_centerline_simple_lines(contour_segments):
    """Centerline dla glifu z samych linii prostych (N, y, k, Z, etc.)."""
    vertices = []
    for op, args in contour_segments:
        if op == 'moveTo' or op == 'lineTo':
            vertices.append(args[0])

    if not vertices:
        return []

    n = len(vertices)
    half = n // 2
    side_a = vertices[:half]
    side_b = list(reversed(vertices[half:]))

    max_len = max(len(side_a), len(side_b))
    if len(side_a) < max_len and len(side_a) >= 2:
        side_a = resample_polyline(side_a, max_len)
    if len(side_b) < max_len and len(side_b) >= 2:
        side_b = resample_polyline(side_b, max_len)

    min_len = min(len(side_a), len(side_b))
    centerline = []
    for i in range(min_len):
        centerline.append(midpoint(side_a[i], side_b[i]))

    if len(centerline) < 2:
        return []

    result_paths = split_at_sharp_turns(centerline, angle_threshold=60)
    return result_paths

def split_at_sharp_turns(points, angle_threshold=60):
    """Podziel polilinię na segmenty w miejscach ostrych zakretow."""
    if len(points) < 3:
        return [points]

    segments = []
    current_segment = [points[0]]

    for i in range(1, len(points) - 1):
        current_segment.append(points[i])

        v1 = (points[i][0] - points[i-1][0], points[i][1] - points[i-1][1])
        v2 = (points[i+1][0] - points[i][0], points[i+1][1] - points[i][1])

        len1 = math.sqrt(v1[0]**2 + v1[1]**2)
        len2 = math.sqrt(v2[0]**2 + v2[1]**2)

        if len1 < 1e-6 or len2 < 1e-6:
            continue

        cos_angle = (v1[0]*v2[0] + v1[1]*v2[1]) / (len1 * len2)
        cos_angle = max(-1, min(1, cos_angle))
        angle = math.degrees(math.acos(cos_angle))

        if angle > angle_threshold:
            if len(current_segment) >= 2:
                segments.append(current_segment[:])
            current_segment = [points[i]]

    current_segment.append(points[-1])
    if len(current_segment) >= 2:
        segments.append(current_segment)

    return segments if segments else [points]

def extract_centerline_single(contour_segments, density):
    """Centerline dla 1-konturowego glifu z krzywymi."""
    points = sample_contour_segments(contour_segments, density)

    if len(points) < 6:
        return [points] if points else []

    split_i, split_j = find_split_point_single_contour(points)
    centerline = compute_centerline_single_contour(points, split_i, split_j)

    if len(centerline) < 2:
        return []

    result_paths = split_at_sharp_turns(centerline, angle_threshold=45)
    return result_paths

def extract_centerline_multi(contours, density):
    """Centerline dla wielo-konturowego glifu."""
    sampled = []
    for c in contours:
        pts = sample_contour_segments(c, density)
        sampled.append(pts)

    if not sampled:
        return []

    contour_info = []
    for i, pts in enumerate(sampled):
        if not pts:
            contour_info.append({'idx': i, 'area': 0, 'bbox': (0,0,0,0), 'pts': pts})
            continue
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        bbox = (min(xs), min(ys), max(xs), max(ys))
        perim = polyline_length(pts)
        contour_info.append({'idx': i, 'area': perim, 'bbox': bbox, 'pts': pts})

    contour_info.sort(key=lambda c: c['area'], reverse=True)

    result_paths = []
    used = set()

    for ci in range(len(contour_info)):
        if ci in used or not contour_info[ci]['pts']:
            continue

        c1 = contour_info[ci]
        best_pair = None
        best_overlap = 0

        for cj in range(ci + 1, len(contour_info)):
            if cj in used or not contour_info[cj]['pts']:
                continue

            c2 = contour_info[cj]
            overlap = bbox_overlap(c1['bbox'], c2['bbox'])

            if overlap > best_overlap:
                best_overlap = overlap
                best_pair = cj

        if best_pair is not None and best_overlap > 0.3:
            c2 = contour_info[best_pair]
            paths = pair_contours_centerline(c1['pts'], c2['pts'])
            result_paths.extend(paths)
            used.add(ci)
            used.add(best_pair)
        else:
            pts = c1['pts']
            if len(pts) > 4:
                split_i, split_j = find_split_point_single_contour(pts)
                cl = compute_centerline_single_contour(pts, split_i, split_j)
                if len(cl) >= 2:
                    paths = split_at_sharp_turns(cl, angle_threshold=45)
                    result_paths.extend(paths)
            used.add(ci)

    return result_paths

def bbox_overlap(bb1, bb2):
    """Oblicz stopien pokrywania sie bounding boxow (0-1)."""
    x_overlap = max(0, min(bb1[2], bb2[2]) - max(bb1[0], bb2[0]))
    y_overlap = max(0, min(bb1[3], bb2[3]) - max(bb1[1], bb2[1]))

    overlap_area = x_overlap * y_overlap
    area1 = max(1, (bb1[2] - bb1[0]) * (bb1[3] - bb1[1]))
    area2 = max(1, (bb2[2] - bb2[0]) * (bb2[3] - bb2[1]))

    min_area = min(area1, area2)
    return overlap_area / max(1, min_area)

def pair_contours_centerline(outer_pts, inner_pts):
    """Paruj dwa kontury (outer/inner) i oblicz centerline."""
    if dist(outer_pts[0], outer_pts[-1]) > 5:
        outer_pts = outer_pts + [outer_pts[0]]
    if dist(inner_pts[0], inner_pts[-1]) > 5:
        inner_pts = inner_pts + [inner_pts[0]]

    target_n = max(len(outer_pts), len(inner_pts), 50)
    outer_resampled = resample_polyline(outer_pts, target_n)
    inner_resampled = resample_polyline(inner_pts, target_n)

    best_total_dist = float('inf')
    best_inner = inner_resampled

    for reverse in [False, True]:
        test_inner = list(reversed(inner_resampled)) if reverse else inner_resampled[:]

        for offset_frac in [i/8 for i in range(8)]:
            offset = int(offset_frac * target_n)
            shifted = test_inner[offset:] + test_inner[:offset]

            total_d = sum(dist(o, s) for o, s in zip(outer_resampled, shifted))

            if total_d < best_total_dist:
                best_total_dist = total_d
                best_inner = shifted[:]

    centerline = [midpoint(o, i) for o, i in zip(outer_resampled, best_inner)]

    if dist(centerline[0], centerline[-1]) < 30:
        centerline.append(centerline[0])

    paths = split_at_sharp_turns(centerline, angle_threshold=45)
    return paths

# ------- KONWERSJA DO SVG PATH -------

def fit_quadratic_bezier(points):
    """Dopasuj kwadratowe krzywe Beziera do listy punktow."""
    if len(points) < 2:
        return ""

    parts = []
    parts.append(f"M{points[0][0]:.0f} {points[0][1]:.0f}")

    i = 1
    while i < len(points):
        if i + 1 < len(points):
            cp = points[i]
            end = points[i + 1]
            parts.append(f"Q{cp[0]:.0f} {cp[1]:.0f} {end[0]:.0f} {end[1]:.0f}")
            i += 2
        else:
            parts.append(f"L{points[i][0]:.0f} {points[i][1]:.0f}")
            i += 1

    return " ".join(parts)

def points_to_svg_path(points, simplify_tol=SIMPLIFY_TOLERANCE):
    """Konwertuj liste punktow na SVG path string (M/L)."""
    if len(points) < 2:
        return ""

    simplified = rdp_simplify(points, simplify_tol)
    if len(simplified) < 2:
        return ""

    parts = []
    parts.append(f"M{simplified[0][0]:.0f} {simplified[0][1]:.0f}")
    for i in range(1, len(simplified)):
        parts.append(f"L{simplified[i][0]:.0f} {simplified[i][1]:.0f}")

    return " ".join(parts)

def centerline_to_svg_paths(paths_list, simplify_tol=SIMPLIFY_TOLERANCE, min_length=MIN_SEGMENT_LENGTH):
    """Konwertuj liste sciezek centerline na SVG path strings."""
    svg_paths = []

    for path_points in paths_list:
        if len(path_points) < 2:
            continue

        length = polyline_length(path_points)
        if length < min_length:
            continue

        simplified = rdp_simplify(path_points, simplify_tol)
        if len(simplified) < 2:
            continue

        if len(simplified) >= 3:
            svg_path = fit_quadratic_bezier(simplified)
        else:
            svg_path = points_to_svg_path(simplified, simplify_tol=0)

        if svg_path:
            svg_paths.append(svg_path)

    return svg_paths

# ------- GLOWNA LOGIKA -------

def generate_char_map(font_path):
    """Generuj mape znakow: { char -> { paths: [...], width: N } }"""
    font = TTFont(font_path)
    cmap = font.getBestCmap()
    hmtx = font['hmtx']
    head = font['head']
    os2 = font['OS/2']

    upm = head.unitsPerEm
    ascent = os2.sTypoAscender
    descent = os2.sTypoDescender

    print(f"Font: UPM={upm}, ascent={ascent}, descent={descent}")

    char_map = {}

    for char in CHARSET:
        code = ord(char)
        glyph_name = cmap.get(code)

        if not glyph_name:
            print(f"  BRAK glifu dla '{char}' (U+{code:04X})")
            continue

        advance_width = hmtx[glyph_name][0]

        try:
            centerline_paths = extract_centerline_for_glyph(font, char, glyph_name)
        except Exception as ex:
            import traceback
            print(f"  BLAD dla '{char}' ({glyph_name}): {ex}")
            traceback.print_exc()
            centerline_paths = []

        svg_paths = centerline_to_svg_paths(centerline_paths)

        if not svg_paths and char not in (' ',):
            print(f"  UWAGA: brak paths dla '{char}' ({glyph_name})")

        char_map[char] = {
            'paths': svg_paths,
            'width': advance_width,
        }

        path_count = len(svg_paths)
        total_commands = sum(p.count('M') + p.count('L') + p.count('Q') for p in svg_paths)
        print(f"  '{char}': {path_count} paths, {total_commands} commands, width={advance_width}")

    # Dodaj spacje
    space_name = cmap.get(ord(' '))
    if space_name:
        char_map[' '] = {
            'paths': [],
            'width': hmtx[space_name][0],
        }

    return char_map, upm, ascent, descent

def transform_to_svg_coords(char_map, upm, ascent, descent, target_height=200):
    """Przelicz wspolrzedne z UPM fontu na SVG (flip Y, skalowanie)."""
    font_height = ascent - descent
    scale = target_height / font_height

    transformed = {}

    for char, data in char_map.items():
        new_paths = []
        for svg_path in data['paths']:
            new_path = transform_svg_path_string(svg_path, scale, ascent, descent)
            new_paths.append(new_path)

        transformed[char] = {
            'paths': new_paths,
            'width': round(data['width'] * scale, 1),
        }

    return transformed

def transform_svg_path_string(path_str, scale, ascent, descent):
    """Transformuj SVG path string: skaluj i flip Y."""
    result = []
    tokens = path_str.split()

    i = 0
    while i < len(tokens):
        token = tokens[i]

        if token.startswith('M') or token.startswith('L'):
            cmd = token[0]
            x = float(token[1:])
            y = float(tokens[i + 1])
            nx = x * scale
            ny = (ascent - y) * scale
            result.append(f"{cmd}{nx:.0f} {ny:.0f}")
            i += 2
        elif token.startswith('Q'):
            cx = float(token[1:])
            cy = float(tokens[i + 1])
            ex = float(tokens[i + 2])
            ey = float(tokens[i + 3])
            ncx = cx * scale
            ncy = (ascent - cy) * scale
            nex = ex * scale
            ney = (ascent - ey) * scale
            result.append(f"Q{ncx:.0f} {ncy:.0f} {nex:.0f} {ney:.0f}")
            i += 4
        else:
            result.append(token)
            i += 1

    return " ".join(result)

def build_output_json(char_map_svg):
    """Zbuduj finalny JSON w nowym formacie: mapa znakow."""
    output = {
        'format': 'charmap',
        'version': 2,
        'charMap': {}
    }

    for char, data in char_map_svg.items():
        output['charMap'][char] = {
            'paths': data['paths'],
            'width': data['width'],
        }

    return output

def main():
    print("=== Generowanie wektorowych centerline paths ===")
    print(f"Font: {FONT_PATH}")
    print(f"Output: {OUTPUT_PATH}")
    print(f"Charset: {len(CHARSET)} znakow")
    print()

    char_map, upm, ascent, descent = generate_char_map(FONT_PATH)
    print(f"\nWygenerowano {len(char_map)} znakow")

    char_map_svg = transform_to_svg_coords(char_map, upm, ascent, descent, target_height=200)
    output = build_output_json(char_map_svg)

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, separators=(',', ':'))

    import os
    file_size = os.path.getsize(OUTPUT_PATH)
    print(f"\nZapisano: {OUTPUT_PATH}")
    print(f"Rozmiar: {file_size:,} bajtow ({file_size/1024:.0f} KB)")

    total_paths = sum(len(d['paths']) for d in output['charMap'].values())
    print(f"Laczna ilosc sciezek: {total_paths}")

    # Debug SVG
    debug_svg = generate_debug_svg(output, "Programy edukacyjne")
    with open("debug-vectorline.svg", 'w') as f:
        f.write(debug_svg)
    print(f"Debug SVG: debug-vectorline.svg")

    # Debug SVG z pelnym alfabetem
    debug_svg2 = generate_debug_svg(output, "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789")
    with open("debug-vectorline-alphabet.svg", 'w') as f:
        f.write(debug_svg2)
    print(f"Debug SVG (alfabet): debug-vectorline-alphabet.svg")

def generate_debug_svg(data, text, font_size=200):
    """Wygeneruj debug SVG z podanym tekstem."""
    char_map = data['charMap']
    lines = text.split('\n')

    all_elements = []
    y_offset = 0
    max_width = 0

    for line_text in lines:
        x_offset = 0
        for ch in line_text:
            if ch in char_map:
                char_data = char_map[ch]
                for path_str in char_data['paths']:
                    shifted = shift_path(path_str, x_offset, y_offset)
                    all_elements.append(shifted)
                x_offset += char_data['width']
        max_width = max(max_width, x_offset)
        y_offset += font_size * 1.2

    total_height = y_offset
    width = max(max_width, 100)

    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {total_height:.0f}" width="{width:.0f}" height="{total_height:.0f}">\n'
    svg += f'  <rect width="100%" height="100%" fill="#1a1a1a"/>\n'

    for path_str in all_elements:
        svg += f'  <path d="{path_str}" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/>\n'

    svg += '</svg>'
    return svg

def shift_path(path_str, dx, dy):
    """Przesun wszystkie punkty w SVG path o (dx, dy)."""
    result = []
    tokens = path_str.split()

    i = 0
    while i < len(tokens):
        token = tokens[i]

        if token.startswith('M') or token.startswith('L'):
            cmd = token[0]
            x = float(token[1:]) + dx
            y = float(tokens[i + 1]) + dy
            result.append(f"{cmd}{x:.0f} {y:.0f}")
            i += 2
        elif token.startswith('Q'):
            cx = float(token[1:]) + dx
            cy = float(tokens[i + 1]) + dy
            ex = float(tokens[i + 2]) + dx
            ey = float(tokens[i + 3]) + dy
            result.append(f"Q{cx:.0f} {cy:.0f} {ex:.0f} {ey:.0f}")
            i += 4
        else:
            result.append(token)
            i += 1

    return " ".join(result)

if __name__ == '__main__':
    main()

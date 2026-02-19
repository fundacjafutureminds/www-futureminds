#!/usr/bin/env python3
"""Generate TRUE centerline paths from Geomanist Thin font contours.

Approach 6 (v2): Extract native Bezier contours from font, sample densely,
compute centerline via opposite-point matching (single contour) or midpoint
computation (paired inner/outer contours).

Handles TrueType quirks:
- qCurveTo with None last arg (implicit on-curve closed contour)
- Contours starting without moveTo (e.g. period, exclamation mark dot)
- Dot/accent detection with circle-arc SVG paths
- Spatial contour clustering for multi-component glyphs
- Outer contour paired with ALL inner contours (B, 8, etc.)
"""

import json
import math
import sys
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

FONT_PATH = "fonts/Geomanist-Thin-Webfont/geomanist-thin-webfont.ttf"
OUTPUT_PATH = "src/components/ui/handwrite-paths.json"
DEBUG_SVG_PATH = "debug-centerline-v2.svg"
BASE_SIZE = 200

SAMPLES_PER_UNIT = 2       # points per SVG unit of contour length
RDP_EPSILON = 0.8           # RDP simplification epsilon (SVG units)
MIN_PATH_LEN = 5            # minimum path length to keep (SVG units)
DOT_AREA_THRESHOLD = 120    # contours with area < this are dots (SVG units^2)
JUNCTION_GAP = 3            # max gap for connecting path endpoints (SVG units)

CHARS = list(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    "0123456789"
    "ąćęłńóśźżĄĆĘŁŃÓŚŹŻ"
    ".,!?:;-–—'\"()/  "
)
seen = set()
CHARS_UNIQUE = []
for c in CHARS:
    if c not in seen:
        seen.add(c)
        CHARS_UNIQUE.append(c)
CHARS = CHARS_UNIQUE


# ---------------------------------------------------------------------------
# Bezier evaluation
# ---------------------------------------------------------------------------

def bezier_point_quad(p0, p1, p2, t):
    """Evaluate quadratic Bezier at parameter t."""
    s = 1 - t
    return (
        s * s * p0[0] + 2 * s * t * p1[0] + t * t * p2[0],
        s * s * p0[1] + 2 * s * t * p1[1] + t * t * p2[1],
    )


def bezier_point_cubic(p0, p1, p2, p3, t):
    """Evaluate cubic Bezier at parameter t."""
    s = 1 - t
    return (
        s**3 * p0[0] + 3 * s**2 * t * p1[0] + 3 * s * t**2 * p2[0] + t**3 * p3[0],
        s**3 * p0[1] + 3 * s**2 * t * p1[1] + 3 * s * t**2 * p2[1] + t**3 * p3[1],
    )


def _seg_length_quad(p0, cp, ep, steps=10):
    """Estimate quadratic Bezier segment length."""
    length = 0.0
    prev = p0
    for i in range(1, steps + 1):
        t = i / steps
        p = bezier_point_quad(p0, cp, ep, t)
        length += math.hypot(p[0] - prev[0], p[1] - prev[1])
        prev = p
    return length


def _seg_length_cubic(p0, c1, c2, ep, steps=10):
    """Estimate cubic Bezier segment length."""
    length = 0.0
    prev = p0
    for i in range(1, steps + 1):
        t = i / steps
        p = bezier_point_cubic(p0, c1, c2, ep, t)
        length += math.hypot(p[0] - prev[0], p[1] - prev[1])
        prev = p
    return length


# ---------------------------------------------------------------------------
# Contour extraction from font
# ---------------------------------------------------------------------------

def get_glyph_contour_ops(font, char):
    """Extract raw contour operations from a glyph.

    Returns list of contours, each contour is a list of (op, args) tuples.
    Properly splits on closePath so contours without moveTo are handled.
    """
    cmap = font.getBestCmap()
    code = ord(char)
    if code not in cmap:
        return []

    glyph_name = cmap[code]
    glyph_set = font.getGlyphSet()
    glyph = glyph_set[glyph_name]

    pen = RecordingPen()
    glyph.draw(pen)

    contours = []
    current = []
    for op, args in pen.value:
        if op == "moveTo":
            if current:
                contours.append(current)
            current = [("M", args)]
        elif op == "lineTo":
            current.append(("L", args))
        elif op == "qCurveTo":
            current.append(("Q", args))
        elif op == "curveTo":
            current.append(("C", args))
        elif op == "closePath":
            current.append(("Z", ()))
            contours.append(current)
            current = []
        elif op == "endPath":
            if current:
                contours.append(current)
            current = []
    if current:
        contours.append(current)

    return contours


# ---------------------------------------------------------------------------
# Contour sampling
# ---------------------------------------------------------------------------

def _scale_pt(pt, scale, ascender):
    """Scale a font-unit point to SVG coordinates."""
    return (pt[0] * scale, (ascender - pt[1]) * scale)


def sample_contour(ops, scale, ascender, num_samples=None):
    """Sample a contour into a dense list of (x, y) points.

    Handles TrueType quirks:
    - qCurveTo with None last arg (all-off-curve closed contour)
    - Contours starting without moveTo (implicit start)
    """
    segments = []
    current = None
    start = None

    for op, args in ops:
        if op == "M":
            pt = args[0]
            if pt is None:
                continue
            current = _scale_pt(pt, scale, ascender)
            start = current

        elif op == "Q":
            # Detect implicit-close marker (None as last arg)
            has_implicit_close = len(args) > 0 and args[-1] is None
            pts = [p for p in args if p is not None]
            if not pts:
                continue

            # Handle missing moveTo (contour starts with qCurveTo)
            if current is None:
                if has_implicit_close and len(pts) >= 2:
                    # All-off-curve closed contour — start = mid(last, first)
                    lp, fp = pts[-1], pts[0]
                    current = (
                        ((lp[0] + fp[0]) / 2) * scale,
                        (ascender - (lp[1] + fp[1]) / 2) * scale,
                    )
                    start = current
                else:
                    current = _scale_pt(pts[0], scale, ascender)
                    start = current
                    pts = pts[1:]
                    if not pts:
                        continue

            if has_implicit_close:
                # All off-curve points — implied on-curve midpoints between them
                n_pts = len(pts)
                for i in range(n_pts):
                    cp = _scale_pt(pts[i], scale, ascender)
                    ni = (i + 1) % n_pts
                    ncp = _scale_pt(pts[ni], scale, ascender)
                    ep = ((cp[0] + ncp[0]) / 2, (cp[1] + ncp[1]) / 2)
                    length = _seg_length_quad(current, cp, ep)
                    segments.append(("Q", current, cp, ep, length))
                    current = ep
            else:
                # Normal qCurveTo: off-curve points + final on-curve endpoint
                for i in range(len(pts) - 1):
                    cp = _scale_pt(pts[i], scale, ascender)
                    if i < len(pts) - 2:
                        ncp = _scale_pt(pts[i + 1], scale, ascender)
                        ep = ((cp[0] + ncp[0]) / 2, (cp[1] + ncp[1]) / 2)
                    else:
                        ep = _scale_pt(pts[-1], scale, ascender)
                    length = _seg_length_quad(current, cp, ep)
                    segments.append(("Q", current, cp, ep, length))
                    current = ep

        elif current is None:
            continue

        elif op == "L":
            end = _scale_pt(args[0], scale, ascender)
            length = math.hypot(end[0] - current[0], end[1] - current[1])
            segments.append(("L", current, end, length))
            current = end

        elif op == "C":
            c1 = _scale_pt(args[0], scale, ascender)
            c2 = _scale_pt(args[1], scale, ascender)
            ep = _scale_pt(args[2], scale, ascender)
            length = _seg_length_cubic(current, c1, c2, ep)
            segments.append(("C", current, c1, c2, ep, length))
            current = ep

        elif op == "Z":
            if current and start:
                length = math.hypot(start[0] - current[0], start[1] - current[1])
                if length > 0.1:
                    segments.append(("L", current, start, length))
                current = start

    if not segments:
        return []

    total_length = sum(s[-1] for s in segments)
    if total_length < 0.1:
        return []

    if num_samples is None:
        num_samples = max(20, int(total_length * SAMPLES_PER_UNIT))

    # Sample at regular intervals
    points = []
    target_spacing = total_length / num_samples
    next_target = 0.0
    accumulated = 0.0

    for seg in segments:
        seg_len = seg[-1]
        if seg_len < 0.001:
            continue

        while next_target <= accumulated + seg_len:
            t = (next_target - accumulated) / seg_len
            t = max(0.0, min(1.0, t))

            if seg[0] == "L":
                _, p0, p1, _ = seg
                x = p0[0] + t * (p1[0] - p0[0])
                y = p0[1] + t * (p1[1] - p0[1])
                points.append((x, y))
            elif seg[0] == "Q":
                _, p0, cp, ep, _ = seg
                points.append(bezier_point_quad(p0, cp, ep, t))
            elif seg[0] == "C":
                _, p0, c1, c2, ep, _ = seg
                points.append(bezier_point_cubic(p0, c1, c2, ep, t))

            next_target += target_spacing
        accumulated += seg_len

    return points


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def contour_area(pts):
    """Signed area of polygon (shoelace formula)."""
    n = len(pts)
    if n < 3:
        return 0
    area = 0
    for i in range(n):
        j = (i + 1) % n
        area += pts[i][0] * pts[j][1]
        area -= pts[j][0] * pts[i][1]
    return area / 2


def bbox(pts):
    """Bounding box of points: (xmin, ymin, xmax, ymax)."""
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


def path_length(pts):
    """Total euclidean length of a polyline."""
    total = 0
    for i in range(1, len(pts)):
        total += math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    return total


def resample_contour(pts, n):
    """Resample a contour to exactly n evenly-spaced points."""
    pts = np.array(pts)
    if len(pts) < 2 or n < 2:
        return pts

    diffs = np.diff(pts, axis=0)
    seg_lengths = np.sqrt(np.sum(diffs ** 2, axis=1))
    cum_len = np.concatenate([[0], np.cumsum(seg_lengths)])
    total_len = cum_len[-1]

    if total_len < 1e-10:
        return np.tile(pts[0], (n, 1))

    target_dists = np.linspace(0, total_len, n, endpoint=False)
    result = np.zeros((n, 2))

    for i, d in enumerate(target_dists):
        idx = np.searchsorted(cum_len, d, side="right") - 1
        idx = max(0, min(idx, len(pts) - 2))
        seg_len = cum_len[idx + 1] - cum_len[idx]
        if seg_len < 1e-10:
            result[i] = pts[idx]
        else:
            t = (d - cum_len[idx]) / seg_len
            result[i] = pts[idx] * (1 - t) + pts[idx + 1] * t

    return result


# ---------------------------------------------------------------------------
# Dot detection
# ---------------------------------------------------------------------------

def is_dot_component(pts):
    """Check if a sampled contour is a small dot (period, i-dot).

    Uses area threshold AND aspect ratio to distinguish dots (~1:1) from
    accents/strokes (elongated shapes like acute accent, quotation marks).
    """
    area = abs(contour_area(pts))
    if area >= DOT_AREA_THRESHOLD:
        return False
    b = bbox(pts)
    w = b[2] - b[0]
    h = b[3] - b[1]
    if w < 0.1 or h < 0.1:
        return False
    aspect = max(w, h) / min(w, h)
    return aspect < 1.5  # roughly circular — excludes accents (aspect ~1.8)


def make_dot_path(pts):
    """Create a small circle SVG arc path for a dot component."""
    b = bbox(pts)
    cx = (b[0] + b[2]) / 2
    cy = (b[1] + b[3]) / 2
    rx = (b[2] - b[0]) / 2
    ry = (b[3] - b[1]) / 2
    r = max(rx, ry, 0.5)
    # SVG circle as two semicircular arcs
    return "M%.1f %.1fA%.1f %.1f 0 1 1 %.1f %.1fA%.1f %.1f 0 1 1 %.1f %.1f" % (
        cx - r, cy, r, r, cx + r, cy, r, r, cx - r, cy
    )


# ---------------------------------------------------------------------------
# Spatial contour clustering
# ---------------------------------------------------------------------------

def cluster_contours_spatially(sampled_contours):
    """Group contours: inner/outer together, separate components apart.

    Returns list of groups. Each group is a list of dicts with keys:
    'pts', 'area', 'bbox'.
    Groups are sorted largest-first internally.
    """
    def contains(outer_bb, inner_bb, tol=5):
        return (inner_bb[0] >= outer_bb[0] - tol and
                inner_bb[1] >= outer_bb[1] - tol and
                inner_bb[2] <= outer_bb[2] + tol and
                inner_bb[3] <= outer_bb[3] + tol)

    infos = []
    for pts in sampled_contours:
        area = abs(contour_area(pts))
        bb = bbox(pts)
        infos.append({"pts": pts, "area": area, "bbox": bb})

    # Sort largest area first
    infos.sort(key=lambda x: -x["area"])

    used = [False] * len(infos)
    groups = []

    for i in range(len(infos)):
        if used[i]:
            continue
        used[i] = True
        group = [infos[i]]

        # Find all contours contained within this one
        for j in range(i + 1, len(infos)):
            if used[j]:
                continue
            if contains(infos[i]["bbox"], infos[j]["bbox"]):
                used[j] = True
                group.append(infos[j])

        groups.append(group)

    return groups


# ---------------------------------------------------------------------------
# Centerline computation
# ---------------------------------------------------------------------------

def compute_centerline_two_contours(pts_a, pts_b):
    """Compute centerline between two contours with optimal alignment.

    Resamples both to the same point count, then tries multiple offsets and
    direction (forward/reverse) to find the alignment that produces the most
    uniform-thickness centerline.

    Returns list of (x, y) centerline points.
    """
    n = max(len(pts_a), len(pts_b), 40)
    a = resample_contour(pts_a, n)
    b = resample_contour(pts_b, n)

    best_cl = None
    best_score = float("inf")

    for reverse in [False, True]:
        br = b[::-1] if reverse else b
        for offset_idx in range(16):
            offset = int(n * offset_idx / 16)
            shifted = np.roll(br, offset, axis=0)

            mid = (a + shifted) / 2
            dists = np.sqrt(np.sum((a - shifted) ** 2, axis=1))
            # Score: lower std = more uniform thickness
            score = np.std(dists)

            if score < best_score:
                best_score = score
                best_cl = mid.tolist()

    if not best_cl:
        return []

    # Close path if start ≈ end
    if len(best_cl) > 2:
        d = math.hypot(
            best_cl[0][0] - best_cl[-1][0],
            best_cl[0][1] - best_cl[-1][1],
        )
        if d < 5:
            best_cl.append(best_cl[0])

    return best_cl


def compute_centerline_single_contour(pts):
    """Compute centerline of a single closed contour by matching opposite points.

    For each point on the first half, finds the closest point in the opposite
    range [i + N/4, i + 3N/4] and computes the midpoint.
    """
    n = len(pts)
    if n < 8:
        return []

    pts_arr = np.array(pts)
    quarter = n // 4
    half = n // 2
    centerline = []

    for i in range(half):
        pa = pts_arr[i]
        best_dist = float("inf")
        best_j = -1
        for offset in range(quarter, 3 * quarter + 1):
            j = (i + offset) % n
            dist = np.sum((pts_arr[j] - pa) ** 2)
            if dist < best_dist:
                best_dist = dist
                best_j = j

        if best_j >= 0:
            pb = pts_arr[best_j]
            mid = ((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)
            centerline.append(mid)

    return centerline


# ---------------------------------------------------------------------------
# RDP simplification
# ---------------------------------------------------------------------------

def rdp_simplify(points, epsilon):
    """Ramer-Douglas-Peucker polyline simplification."""
    if len(points) <= 2:
        return points

    start = np.array(points[0])
    end = np.array(points[-1])
    line_vec = end - start
    line_len = np.linalg.norm(line_vec)

    if line_len < 1e-10:
        dists = [np.linalg.norm(np.array(p) - start) for p in points]
        max_idx = max(range(len(dists)), key=lambda i: dists[i])
        if dists[max_idx] < epsilon:
            return [points[0], points[-1]]
        left = rdp_simplify(points[: max_idx + 1], epsilon)
        right = rdp_simplify(points[max_idx:], epsilon)
        return left[:-1] + right

    line_unit = line_vec / line_len
    max_dist = 0
    max_idx = 0

    for i in range(1, len(points) - 1):
        pt = np.array(points[i])
        v = pt - start
        proj = np.dot(v, line_unit)
        proj = max(0, min(line_len, proj))
        closest = start + proj * line_unit
        dist = np.linalg.norm(pt - closest)
        if dist > max_dist:
            max_dist = dist
            max_idx = i

    if max_dist < epsilon:
        return [points[0], points[-1]]

    left = rdp_simplify(points[: max_idx + 1], epsilon)
    right = rdp_simplify(points[max_idx:], epsilon)
    return left[:-1] + right


# ---------------------------------------------------------------------------
# SVG path output
# ---------------------------------------------------------------------------

def points_to_svg_bezier(pts):
    """Convert simplified points to SVG path with Q curves."""
    if len(pts) < 2:
        return ""

    def fmt(x, y):
        return "%g %g" % (round(x, 1), round(y, 1))

    d = "M" + fmt(*pts[0])

    if len(pts) == 2:
        d += " L" + fmt(*pts[1])
        return d

    for i in range(1, len(pts) - 1):
        cx, cy = pts[i]
        nx, ny = pts[i + 1]
        if i < len(pts) - 2:
            ex = (cx + nx) / 2
            ey = (cy + ny) / 2
        else:
            ex, ey = nx, ny
        d += " Q" + fmt(cx, cy) + " " + fmt(ex, ey)

    return d


# ---------------------------------------------------------------------------
# Path junction connection
# ---------------------------------------------------------------------------

def connect_paths_at_junctions(svg_paths, gap=JUNCTION_GAP):
    """Connect SVG path fragments whose endpoints are close together.

    Parses endpoints from SVG 'd' strings, merges paths with close endpoints.
    Returns a new list of SVG paths.
    """
    if len(svg_paths) <= 1:
        return svg_paths

    # Extract start/end points from each path
    def get_endpoints(d):
        """Get first and last point from an SVG path string."""
        # Parse M x y at start
        parts = d.replace(",", " ").split()
        sx, sy = None, None
        ex, ey = None, None

        # Start point: after 'M'
        i = 0
        while i < len(parts):
            if parts[i].startswith("M"):
                rest = parts[i][1:]
                if rest:
                    sx = float(rest)
                    sy = float(parts[i + 1])
                    i += 2
                else:
                    sx = float(parts[i + 1])
                    sy = float(parts[i + 2])
                    i += 3
                break
            i += 1

        # End point: last two numbers
        nums = []
        for p in parts:
            clean = p.lstrip("MmLlQqCcAaZz")
            if clean:
                try:
                    nums.append(float(clean))
                except ValueError:
                    pass
        if len(nums) >= 2:
            ex, ey = nums[-2], nums[-1]

        return (sx, sy), (ex, ey)

    endpoints = [get_endpoints(d) for d in svg_paths]

    # Simple greedy connection: try to chain paths end-to-start
    used = [False] * len(svg_paths)
    result = []

    for i in range(len(svg_paths)):
        if used[i]:
            continue
        used[i] = True
        chain = [svg_paths[i]]
        chain_end = endpoints[i][1]

        # Try to extend the chain
        changed = True
        while changed:
            changed = False
            for j in range(len(svg_paths)):
                if used[j]:
                    continue
                start_j = endpoints[j][0]
                end_j = endpoints[j][1]
                if chain_end[0] is not None and start_j[0] is not None:
                    d = math.hypot(chain_end[0] - start_j[0], chain_end[1] - start_j[1])
                    if d < gap:
                        used[j] = True
                        # Append path j (skip its M command)
                        path_j = svg_paths[j]
                        # Remove leading M x y
                        idx = path_j.index(" ") if " " in path_j else len(path_j)
                        # Find second space (after y)
                        rest = path_j[1:]  # skip M
                        nums_skipped = 0
                        k = 0
                        while k < len(rest) and nums_skipped < 2:
                            if rest[k] == " ":
                                nums_skipped += 1
                                if nums_skipped < 2:
                                    k += 1
                                    continue
                            k += 1
                        continuation = rest[k:].strip()
                        if continuation:
                            chain.append(" L" + ("%.1f %.1f" % (start_j[0], start_j[1])) + " " + continuation)
                        chain_end = end_j
                        changed = True
                        break

        result.append("".join(chain))

    return result


# ---------------------------------------------------------------------------
# Main glyph processing
# ---------------------------------------------------------------------------

def process_glyph(font, char, scale, ascender):
    """Process a single glyph into centerline SVG paths."""
    contour_ops = get_glyph_contour_ops(font, char)
    if not contour_ops:
        return []

    # Sample all contours
    sampled = []
    for ops in contour_ops:
        pts = sample_contour(ops, scale, ascender)
        if len(pts) >= 4:
            sampled.append(pts)

    if not sampled:
        return []

    # Cluster contours spatially (inner/outer together)
    groups = cluster_contours_spatially(sampled)

    centerlines = []
    dot_paths = []

    for group in groups:
        if len(group) == 1:
            pts = group[0]["pts"]
            if is_dot_component(pts):
                dot_paths.append(make_dot_path(pts))
            else:
                cl = compute_centerline_single_contour(pts)
                if cl:
                    centerlines.append(cl)

        elif len(group) == 2:
            # Check if inner is a dot
            outer = group[0]  # largest area
            inner = group[1]  # smaller area

            if is_dot_component(inner["pts"]):
                # Inner is a dot (unlikely but handle)
                cl = compute_centerline_single_contour(outer["pts"])
                if cl:
                    centerlines.append(cl)
                dot_paths.append(make_dot_path(inner["pts"]))
            else:
                # True inner/outer pair — compute centerline between them
                cl = compute_centerline_two_contours(outer["pts"], inner["pts"])
                if cl:
                    centerlines.append(cl)

        else:
            # 3+ contours in group — outer paired with ALL inner contours
            outer = group[0]
            inners = group[1:]

            # Separate dots from real inner contours
            real_inners = []
            for inner in inners:
                if is_dot_component(inner["pts"]):
                    dot_paths.append(make_dot_path(inner["pts"]))
                else:
                    real_inners.append(inner)

            if not real_inners:
                # All inners were dots — process outer as single contour
                cl = compute_centerline_single_contour(outer["pts"])
                if cl:
                    centerlines.append(cl)
            else:
                # Pair outer with EACH inner contour
                for inner in real_inners:
                    cl = compute_centerline_two_contours(outer["pts"], inner["pts"])
                    if cl:
                        centerlines.append(cl)

    # Post-process centerlines: simplify → SVG
    svg_paths = []
    for cl_pts in centerlines:
        if len(cl_pts) < 2:
            continue
        cl_list = [(p[0], p[1]) for p in cl_pts]
        if path_length(cl_list) < MIN_PATH_LEN:
            continue
        simplified = rdp_simplify(cl_list, RDP_EPSILON)
        if len(simplified) < 2:
            continue
        d = points_to_svg_bezier(simplified)
        if d:
            svg_paths.append(d)

    # Connect centerline paths at junctions (before adding dot paths)
    if len(svg_paths) > 1:
        svg_paths = connect_paths_at_junctions(svg_paths)

    # Add dot paths after junction connection (dots are self-contained arcs)
    svg_paths.extend(dot_paths)

    return svg_paths


# ---------------------------------------------------------------------------
# Debug SVG generation
# ---------------------------------------------------------------------------

DEBUG_COLORS = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
    "#F8C471", "#82E0AA", "#F1948A", "#AED6F1", "#D7BDE2",
]


def generate_debug_svg(char_map, scale, ascender):
    """Generate a debug SVG showing all characters with colored paths."""
    cols = 16
    cell_w = BASE_SIZE * 1.2
    cell_h = BASE_SIZE * 1.4
    chars = [c for c in CHARS if c in char_map and c != " "]
    rows = math.ceil(len(chars) / cols)

    svg_w = cols * cell_w
    svg_h = rows * cell_h

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="%.0f" height="%.0f" '
        'viewBox="0 0 %.0f %.0f">' % (svg_w, svg_h, svg_w, svg_h),
        '<rect width="100%%" height="100%%" fill="#1a1a2e"/>',
    ]

    for idx, char in enumerate(chars):
        col = idx % cols
        row = idx // cols
        x = col * cell_w + 10
        y = row * cell_h + 10

        entry = char_map.get(char, {})
        paths = entry.get("paths", [])
        color = DEBUG_COLORS[idx % len(DEBUG_COLORS)]

        # Character label
        label_char = char if char not in ('"', "'", "<", ">", "&") else "&#%d;" % ord(char)
        lines.append(
            '  <text x="%.0f" y="%.0f" fill="#666" font-size="14" '
            'font-family="monospace">%s</text>' % (x, y + cell_h - 5, label_char)
        )

        # Draw paths
        for pi, d in enumerate(paths):
            lines.append(
                '  <path d="%s" fill="none" stroke="%s" stroke-width="1.5" '
                'stroke-linecap="round" transform="translate(%.1f,%.1f)"/>'
                % (d, color, x, y)
            )

        # Glyph width indicator
        w = entry.get("width", 0)
        lines.append(
            '  <line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" '
            'stroke="#333" stroke-width="0.5"/>'
            % (x + w, y, x + w, y + BASE_SIZE)
        )

    lines.append("</svg>")

    with open(DEBUG_SVG_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print("  Debug SVG: %s (%d chars)" % (DEBUG_SVG_PATH, len(chars)))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("Loading font: %s" % FONT_PATH)
    font = TTFont(FONT_PATH)
    upm = font["head"].unitsPerEm
    ascender = font["OS/2"].sTypoAscender
    scale = BASE_SIZE / upm
    hmtx = font["hmtx"]
    cmap = font.getBestCmap()

    char_map = {}
    total_paths = 0
    empty_chars = []

    for i, char in enumerate(CHARS):
        code = ord(char)
        if char == " ":
            glyph_name = cmap.get(code, "space")
            w = hmtx[glyph_name][0] * scale
            char_map[char] = {"paths": [], "width": round(w, 1)}
            print("  [%d/%d] ' ' — SPACE  w=%.1f" % (i + 1, len(CHARS), w))
            continue

        if code not in cmap:
            print("  [%d/%d] '%s' — NOT IN FONT" % (i + 1, len(CHARS), char))
            continue

        glyph_name = cmap[code]
        w = hmtx[glyph_name][0] * scale

        try:
            paths = process_glyph(font, char, scale, ascender)
        except Exception as e:
            print("  [%d/%d] '%s' — ERROR: %s" % (i + 1, len(CHARS), char, e))
            paths = []

        char_map[char] = {"paths": paths, "width": round(w, 1)}
        total_paths += len(paths)
        status = "OK" if paths else "EMPTY"
        if not paths:
            empty_chars.append(char)
        print(
            "  [%d/%d] '%s' — %d paths, w=%.1f  %s"
            % (i + 1, len(CHARS), char, len(paths), w, status)
        )

    output = {"format": "charmap", "version": 2, "charMap": char_map}

    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f)

    file_size = len(json.dumps(output))
    print("\nDone! %s" % OUTPUT_PATH)
    print("  %d characters, %d total paths" % (len(char_map), total_paths))
    print("  ~%d KB JSON" % (file_size // 1024))

    if empty_chars:
        print("  EMPTY: %s" % " ".join(empty_chars))

    # Generate debug SVG
    generate_debug_svg(char_map, scale, ascender)


if __name__ == "__main__":
    main()

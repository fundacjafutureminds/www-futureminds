#!/usr/bin/env python3
"""Generate outline SVG paths from Geomanist Thin using fonttools.

This extracts the NATIVE Bezier curves from the font file — no rasterization,
no skeletonization, just the raw glyph outlines converted to SVG paths.

Each glyph's contours become separate <path> elements (fixes multi-subpath
pathLength animation issues from v1).
"""

import json
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

FONT_PATH = "fonts/Geomanist-Thin-Webfont/geomanist-thin-webfont.ttf"
OUTPUT_PATH = "src/components/ui/handwrite-paths.json"

BASE_SIZE = 200  # target size in SVG units

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


def get_glyph_paths(font, char, scale):
    """Extract SVG path strings for each contour of a character.

    Returns list of SVG path 'd' strings — one per contour.
    Y is flipped (font coords have Y-up, SVG has Y-down).
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

    # Parse recording into contours
    contours = []
    current_contour = []

    for op, args in pen.value:
        if op == "moveTo":
            if current_contour:
                contours.append(current_contour)
            current_contour = [("M", args)]
        elif op == "lineTo":
            current_contour.append(("L", args))
        elif op == "qCurveTo":
            # TrueType quadratic splines — may have multiple off-curve points
            current_contour.append(("Q", args))
        elif op == "curveTo":
            # CFF cubic bezier
            current_contour.append(("C", args))
        elif op == "closePath":
            current_contour.append(("Z", ()))
            contours.append(current_contour)
            current_contour = []
        elif op == "endPath":
            if current_contour:
                contours.append(current_contour)
            current_contour = []

    if current_contour:
        contours.append(current_contour)

    # Get glyph metrics for vertical positioning
    ascender = font["OS/2"].sTypoAscender
    upm = font["head"].unitsPerEm

    paths = []
    for contour in contours:
        d = ""
        for op, args in contour:
            if op == "M":
                x = args[0][0] * scale
                y = (ascender - args[0][1]) * scale
                d += "M%g %g" % (round(x, 1), round(y, 1))
            elif op == "L":
                x = args[0][0] * scale
                y = (ascender - args[0][1]) * scale
                d += " L%g %g" % (round(x, 1), round(y, 1))
            elif op == "Q":
                # TrueType qCurveTo: last arg can be None (implicit on-curve = contour start)
                # Filter out None points
                pts = [p for p in args if p is not None]
                if not pts:
                    continue
                if len(pts) == 1:
                    # Degenerate — just line to the point
                    ex = pts[0][0] * scale
                    ey = (ascender - pts[0][1]) * scale
                    d += " L%g %g" % (round(ex, 1), round(ey, 1))
                elif len(pts) == 2:
                    cx = pts[0][0] * scale
                    cy = (ascender - pts[0][1]) * scale
                    ex = pts[1][0] * scale
                    ey = (ascender - pts[1][1]) * scale
                    d += " Q%g %g %g %g" % (
                        round(cx, 1), round(cy, 1),
                        round(ex, 1), round(ey, 1)
                    )
                else:
                    # Multiple off-curve points with implied on-curve midpoints
                    for i in range(len(pts) - 1):
                        cx = pts[i][0] * scale
                        cy = (ascender - pts[i][1]) * scale
                        if i < len(pts) - 2:
                            nx = pts[i + 1][0] * scale
                            ny = (ascender - pts[i + 1][1]) * scale
                            ex = (cx + nx) / 2
                            ey = (cy + ny) / 2
                        else:
                            ex = pts[i + 1][0] * scale
                            ey = (ascender - pts[i + 1][1]) * scale
                        d += " Q%g %g %g %g" % (
                            round(cx, 1), round(cy, 1),
                            round(ex, 1), round(ey, 1)
                        )
            elif op == "C":
                # Cubic bezier: 2 control + 1 endpoint
                c1x = args[0][0] * scale
                c1y = (ascender - args[0][1]) * scale
                c2x = args[1][0] * scale
                c2y = (ascender - args[1][1]) * scale
                ex = args[2][0] * scale
                ey = (ascender - args[2][1]) * scale
                d += " C%g %g %g %g %g %g" % (
                    round(c1x, 1), round(c1y, 1),
                    round(c2x, 1), round(c2y, 1),
                    round(ex, 1), round(ey, 1)
                )
            elif op == "Z":
                d += " Z"
        if d:
            paths.append(d)

    return paths


def main():
    print("Loading font: %s" % FONT_PATH)
    font = TTFont(FONT_PATH)

    upm = font["head"].unitsPerEm
    scale = BASE_SIZE / upm  # scale from font units to SVG units (200px target)

    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]

    char_map = {}
    total_paths = 0

    for i, char in enumerate(CHARS):
        code = ord(char)

        if char == " ":
            # Space: just width, no paths
            glyph_name = cmap.get(code, "space")
            w = hmtx[glyph_name][0] * scale
            char_map[char] = {"paths": [], "width": round(w, 1)}
            print("  [%d/%d] ' ' — 0 paths, w=%.1f  SPACE" % (i + 1, len(CHARS), w))
            continue

        if code not in cmap:
            print("  [%d/%d] '%s' — NOT IN FONT" % (i + 1, len(CHARS), char))
            continue

        glyph_name = cmap[code]
        w = hmtx[glyph_name][0] * scale
        paths = get_glyph_paths(font, char, scale)

        char_map[char] = {"paths": paths, "width": round(w, 1)}
        total_paths += len(paths)
        status = "OK" if paths else "EMPTY"
        print("  [%d/%d] '%s' — %d contours, w=%.1f  %s" % (
            i + 1, len(CHARS), char, len(paths), w, status
        ))

    output = {
        "format": "charmap",
        "version": 2,
        "charMap": char_map,
    }

    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f)

    file_size = len(json.dumps(output))
    print("\nDone! %s" % OUTPUT_PATH)
    print("  %d characters, %d total contours" % (len(char_map), total_paths))
    print("  ~%d KB JSON" % (file_size // 1024))


if __name__ == "__main__":
    main()

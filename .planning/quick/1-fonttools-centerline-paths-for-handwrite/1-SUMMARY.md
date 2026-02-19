---
phase: quick-1
plan: 01
subsystem: ui
tags: [fonttools, svg, centerline, bezier, handwriting, animation]

requires:
  - phase: 01-fundamenty
    provides: Geomanist font i struktura projektu Next.js
provides:
  - Wektorowy generator centerline paths z fonttools (generate-vectorline-paths.py)
  - Mapa znakow charMap z pelnym alfabetem (a-z, A-Z, polskie, cyfry, interpunkcja)
  - Komponent HandwriteTitle z dynamicznym text prop
affects: [sekcje uzywajace dekoracyjnych naglowkow]

tech-stack:
  added: [fonttools (Python, juz zainstalowane)]
  patterns: [charMap JSON per-znak, SVG bezier centerline, translate-based kerning]

key-files:
  created:
    - scripts/generate-vectorline-paths.py
  modified:
    - src/components/ui/handwrite-paths.json
    - src/components/ui/HandwriteTitle.tsx
    - src/components/sections/ProgramyEdukacyjneSection.tsx

key-decisions:
  - "charMap zamiast per-line: JSON przechowuje mape znakow, komponent sklada tekst dynamicznie"
  - "Algorytm centerline: podzial konturu na dwie strony + usrednianie + RDP simplification"
  - "Obsluga TrueType qCurveTo z None endpoint (kontury z samych off-curve points)"
  - "Precyzja integer (0 decimal) w SVG paths dla redukcji rozmiaru JSON"
  - "strokeWidth=1.5 z non-scaling-stroke i round linecap/linejoin"

patterns-established:
  - "Charmap pattern: JSON z mapa znakow, komponent sklada tekst z advance widths"
  - "Centerline extraction: kontury fontu -> sampling -> split/pair -> average -> RDP -> SVG"

duration: 13min
completed: 2026-02-19
---

# Quick Task 1: Fonttools Centerline Paths Summary

**Wektorowy system centerline paths z fonttools: charMap 95 znakow, 14 KB JSON, dynamiczny HandwriteTitle z text prop**

## Performance

- **Duration:** 13 min
- **Started:** 2026-02-18T23:53:19Z
- **Completed:** 2026-02-19T00:06:19Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Nowy skrypt Python (generate-vectorline-paths.py) generujacy centerline z fonttools zamiast PIL/skeletonize
- JSON zmniejszony z 247 KB (setki segmentow L) do 14 KB (bezier paths M/L/Q)
- Pelny alfabet: A-Z, a-z, 0-9, polskie znaki (acelnoszz), interpunkcja (95 znakow)
- Komponent HandwriteTitle z dynamicznym text prop - renderuje dowolny tekst
- Build Next.js przechodzi bez bledow

## Task Commits

1. **Task 1: Skrypt wektorowej ekstrakcji centerline** - `3156f85` (feat)
2. **Task 2: Aktualizacja HandwriteTitle.tsx** - `25445a3` (feat)

## Files Created/Modified
- `scripts/generate-vectorline-paths.py` - Wektorowy generator centerline z fonttools
- `src/components/ui/handwrite-paths.json` - Mapa znakow charMap (14 KB, 95 znakow)
- `src/components/ui/HandwriteTitle.tsx` - Komponent z dynamicznym text prop
- `src/components/sections/ProgramyEdukacyjneSection.tsx` - Dodany text prop

## Decisions Made
- charMap zamiast per-line: JSON przechowuje mape znakow (nie linie tekstu), komponent dynamicznie sklada
- Algorytm centerline: podzial zamknietego konturu na dwie strony (outer/inner), usrednianie odpowiadajacych punktow
- Obsluga TrueType edge cases: qCurveTo z None endpoint (kontury z samych off-curve, np. litera O, kropka)
- Integer precision w SVG paths (0 decimal) - redukcja rozmiaru o ~50%
- Minified JSON (bez indentacji) - dalsze oszczednosci rozmiaru

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Obsluga TrueType konturow bez moveTo**
- **Found during:** Task 1 (generowanie paths)
- **Issue:** Glify O, o, ., !, ?, :, ; mialy kontury zaczynajace sie od qCurveTo z None endpoint (pure off-curve contours) - powodowalo blad NoneType
- **Fix:** Dodano obsluge expand_tt_qcurve_to_quadratics z None endpoint i implicit on-curve start point
- **Files modified:** scripts/generate-vectorline-paths.py
- **Verification:** Wszystkie 95 znakow generuja sie bez bledow
- **Committed in:** 3156f85

**2. [Rule 1 - Bug] Podwojne contour split w split_into_contours**
- **Found during:** Task 1 (generowanie paths)
- **Issue:** Kontury bez moveTo (zaczynajace sie od qCurveTo) nie byly poprawnie dzielone
- **Fix:** Podzial po closePath/endPath obok podzialu po moveTo
- **Files modified:** scripts/generate-vectorline-paths.py
- **Committed in:** 3156f85

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Obie poprawki niezbedne dla poprawnego dzialania z pelnym zestawem znakow. Bez nich 10 znakow nie generowaloby sie.

## Issues Encountered
- Rozmiar JSON: pierwsza wersja 30 KB, po optymalizacji (integer coords, minified) zmniejszony do 14 KB
- Algorytm centerline jest heurystyczny - nie jest idealny dla wszystkich glifow, ale dla Geomanist Thin (ultra-cienkie kreski ~20 UPM) daje akceptowalne wyniki

## User Setup Required
None - brak konfiguracji zewnetrznych serwisow.

## Next Steps
- Weryfikacja wizualna na dev server (http://localhost:4510)
- Ewentualne dostrojenie parametrow (SIMPLIFY_TOLERANCE, MIN_SEGMENT_LENGTH)
- Uzycie HandwriteTitle z roznymi tekstami na innych sekcjach strony

---
*Quick Task: 1-fonttools-centerline-paths*
*Completed: 2026-02-19*

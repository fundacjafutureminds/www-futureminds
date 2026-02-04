---
phase: 01-fundamenty
plan: 01
subsystem: ui
tags: [tailwind-v4, typography, color-palette, plus-jakarta-sans, css-variables, next-font]

# Dependency graph
requires:
  - phase: none
    provides: first plan in project
provides:
  - Color palette with FM brand colors (#9AFC4E lime green)
  - 5-level typography hierarchy (section, heading, sidebar, body, cta)
  - Plus Jakarta Sans font loaded via next/font/google
  - CSS variables for font in @theme inline
affects: [all phases - every component uses these base tokens]

# Tech tracking
tech-stack:
  added: [Plus Jakarta Sans (Google Font)]
  patterns: [@theme inline for CSS variable references, @theme for literal values, Tailwind v4 custom text utilities]

key-files:
  created: []
  modified:
    - src/app/globals.css
    - src/app/layout.tsx

key-decisions:
  - "Plus Jakarta Sans zamiast Inter/Cardo - zgodnie z researched oryginalem strony"
  - "@theme inline dla --font-sans (referuje CSS variable z next/font) - bez inline font wraca do fallback"
  - "Tailwind v4 postfiksy (--text-X--line-height, --text-X--font-weight) dla hierarchii typografii"

patterns-established:
  - "@theme inline: uzywac dla CSS variables referujacych inne CSS variables (np. font z next/font)"
  - "@theme: uzywac dla literalnych wartosci (kolory, rozmiary)"
  - "Nazewnictwo kolorow: --color-fm-* (fm = Future Minds)"
  - "Nazewnictwo typografii: --text-* z postfiksami Tailwind v4"

# Metrics
duration: 2min
completed: 2026-02-04
---

# Phase 1 Plan 1: Paleta kolorow + font + typografia Summary

**Lime green #9AFC4E, Plus Jakarta Sans via next/font, 5-poziomowa hierarchia typografii w Tailwind v4 @theme**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-04T12:51:09Z
- **Completed:** 2026-02-04T12:52:30Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Paleta kolorow FM z prawidlowym lime green #9AFC4E (zamiast starego #00d084)
- Plus Jakarta Sans zaladowany przez next/font/google z CSS variable --font-plus-jakarta
- 5-poziomowa hierarchia typografii (section 100px/w200, heading 42px/w600, sidebar 30px/w600, body 19px/w200, cta 10px/w400) dostepna jako utility classes Tailwind
- Usuniete nieuzywane tokeny: Inter, Cardo, --font-serif, --color-fm-turquoise, --color-fm-green-dark

## Task Commits

Each task was committed atomically:

1. **Task 1: Aktualizacja globals.css** - `bfe5ef6` (feat)
2. **Task 2: Aktualizacja layout.tsx** - `28f493a` (feat)

## Files Created/Modified
- `src/app/globals.css` - Paleta kolorow FM, hierarchia typografii, font binding via @theme inline
- `src/app/layout.tsx` - Plus Jakarta Sans import, CSS variable --font-plus-jakarta, usuniete Inter/Cardo

## Decisions Made
- Plus Jakarta Sans zamiast Inter/Cardo -- research potwierdza ze oryginal uzywa tego fontu
- @theme inline dla --font-sans -- wymagane bo wartosc referuje CSS variable z next/font (bez inline Tailwind nie widzi zmiennej)
- Usuniecie --color-fm-turquoise i --color-fm-green-dark -- nie istnieja w oryginalnej stronie

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Tokeny kolorow, typografii i font sa gotowe dla wszystkich komponentow
- Kolejne plany (01-02 dane, 01-03 StickySection) moga budowac na tych fundamentach
- Build przechodzi bez bledow

---
*Phase: 01-fundamenty*
*Completed: 2026-02-04*

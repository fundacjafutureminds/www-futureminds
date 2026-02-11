---
phase: 04-programy-edukacyjne
plan: 01
subsystem: ui
tags: [next.js, react, tailwind, sekcja-programy, overlay, typografia]

# Dependency graph
requires:
  - phase: 01-fundamenty
    provides: "Typografia (text-section, text-heading, text-body), kolory (fm-green), constants.ts z PROGRAMS, StickySection"
  - phase: 03-nawigacja
    provides: "Navbar sticky sidebar, flex layout z prawa kolumna"
provides:
  - "ProgramyEdukacyjneSection.tsx — wyekstrahowany komponent sekcji Programy Edukacyjne"
  - "4 programy w PROGRAMS (FLL, BtC, OZEdukacja, Edukacja Energetyczna)"
  - "Overlay dekoracyjny Tlo-EDUKACYJNE3.png z opacity-20"
  - "Duzy naglowek dekoracyjny 100px z neue-haas-grotesk-display"
  - "Grid 2-kolumnowy kart programow z border-l"
  - "Sekcja autorskich programow szytych na miare"
affects: [04-programy-edukacyjne-plan-02, 10-integracja]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Sekcja bez StickySection — renderowanie bezposrednio w prawej kolumnie"
    - "Overlay dekoracyjny: absolute inset-0 z Image fill, opacity-20"
    - "Karty z border-l zamiast border (jak w Elementorze)"
    - "CTA z bg-[#FFFFFF0A] zamiast border (styl Elementor)"

key-files:
  created:
    - src/components/sections/ProgramyEdukacyjneSection.tsx
  modified:
    - src/lib/constants.ts
    - src/app/page.tsx

key-decisions:
  - "Sekcja NIE uzywa StickySection — renderuje bezposrednio w prawej kolumnie (zgodnie z Elementor research)"
  - "Grid 2-kolumnowy (lg:grid-cols-2) zamiast 3-rzedowego z Elementora — prostszy i rownie efektywny wizualnie"
  - "Loga programow bez brightness-0 invert (loga sa juz jasne na ciemnym tle)"
  - "Karty z border-l border-[#FFFFFF3B] zamiast pelnego border (wierniejsze odwzorowanie Elementora)"
  - "CTA WIECEJ z bg-[#FFFFFF0A] i hover:bg-fm-green (styl Elementor)"

patterns-established:
  - "Ekstrakcja sekcji: inline function -> osobny plik w components/sections/"
  - "Overlay dekoracyjny: pointer-events-none absolute inset-0 z-0 + Image fill"
  - "Duzy naglowek: text-section + neue-haas-grotesk-display font-family"

# Metrics
duration: 3min
completed: 2026-02-11
---

# Phase 04 Plan 01: Programy Edukacyjne — Ekstrakcja Sekcji Summary

**Wyekstrahowany komponent ProgramyEdukacyjneSection z overlay, duzym naglowkiem 100px, 4 kartami programow w gridzie 2-kolumnowym i sekcja autorskich programow**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-11T23:31:32Z
- **Completed:** 2026-02-11T23:35:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Dodano 4. program Edukacja Energetyczna do PROGRAMS w constants.ts
- Zaktualizowano opis OZEdukacja (dodano zdanie o konkursie, filmach i scenariuszach)
- Wyekstrahowano ProgramyEdukacyjneSection do osobnego komponentu (125 linii)
- Sekcja renderuje sie bezposrednio w prawej kolumnie (bez StickySection)
- Overlay dekoracyjny Tlo-EDUKACYJNE3.png z opacity-20
- Duzy naglowek 100px z neue-haas-grotesk-display fallback
- Grid 2-kolumnowy kart programow z border-l (zgodnie z Elementorem)
- Sekcja "szyte na miare" z 3 paragrafami i zielonymi akcentami
- Separator strzalka na dole sekcji

## Task Commits

Kazdy task zostal zacommitowany atomicznie:

1. **Task 1: Dodac 4. program i zaktualizowac dane w constants.ts** - `abcb996` (feat)
2. **Task 2: Wyekstrahowac ProgramyEdukacyjneSection do osobnego komponentu** - `15ffe9f` (feat)

## Files Created/Modified
- `src/components/sections/ProgramyEdukacyjneSection.tsx` - Nowy komponent sekcji Programy Edukacyjne (125 linii)
- `src/lib/constants.ts` - Dodano Edukacja Energetyczna, zaktualizowano opis OZEdukacja
- `src/app/page.tsx` - Zamieniono inline function na import z komponentu, oczyszczono importy

## Decisions Made
- Sekcja NIE uzywa StickySection — renderuje bezposrednio w prawej kolumnie (zgodnie z research Elementora, ktory pokazal ze oryginalna sekcja nie ma sticky sidebara)
- Grid 2-kolumnowy (lg:grid-cols-2) zamiast 3-rzedowego z Elementora — prostszy i rownie efektywny wizualnie z 4 kartami
- Loga programow bez brightness-0 invert (loga sa juz jasne na ciemnym tle, w przeciwienstwie do logotypow partnerow)
- CTA "WIECEJ" z bg-[#FFFFFF0A] i hover:bg-fm-green zamiast border-only (wierniejsze odwzorowanie stylu Elementor)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- ProgramyEdukacyjneSection gotowy do rozbudowy w planie 04-02 (dekoracyjny wiatrak, dokladniejszy layout kart)
- Overlay Tlo-EDUKACYJNE3.png wymaga pliku obrazka w /public/images/ (jesli go brakuje, sekcja wyswietli sie bez tla)
- Logo Edukacji Energetycznej (Lobo-Edukacja-Energetyczna.png) wymaga pliku w /public/images/

---
*Phase: 04-programy-edukacyjne*
*Completed: 2026-02-11*

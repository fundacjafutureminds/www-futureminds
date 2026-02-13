---
phase: 06-projekty
plan: 01
subsystem: ui
tags: [next-image, tailwind, sticky-section, overlay, typescript]

# Dependency graph
requires:
  - phase: 01-fundamenty
    provides: StickySection, typografia (text-section, text-heading, text-body), types.ts (Project interface)
provides:
  - Rozszerzony interface Project z secondaryImage
  - 7 projektow z pelnymi opisami z Elementora w constants.ts
  - ProjektySection.tsx z overlay trybik3.png i intro naglowkami
affects: [06-projekty-plan-02, 10-integracja]

# Tech tracking
tech-stack:
  added: []
  patterns: [overlay-dekoracyjny-wewnatrz-StickySection, template-literals-dla-polskich-znakow]

key-files:
  created:
    - src/components/sections/ProjektySection.tsx
  modified:
    - src/lib/types.ts
    - src/lib/constants.ts
    - src/app/page.tsx

key-decisions:
  - "Template literals z unicode escape sequences zamiast bezposrednich polskich znakow w JSX (kompatybilnosc z narzedziem Write)"
  - "Brak navLinks w StickySection — wbudowany link Powrot na gore strony wystarczy (zgodnie z Elementorem)"
  - "Jednowyrazowy naglowek Projekty (bez br) — zgodnie z Elementorem"

patterns-established:
  - "Template literals w JSX: uzycie {`tekst z \\u0105`} dla polskich znakow diakrytycznych w komponentach"
  - "Overlay dekoracyjny wewnatrz StickySection children z pointer-events-none absolute inset-0 z-0"

# Metrics
duration: 4min
completed: 2026-02-13
---

# Phase 6 Plan 01: Dane projektow i struktura ProjektySection Summary

**7 projektow z pelnymi opisami Elementora w constants.ts + wyekstrahowany ProjektySection.tsx z overlay trybik3.png i intro naglowkami 42px/19px**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-13T18:52:00Z
- **Completed:** 2026-02-13T18:56:21Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Rozszerzony interface Project o opcjonalne pole secondaryImage (dla Enigmy z 2 logami)
- Zaktualizowane PROJECTS do 7 projektow z pelnymi opisami z Elementora, poprawionymi obrazkami (rock3.png dla Pol'and Rock, Obszar-roboczy-3.png dla Mistrzostw IT) i nowym 7. projektem "Kto Ty jestes? - Polak maly"
- ProjektySection wyekstrahowany do osobnego komponentu z: StickySection "03 Projekty", overlay trybik3.png (20% opacity), duzym naglowkiem 100px i intro naglowkami z zielonymi akcentami
- page.tsx oczyszczony z inline ProjektySection — uzywa importu z komponentu

## Task Commits

Kazdy task commited atomicznie:

1. **Task 1: Rozszerzenie interface Project i aktualizacja PROJECTS** - `d013323` (feat)
2. **Task 2: Ekstrakcja ProjektySection do osobnego komponentu** - `339162a` (feat)

## Files Created/Modified
- `src/lib/types.ts` - Dodane pole secondaryImage do interface Project
- `src/lib/constants.ts` - 7 projektow z pelnymi opisami, poprawionymi obrazkami, secondaryImage Enigmy
- `src/components/sections/ProjektySection.tsx` - Nowy komponent z StickySection, overlay trybik3.png i intro naglowkami
- `src/app/page.tsx` - Usuniety inline ProjektySection, dodany import z komponentu, usuniety import PROJECTS

## Decisions Made
- Template literals z unicode escape sequences (`\u0105`, `\u015B` itp.) zamiast bezposrednich polskich znakow w JSX — narzedzie Write konwertuje polskie znaki na HTML entities, template literals zapewniaja poprawne renderowanie
- Brak navLinks przekazywanych do StickySection — Elementor sidebar ma tylko "Powrot na gore strony" ktory StickySection juz renderuje wbudowany
- Jednowyrazowy naglowek "Projekty" (bez `<br />`) — zgodnie z Elementorem (inaczej niz Phase 4 "Programy edukacyjne")

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Dane 7 projektow gotowe w constants.ts (z secondaryImage, href, pelnymi opisami)
- ProjektySection.tsx ma placeholder na grid kart (TODO komentarz dla Plan 06-02)
- Plan 06-02 moze bezposrednio dodac grid 3-kolumnowy kart i strzalke separator

## Self-Check: PASSED

- FOUND: src/components/sections/ProjektySection.tsx
- FOUND: src/lib/types.ts (secondaryImage)
- FOUND: src/lib/constants.ts (7 projektow)
- FOUND: src/app/page.tsx (import ProjektySection)
- FOUND: .planning/phases/06-projekty/06-01-SUMMARY.md
- FOUND: commit d013323 (Task 1)
- FOUND: commit 339162a (Task 2)
- TypeScript: OK (tsc --noEmit)
- Build: OK (next build)

---
*Phase: 06-projekty*
*Completed: 2026-02-13*

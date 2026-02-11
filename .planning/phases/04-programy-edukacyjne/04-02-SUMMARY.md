---
phase: 04-programy-edukacyjne
plan: 02
subsystem: ui
tags: [next.js, react, sticky-sidebar, layout, tailwind]

# Dependency graph
requires:
  - phase: 04-programy-edukacyjne/01
    provides: "ProgramyEdukacyjneSection wyekstrahowany jako osobny komponent z 4 programami"
  - phase: 01-fundamenty/03
    provides: "StickySection komponent z sidebar 350px i separator pionowy"
  - phase: 03-nawigacja/01
    provides: "Navbar komponent (usuniety z page.tsx w tym planie)"
provides:
  - "Per-sekcyjne StickySection sidebary zamiast globalnego Navbar"
  - "ProgramyEdukacyjneSection z sticky sidebar 01 Programy Edukacyjne"
  - "Layout page.tsx bez globalnego Navbar — sekcje top-level"
affects: [05-programy-stypendialne, 06-projekty, 07-szkolenia, 08-baza-wiedzy, 09-footer]

# Tech tracking
tech-stack:
  added: []
  patterns: ["per-sekcyjny StickySection zamiast globalnego Navbar"]

key-files:
  created: []
  modified:
    - "src/app/page.tsx"
    - "src/components/sections/ProgramyEdukacyjneSection.tsx"

key-decisions:
  - "Usuniety globalny Navbar z page.tsx — kazda sekcja ma wlasny StickySection sidebar (LOCKED DECISION Macieja)"
  - "Sekcje przeniesione na top-level we fragmencie JSX — naprawia podwojny sidebar"
  - "Overlay dekoracyjny wewnatrz StickySection children z relative wrapper"

patterns-established:
  - "Per-sekcyjny sidebar: kazda sekcja-komponent owiniety w StickySection z unikalnym numerem i nawigacja"
  - "Overlay wewnatrz StickySection: relative wrapper + absolute inset-0 z-0 overlay + relative z-10 tresc"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Phase 4 Plan 02: Gap Closure — Sticky sidebar 01 Programy Edukacyjne Summary

**Usuniety globalny Navbar, per-sekcyjne StickySection sidebary, ProgramyEdukacyjneSection z sticky sidebar "01 Programy Edukacyjne"**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T00:20:19Z
- **Completed:** 2026-02-12T00:25:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Usuniety globalny Navbar z page.tsx — kazda sekcja renderuje wlasny StickySection sidebar 350px
- ProgramyEdukacyjneSection owiniety w StickySection z numerem "01", tytulem i nawigacja do 4 programow
- Sekcje przeniesione na top-level (bezposrednio we fragmencie JSX) — naprawia bug podwojnego sidebara (700px zamiast 350px)
- Build (`next build`) przechodzi bez bledow

## Task Commits

Kazdy task zostal zacommitowany atomicznie:

1. **Task 1: Restrukturyzacja page.tsx — usunac Navbar, sekcje top-level** - `f1ad6f4` (feat)
2. **Task 2: Owinac ProgramyEdukacyjneSection w StickySection z numerem 01** - `22fc46a` (feat)

## Files Created/Modified
- `src/app/page.tsx` - Usuniety import/uzycie Navbar, SectionSeparator; sekcje top-level we fragmencie
- `src/components/sections/ProgramyEdukacyjneSection.tsx` - Owiniety w StickySection z id/title/sectionNumber/navLinks; overlay wewnatrz children

## Decisions Made
- Usuniety globalny Navbar z page.tsx — LOCKED DECISION Macieja, per-sekcyjne StickySection sidebary
- Sekcje przeniesione na top-level we fragmencie JSX — naprawia podwojny sidebar ktory wystepuje gdy StickySection jest zagniezdzone w flex-1 div
- Overlay dekoracyjny umieszczony wewnatrz StickySection children z relative wrapper, aby nie zaslonial sidebara

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Sekcja Programy Edukacyjne kompletna z sticky sidebar "01"
- Pozostale sekcje (Stypendialne, Projekty, Szkolenia, BazaWiedzy) juz uzywaja StickySection i sa teraz top-level — brak podwojnego sidebara
- Gotowe do pracy nad kolejnymi fazami (05-09) bez zmian w layout

## Self-Check: PASSED

- FOUND: src/app/page.tsx
- FOUND: src/components/sections/ProgramyEdukacyjneSection.tsx
- FOUND: .planning/phases/04-programy-edukacyjne/04-02-SUMMARY.md
- FOUND: commit f1ad6f4
- FOUND: commit 22fc46a

---
*Phase: 04-programy-edukacyjne*
*Completed: 2026-02-12*

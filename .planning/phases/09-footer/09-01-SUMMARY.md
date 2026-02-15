---
phase: 09-footer
plan: 01
subsystem: ui
tags: [footer, pixel-perfect, elementor, svg-icons, carrier, neue-haas-grotesk]

# Dependency graph
requires:
  - phase: 01-fundamenty
    provides: Tailwind config, kolory fm-dark-bg/fm-green, font Plus Jakarta Sans, next/image
provides:
  - Kompletny footer pixel-perfect z Elementor template 12442
  - Logo FUTURE|MINDS rozdzielone zielona kreska (nie FMF-white.png)
  - 4 inline SVG ikony social media (Facebook, Instagram, LinkedIn, YouTube)
  - CARRIER_PARTNER stala w constants.ts z tekstem, logo i linkiem
  - 2 nowe obrazki: carrier-logo.png, pionowa-greska-green-13.png
affects: [10-integracja]

# Tech tracking
tech-stack:
  added: []
  patterns: [inline-svg-icons, separated-text-logo, carrier-partner-constant]

key-files:
  created:
    - public/images/carrier-logo.png
    - public/images/pionowa-greska-green-13.png
  modified:
    - src/components/layout/Footer.tsx
    - src/lib/constants.ts

key-decisions:
  - "Logo FUTURE|MINDS jako tekst rozdzielony zielona kreska (nie FMF-white.png) — zgodnie z Elementor template 12442"
  - "Inline SVG ikony social media zamiast Font Awesome (projekt nie uzywa FA)"
  - "Tag <a> zamiast next/link dla linkow nawigacyjnych (linki zewnetrzne i podstrony ktore jeszcze nie istnieja)"
  - "nhgFont jako zmienna lokalna w komponencie (unikniecie powtorzen inline style)"

patterns-established:
  - "SocialIcon jako wewnetrzny komponent Footer.tsx (nie eksportowany) — Record<string, JSX.Element> z inline SVG"
  - "CARRIER_PARTNER jako obiekt w constants.ts (text + logo + href) — wzorzec dla przyszlych partnerow"

# Metrics
duration: 2min
completed: 2026-02-15
---

# Phase 9 Plan 01: Footer Summary

**Footer pixel-perfect z Elementor template 12442 — rozdzielone logo FUTURE|MINDS z zielona kreska, slogany w300/w600, 10 linkow, 4 inline SVG ikony social, partner Carrier z logo**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-15T16:04:26Z
- **Completed:** 2026-02-15T16:06:13Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Footer przebudowany od zera na pixel-perfect zgodnosc z Elementor template 12442
- Logo FUTURE|MINDS jako tekst rozdzielony zielona kreska zamiast FMF-white.png
- 4 inline SVG ikony social media (Facebook, Instagram, LinkedIn, YouTube) z hover na zielony
- Partner Carrier z logo (pobranym z WordPressa) i linkiem do carrier.com
- Build przechodzi bez bledow TypeScript

## Task Commits

Each task was committed atomically:

1. **Task 1: Pobranie obrazkow i dodanie CARRIER_PARTNER** - `a3938cf` (chore)
2. **Task 2: Przebudowa Footer.tsx pixel-perfect** - `fcbc8db` (feat)

## Files Created/Modified
- `public/images/carrier-logo.png` - Logo partnera Carrier (pobrane z WordPressa, 119KB)
- `public/images/pionowa-greska-green-13.png` - Zielona pionowa kreska miedzy FUTURE i MINDS (50KB)
- `src/lib/constants.ts` - Dodany CARRIER_PARTNER z tekstem, sciezka logo i linkiem
- `src/components/layout/Footer.tsx` - Kompletna przebudowa footera: rozdzielone logo, slogany, linki, SVG ikony, Carrier

## Decisions Made
- Logo FUTURE|MINDS jako tekst rozdzielony zielona kreska (zgodnie z Elementor template 12442, nie FMF-white.png)
- Inline SVG ikony social media zamiast Font Awesome — projekt nie uzywa FA, 4 standardowe SVG paths
- Tag `<a>` zamiast `next/link` dla linkow nawigacyjnych — czesc linkow jest zewnetrzna, czesc prowadzi do podstron ktore jeszcze nie istnieja
- `nhgFont` jako zmienna lokalna w komponencie — unikniecie powtarzania inline style fontFamily

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Footer kompletny i gotowy do wizualnej weryfikacji w fazie 10 (integracja/deploy)
- Brak blokerow — wszystkie obrazki pobrane, build przechodzi

## Self-Check: PASSED

- [x] public/images/carrier-logo.png — FOUND
- [x] public/images/pionowa-greska-green-13.png — FOUND
- [x] src/lib/constants.ts — FOUND (CARRIER_PARTNER)
- [x] src/components/layout/Footer.tsx — FOUND (179 linii)
- [x] Commit a3938cf — FOUND (Task 1)
- [x] Commit fcbc8db — FOUND (Task 2)
- [x] npm run build — PASSED (zero bledow)

---
*Phase: 09-footer*
*Completed: 2026-02-15*

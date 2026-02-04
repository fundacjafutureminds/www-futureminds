# Phase 02 Plan 01: HeroSection Extraction Summary

---
phase: "02-hero"
plan: "01"
subsystem: "hero-section"
tags: ["hero", "next-image", "scroll-indicator", "component-extraction"]

dependency-graph:
  requires: ["01-fundamenty"]
  provides: ["HeroSection component", "illustration integration", "scroll indicator"]
  affects: ["03-navbar", "10-integracja"]

tech-stack:
  added: []
  patterns: ["next/image fill for decorative backgrounds", "anchor scroll indicator"]

file-tracking:
  key-files:
    created:
      - src/components/sections/HeroSection.tsx
    modified:
      - src/app/page.tsx

decisions:
  - id: "02-01-01"
    decision: "opacity-[0.15] for dzieci-panorama4.png illustration"
    rationale: "Subtle but visible, matching original site blueprint aesthetic"
  - id: "02-01-02"
    decision: "No overflow-hidden on hero section"
    rationale: "Prevents breaking sticky positioning in sections below"
  - id: "02-01-03"
    decision: "Anchor tag with href instead of div for scroll indicator"
    rationale: "Native smooth scroll via CSS scroll-behavior, no JS needed"

metrics:
  duration: "3 min"
  completed: "2026-02-04"
---

## One-liner

HeroSection extracted to components/sections/ with dzieci-panorama4.png as decorative Image fill background and clickable scroll indicator anchoring to #programy-edukacyjne.

## What Was Done

### Task 1: Create HeroSection.tsx with illustration and clickable scroll indicator
**Commit:** `f07bc35`

Created `src/components/sections/HeroSection.tsx` as a standalone named-export component. Key changes from the original inline code:

- **Replaced inline SVG rocket** (~100 lines of placeholder line art) with `next/image` using `fill` prop pointing to `/images/dzieci-panorama4.png` -- the actual illustration from the original futureminds.edu.pl
- **Set `h-screen`** instead of `min-h-screen` for exact 100vh viewport height
- **Made scroll indicator clickable** -- changed `<div>` to `<a href="#programy-edukacyjne">` with `aria-label`
- **Added z-10** to content layer so text and logo render above the illustration
- **Added accessibility** -- `aria-hidden="true"` on decorative illustration, `aria-label` on scroll link
- **No overflow-hidden** -- avoids breaking sticky sections below

### Task 2: Update page.tsx -- import HeroSection and remove local function
**Commit:** `ba1fe89`

- Added `import { HeroSection } from "@/components/sections/HeroSection"` to imports
- Removed entire local `function HeroSection()` definition (165 lines including inline SVG)
- Kept `<HeroSection />` usage in `Home()` component unchanged
- All other sections (ProgramyEdukacyjne, Stypendialne, Projekty, etc.) untouched

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | `opacity-[0.15]` for illustration | Starting value matching original site's subtle blueprint aesthetic; can be tuned visually |
| 2 | No `overflow-hidden` on section | Prevents potential sticky positioning issues in sections below Hero |
| 3 | Anchor `<a>` instead of `<div>` for scroll indicator | Leverages native CSS `scroll-behavior: smooth` already set in globals.css, zero JS |
| 4 | `bg-fm-dark` explicitly on hero section | Ensures consistent background even if body background changes |

## Verification Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS -- no TypeScript errors |
| `npx next build` | PASS -- compiled in 7.2s, all 11 pages generated |
| HeroSection exports named function | PASS |
| Uses dzieci-panorama4.png | PASS |
| h-screen (not min-h-screen) | PASS |
| Scroll indicator is anchor link | PASS |
| No inline SVG in HeroSection | PASS |
| page.tsx imports from components/sections/ | PASS |
| Local HeroSection removed from page.tsx | PASS |

## Next Phase Readiness

**Ready for visual verification:** Run `npx next dev` and check:
1. Hero occupies full viewport height
2. Illustration visible as subtle background
3. Logo in top-left corner
4. 4 mission text paragraphs readable
5. Arrow at bottom bounces and scrolls to Programy Edukacyjne on click

**Opacity tuning:** May need adjustment from `0.15` based on visual comparison with original. Range 0.10-0.25 recommended.

**No blockers** for subsequent phases.

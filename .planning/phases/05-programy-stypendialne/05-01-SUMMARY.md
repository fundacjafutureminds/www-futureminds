---
phase: 05-programy-stypendialne
plan: 01
subsystem: ui
tags: [next.js, react, tailwind, sticky-section, overlay, blog-widget]

# Graf zaleznosci
requires:
  - phase: 01-fundamenty
    provides: "StickySection, types.ts, constants.ts, system typografii"
  - phase: 04-programy-edukacyjne
    provides: "Wzorzec ekstrakcji sekcji z overlayem do osobnego komponentu"
provides:
  - "Interfejsy BlogPost i ScholarshipCtaCard w types.ts"
  - "Stale SCHOLARSHIP_BLOG_POSTS i SCHOLARSHIP_CTA_CARDS w constants.ts"
  - "Poprawiona kolejnosc i obrazki PARTNER_LOGOS (Collins stack, ENEA apt)"
  - "ProgramyStypendialneSection.tsx z overlayem, layoutem 60/40, blog widgetem"
affects: [05-programy-stypendialne-plan-02, footer]

# Stos technologiczny
tech-stack:
  added: []
  patterns: ["Podwojny overlay z Image fill + pointer-events-none", "Layout 60/40 z flex bez gap", "Blog widget z border-left i przyciskami Wiecej"]

key-files:
  created:
    - src/components/sections/ProgramyStypendialneSection.tsx
  modified:
    - src/lib/types.ts
    - src/lib/constants.ts
    - src/app/page.tsx

key-decisions:
  - "Polskie znaki diakrytyczne w tekscie (skopiowane z oryginalu page.tsx)"
  - "Kolejnosc PARTNER_LOGOS i obrazki Collins/ENEA zgodnie z Elementor research"
  - "Blog widget z SCHOLARSHIP_BLOG_POSTS renderowany w prawej kolumnie 40%"

patterns-established:
  - "Podwojny overlay: dwa oddzielne div z Image fill, rozne opacity i object-position"
  - "Layout 60/40: flex z w-[60%] i w-[40%] bez gap-0"
  - "Blog widget: border-l border-[#FFFFFF54], kategoria uppercase, tytul 22px, excerpt 15px, przycisk Wiecej"

# Metryki
duration: 3min
completed: 2026-02-12
---

# Phase 5 Plan 1: Dane i komponent sekcji stypendialnej Summary

**Interfejsy BlogPost/ScholarshipCtaCard, dane stypendialne w constants.ts, ProgramyStypendialneSection z podwojnym overlayem, layoutem 60/40 i blog widgetem**

## Wydajnosc

- **Czas trwania:** 3 min
- **Start:** 2026-02-12T10:56:50Z
- **Zakonczenie:** 2026-02-12T10:59:30Z
- **Taski:** 2
- **Pliki zmodyfikowane:** 4

## Osiagniecia
- Nowe interfejsy BlogPost i ScholarshipCtaCard w types.ts
- Stale SCHOLARSHIP_BLOG_POSTS (2 wpisy) i SCHOLARSHIP_CTA_CARDS (3 karty) w constants.ts
- Poprawiona kolejnosc PARTNER_LOGOS i obrazki Collins (stack)/ENEA (apt) zgodnie z Elementor research
- ProgramyStypendialneSection wyekstrahowany do osobnego pliku z: StickySection "02", podwojnym overlayem, duzym naglowkiem 100px, intro headings z zielonymi akcentami, layoutem 60/40, gridem 9 logotypow i blog widgetem
- page.tsx oczyszczony z inline definicji — uzywa importowanego komponentu

## Commity taskow

Kazdy task commitowany atomowo:

1. **Task 1: Dodac interfejsy i dane do types.ts + constants.ts** - `d4eeb4e` (feat)
2. **Task 2: Wyekstrahowac ProgramyStypendialneSection** - `40e56f9` (feat)

**Metadane planu:** (commit ponizej) (docs: zakonczenie planu)

## Utworzone/zmodyfikowane pliki
- `src/lib/types.ts` - Nowe interfejsy BlogPost i ScholarshipCtaCard
- `src/lib/constants.ts` - SCHOLARSHIP_BLOG_POSTS, SCHOLARSHIP_CTA_CARDS, poprawione PARTNER_LOGOS
- `src/components/sections/ProgramyStypendialneSection.tsx` - Nowy komponent sekcji stypendialnej (133 linie)
- `src/app/page.tsx` - Usuniety inline komponent, dodany import z components/sections/

## Podjete decyzje
- Polskie znaki diakrytyczne skopiowane z oryginalnego page.tsx (zachowanie wiernosci)
- Kolejnosc PARTNER_LOGOS zgodna z Elementor: Rockwell, LEGO Education, RTX, Collins, ENEA, Mmaltic, OTIS, Xerox, John Deere
- Collins: obrazek stack (Collins_Aerospace_logo_stack_white_300.png) zamiast horizontal
- ENEA: obrazek Untitled-designapt.png zamiast logo-ENEA-3-biale.png
- Blog widget renderowany z danymi SCHOLARSHIP_BLOG_POSTS (2 posty)
- Karty CTA zostawione jako TODO dla Plan 05-02

## Odchylenia od planu

Brak — plan wykonany dokladnie jak opisano.

## Napotkane problemy
Brak.

## Konfiguracja uzytkownika
Brak — nie wymaga konfiguracji zewnetrznych uslug.

## Gotowosc na nastepna faze
- Dane stypendialne gotowe w constants.ts do uzycia w Plan 05-02
- ProgramyStypendialneSection gotowy na rozszerzenie o karty CTA i strzalke separator (Plan 05-02)
- Build Next.js przechodzi bez bledow

## Self-Check: PASSED

Wszystkie pliki i commity zweryfikowane.

---
*Phase: 05-programy-stypendialne*
*Completed: 2026-02-12*

---
phase: 05-programy-stypendialne
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, cta-cards, image, link]

# Graf zaleznosci
requires:
  - phase: 05-programy-stypendialne
    plan: 01
    provides: "ProgramyStypendialneSection z overlayem i layoutem 60/40, dane SCHOLARSHIP_CTA_CARDS w constants.ts"
  - phase: 01-fundamenty
    provides: "StickySection, system typografii, constants.ts"
provides:
  - "3 karty CTA (ufundowac/otrzymac/zostac sponsorem) z naglowkami 70px i przyciskami WIECEJ"
  - "Strzalka separator (Strzalka-w-dol.png) pod kartami CTA"
  - "Kompletna sekcja Programy Stypendialne (overlay, layout 60/40, blog widget, karty CTA, separator)"
affects: [footer, 10-integracja]

# Stos technologiczny
tech-stack:
  added: []
  patterns: ["Karty CTA z naglowkiem 42px/70px, obrazkiem i przyciskiem WIECEJ", "Layout 2+1: dwie karty 50%/50% + trzecia szersza 87%"]

key-files:
  created: []
  modified:
    - src/components/sections/ProgramyStypendialneSection.tsx

key-decisions:
  - "Obrazki kart ladowane dynamicznie z SCHOLARSHIP_CTA_CARDS (nie hardcodowane w JSX)"
  - "Layout 2+1: dwie karty flex 50%/50%, trzecia 87% pod nimi (zgodnie z Elementor)"
  - "Strzalka separator 60% width z opacity-40 (subtelna)"

patterns-established:
  - "CTA button: bg-[#FFFFFF0A] hover:bg-fm-green, 10px uppercase tracking-[2px], rounded-[2px]"
  - "Naglowek CTA: 42px font-semibold z zielonym keyword 70px, font neue-haas-grotesk-display"

# Metryki
duration: 2min
completed: 2026-02-12
---

# Phase 5 Plan 2: Karty CTA stypendialne Summary

**3 karty CTA (ufundowac/otrzymac/zostac sponsorem FLL) z naglowkami 42px/70px, obrazkami i przyciskami WIECEJ + strzalka separator**

## Wydajnosc

- **Czas trwania:** 2 min
- **Start:** 2026-02-12T11:02:13Z
- **Zakonczenie:** 2026-02-12T11:04:30Z
- **Taski:** 1
- **Pliki zmodyfikowane:** 1

## Osiagniecia
- 3 karty CTA dodane do sekcji stypendialnej: "Jak ufundowac stypendium?", "Jak otrzymac stypendium?", "Jak zostac sponsorem FIRST LEGO League?"
- Kazda karta z naglowkiem 42px, zielonym slowem kluczowym 70px, obrazkiem i przyciskiem WIECEJ
- Layout 2+1: dwie pierwsze karty obok siebie (50%/50%), trzecia szersza (~87%) pod nimi
- Strzalka-w-dol.png jako separator pod kartami z opacity-40
- Sekcja Programy Stypendialne kompletna (overlay, layout 60/40, blog widget, karty CTA, separator)

## Commity taskow

Kazdy task commitowany atomowo:

1. **Task 1: Dodac 3 karty CTA z naglowkami 70px, obrazkami i przyciskami + strzalke separator** - `ca51f41` (feat)

**Metadane planu:** (commit ponizej) (docs: zakonczenie planu)

## Utworzone/zmodyfikowane pliki
- `src/components/sections/ProgramyStypendialneSection.tsx` - Dodane 3 karty CTA z naglowkami, obrazkami i CTA buttons + strzalka separator (81 nowych linii, z 133 do 212)

## Podjete decyzje
- Obrazki kart ladowane dynamicznie z tablicy SCHOLARSHIP_CTA_CARDS przez .map() i indeks [2] — bez hardcodowania sciezek w JSX
- Layout 2+1 zgodny z Elementor research: dwie karty flex 50%/50%, trzecia 87% width pod nimi
- CTA button identyczny pattern jak w Phase 4 (bg-[#FFFFFF0A], hover:bg-fm-green)

## Odchylenia od planu

Brak — plan wykonany dokladnie jak opisano.

## Napotkane problemy
Brak.

## Konfiguracja uzytkownika
Brak — nie wymaga konfiguracji zewnetrznych uslug.

## Gotowosc na nastepna faze
- Sekcja Programy Stypendialne w pelni kompletna (Phase 5 done)
- Komponent ProgramyStypendialneSection.tsx gotowy (212 linii)
- Build Next.js przechodzi bez bledow
- Kolejna faza moze przystapic do kolejnej sekcji strony

## Self-Check: PASSED

Wszystkie pliki i commity zweryfikowane.

---
*Phase: 05-programy-stypendialne*
*Completed: 2026-02-12*

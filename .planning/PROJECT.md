# www-futureminds — Nowa strona Fundacji Future Minds

## What This Is

Pixel-perfect odtworzenie obecnej strony futureminds.edu.pl (WordPress/Elementor) w Next.js + TypeScript + Tailwind CSS v4. Strona prezentacyjna fundacji edukacyjnej — programy edukacyjne, programy stypendialne, projekty, szkolenia, baza wiedzy. Migracja motywowana ekstremalną powolnością Elementora (minuty ładowania edytora, awarie zapisu).

## Core Value

Wierna kopia wizualna obecnej strony — identyczny wygląd, ale na szybkim, nowoczesnym stacku.

## Requirements

### Validated

- ✓ Projekt Next.js zainicjalizowany (App Router, TypeScript, Tailwind v4) — existing
- ✓ Struktura podstron (8 placeholder pages) — existing
- ✓ Wszystkie 48 obrazków pobrane z WordPress do `public/images/` — existing
- ✓ Pełne dane Elementor wyeksportowane (745KB JSON, globalne kolory/typografia) — existing
- ✓ 4 szczegółowe analizy sekcji Elementor przygotowane — existing

### Active

- [ ] Pixel-perfect Hero section (pełnoekranowy, ciemne tło, ilustracja rakiety, logo, tekst misji)
- [ ] Navbar (logo + linki, ciemne tło, sticky behavior)
- [ ] Sekcja Programy Edukacyjne (sticky sidebar 350px + karty programów FLL/BtC/OZEdukacja + programy szyte na miarę)
- [ ] Sekcja Programy Stypendialne (sticky sidebar + opis + 9 logotypów partnerów + 2 karty CTA + blog widget)
- [ ] Sekcja Projekty (sticky sidebar + grid 6 kart projektów)
- [ ] Sekcja Szkolenia (sticky sidebar + opis + ikony technologii)
- [ ] Sekcja Baza Wiedzy (sticky sidebar + opis + blog widget 6 artykułów)
- [ ] Footer (ciemne tło, 4 kolumny, social links)
- [ ] Typografia: neue-haas-grotesk-display z Adobe Fonts (hierarchia: 100px/w100, 42px/w600, 19px/w200)
- [ ] Kolor akcentowy #9AFC4E (lime green, nie #00d084)
- [ ] Dekoracyjne overlay obrazki na tłach sekcji (~20% opacity)
- [ ] Animacje fadeIn (fadeInLeft, fadeInRight, fadeInDown) z opóźnieniami
- [ ] Responsywność: desktop-first, potem tablet i mobile

### Out of Scope

- Integracja z WordPress CMS — strona statyczna, dane w constants.ts
- Blog dynamiczny — w v1 statyczne karty, bez pobierania z WP REST API
- Panel administracyjny — nie potrzebny
- Wielojęzyczność — tylko polska wersja
- E-commerce / płatności — fundacja nie sprzedaje online
- SEO zaawansowane — podstawowe meta tagi wystarczą w v1

## Context

### Źródło danych
- Elementor `_elementor_data` z page ID 20657 (745KB JSON) w scratchpad
- Globalne kolory/typografia z `/elementor/v1/globals`
- WordPress REST API z Application Password
- 4 szczegółowe analizy sekcji w scratchpad:
  - `analysis-hero.md` — Hero, Navbar, Arrow separator
  - `analysis-programs.md` — Programy Edukacyjne
  - `analysis-scholarships.md` — Programy Stypendialne
  - `analysis-projects-training-knowledge.md` — Projekty, Szkolenia, Baza Wiedzy

### Kluczowe odkrycia z analizy Elementor
- 15 top-level sekcji: nieparzyste = desktop, parzyste = mobile (ukryte via hide_desktop/hide_mobile)
- Sticky sidebar pattern: lewa kolumna dokładnie 350px, `sticky: top`, `sticky_parent: yes`
- Font: `neue-haas-grotesk-display` (Adobe Fonts/Typekit — wymaga embed code od usera)
- Kolor zielony: `#9AFC4E` (lime, nie `#00d084` jak zakładano początkowo)
- Body background: `#32373c` (z Elementor Kit ID=9)
- Przyciski CTA: 10px uppercase, bg `#FFFFFF0A`, border-radius 2px
- Inline HTML spans z `color: #9AFC4E` dla zielonych akcentów w nagłówkach
- Partner logos: 9 (nie 5 jak w starych constants)
- Dekoracyjne PNG overlay na tłach sekcji ~20% opacity

### Oryginalne projekty Adobe Illustrator
- User posiada oryginalne pliki .ai z projektami strony FutureMinds sprzed kompromisów Elementora
- Wizja bliższa oryginalnemu zamysłowi — bez ograniczeń WordPress/Elementor
- Przydatne jako źródło ilustracji (rakieta, turbiny, wiatraki) i kompozycji
- Teraz na Next.js/React nie ma ograniczeń Elementora — można wrócić do oryginalnej wizji
- Dostępne na żądanie — poprosić usera o eksport SVG/PNG gdy potrzebne

### Istniejący kod
- Next.js 16.1.6, App Router, TypeScript
- Tailwind CSS v4 z `@theme` w globals.css
- Placeholder podstrony: aktualnosci, programy-edukacyjne, programy-stypendialne, projekty, publikacje, o-nas, kontakt, polityka-prywatnosci
- Komponenty: Navbar, Footer, StickySection, Button, SectionHeading
- `constants.ts` z danymi statycznymi (wymaga aktualizacji)
- 48 obrazków w `public/images/`

## Constraints

- **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS v4 — już zainicjalizowany, nie zmieniamy
- **Font**: neue-haas-grotesk-display wymaga Adobe Fonts Typekit — potrzebny embed code od usera (fallback: system sans-serif)
- **Deploy**: Vercel (darmowy plan)
- **Dane**: Statyczne w constants.ts — gotowe na przyszłe CMS, ale v1 bez integracji
- **Desktop-first**: Bazowe style desktop, responsywność dodawana potem
- **Wierność**: Pixel-perfect kopia — nie "inspiracja", nie "ulepszenie", dokładna kopia

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js zamiast WordPress | Elementor ekstremalnie wolny, migracja na szybki stack | — Pending |
| Tailwind v4 z @theme (nie config.ts) | Nowy standard Tailwind, prostszy | ✓ Good |
| Server Components domyślnie | Lepsze performance, "use client" tylko gdzie konieczne | — Pending |
| Dane w constants.ts | Prostota v1, gotowe na przyszłe CMS | — Pending |
| Desktop-first | Strona mobilna wymaga znacznych modyfikacji vs desktop — osobna faza | — Pending |
| Kolor #9AFC4E (nie #00d084) | Odkryty z Elementor globals — to prawdziwy kolor na stronie | ✓ Good |
| neue-haas-grotesk-display | Font użyty na obecnej stronie — wierność | — Pending |

---
*Last updated: 2026-02-04 after initialization*

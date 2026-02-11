# Phase 3: Nawigacja - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Navbar sticky z logo fundacji, linkami nawigacyjnymi i dekoracyjnym trójkątem outline. Migracja 1:1 z Elementora — źródło prawdy to eksport `elementor/content/page/12561.json` i `elementor/site-settings.json`.

Linki prowadzą do sekcji: Aktualności, Programy edukacyjne, Programy stypendialne, Projekty, Szkolenia, Publikacje, O nas, Kontakt.

</domain>

<decisions>
## Implementation Decisions

### Podejście migracyjne
- Migracja 1:1 z Elementora — odczytujemy dokładne wartości z JSON, nie zgadujemy
- Źródło prawdy: `elementor/content/page/12561.json` (struktura) + `elementor/site-settings.json` (globalne)
- WordPress REST API dostępny do pobierania mediów
- Po migracji 1:1 → łatwe modyfikacje w React/Tailwind

### Pozycjonowanie i układ
- Navbar jest **sticky** (`sticky_parent: yes`)
- Kontener: flex column, width 100%, padding 0, margin 0
- Logo po lewej (margin-left: 40px), linki poniżej w kolumnie
- Spacery: 70px i 501px (duży spacer na dole)

### Logo
- Plik: `FMF-white.png` (już w public/images)
- Szerokość: 180px (custom dimension: 100x100)
- Wyrównanie: left, margin-left: 40px
- Animacja: fadeInDown
- Link: strona główna

### Styl linków
- Font: `neue-haas-grotesk-display`, 20px, weight 300, letter-spacing: 1.1px, line-height: 1em
- Kolor tekstu: #EAEAEA (jasny szary)
- Kolor hover: #9AFC4E (zielony — `globals/colors?id=380b317`)
- Tło przycisków: przezroczyste (#00000000)
- Margin-left: 20px, margin-top: 2px, margin-bottom: -3px
- Text-transform: none (nie uppercase mimo globalnego Nav Menu stylu)

### Trójkąty przy linkach
- Każdy link ma mały Green-Triangle.png po lewej
- Brightness: 42%, Saturate: 0 (odcienie szarości — nie zielony!)
- Flex align-self: center
- Margin-top: -4px

### Dekoracyjny trójkąt główny
- Plik: `Obszar-roboczy-2-kopia-2.png` (już w public/images)
- Rozmiar: custom, space: 40%
- Wyrównanie: left, flex align-self: center

### Animacje
- Logo: fadeInDown
- Linki: fadeInLeft z rosnącym delay (100ms, 200ms, 400ms)
- Motion FX na linkach: translateX negative 1.9px, opacity range 18%-50%, mouseTrack speed 0.1px
- UWAGA: Motion FX to faza 10 (integracja) — w fazie 3 implementujemy tylko fadeIn

### Responsywność
- Breakpointy: tablet 768px, desktop 1025px
- Font size tablet: 14px (zmniejszony z 20px)
- Mobile: brak jawnych breakpointów w JSON — osobna wersja mobilna istnieje (elementor-hidden-desktop)

### Tło body (odkrycie z sesji)
- Plik: `Tlo-Szary-ciemny-wyostrzony.png` (pobrano, w public/images)
- Background-repeat: repeat, background-size: auto
- To jest globalne tło strony — dodać do globals.css jako uzupełnienie fazy 1

### Claude's Discretion
- Dokładna implementacja sticky behavior (CSS sticky vs JS)
- Mapping animacji fadeIn na Tailwind/CSS
- Struktura komponentu (jeden Navbar.tsx vs rozbicie na subkomponenty)
- Handling menu mobilnego (Elementor ma osobną wersję — Claude dobierze podejście)

</decisions>

<specifics>
## Specific Ideas

- Nawigacja w Elementorze to kolumna linków (nie klasyczny horizontal navbar) — każdy link to kontener z trójkątem + przyciskiem
- Trójkąty przy linkach są celowo desaturowane (szare, nie zielone) — brightness 42%, saturate 0
- Font nawigacji to neue-haas-grotesk-display (nie Montserrat jak w global Nav Menu) — linki na stronie głównej mają custom override
- Eksport Elementora w katalogu `elementor/` — pełne źródło prawdy dla wszystkich faz

</specifics>

<deferred>
## Deferred Ideas

- Motion FX (parallax, mouseTrack) → faza 10 (integracja/animacje)
- Tło body szum (Tlo-Szary-ciemny-wyostrzony.png) → uzupełnienie fazy 1 lub osobne zadanie
- Preloader (circle-dashed + logo umysly-przyszlosci-2.png) → faza 10

</deferred>

---

*Phase: 03-nawigacja*
*Context gathered: 2026-02-11*
*Source: Elementor export (12561.json, site-settings.json) + WP REST API*

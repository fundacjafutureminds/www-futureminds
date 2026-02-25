# Status: www-futureminds

## Aktualny stan
**Branch:** main | **Faza:** animacja section titles (TextReveal)
**Ostatnia sesja:** 2026-02-25
Dodano GSAP + komponent TextReveal (SVG stroke-draw animacja liter). Wymaga wizualnej weryfikacji strokeWidth=4.

## Ostatnie zmiany
<!-- /wrap dopisuje na gorze, max 15 wpisow, starsze kasuje -->

### 2026-02-25 — GSAP TextReveal (SVG stroke-draw animacja liter)
- Zainstalowano `gsap` + `@gsap/react`, utworzono `src/components/ui/TextReveal.tsx`
- Dwa podejścia: (1) per-char stagger (opacity+translateY) — działało ale Maciej chciał rysowanie liter; (2) SVG stroke-dashoffset z handwrite-paths.json — wdrożone
- Podmieniono header we wszystkich 5 sekcjach: FadeIn → TextReveal (ProgramyEdukacyjne, ProgramyStypendialne, Projekty, Szkolenia, BazaWiedzy)
- PROBLEM: font outline paths mają inner+outer stroke animowane osobno → wygląda jak "opryskiwanie" zamiast rysowania litery
- Decyzja: ZWIĘKSZONO strokeWidth z 1.5 do 4 żeby pokryć ~2-unit gap między outline paths (REJECTED: per-char stagger bo Maciej chce drawing effect)
- **NIE ZWERYFIKOWANE WIZUALNIE** — Maciej poprosił o wrap zanim przetestował strokeWidth=4
- FAILED: outline paths z fontu nie są centerline — to fundamentalny problem. strokeWidth=4 to workaround
- Cofnięto zmiany Gemini (4 pliki) na początku sesji

## Decyzje
| Data | Decyzja | Dlaczego | Odrzucone |
|------|---------|----------|-----------|
| 2026-02-25 | GSAP zamiast Framer Motion do animacji | Maciej wskazał GSAP, DrawSVG plugin, ScrollTrigger | Framer Motion (już w projekcie ale ograniczone do FadeIn) |
| 2026-02-25 | SVG stroke-draw zamiast per-char stagger | Maciej chce efekt "rysowania" liter | Per-char opacity+translateY (działało ale nie spełniało wizji) |

## Otwarte pytania

## Co nie zadzialo
- **Font outline paths ≠ centerline**: Geomanist (jak każdy font) definiuje glify jako filled outlines (dwie granice). SVG stroke-draw animuje inner i outer osobno → efekt "rozpryskiwania". Gap ~2 SVG units. Workaround: strokeWidth=4, ale może nie wystarczyć wizualnie.

## Uwagi kontekstowe
- Instancja odpowiedzialna: `strona` (web dev)

## Backlog
| Temat | Status | Notatki |
|-------|--------|---------|

## Ukonczone milestones
| Milestone | Zakres | Data |
|-----------|--------|------|

## Infrastruktura
| Element | Stan |
|---------|------|
| Serwery MCP | 6 (github, supabase, vercel, drawio, playwright, notion) |
| Dev server | Port 4510 |

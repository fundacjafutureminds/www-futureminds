# Status: www-futureminds

## Aktualny stan
**Branch:** main | **Faza:** scroll-restoration fix DrawLine + FadeIn
**Ostatnia sesja:** 2026-02-27
Stan z c87626d (plain h2 font-thin + DrawLine animowane linie + FadeIn fix). DrawLine.tsx naprawiony — `whileInView` zastąpiony ręcznym `useAnimation` + IO + setTimeout(150ms) fallback. FadeIn ujednolicony tym samym patternem. Wymaga testów manualnych w przeglądarce (Playwright nie symuluje scroll restoration wiernie).

## Ostatnie zmiany
<!-- /wrap dopisuje na gorze, max 15 wpisow, starsze kasuje -->

### 2026-02-27 — Fix DrawLine scroll restoration (whileInView → useAnimation + IO)
- DrawLine.tsx: zastąpiono Framer Motion `whileInView` na `useAnimation` + ręczny `IntersectionObserver` + `setTimeout(150ms)` fallback — ten sam pattern co FadeIn
- FadeIn.tsx: ujednolicono — dodano `setTimeout(150ms)` fallback (wcześniej tylko getBoundingClientRect + IO)
- Diagnoza: `whileInView` nie triggeruje się po scroll restoration (F5 w środku strony) — linie niewidoczne (pathLength=0, dasharray "0px, 1px")
- Decyzja: CHOSE setTimeout(150ms) BECAUSE double RAF nie wystarczał w testach Playwright (REJECTED: double requestAnimationFrame, nie łapał async scroll restoration)
- UWAGA: Maciej początkowo chciał przywrócić GSAP TextReveal, potem wyjaśnił że chce stan c87626d (plain h2 + DrawLine) z naprawionymi liniami
- **WYMAGA TESTÓW MANUALNYCH** — Playwright nie symuluje scroll restoration wiernie, fix potwierdzony logicznie ale nie wizualnie

### 2026-02-27 — Revert TextReveal → plain h2 + DrawLine + FadeIn fix
- Usunięto TextReveal (SVG stroke-draw) ze wszystkich 5 sekcji → zamieniono na `<h2>` z `font-thin text-white/15` (ciemne) / `text-black/15` (jasne)
- Decyzja: CHOSE font-thin plain text BECAUSE Maciej rezygnuje z SVG stroke-draw (czeka na odpowiedź od Atipo re: single-line font)
- Zmieniono `--text-section--font-weight` z 500 na 100 w globals.css
- Dodano `<link rel="preload">` na Geomanist Thin w layout.tsx (FOUT fix)
- Nowy komponent `DrawLine.tsx` (Framer Motion `motion.line` + `pathLength`) — animuje linie przy scrollu
- Linia pozioma w StickySection podzielona na 2-3 segmenty (na skrzyżowaniach z liniami pionowymi), stagger delay 0/0.2/0.4s
- Przepisano FadeIn z Framer Motion `whileInView` na ręczny `useAnimation` + `getBoundingClientRect` + `IntersectionObserver`
- FAILED: GSAP ScrollTrigger w DrawLine powodował znikanie sidebaru (FadeIn whileInView nie triggerowało) — przepisano DrawLine na Framer Motion
- FAILED: Framer Motion `whileInView` nie odpala się po scroll restoration (refresh w środku strony) — naprawiono ręcznym check w useEffect
- Wysłano mail do Atipo Foundry (twórcy Geomanist) z prośbą o single-line stroke version fontu

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
| 2026-02-27 | Framer Motion dla DrawLine (nie GSAP) | GSAP ScrollTrigger koliduje z Framer Motion whileInView, powoduje znikanie sidebaru | GSAP ScrollTrigger (testowano, sidebar znikał) |
| 2026-02-27 | Section titles jako plain h2 font-thin text-white/15 | SVG stroke-draw nie dał satysfakcjonującego efektu (outline paths), Maciej czeka na single-line font od Atipo | TextReveal SVG stroke-draw (usunięto) |
| 2026-02-27 | FadeIn: ręczny useEffect + IO zamiast whileInView | whileInView nie triggeruje się po scroll restoration (refresh w środku strony) | Framer Motion whileInView (buggy przy scroll restoration) |
| 2026-02-25 | GSAP zamiast Framer Motion do animacji | Maciej wskazał GSAP, DrawSVG plugin, ScrollTrigger | Framer Motion (już w projekcie ale ograniczone do FadeIn) |
| 2026-02-25 | SVG stroke-draw zamiast per-char stagger | Maciej chce efekt "rysowania" liter | Per-char opacity+translateY (działało ale nie spełniało wizji) |

## Otwarte pytania

## Co nie zadzialo
- **Font outline paths ≠ centerline**: Geomanist (jak każdy font) definiuje glify jako filled outlines (dwie granice). SVG stroke-draw animuje inner i outer osobno → efekt "rozpryskiwania". Gap ~2 SVG units. Workaround: strokeWidth=4, ale może nie wystarczyć wizualnie.
- **GSAP ScrollTrigger + Framer Motion whileInView**: Koegzystencja powoduje że FadeIn (whileInView) nie triggeruje się — sidebar znika. Rozwiązanie: DrawLine na Framer Motion.
- **Framer Motion whileInView + scroll restoration**: Po refresh w środku strony, whileInView nie wykrywa elementów już widocznych w viewport. Fix: ręczny getBoundingClientRect check w useEffect.
- **Double RAF nie łapie scroll restoration**: `requestAnimationFrame` × 2 nie wystarczał — browser może restore'ować scroll PÓŹNIEJ. Fix: `setTimeout(150ms)` jako fallback.

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

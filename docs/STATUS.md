# Status: www-futureminds

## Aktualny stan
**Branch:** main | **Faza:** migracja FM→GSAP zakończona, debug linii StickySection
**Ostatnia sesja:** 2026-03-01
Migracja Framer Motion → GSAP w 100% zakończona. Zero importów FM w src/, zależność usunięta z package.json. Linie StickySection: div + GSAP scaleX/scaleY (SVG + DrawSVGPlugin odrzucone). Poprawka: CSS opacity-0 + gsap.set/to zamiast inline transform (konflikt React re-render). Strona `/v2` (blend futureminds + invento v3 card layout) jako proof of concept.

## Ostatnie zmiany
<!-- /wrap dopisuje na gorze, max 15 wpisow, starsze kasuje -->

### 2026-03-01 — Migracja Framer Motion → GSAP + strona /v2
- Pełna migracja FM→GSAP: 3 nowe pliki (`gsap-init.ts`, `GsapFadeIn.tsx`, `GsapStagger.tsx`), 4 zmodyfikowane (`FadeIn.tsx` re-export, `StickySection.tsx`, `Navbar.tsx`, `TextReveal.tsx`), 3 usunięte (`HandwriteTitle.tsx`, `TypewriterText.tsx`, `ScrollLine.tsx`), `framer-motion` usunięty z package.json
- Decyzja: CHOSE div + GSAP scaleX/scaleY dla linii StickySection BECAUSE SVG `<line>` z percentage values (y2="100%") nie działa — SVG bez jawnych atrybutów width/height ma domyślny viewport 300x150 (REJECTED SVG + DrawSVGPlugin)
- Decyzja: CHOSE CSS opacity-0 + gsap.set({ opacity:1, scaleX:0 }) + gsap.to({ scaleX:1 }) BECAUSE React inline `transform` koliduje z GSAP — setUpperLineTop triggeruje re-render i React nadpisuje GSAP-owe transformy (REJECTED inline transform: "scaleX(0)")
- GSAP matchMedia("(min-width: 1024px)") — ScrollTrigger tylko na desktop, mobile statyczne linie
- FAILED: SVG `<line>` + DrawSVGPlugin — SVG viewport 300x150 default, linie niewidoczne/ucięte
- FAILED: React inline `transform: "scaleX(0)"` + GSAP fromTo — React re-render (z setUpperLineTop) resetuje GSAP transforms
- Strona `/v2` — blend dark editorial futureminds + card-based invento v3 (rounded-2xl cards, pill buttons, grid layout, glassmorphism, fixed nav z backdrop-blur)
- **WYMAGA TESTÓW MANUALNYCH** — linie StickySection po fix opacity-0 + gsap.set/to

### 2026-02-28 — Sidebar light + hover karty + warianty kolorystyczne
- Sidebar w szablonie light: nagłówek font-medium (500), navlinks z `-webkit-text-stroke:0.3px`, kolor ujednolicony z heading (#484d54)
- Hover na kartach programów: `before:` pseudo-element pokrywający cały kontener od content dividera do prawej krawędzi (`left:[10px]`, `right:[-200px]`), pierwsza karta `top:[-128px]` do hr
- Decyzja: CHOSE `before:` pseudo-element na FadeIn BECAUSE hover musi pokrywać cały obszar między liniami, a wewnętrzny div ma padding (REJECTED: hover na wewnętrznym div — nie sięgał do granic linii)
- Intensywność hover: 1% opacity (`bg-white/[0.01]`), 700ms ease-in-out
- ProgramyEdukacyjneSection: dodano propsy `bgColor`, `accentColor`, `textColor` — umożliwiają kolorystyczne warianty sekcji
- StickySection: dodano prop `bgColor` — custom backgroundColor dla dark variant
- green-test: dodano 24 intensywne nasycone tła + `background-blend-mode: multiply` na teksturze szumu + sekcja porównawcza bez blend mode
- Testowy wariant fioletowy (`#6D28D9`) z pomarańczowym akcentem (`#FF6B00`) i białym tekstem na dole strony (page.tsx)
- FAILED: `onMouseEnter/Leave` na Link w Server Component — React error; rozwiązano usunięciem handlerów JS

### 2026-02-27 — Animowane linie (Framer Motion scaleX) + szablon light
- Cofnięto DrawLine.tsx (revert do d97ac14) — pionowe linie wróciły do statycznych `<div>` (DrawLine powodował brak widoczności pionowej linii)
- Linia pozioma w StickySection: podzielona na 3 segmenty `motion.div` z `scaleX: 0→1` — segment 1 origin-left, segment 2 origin-right, segment 3 origin-left (wyrastają od pionowych linii na zewnątrz)
- Pionowa linia sidebar: podzielona na 2 segmenty (górny: header area, dolny: flex content) — animowane `scaleY: 0→1` z `origin-top`
- Górny segment: dynamiczny `top` obliczany z `useEffect` + `useRef` — symetryczny gap nad tytułem = gap pod tytułem do hr
- Linie rozjaśnione: pionowe bg-white/5→8, poziome bg-white/10→15 (dark); analogicznie light
- ProgramyEdukacyjne + ProjektySection: TextReveal → plain `<h2>` font-thin
- **Szablon light** (ProgramyStypendialne): body 23px/extralight/-webkit-text-stroke:0.3px/#555, heading font-[450]/#5a5f66, section title text-black/18
- Decyzja: CHOSE `-webkit-text-stroke:0.3px` BECAUSE font-weight 200-300 ma nierówny rendering na Windows ClearType (litery o/e/c mają krzywe wpadające między piksele); stroke pogrubia bez zmiany weight
- FAILED: DrawLine SVG `pathLength` animacja na pionowych liniach — linie niewidoczne po revert; wrócono do statycznych div
- FAILED: font-weight 300 na jasnym tle — ClearType nierówno renderuje krzywe liter; 200 renderuje czysto (za cienkie kreski nie używają subpixeli) ale za cienkie optycznie

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
| 2026-03-01 | Migracja FM→GSAP: 100% GSAP, zero FM | Jeden system animacji eliminuje konflikty ScrollTrigger vs whileInView; GSAP obsługuje scroll restoration natywnie | Framer Motion (usunięty) |
| 2026-03-01 | Linie StickySection: div + GSAP scaleX/scaleY | SVG <line> viewport problem (domyślny 300x150); div zachowuje identyczny layout z oryginałem | SVG + DrawSVGPlugin (viewport sizing) |
| 2026-03-01 | React+GSAP: CSS opacity-0 + gsap.set/to (nie inline transform) | React re-render nadpisuje inline transform; CSS klasa + GSAP inline eliminuje konflikt | Inline transform: "scaleX(0)" (React override) |
| 2026-02-28 | Hover karty: before: pseudo-element na FadeIn wrapper | Hover musi pokrywać cały kontener między liniami; wewnętrzny div ma padding i nie sięga do granic | Hover na wewnętrznym div (za wąski), hover na FadeIn className (nie sięga do content dividera) |
| 2026-02-27 | Linia pozioma: 3 segmenty Framer Motion scaleX (nie DrawLine SVG) | DrawLine SVG pathLength powodował niewidoczne pionowe linie; scaleX na div jest prostsze i stabilne | DrawLine SVG pathLength (usunięto) |
| 2026-02-27 | Light body: font-200 + `-webkit-text-stroke:0.3px` | ClearType na Windows nierówno renderuje weight 300 na jasnym tle; 200+stroke daje równy rendering z optyczną grubością | font-weight 300 (nierówne litery), font-weight 400 (za grube) |
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
- **SVG `<line>` z percentage values**: SVG bez jawnych `width`/`height` atrybutów ma domyślny viewport 300×150. `y2="100%"` odnosi się do tego viewportu, nie do CSS dimensions. Linie ucięte/niewidoczne.
- **React inline transform + GSAP**: `style={{ transform: "scaleX(0)" }}` w React koliduje z GSAP — `setUpperLineTop` triggeruje re-render, React nadpisuje GSAP transforms. Fix: CSS `opacity-0` klasa + `gsap.set/to`.

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

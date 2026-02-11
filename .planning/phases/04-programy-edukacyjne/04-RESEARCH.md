# Phase 4: Programy Edukacyjne - Research

**Researched:** 2026-02-11
**Domain:** Sekcja tresci strony glownej — sticky sidebar, karty programow, overlay dekoracyjny, architektura layoutu
**Confidence:** HIGH

## Summary

Zbadano strukture Elementora (Section 5 w page 20657), istniejacy codebase (page.tsx, StickySection, Navbar, constants.ts) i zidentyfikowano kluczowy problem architektoniczny: **konfikt podwojnego sidebara**. W oryginale Elementor kazda sekcja ma SWOJ sidebar 350px. W naszym kodzie po Phase 3 mamy globalny Navbar (350px) + StickySection (kolejne 350px w kazdej sekcji) — laczne 700px sidebara, co jest bledne.

**Rozwiazanie:** Sekcje tresci (Programy Edukacyjne, Stypendialne itd.) NIE powinny uzywac StickySection z wlasnym sidebarem. Zamiast tego sidebar per-sekcja (z numerem i tytulem) powinien byc renderowany wewnatrz prawej kolumny jako element tresci, LUB (lepiej) — zastapic globalny Navbar per-sekcyjnym sidebarem, ktory zmienia tresc w zaleznosci od widocznej sekcji.

Zbadano 4 programy edukacyjne (FLL, Build the Change, OZEdukacja, Edukacja Energetyczna), dokladne style CTA (10px, uppercase, bg #FFFFFF0A, border-radius 2px, padding 17/30/15/30), karty z lewym border-left 1px solid #FFFFFF3B, oraz kompletna hierarchie naglowkow.

**Primary recommendation:** Wyekstrahowac ProgramyEdukacyjneSection do osobnego komponentu. Nie uzywac StickySection — renderowac tresc bezposrednio w prawej kolumnie za Navbarem. Sidebar per-sekcja bedzie czescia globalnego Navbar lub elementem tresci widocznym na scrollu (rozwazenie w Open Questions).

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image component | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Zainstalowany |
| TypeScript | 5.9.3 | Typy | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja obrazkow logo | TAK |
| next/link | (wbudowane) | Linki CTA | TAK |

### Supporting (juz zainstalowane)
| Library | Version | Purpose | Uzycie w fazie 4 |
|---------|---------|---------|-------------------|
| framer-motion | 12.31.0 | Animacje fadeIn | NIE w fazie 4 (deferred to Phase 10 per PROG-09) |

### Nowe wymagania
**Brak** — zadnych nowych pakietow. Faza 4 to czysto HTML/CSS/TSX.

## Architecture Patterns

### KRYTYCZNE: Problem podwojnego sidebara

**Stan obecny po Phase 3:**
```
<div className="flex max-w-[1400px]">
  <Navbar />          {/* 350px sticky sidebar — globalny */}
  <div className="w-px bg-white/10" />  {/* separator */}
  <div className="flex-1">             {/* prawa kolumna */}
    <StickySection>   {/* KOLEJNY sidebar 350px wewnatrz! */}
      {/* tresc */}
    </StickySection>
  </div>
</div>
```

**Problem:** StickySection dodaje drugi sidebar 350px wewnatrz prawej kolumny. Laczne 700px sidebara zamiast 350px.

**Oryginalna struktura Elementor:**
W Elementorze KAZDA sekcja (1, 4, 5, 7, 9, 11, 13) ma SWOJ 350px sidebar. Sidebar w sekcji "Programy Edukacyjne" (Section 5) zawiera:
- Spacer 315px (gorny margin)
- Trojkat Green-Triangle.png
- Naglowek "Programy Edukacyjne" (30px, w600, #EFEFEF)
- Linki do programow (FLL, BtC, OZEdukacja, Edukacja Energetyczna)
- "Powrot na gore strony" link

Sidebar w sekcji Hero (Section 1) jest PUSTY (bez tresci).

**Rozwiazanie rekomendowane (confidence HIGH):**

Sekcje tresci NIE uzywaja StickySection. Zamiast tego renderuja swoja tresc bezposrednio w prawej kolumnie za globalnym Navbarem. Globalny Navbar z Phase 3 pelni role "sidebar" dla calej strony.

```tsx
// W page.tsx — prawa kolumna
<div className="min-w-0 flex-1">
  <SectionSeparator />
  {/* Sekcja bezposrednio — BEZ StickySection wrappera */}
  <section id="programy-edukacyjne" className="relative px-6 py-12 lg:px-12">
    {/* Big title */}
    <h2 className="text-section text-[#EFEFEF]">Programy<br /> edukacyjne</h2>
    {/* Intro headings */}
    {/* Program cards */}
    {/* Custom programs */}
  </section>
</div>
```

**Alternatywne podejscie (bardziej wierne oryginalom, ale wiecej pracy):**

Usunac globalny Navbar i zamiast tego dac kazdej sekcji swoj sidebar 350px z odpowiednia trescia. Ale to wymaga przebudowy Phase 3 — NIE rekomendowane.

### Recommended Project Structure

```
src/
  components/
    sections/
      ProgramyEdukacyjneSection.tsx  # NOWY — wyekstrahowany z page.tsx
    ui/
      StickySection.tsx              # BEZ ZMIAN — nadal dostepny ale NIE uzywany w tej sekcji
      ProgramCard.tsx                # NOWY — reusable karta programu
  lib/
    constants.ts                     # AKTUALIZACJA — dodac 4. program
    types.ts                         # AKTUALIZACJA — rozszerzyc Program interface
```

### Pattern 1: Karta programu z lewym borderem

**What:** Karta programu z logo, opisem i CTA "WIECEJ"
**When to use:** Kazdy z 4 programow (FLL, BtC, OZEdukacja, Edukacja Energetyczna)
**Source:** Elementor Section 5, containers 3450ed99, 345239c4, 604887c, 2465b912

```tsx
// Pattern z Elementor
<div className="border-l border-[#FFFFFF3B] pl-6">
  {/* Logo */}
  <Image
    src={program.logo}
    alt={program.title}
    width={200}
    height={70}
    className="mb-6 h-12 w-auto"
  />

  {/* Opis */}
  <p className="mb-6 max-w-2xl text-[17px] font-extralight leading-relaxed text-[#E8E8E8]">
    {program.description}
  </p>

  {/* CTA Button */}
  <a
    href={program.href}
    className="inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white"
  >
    WIECEJ
  </a>
</div>
```

**Dokladne wartosci z Elementor:**
- Border: `border-left: 1px solid #FFFFFF3B`
- Border-radius: `0` na kontenera, `2px` na CTA
- Background: brak (transparent) na karcie, `#FFFFFF0A` na CTA
- CTA typography: 10px, weight 300, uppercase, letter-spacing 2px, line-height 1em
- CTA padding: top 17px, right 30px, bottom 15px, left 30px
- CTA text color: `#FFFFFFF2` (bialy z lekka przezroczystoscia)
- CTA hover background: fm-green (#9AFC4E) — z globals/colors id=380b317

### Pattern 2: Layout kart programow w gridzie 2-kolumnowym

**What:** Karty programow ulozone w pary (2 per rzad)
**When to use:** Sekcja "Globalne programy edukacyjne"
**Source:** Elementor containers 1014f290, 37eee8ee, 209df637

```
Row 1: FLL (30vw) + BtC (30vw)         — container 1014f290
Row 2: OZEdukacja (30vw) + wiatrak1.png (30vw) — container 37eee8ee
Row 3: Edukacja Energetyczna (30vw) + pusty (30vw) — container 209df637
```

**Uwaga:** W oryginale karty sa w rzedach po 2. OZEdukacja ma obok siebie dekoracyjny wiatrak1.png. Edukacja Energetyczna ma obok pusty kontener.

**Tailwind implementation:**
```tsx
<div className="grid grid-cols-1 gap-0 md:grid-cols-2">
  {/* Karta FLL */}
  {/* Karta BtC */}
</div>
<div className="grid grid-cols-1 gap-0 md:grid-cols-2">
  {/* Karta OZEdukacja */}
  {/* Dekoracja wiatrak */}
</div>
<div className="grid grid-cols-1 gap-0 md:grid-cols-2">
  {/* Karta Edukacja Energetyczna */}
  {/* Pusty */}
</div>
```

### Pattern 3: Duzy naglowek sekcji (100px, ultra-cienki)

**What:** Wielki dekoracyjny naglowek "Programy edukacyjne" (100px, w100)
**Source:** Elementor heading 7559c543

```tsx
<h2
  className="text-section text-[#EFEFEF]"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Programy<br /> edukacyjne
</h2>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display (fallback: Plus Jakarta Sans)
- Size: 100px
- Weight: 100 (ultra-thin) — Plus Jakarta Sans ma min 200, wiec uzywamy 200
- Letter-spacing: 2px
- Line-height: 1em
- Color: #EFEFEF
- Animation: fadeInDown (slow) — deferred to Phase 10

### Pattern 4: Overlay dekoracyjny

**What:** Tlo-EDUKACYJNE3.png jako dekoracja sekcji
**Source:** Elementor Section 5 background settings

```tsx
<section className="relative">
  {/* Overlay */}
  <div className="pointer-events-none absolute inset-0">
    <Image
      src="/images/Tlo-EDUKACYJNE3.png"
      alt=""
      fill
      className="object-contain object-right-top opacity-20"
      aria-hidden="true"
    />
  </div>
  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</section>
```

**Wartosci z Elementor:**
- Position: top right
- Size: initial (natural size)
- Repeat: no-repeat
- Background type: classic
- Opacity: nieokreslona explicite w Elementorze — per PROJECT.md ~20%
- Mouse track effect: yes (parallax na ruch myszy — deferred to Phase 10)

### Pattern 5: Intro naglowki z zielonymi akcentami

**Source:** Elementor headings f995af6, 3e9f0c0f, 43914bb4

```tsx
{/* Glowny naglowek 42px */}
<h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
  Realizujemy <span className="text-fm-green">globalne i lokalne </span>
  programy edukacyjne, ktore uzupelniaja braki systemu edukacyjnego
  <span className="text-fm-green">.</span>
</h3>

{/* Body paragrafy 19px */}
<p className="max-w-2xl text-body text-[#E8E8E8]">
  Dazymy do ksztaltowania odpowiedzialnego i zaangazowanego spoleczenstwa...
</p>
```

**Wartosci z Elementor:**
- Main heading: 42px, weight 600, color #FFFFFFF5
- Green accents: inline `<font color="#9afc4e">` lub `<span style="color: #9AFC4E">`
- Body text: 19px, weight 200, color #E8E8E8
- Label "Globalne programy edukacyjne:": 18px, weight 200, color #E8E8E8

### Pattern 6: Sekcja "szyte na miare"

**Source:** Elementor container 58e735d0, headings 106f64e2, 4d3a1925, 6deae5a7, 65b6fe96

```tsx
<div className="mt-20">
  <h3 className="mb-6 max-w-3xl text-heading text-[#FFFFFFF5]">
    Tworzymy rowniez autorskie programy edukacyjne dostosowane do{" "}
    <span className="text-fm-green">indywidualnych potrzeb i specyfiki regionu </span>
    lub branzy<span className="text-fm-green">.</span>
  </h3>

  <p className="mb-4 max-w-2xl text-body text-[#E8E8E8]">
    Niezaleznie od tego, czy chodzi o specyfike gospodarcza danego regionu,
    wymagania konkretnego sektora, nasze programy sa projektowane tak, aby
    odpowiadaly na <span className="text-fm-green">wyzwania i potrzeby spolecznosci</span>,
    w ktorej beda realizowane.
  </p>

  {/* Kolejne 2 paragrafy z zielonymi akcentami */}
</div>
```

**Uwaga:** W Elementorze sa 4 paragrafy w sekcji "szyte na miare" (nie 2 jak w obecnym kodzie):
1. Naglowek 42px z zielonym akcentem "indywidualnych potrzeb i specyfiki regionu"
2. Body o specyfice regionalnej z zielonym "wyzwania i potrzeby spolecznosci" (animation: fadeIn)
3. Body o bliskich relacjach z biznesem z zielonym "na rzeczywiste potrzeby rynku pracy" (animation: fadeIn)
4. Body o "szyte na miare" z italic FIRST (animation: fadeIn)

### Anti-Patterns to Avoid

- **NIE uzywac StickySection wewnatrz prawej kolumny** — tworzy podwojny sidebar 700px. Sekcje renderuja tresc bezposrednio
- **NIE uzywac border-white/10 na kartach** — Elementor uzywa border-left (nie border caly) z kolorem #FFFFFF3B (nie white/10 = #FFFFFF1A). Roznica jest widoczna
- **NIE uzywac rounded-sm na kartach** — border-radius to 0 na kartach, 2px tylko na CTA
- **NIE pomijac 4. programu** — Elementor ma 4 programy (FLL, BtC, OZEdukacja, Edukacja Energetyczna), obecny kod ma 3
- **NIE uzywac brightness-0 invert na logo programow** — loga sa juz biale/jasne, nie wymagaja inwersji. Obecny kod stosuje to blednie

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z `Image` component | Built-in lazy loading, blur placeholder, WebP |
| Overlay positioning | Custom JS positioning | CSS `absolute inset-0` z `object-contain object-right-top` | Zero JS, prosty CSS |
| Grid layout kart | Custom flex calculations | Tailwind `grid grid-cols-2` | Natywny CSS Grid, responsywny |

**Key insight:** Faza 4 to czyste HTML/CSS/TSX — zero custom JavaScript, zero nowych bibliotek. Animacje sa odroczone do Phase 10.

## Common Pitfalls

### Pitfall 1: Podwojny sidebar z StickySection
**What goes wrong:** Sekcja ma 700px sidebara (globalny Navbar 350px + StickySection 350px)
**Why it happens:** StickySection z Phase 1 zaklada ze kazda sekcja jest niezalezna. Po Phase 3 sekcje sa wewnatrz prawej kolumny za Navbarem.
**How to avoid:** NIE uzywac StickySection w sekcjach tresci. Renderowac tresc bezposrednio w prawej kolumnie.
**Warning signs:** Tresc jest zbyt waska, strona ma duzo pustej przestrzeni po lewej.

### Pitfall 2: Brak 4. programu (Edukacja Energetyczna)
**What goes wrong:** Strona pokazuje 3 programy zamiast 4.
**Why it happens:** constants.ts PROGRAMS ma 3 pozycje. Elementor ma 4 (FLL, BtC, OZEdukacja, Edukacja Energetyczna).
**How to avoid:** Dodac Edukacje Energetyczna do PROGRAMS i do EDUCATION_SECTION_NAV.
**Dane 4. programu z Elementor:**
  - Tytul: "Edukacja Energetyczna"
  - Logo: `/images/Lobo-Edukacja-Energetyczna.png`
  - Opis: "Program ten ksztaltuje swiadomosc energetyczna u dzieci, prowadzac je przez caly cykl energii - od produkcji, przez przechowywanie, po jej wykorzystanie. Dzieki analizie roznorodnych zrodel energii, dzieci ucza sie swiadomych wyborow, zwlaszcza w kontekscie odnawialnych zrodel. Glowne projekty badawcze koncentruja sie na zielonej energii, oszczedzaniu i innowacyjnych rozwiazaniach dla bezpieczenstwa energetycznego."
  - Link: `http://energia.fll.edu.pl`

### Pitfall 3: Bledny border na kartach programow
**What goes wrong:** Karty maja border caly (border-white/10 jak w obecnym kodzie) zamiast border-left.
**Why it happens:** Obecny kod uzywa `border border-white/10` na kartach.
**How to avoid:** Uzyc `border-l border-[#FFFFFF3B]` — tylko lewy border, z dokladnym kolorem z Elementora.
**Warning signs:** Karty wygladaja jak "pudelka" zamiast kart z akcentem po lewej.

### Pitfall 4: Brak dekoracyjnego wiatraka obok OZEdukacja
**What goes wrong:** Karta OZEdukacja nie ma dekoracyjnego elementu.
**Why it happens:** W oryginale obok OZEdukacja jest wiatrak1.png jako dekoracja.
**How to avoid:** Dodac wiatrak1.png obok karty OZEdukacja w gridzie 2-kolumnowym.

### Pitfall 5: Bledna typografia CTA
**What goes wrong:** Przyciski "WIECEJ" wygladaja inaczej niz oryginalne.
**Why it happens:** Obecny kod uzywa `px-6 py-2 text-xs tracking-widest` — to przyblizenie. Oryginalne wartosci sa inne.
**How to avoid:** Dokladne wartosci z Elementor: bg #FFFFFF0A, text #FFFFFFF2, 10px, weight 300, uppercase, letter-spacing 2px, padding 17/30/15/30px, border-radius 2px.

### Pitfall 6: Overflow na przodkach lamie overlay
**What goes wrong:** Overlay Tlo-EDUKACYJNE3.png nie jest widoczny lub jest uciety.
**Why it happens:** `overflow: hidden` na przodkach ucina absolutnie pozycjonowany overlay.
**How to avoid:** Nie uzywac overflow: hidden na kontenerach sekcji. Uzyc `overflow: clip` jesli konieczne.

## Code Examples

### Kompletna karta programu
```tsx
// Source: Elementor Section 5, containers 3450ed99/345239c4/604887c/2465b912
interface ProgramCardProps {
  title: string;
  description: string;
  logo: string;
  href: string;
}

function ProgramCard({ title, description, logo, href }: ProgramCardProps) {
  return (
    <div className="border-l border-[#FFFFFF3B] py-8 pl-6">
      <Image
        src={logo}
        alt={title}
        width={200}
        height={70}
        className="mb-6 h-12 w-auto"
      />
      <p className="mb-6 max-w-lg text-[17px] font-extralight leading-relaxed text-[#E8E8E8]">
        {description}
      </p>
      <Link
        href={href}
        className="inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white"
      >
        WIECEJ
      </Link>
    </div>
  );
}
```

### Overlay dekoracyjny
```tsx
// Source: Elementor Section 5, background_image settings
<div className="pointer-events-none absolute inset-0 z-0">
  <Image
    src="/images/Tlo-EDUKACYJNE3.png"
    alt=""
    fill
    className="object-contain object-right-top opacity-20"
    aria-hidden="true"
  />
</div>
```

### CTA Button style (reusable)
```tsx
// Source: Elementor buttons 63c93104, 4be26c4b, 2f1b67df, 3d1810f6
// Wspolne style CTA button uzywane w kartach programow
const ctaClasses = "inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white";
```

### Dane 4. programu do dodania do constants.ts
```typescript
// Source: Elementor Section 5, container 2465b912
{
  title: "Edukacja Energetyczna",
  description:
    "Program ten kształtuje świadomość energetyczną u dzieci, prowadząc je przez cały cykl energii - od produkcji, przez przechowywanie, po jej wykorzystanie. Dzięki analizie różnorodnych źródeł energii, dzieci uczą się świadomych wyborów, zwłaszcza w kontekście odnawialnych źródeł. Główne projekty badawcze koncentrują się na zielonej energii, oszczędzaniu i innowacyjnych rozwiązaniach dla bezpieczeństwa energetycznego.",
  href: "http://energia.fll.edu.pl",
  logo: "/images/Lobo-Edukacja-Energetyczna.png",
}
```

## Elementor Structure Map (Section 5)

Pelna mapa struktury sekcji z Elementora:

```
Section 5 (2f9d5deb) — row, bg: Tlo-EDUKACYJNE3.png (top right, no-repeat)
  ├── menu-anchor (anchor: programy-edukacyjne)
  ├── Sidebar (736f26e8) — w=350px
  │   └── Sticky container (2c884955) — sticky:top
  │       ├── Green-Triangle.png
  │       ├── "Programy Edukacyjne" (30px, w600, #EFEFEF)
  │       ├── Link: FIRST LEGO League
  │       ├── Link: Build the Change
  │       ├── Link: OZEdukacja
  │       ├── Link: Edukacja Energetyczna
  │       └── "Powrot na gore strony" link
  └── Content (606ffc7d) — flex-grow
      ├── Title container (48795d50) — w=90.297%
      │   └── "Programy edukacyjne" (100px, w100, fadeInDown)
      ├── Intro (2f95dcbf) — column
      │   ├── "Realizujemy globalne i lokalne..." (42px, w600, #FFFFFFF5)
      │   ├── "Dazymy do ksztaltowania..." (19px, w200, #E8E8E8)
      │   ├── "Nasza misja jest sprawienie..." (19px, w200, #E8E8E8)
      │   └── "Globalne programy edukacyjne:" (18px, w200, #E8E8E8)
      ├── Cards row 1 (1014f290) — row
      │   ├── FLL card (3450ed99) — border-l 1px, w=30vw
      │   │   ├── Logo-First-Lego-League.png
      │   │   ├── Opis FLL (17px, w200)
      │   │   └── CTA "WIECEJ" -> /fll
      │   └── BtC card (345239c4) — border-l 1px, w=30vw
      │       ├── Logo-FIRST-LEGO-LEAGUE-biel-13.png
      │       ├── Opis BtC (17px, w200)
      │       └── CTA "WIECEJ" -> lego.com
      ├── Cards row 2 (37eee8ee) — row
      │   ├── OZEdukacja card (604887c) — border-l 1px #FFFFFF3B, w=30vw
      │   │   ├── logo-short-light.png
      │   │   ├── Opis OZEdukacja (17px, w200)
      │   │   └── CTA "WIECEJ" -> oze.edu.pl
      │   └── Dekoracja (2500af7a) — w=30vw
      │       └── wiatrak1.png
      ├── Cards row 3 (209df637) — row
      │   ├── Ed. Energetyczna card (2465b912) — border-l 1px #FFFFFF3B, w=30vw
      │   │   ├── Lobo-Edukacja-Energetyczna.png
      │   │   ├── Opis Ed. Energetyczna (17px, w200)
      │   │   └── CTA "WIECEJ" -> energia.fll.edu.pl
      │   └── Pusty (7303445b) — w=30vw
      ├── "Szyte na miare" (58e735d0) — column
      │   ├── "Tworzymy rowniez autorskie..." (42px, w600, green: "indywidualnych potrzeb")
      │   ├── "Niezaleznie od tego..." (19px, w200, green: "wyzwania i potrzeby", fadeIn)
      │   ├── "Dzieki bliskim relacjom..." (19px, w200, green: "na rzeczywiste potrzeby", fadeIn)
      │   └── "Szyte na miare programy..." (19px, w200, fadeIn)
      └── Footer separator (265e87ff)
          └── Strzalka-w-dol.png
```

## State of the Art

| Obecny kod (page.tsx) | Wymagane (z Elementor) | Zmiana |
|------------------------|------------------------|--------|
| 3 programy (FLL, BtC, OZEdukacja) | 4 programy (+Edukacja Energetyczna) | Dodac dane i karte |
| `border border-white/10` na kartach | `border-l border-[#FFFFFF3B]` — tylko lewy border | Zmiana stylu |
| `rounded-sm` na kartach | `rounded-none` (0 border-radius) | Usunac zaokraglenia |
| CTA: `px-6 py-2 text-xs tracking-widest` | CTA: 10px, w300, uppercase, tracking 2px, bg #FFFFFF0A, padding 17/30/15/30 | Dokladne wartosci |
| CTA text: `text-fm-text-muted` | CTA text: `#FFFFFFF2` (bialy z lekka przezr.) | Jasniejszy kolor |
| `brightness-0 invert` na logach | Brak filtrow na logach | Usunac filtry |
| Body text: `text-lg leading-relaxed font-light text-fm-text` | 17-19px, w200, #E8E8E8 | Dokladniejsze wartosci |
| Karty w kolumnie (space-y-8) | Karty w gridzie 2-kolumnowym (30vw + 30vw) | Zmiana layout |
| Brak wiatrak1.png | wiatrak1.png obok OZEdukacja | Dodac dekoracje |
| Brak duzego naglowka 100px | "Programy edukacyjne" 100px w100 | Dodac naglowek |
| 2 paragrafy w "szyte na miare" | 4 paragrafy z zielonymi akcentami | Rozszerzyc tresc |
| StickySection z zagniezdz. sidebar | Tresc bezposrednio w prawej kolumnie | Usunac StickySection |
| Brak overlay Tlo-EDUKACYJNE3.png | Overlay top-right, ~20% opacity | Dodac overlay |

## Open Questions

1. **Architektura sidebar vs Navbar**
   - What we know: Elementor ma per-sekcyjne sidebary. Nasz kod ma globalny Navbar.
   - What's unclear: Czy globalny Navbar powinien zmieniac tresc per-sekcja (scroll-aware), czy sekcje powinny miec wlasne sidebary.
   - Recommendation: **Na razie NIE modyfikowac Navbar.** Sekcje renderuja tresc bezposrednio w prawej kolumnie BEZ StickySection. Navbar globalny sluzy jako nawigacja. Per-sekcyjne sidebary z numerami i tytulami to temat na przyszla refaktoryzacje (gdy wszystkie sekcje beda gotowe). W oryginale Elementor sidebar per-sekcja i globalny sidebar to TO SAMO — Elementor powtarza sidebar w kazdej sekcji bo kazda sekcja jest niezalezna. W naszym kodzie Navbar jest ciagly.

2. **Duzy naglowek 100px — czy jest potrzebny?**
   - What we know: Elementor ma naglowek "Programy edukacyjne" 100px w100 (fadeInDown) w prawej kolumnie, POZA sidebarem. To jest dekoracyjny naglowek widoczny na gorze sekcji.
   - What's unclear: W oryginale jest widoczny. W naszym kodzie Navbar juz wskazuje jaka to sekcja. Czy duplikowac?
   - Recommendation: **TAK, dodac** — to element dekoracyjny, czesc designu. Duzy naglowek daje efekt wizualny, Navbar to nawigacja. Sa komplementarne, nie duplikuja sie.

3. **Grid 2-kolumnowy vs stack**
   - What we know: Elementor uzywa row z 30vw + 30vw. Karty sa parami.
   - What's unclear: Czy grid 2-kolumnowy (md:grid-cols-2) jest lepszy wizualnie niz stack, biorac pod uwage ze prawa kolumna jest juz zawezana przez Navbar.
   - Recommendation: Uzyc grid 2-kolumnowy na duzych ekranach (lg:grid-cols-2), stack na mniejszych. Ale moga byc za waskie — zweryfikowac wizualnie. Fallback: stack jednokolumanowy.

4. **OZEdukacja opis — dluzszy niz w obecnym kodzie**
   - What we know: Elementor ma dluzszy opis OZEdukacja (ze zdaniem o konkursie, filmach i scenariuszach lekcji).
   - What's unclear: Czy zaktualizowac constants.ts o pelny opis.
   - Recommendation: TAK, zaktualizowac — wiernosc wobec oryginalu.

5. **Numer sekcji "01" — w sidebarze czy w tresci?**
   - What we know: W oryginale Elementor sidebar ma "Programy Edukacyjne" (30px, w600) BEZ numeru. Numer "01" jest czescia naszego StickySection (z Phase 1). Elementor NIE ma numeru "01" w sidebarze sekcji Programy Edukacyjne.
   - What's unclear: Skad wzial sie numer "01" w naszym kodzie? Z analizy — `sectionNumber="01"` jest w StickySection, ale w Elementorze sidebar ma tylko "Programy Edukacyjne" bez numeru.
   - Recommendation: **Usunac numer "01" z sidebara** jesli nie modyfikujemy Navbara. Numer moze ewentualnie pojawic sie jako czesc duzego naglowka 100px. UWAGA: Obecny StickySection ma `sectionNumber` — jesli nie uzywamy StickySection, problem sam sie rozwiazuje.

## Sources

### Primary (HIGH confidence)
- Elementor JSON page 20657 — Section 5 (id=2f9d5deb) pelna ekstrakcja widgetow, stylow, animacji
- Istniejacy codebase — page.tsx, StickySection.tsx, Navbar.tsx, constants.ts, types.ts, globals.css
- Obrazki w public/images/ — zweryfikowane: Tlo-EDUKACYJNE3.png, Logo-First-Lego-League.png, Logo-FIRST-LEGO-LEAGUE-biel-13.png, logo-short-light-1024x363.png, Lobo-Edukacja-Energetyczna.png, wiatrak1.png
- PROJECT.md, ROADMAP.md, REQUIREMENTS.md, STATE.md — kontekst projektu

### Secondary (MEDIUM confidence)
- WebFetch futureminds.edu.pl — potwierdzenie 4 programow i sekcji "szyte na miare"

### Tertiary (LOW confidence)
- Dokladna opacity Tlo-EDUKACYJNE3.png — Elementor nie definiuje opacity explicite, PROJECT.md mowi ~20%
- Parallax mouse track effect na tle — zidentyfikowane w Elementorze ale deferred to Phase 10

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (sidebar problem): HIGH — zweryfikowane w Elementorze i kodzie, problem jednoznaczny
- Karty programow (style): HIGH — dokladne wartosci z Elementor JSON (10px, #FFFFFF0A, #FFFFFF3B, border-l)
- Dane programow: HIGH — 4 programy potwierdzone, pelne opisy z Elementor, obrazki w public/
- Overlay: MEDIUM — opacity ~20% to przyblizenie (nie explicite w Elementor)
- Layout kart (grid vs stack): MEDIUM — 30vw+30vw z Elementora, ale w naszym kontekscie moze wymagac adjustacji

**Research date:** 2026-02-11
**Valid until:** 2026-03-11 (stabilne technologie, 30 dni)

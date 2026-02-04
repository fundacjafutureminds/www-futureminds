# Phase 2: Hero - Research

**Researched:** 2026-02-04
**Domain:** Fullscreen Hero section -- layout, ilustracja rakiety, tekst misji, scroll indicator
**Confidence:** HIGH

## Summary

Zbadano szesc domen niezbednych do zaplanowania fazy Hero: (1) istniejacy stan HeroSection w kodzie, (2) dokladna zawartosc sekcji Hero na oryginalnej stronie futureminds.edu.pl, (3) identyfikacja assetow (obrazkow) w public/images/, (4) techniczne podejscie do ilustracji rakiety jako elementu DOM, (5) implementacja scroll indicatora ze smooth scroll, (6) struktura komponentu w kontekscie istniejacego kodu.

Kluczowe odkrycie: **Ilustracja rakiety to `dzieci-panorama4.png`** (906KB, 1920x~900px) -- panoramiczny rysunek liniowy przedstawiajacy dwoje dzieci siedzacych i patrzacych na rakiete, z technicznymi rysunkami, ksiezycem i elementami blueprint. Jest to rysunek na jasnym/przezroczystym tle, ktory na ciemnym tle #32373c daje efekt subtelnego outline widocznego na zrzucie ekranu oryginalnej strony. Plik `rock3.png` to nie rakieta Hero -- to obrazek z projektu Pol'and Rock.

Drugie odkrycie: **Tekst misji nie ma zielonych akcentow (#9AFC4E) w sekcji Hero** -- na oryginalnej stronie caly tekst Hero jest w kolorze #c4c4c4 (fm-text). Zielone akcenty na slowach pojawiaja sie dopiero w sekcjach tematycznych (Programy Edukacyjne itd.). Istniejacy kod w page.tsx juz zawiera poprawny tekst misji.

**Primary recommendation:** Przebudowac istniejaca HeroSection w page.tsx: usunac inline SVG rakiete, zamienic na `dzieci-panorama4.png` jako element `<Image>` z absolute positioning. Dodac scroll indicator z `Strzalka-w-dol.png` z animacja bounce i smooth scroll do nastepnej sekcji. Tekst misji zachowac bez zmian -- jest juz poprawny.

## Standard Stack

Faza 2 nie wymaga nowych bibliotek -- wszystko jest juz zainstalowane.

### Core (juz zainstalowane)
| Library | Version | Purpose | Uzycie w fazie 2 |
|---------|---------|---------|-------------------|
| Next.js | 16.1.6 | Framework, `next/image`, App Router | Image component dla logo, rakiety, strzalki |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Layout, positioning, animacje |
| React | 19.2.4 | Komponenty | HeroSection component |

### Supporting (juz zainstalowane, potencjalnie przydatne)
| Library | Version | Purpose | Uzycie w fazie 2 |
|---------|---------|---------|-------------------|
| lucide-react | 0.563.0 | Ikony | NIE -- uzywamy Strzalka-w-dol.png |
| framer-motion | 12.31.0 | Animacje | NIE w fazie 2 (faza 10) |

### Nowe wymagania
**Brak** -- zadnych nowych pakietow do instalacji.

## Architecture Patterns

### Obecna struktura HeroSection
Istniejacy kod w `src/app/page.tsx` (linie 17-181) zawiera HeroSection jako funkcje lokalna (nie wyeksportowany komponent). Obecna implementacja:
- Inline SVG rakieta (bardzo uproszczona, nie odpowiada oryginalowi)
- Poprawny tekst misji (4 paragrafy)
- Logo FMF-white.png
- Strzalka w dol (Strzalka-w-dol.png) z animate-bounce

### Docelowa struktura pliku
```
src/
  components/
    sections/
      HeroSection.tsx    # NOWY -- wyekstrahowany z page.tsx
  app/
    page.tsx             # Import HeroSection z components/sections/
```

### Pattern 1: Ilustracja rakiety jako element DOM (nie background-image)
**What:** Uzycie `next/image` z `fill` prop wewnatrz absolute-positioned div zamiast CSS background-image.
**When to use:** Gdy obrazek dekoracyjny ma byc w przyszlosci zamieniony na animacje (np. Lottie, canvas, video).
**Why:** Element DOM mozna latwo zamienic na inny komponent (np. `<LottieAnimation>` czy `<Canvas3D>`), natomiast `background-image` wymaga calkowitej przebudowy CSS.

**Example:**
```tsx
// Source: https://nextjs.org/docs/app/api-reference/components/image
<section className="relative h-screen bg-fm-dark overflow-hidden">
  {/* Ilustracja rakiety -- absolute positioned, dolna czesc */}
  <div className="pointer-events-none absolute inset-0">
    <Image
      src="/images/dzieci-panorama4.png"
      alt=""
      fill
      className="object-contain object-bottom opacity-40"
      priority={false}
      aria-hidden="true"
    />
  </div>

  {/* Tresc na wierzchu -- z-index wyzej */}
  <div className="relative z-10">
    {/* logo, tekst misji */}
  </div>
</section>
```

**Wymogi `fill` prop:**
- Parent MUSI miec `position: relative` (lub absolute/fixed)
- Parent MUSI miec zdefiniowane wymiary (h-screen daje to automatycznie)
- Uzyc `object-contain` + `object-bottom` aby ilustracja byla na dole i nie byla obcinana
- `pointer-events-none` aby ilustracja nie blokowala klikalnosci tekstu

### Pattern 2: Scroll indicator ze smooth scroll
**What:** Strzalka w dol z animacja bounce, po kliknieciu scrolluje do nastepnej sekcji.
**When to use:** Na dole fullscreen hero section.
**Example:**
```tsx
// Smooth scroll -- juz wlaczony globalnie w globals.css:
// html { scroll-behavior: smooth; }

// Scroll indicator z anchor link
<a
  href="#programy-edukacyjne"
  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
  aria-label="Przewin w dol"
>
  <Image
    src="/images/Strzalka-w-dol.png"
    alt=""
    width={59}
    height={13}
    className="animate-bounce opacity-60 hover:opacity-100 transition-opacity"
  />
</a>
```

**Klucz:** `scroll-behavior: smooth` jest juz zdefiniowane w globals.css -- wystarczy uzyc anchor link `href="#id-nastepnej-sekcji"`. Nie trzeba JavaScript.

### Pattern 3: Layout Hero -- logo w gornym lewym rogu, tekst w lewej polowie
**What:** Kompozycja z logo na gorze, tekstem misji po lewej stronie, ilustracja na calym tle.
**Na podstawie zrzutu ekranu oryginalnej strony:**
- Logo "FUTURE|MINDS FOUNDATION" -- gorny lewy rog, z marginesem ~80px od gory, ~120px od lewej
- Tekst misji -- lewa polowa ekranu, mniej wiecej w srodku pionowym, max-width ~500-550px
- Ilustracja rakiety -- cale tlo, szczegolnie widoczna w dolnej czesci i prawej czesci
- Strzalka w dol -- dokladnie na dole, wysrodkowana

```tsx
<section id="home" className="relative h-screen bg-fm-dark overflow-hidden">
  {/* Warstwa 0: Ilustracja rakiety (tlo) */}
  <div className="pointer-events-none absolute inset-0">
    <Image src="/images/dzieci-panorama4.png" alt="" fill
      className="object-contain object-bottom opacity-[0.15]"
      aria-hidden="true" />
  </div>

  {/* Warstwa 1: Tresc */}
  <div className="relative z-10 mx-auto h-full max-w-[1400px] px-8 flex flex-col justify-center">
    {/* Logo */}
    <Image src="/images/FMF-white.png" alt="Future Minds Foundation"
      width={300} height={95} className="mb-16 h-16 w-auto" priority />

    {/* Tekst misji */}
    <div className="max-w-xl space-y-6">
      <p className="text-body text-fm-text">...</p>
      <p className="text-body text-fm-text">...</p>
      <p className="text-body text-fm-text">...</p>
      <p className="text-body text-fm-text">...</p>
    </div>
  </div>

  {/* Warstwa 2: Scroll indicator */}
  <a href="#programy-edukacyjne"
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
    <Image src="/images/Strzalka-w-dol.png" alt="" width={59} height={13}
      className="animate-bounce opacity-60" />
  </a>
</section>
```

### Anti-Patterns to Avoid
- **NIE uzywac background-image CSS dla rakiety** -- uniemozliwia latwa zamiane na animacje, brak optymalizacji next/image
- **NIE uzywac overflow: hidden na section** -- moze powodowac problemy z pozniejszymi sekcjami (sticky)
- **NIE uzywac inline SVG jako zastepstwa rakiety** -- obecny kod ma uproszczone SVG ktore nie odpowiada oryginalowi
- **NIE uzywac min-h-screen zamiast h-screen** -- hero MA byc dokladnie 100vh, nie wiecej
- **NIE dodawac zielonych akcentow w tekscie Hero** -- na oryginale tekst misji w Hero jest jednokolorowy (#c4c4c4)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Optimized hero image | Custom lazy-loading/srcset | `next/image` z `fill` prop | Automatyczna optymalizacja, WebP/AVIF, responsive srcset |
| Bounce animation | Custom @keyframes | Tailwind `animate-bounce` | Juz zdefiniowana, przetestowana, gotowa do uzycia |
| Smooth scroll | JavaScript scrollTo handler | CSS `scroll-behavior: smooth` + anchor `<a href="#id">` | Zero JS, juz wlaczone w globals.css |
| Layout centering | Flex+margin hack | Tailwind `flex flex-col justify-center` + `h-screen` | Czysty, semantyczny, latwy do zrozumienia |

**Key insight:** Hero section jest prosta -- to layout + obrazki + tekst. Nie wymaga zadnego custom JS, animacji, ani bibliotek. Wszystko rozwiazywalne z Tailwind CSS utilities + next/image.

## Common Pitfalls

### Pitfall 1: Zle zidentyfikowany asset rakiety
**What goes wrong:** Uzycie `rock3.png` (Pol'and Rock festiwal) zamiast `dzieci-panorama4.png` (ilustracja hero).
**Why it happens:** Nazwa `rock3.png` sugeruje "rocket", ale to w rzeczywistosci obrazek z projektu Pol'and Rock.
**How to avoid:** Uzywac `dzieci-panorama4.png` (906KB, panoramiczny rysunek z dziecmi i rakieta).
**Warning signs:** Ilustracja na hero nie przypomina oryginalnej strony.

### Pitfall 2: Zbyt wysoka opacity ilustracji
**What goes wrong:** Tekst misji jest nieczytelny na tle zbyt wyraznej ilustracji.
**Why it happens:** Na zrzucie ekranu ilustracja jest subtelna (szare linie na ciemnym tle), ale dzieci-panorama4.png ma jasne/biale kontury.
**How to avoid:** Zaczynac od opacity-[0.15] lub opacity-20, testowac wizualnie. Na oryginale ilustracja jest widoczna ale nie przytlaczajaca.
**Warning signs:** Tekst zlewa sie z ilustracja, trudno czytac.

### Pitfall 3: `next/image` z `fill` bez relative parent
**What goes wrong:** Obraz sie nie wyswietla lub zajmuje cala strone.
**Why it happens:** `fill` prop sprawia ze Image uzywa `position: absolute` -- potrzebuje rodzica z `position: relative` i zdefiniowanymi wymiarami.
**How to avoid:** Parent MUSI miec `relative` (lub absolute/fixed) + wymiary (np. `h-screen`, `inset-0`).
**Warning signs:** Obraz nie wyswietla sie wcale lub zajmuje 0x0px.

### Pitfall 4: overflow: hidden na hero psuje sticky w nastepnych sekcjach
**What goes wrong:** StickySection (350px sidebar) w sekcjach ponizej hero nie dziala.
**Why it happens:** `overflow: hidden` na hero section moze nie wprost psuc sticky, ale `overflow: hidden` na przodkach sticky elementow (np. body, main) tak.
**How to avoid:** Uzywac `overflow: hidden` WYLACZNIE na hero section (nie na body/main). Jeszcze lepiej: `overflow: clip` (nie tworzy scroll context). Albo po prostu: nie uzywac overflow hidden jezeli ilustracja jest w absolute div z inset-0 -- nie wyjdzie poza section.
**Warning signs:** Sticky sidebar nie dziala po dodaniu hero.

### Pitfall 5: Priority loading na ilustracji rakiety
**What goes wrong:** Wolne LCP (Largest Contentful Paint), ilustracja laduje sie pozno.
**Why it happens:** Ilustracja dekoracyjna (906KB) laduje sie z priority, opozniajac logo i tekst.
**How to avoid:** `priority={true}` TYLKO na logo (FMF-white.png) -- to jest above-the-fold content. Ilustracja: `priority={false}` (default). Strzalka: `priority={false}`.
**Warning signs:** Logo i tekst pojawiaja sie pozno, ilustracja blokuje rendering.

### Pitfall 6: Brak aria-hidden na elementach dekoracyjnych
**What goes wrong:** Screen readery czytaja alt="" na dekoracyjnych obrazkach.
**Why it happens:** next/image wymaga `alt` prop. Ale dekoracyjne obrazki (rakieta, strzalka) nie powinny byc anonsowane.
**How to avoid:** Dodac `alt=""` + `aria-hidden="true"` na ilustracji rakiety. Strzalka -- uzywac `<a>` z `aria-label="Przewin w dol"`.
**Warning signs:** Screenreader anonsuje "image" bez kontekstu.

## Code Examples

### Kompletny HeroSection component
```tsx
// src/components/sections/HeroSection.tsx
// Source: Analiza oryginalnej strony + Next.js Image docs
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen bg-fm-dark overflow-hidden"
    >
      {/* Warstwa 0: Ilustracja rakiety (dekoracyjne tlo) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/dzieci-panorama4.png"
          alt=""
          fill
          className="object-contain object-bottom opacity-[0.15]"
          aria-hidden="true"
        />
      </div>

      {/* Warstwa 1: Logo + tekst misji */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-8">
        {/* Logo FMF */}
        <Image
          src="/images/FMF-white.png"
          alt="Future Minds Foundation"
          width={300}
          height={95}
          className="mb-16 h-16 w-auto"
          priority
        />

        {/* Tekst misji */}
        <div className="max-w-xl space-y-6">
          <p className="text-body text-fm-text">
            Fundacja Future Minds wspiera kazde dziecko i mloda osobe w
            realizacji pelnego potencjalu poprzez innowacyjna edukacje STEAM.
          </p>
          <p className="text-body text-fm-text">
            Jako oficjalny operator programu FIRST LEGO League w Polsce,
            rozwijamy kompetencje przyszlosci laczac robotyke z kreatywnoscia i
            wspolpraca. Szkolimy nauczycieli w nowoczesnych metodach nauczania i
            technologiach przyszlosci.
          </p>
          <p className="text-body text-fm-text">
            We wspolpracy z partnerami biznesowymi tworzymy system stypendiow,
            zapewniajac dostepnosc programow dla kazdego dziecka niezaleznie od
            pochodzenia.
          </p>
          <p className="text-body text-fm-text">
            Budujemy odpowiedzialne spoleczenstwo gotowe na wyzwania jutra,
            gdzie innowacja spotyka sie z inkluzywnoscia.
          </p>
        </div>
      </div>

      {/* Warstwa 2: Scroll indicator */}
      <a
        href="#programy-edukacyjne"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Przewin w dol"
      >
        <Image
          src="/images/Strzalka-w-dol.png"
          alt=""
          width={59}
          height={13}
          className="animate-bounce opacity-60 transition-opacity hover:opacity-100"
        />
      </a>
    </section>
  );
}
```

### Uzycie w page.tsx
```tsx
// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Navbar />
      {/* ... reszta sekcji */}
    </>
  );
}
```

### Dostosowanie opacity ilustracji
```tsx
// Jezeli opacity-[0.15] jest za ciemne lub za jasne:
// Na oryginale ilustracja jest subtelna ale widoczna

// Opcje do testowania:
className="opacity-[0.10]"  // Bardzo subtelna
className="opacity-[0.15]"  // Rekomendowane -- start
className="opacity-20"      // Troche bardziej widoczna
className="opacity-[0.25]"  // Wyrazna (moze za duzo)
className="opacity-30"      // Bardzo wyrazna

// Uwaga: na oryginale dzieci-panorama4.png ma szare/biale linie
// na przezroczystym tle. Na ciemnym #32373c daje efekt "blueprint".
// Opacity ~0.15-0.25 powinno byc ok.
```

## Zidentyfikowane Assety

| Asset | Plik | Rozmiar | Uzycie |
|-------|------|---------|--------|
| Logo FMF | `/images/FMF-white.png` | 8KB | Gorny lewy rog hero, priority loading |
| Ilustracja rakiety | `/images/dzieci-panorama4.png` | 906KB | Dekoracyjne tlo, absolute positioned, opacity ~15-25% |
| Strzalka w dol | `/images/Strzalka-w-dol.png` | 429B | Scroll indicator na dole, animate-bounce |
| Zielony trojkat | `/images/Green-Triangle.png` | 550B | NIE w hero -- uzywany w StickySection sidebar |

**Uwaga o `dzieci-panorama4.png`:** Plik ma 906KB co jest duze. next/image automatycznie zoptymalizuje (WebP/AVIF, responsive srcset), ale warto rozwazyc czy user ma wersje mniejsza. Dla hero na 100vh, oryginalny rozmiar jest akceptowalny bo next/image wygeneruje odpowiednie warianty.

## Dokladna tresc tekstu misji

Tekst skopiowany z oryginalnej strony futureminds.edu.pl (zweryfikowany ze zrzutem ekranu i WebFetch):

**Paragraf 1:**
"Fundacja Future Minds wspiera kazde dziecko i mloda osobe w realizacji pelnego potencjalu poprzez innowacyjna edukacje STEAM."

**Paragraf 2:**
"Jako oficjalny operator programu FIRST LEGO League w Polsce, rozwijamy kompetencje przyszlosci laczac robotyke z kreatywnoscia i wspolpraca. Szkolimy nauczycieli w nowoczesnych metodach nauczania i technologiach przyszlosci."

**Paragraf 3:**
"We wspolpracy z partnerami biznesowymi tworzymy system stypendiow, zapewniajac dostepnosc programow dla kazdego dziecka niezaleznie od pochodzenia."

**Paragraf 4:**
"Budujemy odpowiedzialne spoleczenstwo gotowe na wyzwania jutra, gdzie innowacja spotyka sie z inkluzywnoscia."

**UWAGA:** Istniejacy kod w page.tsx JUZ zawiera ten tekst (z polskimi znakami diakrytycznymi). Nie trzeba go zmieniac -- wystarczy przeniesc do nowego komponentu.

**Zielone akcenty w Hero:** BRAK. Na oryginale tekst misji w sekcji Hero jest jednokolorowy (--color-fm-text / #c4c4c4). Zielone spany z #9AFC4E pojawiaja sie dopiero w naglowkach sekcji tematycznych (Programy Edukacyjne, Stypendialne itd.).

## Stan istniejacego kodu

### Co jest dobrze w obecnym HeroSection (page.tsx):
- Tekst misji -- poprawny, zgodny z oryginalem
- Logo FMF-white.png -- poprawny path
- Strzalka-w-dol.png -- poprawny path, ma animate-bounce
- Uzycie next/image -- poprawne

### Co wymaga zmiany:
1. **Inline SVG rakieta --> dzieci-panorama4.png** -- obecny SVG to bardzo uproszczony placeholder, nie odpowiada oryginalowi
2. **min-h-screen --> h-screen** -- hero ma byc dokladnie 100vh
3. **Scroll indicator nie jest klikalny** -- obecna `<div>` zamiast `<a href="#nastepna-sekcja">`
4. **Ekstrakcja do osobnego pliku** -- HeroSection jako component w `src/components/sections/`
5. **Opacity ilustracji** -- dostrojenie do poziomu z oryginalnej strony (~15-25%)
6. **Pozycja ilustracji** -- object-bottom aby dzieci i rakieta byly na dole ekranu (jak na oryginale)

### Czego NIE zmieniac:
- Tekst misji (juz poprawny)
- Logo FMF-white.png (juz poprawny path i rozmiar)
- globals.css (juz ma wszystkie potrzebne kolory i typografie)
- `scroll-behavior: smooth` w globals.css (juz ustawione)

## State of the Art

| Stare podejscie (obecny kod) | Nowe podejscie (do wdrozenia) | Powod zmiany |
|-------------------------------|-------------------------------|--------------|
| Inline SVG rakieta (~100 linii) | `next/image` z dzieci-panorama4.png | Wiernosc z oryginalem, 1 linia zamiast 100 |
| `min-h-screen` | `h-screen` | Dokladnie 100vh jak na oryginale |
| `<div>` ze strzalka (nieklikalna) | `<a href="#sekcja">` ze strzalka | Smooth scroll po kliknieciu |
| HeroSection w page.tsx | Osobny komponent w components/sections/ | Czystosc kodu, reusability |
| SVG stars/grid lines dekoracja | PNG ilustracja na absolute layer | Prawdziwa ilustracja z oryginalnej strony |

## Open Questions

1. **Dokladna opacity ilustracji rakiety**
   - What we know: Na oryginale ilustracja jest subtelna ale wyraznie widoczna. Na zrzucie ekranu kontury sa szare na ciemnym tle.
   - What's unclear: Dokladna wartosc opacity -- na Elementor moze byc ustawiona w data attributes ktorych nie moglismy wyekstrahowac.
   - Recommendation: Zaczac od opacity-[0.15], testowac wizualnie porownujac ze zrzutem fm-01-hero.png

2. **Czy tekst misji powinien miec zielone akcenty**
   - What we know: WebFetch nie znalazl span z #9AFC4E w sekcji Hero. Zrzut ekranu nie pokazuje wyraznie zielonych slow. CONTEXT.md mowi "zielone akcenty na dokladnie tych samych slowach co na oryginale". Requirement HERO-04 mowi "paragrafy z zielonymi akcentami".
   - What's unclear: Czy HERO-04 odnosi sie do przyszlych akcentow czy do obecnego stanu oryginalnej strony.
   - Recommendation: Zaimplementowac BEZ zielonych akcentow w tekscie Hero (zgodnie z oryginalem). Jezeli user chce dodac -- latwo dodac `<span className="text-fm-green">` w przyszlosci. **Warto potwierdzic z userem.**

3. **Docelowy id nastepnej sekcji po Hero**
   - What we know: Obecny page.tsx uklada: HeroSection -> Navbar -> SectionSeparator -> ProgramyEdukacyjneSection. Nastepna sekcja po Hero to Navbar, ale scroll indicator powinien prowadzic do tresci (nie do navbara).
   - What's unclear: Docelowa kolejnosc elementow (Navbar moze byc sticky na gorze ekranu zamiast pomiedzy sekcjami).
   - Recommendation: Scroll indicator wskazuje na `#programy-edukacyjne` (pierwsza sekcja z trescia). Navbar jest niezalezny i bedzie przebudowany w Phase 3.

## Sources

### Primary (HIGH confidence)
- Zrzut ekranu oryginalnej strony: `.playwright-mcp/fm-01-hero.png` -- bezposrednia wizualna weryfikacja layoutu Hero
- Assety w `public/images/` -- bezposredni przeglad plikow (FMF-white.png, dzieci-panorama4.png, Strzalka-w-dol.png)
- Istniejacy kod: `src/app/page.tsx` -- obecna implementacja HeroSection (linie 17-181)
- [Next.js Image Component docs (App Router)](https://nextjs.org/docs/app/api-reference/components/image) -- fill prop, priority, sizing

### Secondary (MEDIUM confidence)
- WebFetch futureminds.edu.pl -- tekst misji (potwierdzony ze zrzutem ekranu i istniejacym kodem)
- WebFetch futureminds.edu.pl -- brak zielonych span w Hero (wymaga potwierdzenia z userem)

### Tertiary (LOW confidence)
- Dokladna opacity ilustracji -- nie udalo sie wyciagnac z Elementor data, wymaga wizualnego dopasowania
- Dokladne marginesy logo (px) -- szacowane z zrzutu ekranu, nie z kodu zrodlowego

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zadnych nowych bibliotek, potwierdzone w package.json
- Identyfikacja assetow: HIGH -- wizualnie zweryfikowane (dzieci-panorama4.png = rakieta Hero, Strzalka-w-dol.png = scroll indicator)
- Tekst misji: HIGH -- trojne potwierdzenie (WebFetch, istniejacy kod, zrzut ekranu)
- Layout i pozycjonowanie: HIGH -- oparte na zrzucie ekranu oryginalnej strony + Next.js Image docs
- Zielone akcenty w Hero: MEDIUM -- WebFetch mowi ze brak, ale CONTEXT.md/REQUIREMENTS wspomina o nich; wymaga potwierdzenia
- Opacity ilustracji: LOW -- wymaga wizualnego dopasowania, brak dokladnej wartosci z Elementor

**Research date:** 2026-02-04
**Valid until:** 2026-03-04 (stabilne technologie, 30 dni)

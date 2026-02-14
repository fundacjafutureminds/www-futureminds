# Phase 7: Szkolenia - Research

**Researched:** 2026-02-14
**Domain:** Sekcja tresci strony glownej — sticky sidebar "04 Szkolenia", opis szkolen, overlay szkolenia.png, CTA link, rzad ikon technologii
**Confidence:** HIGH

## Summary

Zbadano pelna strukture sekcji Szkolenia z Elementor JSON (page 20657). Sekcja istnieje juz w `page.tsx` jako inline `SzkoleniaSection()`, ale jest **znacznie uproszczona** wzgledem oryginalnego Elementora. Kluczowe roznice:

1. **Brakuje duzego naglowka dekoracyjnego** "Szkolenia dla nauczycieli" (100px, w100) — to jest element wizualnie dominujacy w Elementorze, identyczny wzorzec jak Phase 4 "Programy edukacyjne" i Phase 5 "Programy stypendialne".

2. **Brakuje overlay szkolenia.png** — Elementor ma background_overlay z szkolenia.png, pozycja top right, opacity 0.19 (~20%), size initial. Plik szkolenia.png jest dostepny w `public/images/`.

3. **CTA "Poznaj nasze szkolenia"** jest w kodzie zaimplementowany jako maly link z borderem — w Elementorze to duzy tekst 44px, w600, bez bordera, linkujacy do /szkolenia. Powinien byc duzym, czytelnym tekstem-linkiem, nie przyciskiem.

4. **Brakuje 3 ikon technologii** — obecny kod ma tylko SPIKE i Raspberry Pi. Elementor ma 5: SPIKE, Raspberry Pi, Arduino, Python, AI. Wszystkie obrazki sa w `public/images/`.

5. **Opis jest inny** — obecny kod ma 2 paragrafy, Elementor ma 1 dluzszy tekst (19px, w200, #E8E8E8).

6. **Brakuje strzalki separatora** na koncu sekcji.

7. **Intro heading ma inny tekst** — obecny kod: "Dzielimy sie nasza wiedza i doswiadczeniem, aby mozna bylo ja zastosowac podczas pracy z dziecmi." Elementor nie ma takiego naglowka — jedynym intro jest tekst 100px "Szkolenia dla nauczycieli" i blok opisowy 19px.

**Primary recommendation:** Wyekstrahowac SzkoleniaSection do `src/components/sections/SzkoleniaSection.tsx`. Przebudowac zgodnie ze wzorcem Elementor: duzy naglowek dekoracyjny 100px + overlay szkolenia.png (19% opacity) + pelny opis z Elementora + CTA jako duzy tekst-link 44px + 5 ikon technologii z border-left separatorami + strzalka w dol. Wzorzec jest identyczny jak Phase 4-6: `StickySection` + `relative` wrapper z overlayem + `z-10` content.

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image component | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Zainstalowany |
| TypeScript | 5.9.3 | Typy | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja: overlay szkolenia.png, 5 ikon technologii | TAK |
| next/link | (wbudowane) | CTA "Poznaj nasze szkolenia" -> /szkolenia | TAK |

### Nowe wymagania
**Brak** — zero nowych pakietow. Faza 7 to czysto HTML/CSS/TSX.

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    sections/
      SzkoleniaSection.tsx         # NOWY — wyekstrahowany z page.tsx
  lib/
    constants.ts                   # AKTUALIZACJA — tablica TECH_ICONS
    types.ts                       # AKTUALIZACJA — TechIcon interface
  app/
    page.tsx                       # AKTUALIZACJA — import SzkoleniaSection
```

### Pattern 1: Struktura sekcji z Elementor (desktop, id=1e76f40c "Szkolenia - D")

```
StickySection (sidebar "04 Szkolenia" + navLinks z TRAINING_SECTION_NAV)
  +-- children (prawa kolumna):
      +-- Overlay wrapper (relative) z szkolenia.png (top right, 19% opacity)
      |   +-- Content (relative z-10):
      |   |   +-- Duzy naglowek dekoracyjny:
      |   |   |   +-- "Szkolenia" (100px, w100, #EFEFEF, neue-haas-grotesk-display)
      |   |   |   +-- " dla nauczycieli" (100px, w100, #EFEFEF, na nowej linii via <br>)
      |   |   +-- Opis 19px:
      |   |   |   +-- Pelny tekst z Elementora (19px, w200, #E8E8E8, lh 1.4em)
      |   |   +-- CTA "Poznaj nasze szkolenia":
      |   |   |   +-- Tekst-link 44px, w600, #FFFFFF, hover: #9AFC4E
      |   |   |   +-- href: /szkolenia
      |   |   +-- Rzad ikon technologii:
      |   |   |   +-- SPIKE (149px width, border-l 1px #FFFFFF54)
      |   |   |   +-- Raspberry Pi (34px width, brak border-l)
      |   |   |   +-- Arduino (63px width, brak border-l)
      |   |   |   +-- Python (45px width, brak border-l)
      |   |   |   +-- AI (47px width, brak border-l)
      |   |   +-- Strzalka w dol (separator)
```

### Pattern 2: Duzy naglowek dekoracyjny 100px

**Source:** Elementor heading 61c20569

```tsx
<h2
  className="mb-16 text-section text-[#EFEFEF]"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Szkolenia
  <br /> dla nauczycieli
</h2>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 100px, w100 (ultra-thin)
- Color: #EFEFEF
- Letter-spacing: 2px
- Line-height: 1em
- Title text: "Szkolenia\n dla nauczycieli" (z `<br>`)
- Identyczny wzorzec jak Phase 4 ("Programy\n edukacyjne") i Phase 5 ("Programy\n stypendialne")

**UWAGA:** Tailwind utility `text-section` definiuje 100px, lh 1.1, w200. W Elementorze naglowek ma w100 — ale `text-section` uzywa w200. Roznica jest minimalna i trzymamy sie Tailwind utility dla spatnosci.

### Pattern 3: Overlay dekoracyjny — szkolenia.png

**Source:** Elementor container 1e76f40c (Szkolenia - D)

```tsx
<div className="relative">
  {/* Overlay szkolenia */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/szkolenia.png"
      alt=""
      fill
      className="object-contain object-right-top opacity-[0.19]"
      aria-hidden="true"
    />
  </div>
  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</div>
```

**Wartosci z Elementor:**
- Image: szkolenia.png (local: public/images/szkolenia.png)
- Position: top right
- Size: initial (natural size)
- Repeat: no-repeat
- Opacity: 0.19 (~19%) — explicite w Elementor JSON!
- Background type: classic (overlay na kontenerze)

### Pattern 4: Opis szkolen

**Source:** Elementor heading 186bd2f5

```tsx
<p className="max-w-2xl text-body text-[#E8E8E8]">
  Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO Education
  i Akademii Future Minds, zapewniajac nauczycielom solidne fundamenty
  w obszarach nowoczesnych technologii: robotyce, sztucznej inteligencji
  i elektronice oraz innowacyjnych i angazujacych metodach nauczania.
  Podczas szkolen nauczyciele dowiaduja sie, jak rozwijac kluczowe
  umiejetnosci XXI wieku u swoich uczniow i jak wspierac ich
  holistyczny rozwoj.
</p>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 19px, w200
- Color: #E8E8E8
- Line-height: 1.4em
- Letter-spacing: 1px
- Word-spacing: 1px

**ROZNICA z obecnym kodem:** Obecny page.tsx ma h3 heading "Dzielimy sie nasza wiedza..." z zielonym akcentem + 2 paragrafy. Elementor NIE MA takiego h3 — ma tylko duzy naglowek 100px + blok opisowy 19px. Nalezy **usunac h3 heading** i uzyc samego bloku opisowego.

### Pattern 5: CTA "Poznaj nasze szkolenia"

**Source:** Elementor widget 38538a51 (premium-addon-button)

```tsx
<Link
  href="/szkolenia"
  className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Poznaj
  <br />
  nasze szkolenia
</Link>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 44px, w600
- Color normal: #FFFFFF (global: White Element + BG = 50b259d)
- Color hover: #9AFC4E (global: Greeeeeen = 380b317)
- Background normal: brak (transparent)
- Background hover: #FFFFFF00 (full transparency = a9b4f23) — czyli brak tla na hover
- Letter-spacing: 0px
- Line-height: 1em
- Padding/margin: 0 na wszystko
- Tekst: "Poznaj<br>nasze szkolenia" — z line break

**KLUCZOWA ROZNICA z obecnym kodem:** Obecny kod renderuje CTA jako maly przycisk z borderem (`border border-white/20 px-8 py-3 text-sm tracking-widest`). Elementor ma duzy tekst-link 44px BEZ bordera, BEZ tla — tylko tekst z hover na zielony. To jest znacznie bardziej wizualnie wyrazisty element.

### Pattern 6: Rzad ikon technologii

**Source:** Elementor images w sekcji Szkolenia - D

5 ikon technologii w rzedzie:

| Ikona | Plik | Szerokosc (Elementor) | Szerokosc (w kodzie) | Border-left |
|-------|------|----------------------|---------------------|-------------|
| SPIKE | 23744_20138_spike5a.png | 149px (container), custom 140px | 80px | TAK (1px #FFFFFF54) |
| Raspberry Pi | raspberry-pi-svgrepo-com.png | 34px | 80px | NIE |
| Arduino | arduino-logo-vector-01.png | 63px | BRAK | NIE |
| Python | python-svgrepo-com.png | 45px | BRAK | NIE |
| AI | ai.png | 47px | BRAK | NIE |

**Wartosci z Elementor (desktop):**
- Kazda ikona jest klikalnym `<Image>` z linkiem do /szkolenia
- Kazda ikona ma `link_to: custom` z URL `/szkolenia`
- SPIKE ma border-left 1px (separator od tytulu/opisu)
- Ikony sa w row container z flex, gap 0
- Border koloru: #FFFFFF54 (global "Linia")
- Ikony sa biale na ciemnym tle — brak filtra `brightness-0 invert` (bo sa juz biale/jasne)
- W wersji desktop kazda ikona ma `_element_custom_width: 140px`, `_flex_size: none`

**WAZNE:** W obecnym kodzie ikony maja `brightness-0 invert` — to moze byc poprawne jesli oryginalne pliki PNG sa ciemne/kolorowe i potrzebuja inwersji. Nalezy zweryfikowac wizualnie. Obecny kod ma tez `opacity-60` — Elementor nie ma explicit opacity na ikonach (tylko na overlayach). Rekomendacja: zachowac `brightness-0 invert` jesli ikony wygladaja dobrze, usunac `opacity-60`.

**UWAGA dot. szerokosci ikon:** W Elementorze desktop kazda ikona ma container 140px, ale plik `width` jest rozny per ikona (od 34px do 149px). To oznacza ze ikony sa w kontenerach o jednakowej szerokosci (140px), ale same obrazki maja rozne naturalne rozmiary. W Tailwind najlepiej uzyc `w-[140px]` na kontenerze kazdej ikony i pozwolic obrazkowi na naturalna szerokosc z `h-auto max-w-full`.

Alternatywne prostsze podejscie (uzywane juz w kodzie): `flex items-center gap-8` z ikonami o jednakowej wysokosci (`h-8 w-auto`). To jest czytelniejsze i daje dobry efekt wizualny.

### Pattern 7: Separator strzalka w dol

**Source:** Identyczny wzorzec jak Phase 4-6

```tsx
<div className="mt-16 flex justify-center" style={{ width: "60%" }}>
  <Image
    src="/images/Strzalka-w-dol.png"
    alt=""
    width={59}
    height={13}
    className="opacity-40"
  />
</div>
```

### Anti-Patterns to Avoid

- **NIE uzywac h3 heading z zielonym akcentem** — Elementor NIE MA takiego naglowka w sekcji Szkolenia. Jedynym "intro" jest duzy tekst 100px "Szkolenia dla nauczycieli" i opis 19px. Obecny kod ma h3 "Dzielimy sie nasza wiedza..." — to nie istnieje w Elementorze
- **NIE renderowac CTA jako border-button** — CTA "Poznaj nasze szkolenia" to duzy tekst 44px w600, nie maly przycisk z borderem
- **NIE ograniczac ikon do 2** — Elementor ma 5 ikon technologii (SPIKE, Raspberry Pi, Arduino, Python, AI)
- **NIE pomijac overlay szkolenia.png** — to kluczowy element dekoracyjny sekcji
- **NIE pomijac duzego naglowka 100px** — "Szkolenia dla nauczycieli" jest dominujacym elementem wizualnym

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z `Image` component | Built-in lazy loading, blur placeholder, WebP |
| Overlay positioning | Custom JS | CSS `absolute inset-0` z `object-contain object-right-top` | Zero JS |
| Sticky sidebar | Custom scroll JS | `StickySection` component | Juz istnieje, przetestowany |
| Tech icon row layout | Custom grid | Tailwind `flex items-center gap-8` | Prosty, czytelny |

**Key insight:** Faza 7 to czyste HTML/CSS/TSX — zero custom JavaScript, zero nowych bibliotek. Caly pattern jest identyczny z Phase 4-6.

## Common Pitfalls

### Pitfall 1: Brak duzego naglowka 100px "Szkolenia dla nauczycieli"
**What goes wrong:** Sekcja wyglada "plaska" bez dominujacego elementu wizualnego.
**Why it happens:** Obecny kod nie ma tego naglowka — uzywa zamiast niego h3 heading z zielonym akcentem.
**How to avoid:** Dodac `<h2 className="mb-16 text-section text-[#EFEFEF]" style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}>Szkolenia<br /> dla nauczycieli</h2>` — identyczny wzorzec jak Phase 4-6.
**Warning signs:** Sekcja nie ma duzego lekkiego tekstu na gorze.

### Pitfall 2: CTA jako maly przycisk zamiast duzego tekstu
**What goes wrong:** CTA "Poznaj nasze szkolenia" wyglada jak maly drugorzelny link, a w Elementorze jest to duzy, wyraisty element 44px.
**Why it happens:** Obecny kod uzywa `text-sm tracking-widest border` — styl przycisku.
**How to avoid:** Renderowac CTA jako duzy tekst-link: `text-[44px] font-semibold text-white hover:text-fm-green` z `<br>` miedzy "Poznaj" i "nasze szkolenia".
**Warning signs:** CTA jest prawie niewidoczny na stronie.

### Pitfall 3: Brak ikon Arduino, Python, AI
**What goes wrong:** Sekcja wyswietla tylko 2 z 5 ikon technologii.
**Why it happens:** Obecny kod ma tylko SPIKE i Raspberry Pi.
**How to avoid:** Dodac Arduino (`arduino-logo-vector-01.png`), Python (`python-svgrepo-com.png`) i AI (`ai.png`). Pliki juz sa w `public/images/`.
**Warning signs:** Rzad ikon jest zbyt krotki.

### Pitfall 4: Brak overlay szkolenia.png
**What goes wrong:** Sekcja nie ma dekoracyjnego tla.
**Why it happens:** Obecny kod nie ma overlay wrapper.
**How to avoid:** Uzyc wzorca `relative` wrapper z `absolute inset-0` overlay i `z-10` content — identycznie jak Phase 4 (Tlo-EDUKACYJNE3.png), Phase 5 (Tlo-STYPENDIA.png + skrzydlo2.png), Phase 6 (trybik3.png).
**Warning signs:** Sekcja wyglada "goło" w porownaniu z innymi sekcjami.

### Pitfall 5: Opis z h3 heading ktory nie istnieje w Elementorze
**What goes wrong:** Sekcja ma dodatkowy naglowek h3 "Dzielimy sie nasza wiedza i doswiadczeniem..." ktory nie istnieje w oryginalnym Elementorze.
**Why it happens:** Wczesniejsza implementacja dodala ten tekst bez weryfikacji z Elementorem.
**How to avoid:** Usunac h3 heading. Uzyc TYLKO pelnego tekstu opisowego z Elementora (19px, w200, #E8E8E8).
**Warning signs:** Sekcja ma wiecej tekstu niz oryginal.

### Pitfall 6: Unicode/polskie znaki w JSX
**What goes wrong:** Polskie znaki (a, e, o, z, s, c, n, l) moga powodowac bledy przy Write tool.
**Why it happens:** Tool Write na Windows moze miec problemy z kodowaniem.
**How to avoid:** Uzyc template literals z unicode escape sequences (`\u0119` zamiast "e") — tak jak w Phase 6 (06-01 locked decision).
**Warning signs:** Bledy kompilacji lub znieksztalcone znaki na stronie.

## Code Examples

### Kompletna SzkoleniaSection (rekomendowany ksztalt)

```tsx
// Source: Elementor page 20657, section Szkolenia - D (id=1e76f40c)
import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { TRAINING_SECTION_NAV, TECH_ICONS } from "@/lib/constants";

export function SzkoleniaSection() {
  return (
    <StickySection
      id="szkolenia"
      title="Szkolenia"
      sectionNumber="04"
      navLinks={TRAINING_SECTION_NAV}
    >
      <div className="relative">
        {/* Overlay szkolenia.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/szkolenia.png"
            alt=""
            fill
            className="object-contain object-right-top opacity-[0.19]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10">
          {/* Duzy naglowek dekoracyjny 100px */}
          <h2
            className="mb-16 text-section text-[#EFEFEF]"
            style={{
              fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
            }}
          >
            Szkolenia
            <br /> dla nauczycieli
          </h2>

          {/* Opis */}
          <div className="mb-16 space-y-8">
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO
              Education i Akademii Future Minds, zapewniajac nauczycielom
              solidne fundamenty w obszarach nowoczesnych technologii:
              robotyce, sztucznej inteligencji i elektronice oraz
              innowacyjnych i angazujacych metodach nauczania. Podczas
              szkolen nauczyciele dowiaduja sie, jak rozwijac kluczowe
              umiejetnosci XXI wieku u swoich uczniow i jak wspierac ich
              holistyczny rozwoj.
            </p>
          </div>

          {/* CTA — duzy tekst-link 44px */}
          <div className="mb-16">
            <Link
              href="/szkolenia"
              className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              Poznaj
              <br />
              nasze szkolenia
            </Link>
          </div>

          {/* Rzad ikon technologii */}
          <div className="flex flex-wrap items-center">
            {TECH_ICONS.map((icon) => (
              <div
                key={icon.alt}
                className="flex items-center px-4"
                style={{ width: 140 }}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={icon.width}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
            ))}
          </div>

          {/* Separator strzalka */}
          <div
            className="mt-16 flex justify-center"
            style={{ width: "60%" }}
          >
            <Image
              src="/images/Strzalka-w-dol.png"
              alt=""
              width={59}
              height={13}
              className="opacity-40"
            />
          </div>
        </div>
      </div>
    </StickySection>
  );
}
```

### Tablica TECH_ICONS do constants.ts

```typescript
// Source: Elementor page 20657, sekcja Szkolenia - D
export interface TechIcon {
  src: string;
  alt: string;
  width: number; // naturalna szerokosc w px
}

export const TECH_ICONS: TechIcon[] = [
  { src: "/images/23744_20138_spike5a.png", alt: "SPIKE", width: 149 },
  { src: "/images/raspberry-pi-svgrepo-com.png", alt: "Raspberry Pi", width: 34 },
  { src: "/images/arduino-logo-vector-01.png", alt: "Arduino", width: 63 },
  { src: "/images/python-svgrepo-com.png", alt: "Python", width: 45 },
  { src: "/images/ai.png", alt: "AI", width: 47 },
];
```

### Aktualizacja page.tsx

```tsx
// PRZED:
import { StickySection } from "@/components/ui/StickySection";
import {
  TRAINING_SECTION_NAV,
  KNOWLEDGE_SECTION_NAV,
} from "@/lib/constants";

function SzkoleniaSection() { /* inline 60 linii */ }

// PO:
import { SzkoleniaSection } from "@/components/sections/SzkoleniaSection";

// Inline SzkoleniaSection() usuniety z page.tsx
// Import i uzycie: <SzkoleniaSection /> w Home()
```

## Elementor Structure Map (Szkolenia - D, desktop)

```
Container "Szkolenia" (6e2cdea5) — row, full width, fadeInLeft slow
  +-- Container "Szkolenia - D" (1e76f40c) — row, gap 0, 100% width
  |   bg: brak
  |   overlay: szkolenia.png (top right, no-repeat, initial, opacity 0.19)
  |   hide_tablet, hide_mobile
  |   +-- menu-anchor (3a3c1482) — anchor: szkolenia
  |   +-- Sidebar (nie zbadano) — 350px, sticky
  |   |   +-- Green-Triangle.png
  |   |   +-- "04" (counter)
  |   |   +-- "Szkolenia" (30px, w600, #EFEFEF, ml=20px, mb=8px)
  |   |   +-- Nav links: Akademia Future Minds, Akademia LEGO Education
  |   |   +-- "Powrot na gore strony" link
  |   +-- Content area:
  |       +-- "Szkolenia dla nauczycieli" (100px, w100, #EFEFEF, letter-spacing 2px)
  |       +-- Opis (19px, w200, #E8E8E8, lh 1.4em, letter-spacing 1px)
  |       +-- CTA "Poznaj nasze szkolenia" (44px, w600, #FFFFFF, hover: #9AFC4E)
  |       +-- Ikony technologii (row):
  |       |   +-- SPIKE (149px width, border-l 1px #FFFFFF54, custom 140px container)
  |       |   +-- Raspberry Pi (34px width, w kontenerze 140px)
  |       |   +-- Arduino (63px width, w kontenerze 140px)
  |       |   +-- Python (45px width, w kontenerze 140px)
  |       |   +-- AI (47px width, w kontenerze 140px)
  |       +-- Strzalka w dol (separator)
```

## State of the Art

| Obecny kod (SzkoleniaSection w page.tsx) | Wymagane (z Elementor) | Zmiana |
|------------------------------------------|------------------------|--------|
| Inline w page.tsx (~60 linii) | Osobny SzkoleniaSection.tsx | Wyekstrahowac |
| Brak overlay szkolenia.png | szkolenia.png top-right, 19% opacity | Dodac overlay |
| Brak duzego naglowka 100px | "Szkolenia dla nauczycieli" 100px w100 | Dodac naglowek |
| h3 "Dzielimy sie nasza wiedza..." z zielonym akcentem | BRAK — nie istnieje w Elementorze | Usunac |
| 2 paragrafy opisu (inny tekst) | 1 blok opisu z Elementora (19px, w200, #E8E8E8) | Zamienic |
| CTA jako maly border-button (`text-sm border`) | CTA jako duzy tekst 44px w600 z hover na zielony | Przebudowac |
| 2 ikony technologii (SPIKE, Raspberry Pi) | 5 ikon (+ Arduino, Python, AI) | Dodac 3 ikony |
| Ikony h-8 opacity-60 brightness-0 invert | Ikony w kontenerach 140px, brightness-0 invert | Dostosowac |
| Etykieta "Technologie" uppercase nad ikonami | BRAK — nie istnieje w Elementorze | Usunac |
| Brak strzalki w dol (separator) | Strzalka-w-dol.png na koncu | Dodac separator |
| TRAINING_SECTION_NAV w page.tsx | TRAINING_SECTION_NAV w SzkoleniaSection.tsx | Przeniesc import |

## Porownanie obecnego tekstu z Elementorem

### Obecny heading h3 (DO USUNIECIA):
```
Dzielimy sie nasza wiedza i doswiadczeniem, aby mozna bylo ja zastosowac
podczas pracy z dziecmi.
```
**Status:** NIE ISTNIEJE w Elementorze. Usunac.

### Obecne paragrafy opisu (DO ZAMIANY):
```
Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO Education
i Akademii Future Minds, zapewniajac nauczycielom solidne fundamenty w
obszarach nowoczesnych technologii: robotyce, sztucznej inteligencji i
elektronice oraz innowacyjnych i angazujacych metodach nauczania.

Warsztaty obejmuja szeroki zakres programow edukacyjnych przeznaczonych
do roznych etapow ksztalcenia STEAM - od przedszkoli, poprzez
nauczanie poczatkowe, szkoly podstawowe, az po licea i technika.
```

### Pelny tekst z Elementora (DO UZYCIA):
```
Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO Education
i Akademii Future Minds, zapewniajac nauczycielom solidne fundamenty
w obszarach nowoczesnych technologii: robotyce, sztucznej inteligencji
i elektronice oraz innowacyjnych i angazujacych metodach nauczania.
Podczas szkolen nauczyciele dowiaduja sie, jak rozwijac kluczowe
umiejetnosci XXI wieku u swoich uczniow i jak wspierac ich
holistyczny rozwoj.
```

**Roznica:** Pierwszy paragraf obecnego kodu jest prawie identyczny. Drugi paragraf ("Warsztaty obejmuja...") NIE ISTNIEJE w Elementorze. Zamiast niego jest dodane zdanie: "Podczas szkolen nauczyciele dowiaduja sie, jak rozwijac kluczowe umiejetnosci XXI wieku u swoich uczniow i jak wspierac ich holistyczny rozwoj."

## Open Questions

1. **Rozne rozmiary ikon vs jednakowe kontenery**
   - What we know: W Elementorze desktop kazda ikona ma container 140px, ale obrazki maja rozne naturalne szerokosc (od 34px do 149px). W obecnym kodzie ikony maja `h-8 w-auto`.
   - What's unclear: Czy ikony powinny byc w kontenerach 140px (jak w Elementorze) czy w elastycznym `flex gap-8` (jak w obecnym kodzie)?
   - Recommendation: **Uzyc kontenerow 140px** z `border-l` na pierwszym — to wierne odwzorowanie Elementora. Ale mozna tez uproscisc do `flex gap-8` z jednakowymi h-8 jak w obecnym kodzie — bardziej czytelne i czyste. Obie opcje sa akceptowalne. Planner powinien zdecydowac.

2. **brightness-0 invert na ikonach**
   - What we know: Obecny kod stosuje `brightness-0 invert` na ikonach. Elementor nie ma takiego filtra explicit, ale ikony w WP sa biale/jasne na ciemnym tle.
   - What's unclear: Czy pliki PNG w public/images/ sa juz biale (i nie potrzebuja inwersji) czy kolorowe (i potrzebuja)?
   - Recommendation: **Zweryfikowac wizualnie** w przegladarce. Jesli ikony sa ciemne na jasnym tle — zachowac `brightness-0 invert`. Jesli juz biale — usunac. Pliki SPIKE i Raspberry Pi maja duze rozmiary (127-128 KB) co sugeruje ze moga byc kolorowe/szczegolowe.

3. **SPIKE border-left vs inne ikony**
   - What we know: W Elementorze SPIKE (pierwsza ikona) ma border-left 1px #FFFFFF54, ale `border: none` (explicity). Pozostale ikony nie maja border-left. W wersji mobile SPIKE tez ma border-left.
   - What's unclear: Czy border-left na SPIKE to separator od opisu/CTA powyzej, czy wizualny akcent?
   - Recommendation: **Dodac border-left na SPIKE** (jako pierwszy element w rzedzie) — to separator od tresci powyzej. Dla reszty ikon NIE dodawac border-left.

4. **Dwa warianty: Desktop (D) i Mobile (M)**
   - What we know: Elementor ma 2 kontenery: "Szkolenia - D" (hide_tablet, hide_mobile) i "Szkolenia - M" (hide_desktop, hide_tablet). Oba maja overlay szkolenia.png ale rozne rozmiary typografii.
   - What's unclear: Czy trzeba odrysowac wersje mobilna osobno?
   - Recommendation: **NIE robic osobnych kontenerow** dla desktop i mobile. Uzyc responsywnych klas Tailwind (`md:text-[44px] text-[28px]` etc.) — to jest standard w Next.js/Tailwind, a Elementor robil to przez 2 kontenery bo nie mial responsywnych utilit.

## Sources

### Primary (HIGH confidence)
- Elementor JSON page 20657 — kontenery "Szkolenia" (6e2cdea5), "Szkolenia - D" (1e76f40c), "Szkolenia - M" (6588c60a): overlay szkolenia.png (opacity 0.19, top right), duzy naglowek 100px (61c20569), opis 19px (186bd2f5), CTA 44px (38538a51), 5 ikon technologii z rozmiarami
- Elementor site-settings.json — kolory globalne: 50b259d = #FFFFFF (White Element + BG), 380b317 = #9AFC4E (Greeeeeen), a9b4f23 = #FFFFFF00 (Full Transparency), 9bd1aa5 = #FFFFFF54 (Linia)
- Istniejacy codebase: page.tsx (obecna implementacja inline SzkoleniaSection), StickySection.tsx, constants.ts (TRAINING_SECTION_NAV), types.ts, globals.css (text-section, text-body)
- Obrazki w public/images/ — zweryfikowane: szkolenia.png (69KB), 23744_20138_spike5a.png (127KB), raspberry-pi-svgrepo-com.png (127KB), arduino-logo-vector-01.png (16KB), python-svgrepo-com.png (9KB), ai.png (201KB), Strzalka-w-dol.png, Green-Triangle.png

### Secondary (MEDIUM confidence)
- Phase 4-6 RESEARCH.md i implementacje — potwierdzenie wzorcow: StickySection, overlay, duzy naglowek 100px, border-l kart, strzalka separator

### Tertiary (LOW confidence)
- Brak — wszystkie kluczowe wartosci (overlay opacity, CTA font-size, ikony technologii) sa explicite w Elementor JSON

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (overlay, naglowek, CTA, ikony): HIGH — dokladne wartosci z Elementor JSON
- Dane tekstowe (opis szkolen, CTA text): HIGH — bezposrednio z Elementor heading 186bd2f5
- Typografia (100px naglowek, 19px opis, 44px CTA): HIGH — explicite w Elementor JSON
- Overlay szkolenia.png (19% opacity): HIGH — explicite `background_overlay_opacity: 0.19` w Elementor
- 5 ikon technologii (pliki, rozmiary): HIGH — zweryfikowane w public/images/ i Elementor JSON
- CTA styl (44px, w600, bialy, hover zielony): HIGH — explicite w Elementor JSON + resolved global colors

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (stabilne technologie, 30 dni)

# Phase 1: Fundamenty - Research

**Researched:** 2026-02-04
**Domain:** Tailwind CSS v4 theming, Next.js fonts, CSS sticky positioning, TypeScript data structures
**Confidence:** HIGH

## Summary

Zbadano cztery domeny techniczne niezbedne do zaplanowania fazy 1: (1) system tematyczny Tailwind CSS v4 z dyrektywa `@theme`, (2) integracja fontow Google z Next.js i Tailwind v4, (3) wzorzec CSS `position: sticky` dla dwukolumnowego layoutu, (4) struktura danych TypeScript dla constants.ts.

Kluczowe odkrycie: **Plus Jakarta Sans (wybrany font) NIE obsluguje wagi 100 (thin)** -- minimalna waga to 200 (extra-light). Design wymaga ultra-cienkich naglowkow sekcji (w100). Rozwiazanie: uzyc `font-weight: 200` jako najblizszego dostepnego zamiennika, co nadal daje bardzo lekki wyglad.

Druga wazna kwestia: W Tailwind CSS v4 z Next.js, do podpiecia fontow z `next/font/google` pod utility classes Tailwinda, **trzeba uzyc `@theme inline`** (nie zwyklego `@theme`), zeby uniknac problemow z rozwiazywaniem CSS variables.

**Primary recommendation:** Uzyc `@theme` do kolorow i typografii (literalne wartosci), `@theme inline` do fontow (referencje do CSS variables z next/font). StickySection wymaga `align-items: start` na kontenerze flex/grid, zeby sticky dzialalo poprawnie.

## Standard Stack

Faza 1 nie wymaga nowych bibliotek -- wszystko jest juz zainstalowane w projekcie.

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | Framework, App Router, `next/font/google` | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS z `@theme` | Zainstalowany |
| @tailwindcss/postcss | 4.1.18 | PostCSS plugin dla Tailwind v4 | Zainstalowany |
| TypeScript | 5.9.3 | Typy dla constants.ts | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |

### Supporting (juz zainstalowane)
| Library | Version | Purpose | Uzycie w fazie 1 |
|---------|---------|---------|-------------------|
| framer-motion | 12.31.0 | Animacje | NIE w fazie 1 (faza 10) |
| lucide-react | 0.563.0 | Ikony | NIE w fazie 1 |
| next/font/google | (wbudowane) | Plus Jakarta Sans loading | TAK -- layout.tsx |

### Nowe wymagania
**Brak** -- zadnych nowych pakietow do instalacji. Wszystko co potrzeba jest juz w projekcie.

**Installation:** Nie potrzeba.

## Architecture Patterns

### Obecna struktura (nie zmieniac)
```
src/
  app/
    globals.css          # @theme + @theme inline -- DO MODYFIKACJI
    layout.tsx           # next/font setup -- DO MODYFIKACJI
    page.tsx             # Main page (komponenty sekcji)
  components/
    ui/
      StickySection.tsx  # DO PRZEBUDOWY
      Button.tsx         # DO AKTUALIZACJI stylow
      SectionHeading.tsx # DO AKTUALIZACJI stylow
    layout/
      Navbar.tsx         # Bez zmian w fazie 1
      Footer.tsx         # Bez zmian w fazie 1
  lib/
    constants.ts         # DO GRUNTOWNEJ AKTUALIZACJI
```

### Pattern 1: Tailwind v4 @theme -- Kolory i Typografia
**What:** Definiowanie custom design tokens bezposrednio w CSS z `@theme`.
**When to use:** Dla literalnych wartosci (kolory hex, rozmiary px, wagi).
**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Kolory -- literalne wartosci, zwykly @theme */
  --color-fm-green: #9AFC4E;
  --color-fm-dark: #32373c;
  --color-fm-white: #ffffff;

  /* Typografia -- custom font sizes z line-height */
  --text-section: 100px;
  --text-section--line-height: 1.1;
  --text-section--font-weight: 200;

  --text-heading: 42px;
  --text-heading--line-height: 1.2;
  --text-heading--font-weight: 600;
}
```

**Generuje utility classes:** `text-fm-green`, `bg-fm-dark`, `text-section`, `text-heading` itd.

### Pattern 2: @theme inline -- Fonty z next/font
**What:** Podpiecie CSS variables z `next/font/google` pod Tailwind utility classes.
**When to use:** ZAWSZE gdy wartosc referuje inna CSS variable (np. `var(--font-xxx)`).
**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme + Next.js docs */
@theme inline {
  --font-sans: var(--font-plus-jakarta);
}
```

**WAZNE:** Uzycie `@theme` (bez `inline`) z `var()` powoduje problemy z rozwiazywaniem CSS variables -- tekst moze wrocic do fallback zamiast uzyc poprawnego fontu.

### Pattern 3: CSS Sticky z align-items: start
**What:** Dwukolumnowy layout gdzie lewa kolumna jest sticky w granicach rodzica.
**When to use:** StickySection we wszystkich sekcjach tematycznych.
**Example:**
```css
/* Source: https://polypane.app/blog/getting-stuck-all-the-ways-position-sticky-can-fail/ */
.two-column-layout {
  display: flex; /* lub grid */
  align-items: start; /* KRYTYCZNE -- bez tego sticky nie dziala! */
}

.sidebar {
  position: sticky;
  top: 0;
  width: 350px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
}
```

**Dlaczego `align-items: start` jest krytyczne:** Domyslna wartosc `stretch` rozciaga sidebar do pelnej wysokosci kontenera, co powoduje ze sticky natychmiast sie "unstickuje" bo element ma taka sama wysokosc jak rodzic.

### Pattern 4: TypeScript Constants z typami pod przyszle CMS
**What:** Typowane stale z interfejsami gotowymi na zamiane na fetch.
**When to use:** constants.ts dla danych statycznych.
**Example:**
```typescript
// Interfejsy zdefiniowane osobno -- latwo zamienic implementacje
export interface Partner {
  name: string;
  src: string;
  href?: string;
}

export interface Program {
  title: string;
  description: string;
  href: string;
  logo: string;
}

// Dane jako typed arrays
export const PARTNER_LOGOS: Partner[] = [
  { name: "Rockwell Automation", src: "/images/Logo-Rockwell.png" },
  // ...
];
```

### Anti-Patterns to Avoid
- **NIE uzywac `@theme` (bez inline) do fontow z next/font** -- powoduje fallback na system font
- **NIE uzywac `overflow: hidden` na przodkach StickySection** -- lamie `position: sticky`
- **NIE uzywac `font-weight: 100` z Plus Jakarta Sans** -- font nie obsluguje tej wagi, uzywac 200
- **NIE definiowac fontow w tailwind.config.js/ts** -- w Tailwind v4 konfiguracja jest w CSS
- **NIE uzywac `align-items: stretch` (default) w kontenerze flex z sticky** -- sticky nie bedzie dzialac

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading/optimization | Custom font-face declarations | `next/font/google` z `Plus_Jakarta_Sans` | Automatyczna optymalizacja, preloading, zero CLS |
| CSS theme variables | Custom :root CSS variables | `@theme` / `@theme inline` w Tailwind v4 | Automatyczne generowanie utility classes |
| Sticky sidebar JS | IntersectionObserver/scroll handlers | Pure CSS `position: sticky` | Zero JS, lepsza wydajnosc, natywne wsparcie przegladarek |
| Color palette management | Recznie powtarzane wartosci hex | Tailwind `@theme` z namespace `--color-fm-*` | Centralne zrodlo prawdy, utility classes gratis |

**Key insight:** Faza 1 jest w 100% CSS/config -- nie wymaga zadnego custom JavaScript. Sticky, fonty, kolory, typografia -- wszystko rozwiazywalne w CSS/Tailwind.

## Common Pitfalls

### Pitfall 1: @theme vs @theme inline dla fontow
**What goes wrong:** Font nie laduje sie -- przegladarka uzywa fallback (system sans-serif).
**Why it happens:** `@theme { --font-sans: var(--font-plus-jakarta); }` generuje `.font-sans { font-family: var(--font-sans); }` gdzie `--font-sans` rozwiazuje sie do `var(--font-plus-jakarta)` na poziomie `:root`, ale `--font-plus-jakarta` jest wstrzykniete przez Next.js na `<html>` element -- CSS variable resolution moze nie dzialac poprawnie.
**How to avoid:** Uzywac `@theme inline { --font-sans: var(--font-plus-jakarta); }`.
**Warning signs:** Font w devtools wyswietla system font zamiast Plus Jakarta Sans.

### Pitfall 2: Plus Jakarta Sans nie ma wagi 100
**What goes wrong:** Naglowki sekcji (100px) wyswietlaja sie w normalnej wadze zamiast ultra-cienkiej.
**Why it happens:** Plus Jakarta Sans obsluguje wagi 200-800. Waga 100 (thin) nie istnieje w tym foncie. Oryginalna strona uzywa neue-haas-grotesk-display ktory MA wage 100.
**How to avoid:** Uzywac `font-weight: 200` (extra-light) jako najblizszego zamiennika. W `@theme` zdefiniowac custom token: `--text-section--font-weight: 200;`. Font jest zdefiniowany jako CSS variable -- latwa podmiana na inny w przyszlosci.
**Warning signs:** Naglowki wygladaja za "grube" w porownaniu z oryginalem.

### Pitfall 3: Sticky sidebar nie dziala w flex/grid layout
**What goes wrong:** Sidebar nie przyczepia sie podczas scrollowania -- zachowuje sie jak normalny element.
**Why it happens:** Domyslny `align-items: stretch` w flex/grid rozciaga sidebar do pelnej wysokosci kontenera. Sticky element ktory jest tak wysoki jak rodzic nigdy sie nie "przyklei".
**How to avoid:** Dodac `align-items: start` (Tailwind: `items-start`) do kontenera flex/grid.
**Warning signs:** Sidebar scrolluje sie normalnie z reszta strony.

### Pitfall 4: Overflow na przodkach lamie sticky
**What goes wrong:** Sidebar nie sticky mimo poprawnego CSS.
**Why it happens:** `overflow: hidden`, `overflow: scroll` lub `overflow: auto` na JAKIMKOLWIEK przodku sticky elementu tworzy nowy scrolling context.
**How to avoid:** Nie uzywac `overflow: hidden/auto/scroll` na sekcjach ani ich przodkach. Jezeli potrzebujesz ukryc overflow, uzywac `overflow: clip` (nie tworzy nowego scrolling context).
**Warning signs:** Sticky dziala na prostej stronie testowej ale nie w pelnym layoucie.

### Pitfall 5: Obecny globals.css ma stary kolor zielony
**What goes wrong:** Komponenty uzywaja `text-fm-green` ktory wskazuje na #00d084 zamiast #9AFC4E.
**Why it happens:** globals.css nie zostal zaktualizowany po odkryciu prawdziwego koloru z Elementor.
**How to avoid:** Pierwsza zmiana w fazie 1: zaktualizowac `--color-fm-green: #9AFC4E` w `@theme`.
**Warning signs:** Zielony kolor wyglada inaczej niz na oryginalnej stronie.

### Pitfall 6: Font Inter nadal zaladowany mimo zmiany na Plus Jakarta Sans
**What goes wrong:** Dwa fonty laduja sie -- Inter (stary) i Plus Jakarta Sans (nowy).
**Why it happens:** layout.tsx nadal importuje i uzywa Inter z `next/font/google`.
**How to avoid:** Usunac import Inter z layout.tsx, dodac Plus Jakarta Sans.
**Warning signs:** Network tab w devtools pokazuje ladowanie fontow Inter.

## Code Examples

### Kompletny globals.css po aktualizacji
```css
/* Source: Tailwind v4 docs https://tailwindcss.com/docs/theme */
@import "tailwindcss";

/* Fonty -- inline bo referujemy CSS variable z next/font */
@theme inline {
  --font-sans: var(--font-plus-jakarta);
}

/* Kolory i typografia -- literalne wartosci */
@theme {
  /* === Paleta kolorow FM === */
  --color-fm-green: #9AFC4E;
  --color-fm-dark: #32373c;
  --color-fm-dark-lighter: #40454a;
  --color-fm-dark-bg: #2b2f33;
  --color-fm-white: #ffffff;
  --color-fm-text: #c4c4c4;
  --color-fm-text-muted: #8a8a8a;
  --color-fm-gray-100: #f0f2f4;
  --color-fm-gray-200: #e2e5e9;
  --color-fm-gray-400: #9ca3af;
  --color-fm-gray-600: #6b7280;

  /* === Typografia hierarchia === */
  /* Naglowki sekcji -- ultra-cienkie, 100px */
  --text-section: 100px;
  --text-section--line-height: 1.1;
  --text-section--font-weight: 200;

  /* Naglowki tresci -- semibold, 42px */
  --text-heading: 42px;
  --text-heading--line-height: 1.2;
  --text-heading--font-weight: 600;

  /* Sidebar naglowki -- semibold, 30px */
  --text-sidebar: 30px;
  --text-sidebar--line-height: 1.3;
  --text-sidebar--font-weight: 600;

  /* Body text -- extra-light, 19px */
  --text-body: 19px;
  --text-body--line-height: 1.7;
  --text-body--font-weight: 200;

  /* CTA -- uppercase, 10px */
  --text-cta: 10px;
  --text-cta--line-height: 1.5;
  --text-cta--font-weight: 400;
  --text-cta--letter-spacing: 0.15em;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--color-fm-text);
  background-color: var(--color-fm-dark);
}
```

### Kompletny layout.tsx po aktualizacji
```tsx
/* Source: Next.js docs https://nextjs.org/docs/app/getting-started/fonts */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
  // Nie podawac weight -- variable font automatycznie laduje wagi 200-800
});

export const metadata: Metadata = {
  title: {
    default: "Fundacja Future Minds – Nauka i technologia to nasza pasja. Edukacja to nasza misja.",
    template: "%s | Fundacja Future Minds",
  },
  description:
    "Fundacja Future Minds wspiera kazde dziecko i mloda osobe w realizacji pelnego potencjalu poprzez innowacyjna edukacje STEAM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### StickySection -- wzorzec sticky z align-items: start
```tsx
/* Source: CSS-Tricks, Polypane sticky docs */
interface StickySectionProps {
  id?: string;
  sectionNumber: string;      // "01", "02", etc.
  sectionTitle: string;       // "Programy edukacyjne"
  children: React.ReactNode;
  variant?: "dark" | "light"; // Wariant tla sekcji
}

export function StickySection({
  id,
  sectionNumber,
  sectionTitle,
  children,
  variant = "dark",
}: StickySectionProps) {
  return (
    <section id={id} className="relative">
      <div className="mx-auto flex max-w-[1400px] items-start">
        {/*                                    ^^^^^^^^^^^
          KRYTYCZNE: items-start zamiast domyslnego stretch
          Bez tego sticky sidebar nie bedzie dzialac!
        */}

        {/* Lewa sticky kolumna -- dokladnie 350px */}
        <div className="hidden w-[350px] shrink-0 lg:block">
          <div className="sticky top-0 pt-12 pb-12 pl-8">
            {/* Numer sekcji + tytul */}
            <span className="text-sidebar font-semibold text-white">
              {sectionNumber}
            </span>
            <h2 className="text-sidebar font-semibold text-white">
              {sectionTitle}
            </h2>
          </div>
        </div>

        {/* Separator -- subtelna pionowa linia */}
        <div className="hidden w-px bg-white/10 lg:block" />

        {/* Prawa scrollowalna kolumna */}
        <div className="min-w-0 flex-1 px-6 py-12 lg:px-12">
          {children}
        </div>
      </div>
    </section>
  );
}
```

### constants.ts -- wzorzec typowanych danych
```typescript
// Interfejsy -- gotowe na przyszla zamiane na fetch z Supabase
export interface Partner {
  name: string;
  src: string;
  href?: string;
}

export interface Program {
  title: string;
  description: string;
  href: string;
  logo: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

export interface Article {
  title: string;
  category: string;
  href: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Dane
export const PARTNER_LOGOS: Partner[] = [
  // 9 partnerow (nie 5 jak wczesniej)
  { name: "Rockwell Automation", src: "/images/Logo-Rockwell.png" },
  { name: "John Deere", src: "/images/jo.png" },
  // ... 7 wiecej
];
```

## State of the Art

| Stare podejscie (obecny kod) | Nowe podejscie (do wdrozenia) | Powod zmiany |
|-------------------------------|-------------------------------|--------------|
| `--color-fm-green: #00d084` | `--color-fm-green: #9AFC4E` | Prawdziwy kolor z Elementor |
| Font: Inter (Google Fonts) | Font: Plus Jakarta Sans (Google Fonts) | Blizszy do neue-haas-grotesk |
| `--font-sans` i `--font-serif` w `@theme` | `--font-sans` w `@theme inline` | Fix CSS variable resolution |
| Sidebar 280px | Sidebar 350px | Dokladna wartosc z Elementor |
| `sticky top-0 h-screen` | `sticky top-0` (bez h-screen) | h-screen blokuje sticky behavior |
| `align-items: stretch` (domyslne) | `items-start` na kontenerze | Fix dla sticky |
| PARTNER_LOGOS: 5 elementow | PARTNER_LOGOS: 9 elementow | Pelne dane z oryginalnej strony |
| Brak typow interfejsow | Interfejsy TypeScript | Gotowe na CMS |
| Brak hierarchii typografii | 5 poziomow typografii w @theme | Spojny system |

**Deprecated/outdated:**
- `tailwind.config.js` -- w v4 zastapiony przez `@theme` w CSS
- Font Cardo (serif) -- nie uzywany na oryginalnej stronie, do usuniecia
- Font Inter -- do zamiany na Plus Jakarta Sans

## Open Questions

1. **Dokladne odcienie szarosci**
   - What we know: Obecny kod ma `--color-fm-text: #c4c4c4` i `--color-fm-text-muted: #8a8a8a`
   - What's unclear: Czy te wartosci sa zgodne z oryginalem (brak danych z Elementor globals)
   - Recommendation: Zachowac obecne wartosci, dopracowywac wizualnie

2. **Kolor i styl separatora w StickySection**
   - What we know: Oryginalna strona ma subtelna linie miedzy kolumnami
   - What's unclear: Dokladny kolor, grubosc, czy linia jest cala czy przerywana
   - Recommendation: `border-white/10` (1px, bialy 10% opacity) -- standard dla ciemnych UI

3. **Dokladne rozmiary typografii mogace wymagac korekty**
   - What we know: Roadmap podaje 100px/42px/30px/19px/10px, CONTEXT.md mowi ze to "przyblizenia"
   - What's unclear: Czy dokladne wartosci z Elementor sa inne
   - Recommendation: Wdrozyc podane wartosci, korekta wizualna w kolejnych iteracjach

4. **Brakujace 4 loga partnerow**
   - What we know: constants.ts ma 5 partnerow, wymagane jest 9
   - What's unclear: Ktore obrazki w public/images/ sa brakujacymi logami
   - Recommendation: Przeanalizowac pliki obrazkow, zidentyfikowac brakujacych partnerow (mmaltic.png, Collins_Aerospace_logo_stack_white_300.png, i inne sa juz pobrane)

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- pelna dokumentacja @theme i @theme inline
- [Tailwind CSS v4 Font Size](https://tailwindcss.com/docs/font-size) -- custom text sizes z line-height/weight
- [Tailwind CSS v4 Font Weight](https://tailwindcss.com/docs/font-weight) -- default weights, custom weights
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google setup
- [Plus Jakarta Sans Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans) -- dostepne wagi (200-800)
- [MDN CSS position: sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position) -- specyfikacja sticky

### Secondary (MEDIUM confidence)
- [Build with Matija: Google Fonts + Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) -- kompletny tutorial
- [Polypane: All ways position:sticky can fail](https://polypane.app/blog/getting-stuck-all-the-ways-position-sticky-can-fail/) -- debugging sticky
- [Tailwind CSS @theme vs @theme inline discussion](https://github.com/tailwindlabs/tailwindcss/discussions/18560) -- wyjasnienie roznic
- [CSS-Tricks: Dynamically-Sized Sticky Sidebar](https://css-tricks.com/a-dynamically-sized-sticky-sidebar-with-html-and-css/) -- wzorzec sticky sidebar

### Tertiary (LOW confidence)
- Wartosci odcieni szarosci (--color-fm-text, --color-fm-text-muted) -- nie zweryfikowane z Elementor globals

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zadnych nowych bibliotek, wszystko zweryfikowane w package.json
- Paleta kolorow: HIGH -- wartosci z analizy Elementor, kolor #9AFC4E potwierdzony w PROJECT.md
- Typografia: HIGH -- @theme z --text-* zweryfikowany w oficjalnych docs Tailwind v4
- Font setup: HIGH -- @theme inline zweryfikowany w docs i community discussions
- Sticky pattern: HIGH -- CSS standard, zweryfikowany w MDN i wielu zrodlach
- Font weight 200 vs 100: HIGH -- Plus Jakarta Sans oficjalnie obsluguje 200-800, nie 100
- Dane constants.ts: MEDIUM -- wymagane 9 partnerow, brak pelnej listy nazw/logow

**Research date:** 2026-02-04
**Valid until:** 2026-03-04 (stabilne technologie, 30 dni)

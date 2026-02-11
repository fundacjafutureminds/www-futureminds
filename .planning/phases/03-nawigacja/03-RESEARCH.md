# Phase 3: Nawigacja - Research

**Researched:** 2026-02-11
**Domain:** Nawigacja sticky z kolumną linków, dekoracyjne trójkąty, animacje fadeIn
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Podejście migracyjne
- Migracja 1:1 z Elementora — odczytujemy dokładne wartości z JSON, nie zgadujemy
- Źródło prawdy: `elementor/content/page/12561.json` (struktura) + `elementor/site-settings.json` (globalne)
- WordPress REST API dostępny do pobierania mediów
- Po migracji 1:1 → łatwe modyfikacje w React/Tailwind

#### Pozycjonowanie i układ
- Navbar jest **sticky** (`sticky_parent: yes`)
- Kontener: flex column, width 100%, padding 0, margin 0
- Logo po lewej (margin-left: 40px), linki poniżej w kolumnie
- Spacery: 70px i 501px (duży spacer na dole)

#### Logo
- Plik: `FMF-white.png` (już w public/images)
- Szerokość: 180px (custom dimension: 100x100)
- Wyrównanie: left, margin-left: 40px
- Animacja: fadeInDown
- Link: strona główna

#### Styl linków
- Font: `neue-haas-grotesk-display`, 20px, weight 300, letter-spacing: 1.1px, line-height: 1em
- Kolor tekstu: #EAEAEA (jasny szary)
- Kolor hover: #9AFC4E (zielony — `globals/colors?id=380b317`)
- Tło przycisków: przezroczyste (#00000000)
- Margin-left: 20px, margin-top: 2px, margin-bottom: -3px
- Text-transform: none (nie uppercase mimo globalnego Nav Menu stylu)

#### Trójkąty przy linkach
- Każdy link ma mały Green-Triangle.png po lewej
- Brightness: 42%, Saturate: 0 (odcienie szarości — nie zielony!)
- Flex align-self: center
- Margin-top: -4px

#### Dekoracyjny trójkąt główny
- Plik: `Obszar-roboczy-2-kopia-2.png` (już w public/images)
- Rozmiar: custom, space: 40%
- Wyrównanie: left, flex align-self: center

#### Animacje
- Logo: fadeInDown
- Linki: fadeInLeft z rosnącym delay (100ms, 200ms, 400ms)
- Motion FX na linkach: translateX negative 1.9px, opacity range 18%-50%, mouseTrack speed 0.1px
- UWAGA: Motion FX to faza 10 (integracja) — w fazie 3 implementujemy tylko fadeIn

#### Responsywność
- Breakpointy: tablet 768px, desktop 1025px
- Font size tablet: 14px (zmniejszony z 20px)
- Mobile: brak jawnych breakpointów w JSON — osobna wersja mobilna istnieje (elementor-hidden-desktop)

#### Tło body (odkrycie z sesji)
- Plik: `Tlo-Szary-ciemny-wyostrzony.png` (pobrano, w public/images)
- Background-repeat: repeat, background-size: auto
- To jest globalne tło strony — dodać do globals.css jako uzupełnienie fazy 1

### Claude's Discretion
- Dokładna implementacja sticky behavior (CSS sticky vs JS)
- Mapping animacji fadeIn na Tailwind/CSS
- Struktura komponentu (jeden Navbar.tsx vs rozbicie na subkomponenty)
- Handling menu mobilnego (Elementor ma osobną wersję — Claude dobierze podejście)

### Deferred Ideas (OUT OF SCOPE)
- Motion FX (parallax, mouseTrack) -> faza 10 (integracja/animacje)
- Tło body szum (Tlo-Szary-ciemny-wyostrzony.png) -> uzupełnienie fazy 1 lub osobne zadanie
- Preloader (circle-dashed + logo umysly-przyszlosci-2.png) -> faza 10
</user_constraints>

## Summary

Nawigacja na stronie futureminds.edu.pl to **niestandardowy layout** - nie jest to klasyczny horizontal navbar, a **kolumna linków w lewej sticky kolumnie** (350px) wewnątrz sekcji "Home - D". Składa się z: logo FMF-white.png (180px, margin-left 40px), 3 linków nawigacyjnych (Aktualności, O nas, Kontakt) z desaturowanymi trójkątami po lewej, oraz spacerów (70px + 501px). Ten komponent jest sticky (`sticky_parent: yes`) i towarzyszy użytkownikowi podczas scrollowania.

Obok lewej kolumny (w prawej części sekcji Home-D) znajduje się rozbudowane "Menu docelowe" z głównymi kategoriami (Programy edukacyjne 48px/600, Szkolenia, Programy stypendialne, Współpraca z biznesem, Realizowane projekty) i podlinkami (20px/300 z wcięciem 44px). Kategorie mają przy sobie trójkąty konturowe (Obszar-roboczy-2-kopia-2.png), a podlinki nie mają. To menu NIE jest sticky - to statyczna treść prawej kolumny sekcji.

**KLUCZOWE ODKRYCIE**: Wymagania fazy 3 mówią o "8 linkach nawigacyjnych" (Aktualności, Programy edukacyjne, Programy stypendialne, Projekty, Szkolenia, Publikacje, O nas, Kontakt). W Elementorze sticky sidebar ma tylko 3 linki, a pozostałe kategorii są w "Menu docelowe" (która jest statyczną częścią strony, nie nawigacją w klasycznym sensie). Wymagania upraszczają ten układ do jednego zestawu 8 linków - co jest świadomą decyzją projektową Macieja. "Publikacje" nie istnieje w oryginale Elementora (jest "Baza wiedzy" w menu mobilnym) - to nowy element dodany do scope.

**Primary recommendation:** Zaimplementować Navbar.tsx jako sticky kolumnę z logo + 8 linkami (z trójkątami i fadeIn), obok umieścić dekoracyjny trójkąt konturowy. Użyć CSS `position: sticky` (nie JS). Animacje fadeIn przez Tailwind custom classes lub Framer Motion (zainstalowany).

## Standard Stack

### Core
| Biblioteka | Wersja | Cel | Dlaczego |
|-----------|--------|-----|----------|
| Next.js | 16.1.6 | App Router, Image, Link | Już w projekcie |
| Tailwind CSS | 4.1.18 | Stylowanie, @theme tokens | Już w projekcie |
| React | 19.2.4 | Komponenty | Już w projekcie |

### Supporting
| Biblioteka | Wersja | Cel | Kiedy użyć |
|-----------|--------|-----|------------|
| Framer Motion | 12.31.0 | Animacje fadeIn z delay | Już zainstalowane, użyć do fadeIn z staggerem |
| next/image | built-in | Optymalizacja obrazków (logo, trójkąty) | Zawsze dla obrazków |
| next/link | built-in | Linki nawigacyjne | Zawsze dla linków |

### Alternatives Considered
| Zamiast | Można | Tradeoff |
|---------|-------|----------|
| Framer Motion (fadeIn) | CSS @keyframes + Tailwind | Prostsze, ale brak stagger delay z box-u; FM daje łatwy stagger |
| CSS sticky | Intersection Observer + JS | Zbędna złożoność; CSS sticky wystarczy dla tego przypadku |

**Instalacja:** Nic nowego nie trzeba instalować.

## Architecture Patterns

### Rekomendowana struktura plików
```
src/
  components/
    layout/
      Navbar.tsx          # Refactor: sticky kolumna z logo + linkami (zastępuje obecny)
      NavLink.tsx          # Pojedynczy link z trójkątem i animacją (opcjonalny subkomponent)
    ui/
      (istniejące)
  lib/
    constants.ts          # Aktualizacja NAV_ITEMS - zmiana href na anchory sekcji
    types.ts              # NavItem interface (bez zmian)
  app/
    globals.css           # Dodanie body background image + nav font + fadeIn keyframes
    page.tsx              # Aktualizacja - Navbar() przesuniętą nad HeroSection lub w layout
```

### Pattern 1: CSS Sticky Navigation
**Co:** Navbar jako `position: sticky; top: 0` w obrębie parent kontenera.
**Kiedy:** Gdy nawigacja ma towarzyszyć użytkownikowi podczas scrollowania, ale unstick gdy rodzic się kończy.
**Rekomendacja:** Użyć CSS `sticky` z `top: 0`. W Elementorze `sticky_parent: yes` oznacza dokładnie to - sticky w obrębie rodzica.

```typescript
// Navbar.tsx - sticky container
<nav className="sticky top-0 flex w-[350px] flex-col">
  {/* Logo */}
  {/* Links */}
</nav>
```

**UWAGA:** Obecny Navbar w page.tsx jest renderowany jako samodzielna sekcja (po HeroSection). W Elementorze nawigacja jest CZĘŚCIĄ sekcji "Home - D" (Section 2), nie osobną sekcją. Trzeba rozważyć, czy:
- (A) Navbar jest sticky w obrębie całej strony (od sekcji 2 do końca) - to wydaje się najbliższe intencji
- (B) Navbar jest sticky tylko w obrębie sekcji Home - to ograniczyłoby go zbyt mocno

Z analizy Elementora: Section 2 ("Home - D") to wielka sekcja z kolumnami, a sticky jest wewnątrz niej. Ale sekcje 4-14 to kolejne sekcje strony. Sticky w Elementorze unstickuje się gdy rodzic się kończy. To sugeruje, że w oryginale nawigacja jest widoczna tylko w obrębie sekcji Home.

**Rekomendacja (Claude's Discretion):** Zaimplementować Navbar jako sticky element w lewej kolumnie layoutu StickySection na całej stronie (jak sidebar w StickySection.tsx). Alternatywnie, jeśli Maciej chce nawigację widoczną na całej stronie: `position: fixed` z `left: 0`. Najrozsądniejsze wydaje się sticky w obrębie main content area.

### Pattern 2: Link z trójkątem (NavLink)
**Co:** Każdy link nawigacyjny to flex row: [trójkąt (desaturowany)] + [tekst linku].
**Kiedy:** Dla wszystkich 8 linków w navbar + ewentualnie dla głównych kategorii w menu docelowym.

```tsx
function NavLink({ href, label, delay }: { href: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
    >
      <Image
        src="/images/Green-Triangle.png"
        alt=""
        width={12}
        height={12}
        className="mr-5 brightness-[0.42] saturate-0"
        aria-hidden="true"
      />
      <Link
        href={href}
        className="text-[20px] font-light leading-[1em] tracking-[1.1px] text-[#EAEAEA] transition-colors hover:text-fm-green"
      >
        {label}
      </Link>
    </motion.div>
  );
}
```

### Pattern 3: Animacje fadeIn ze staggerem
**Co:** Logo fadeInDown, linki fadeInLeft z rosnącym delay.
**Kiedy:** Przy pierwszym renderze (initial mount).

```tsx
// Z Framer Motion - stagger z motion.div
const navVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const linkVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const logoVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
```

**UWAGA:** Framer Motion wymaga `"use client"` directive. Navbar stanie się Client Component.

### Anti-Patterns do unikania
- **Anti-pattern: Horizontal navbar z hamburger menu**: Oryginał to kolumna linków, nie top bar. Nie konwertować na klasyczny horizontal nav.
- **Anti-pattern: `position: fixed` zamiast `sticky`**: Fixed zajmuje widok na całej stronie i wymaga z-index. Sticky jest prostszy i naturalnie unstickuje.
- **Anti-pattern: Własne animacje scroll-based**: Motion FX jest odroczone do fazy 10. W fazie 3 implementujemy TYLKO fadeIn na mount.
- **Anti-pattern: Zielone trójkąty**: Trójkąty przy linkach MUSZĄ być desaturowane (szare). `brightness(42%) saturate(0)`.

## Don't Hand-Roll

| Problem | Nie buduj | Użyj | Dlaczego |
|---------|-----------|------|----------|
| Animacje fadeIn z delay | Własne CSS @keyframes z nth-child | Framer Motion stagger | Czytelniejszy kod, łatwiejsze zarządzanie delay, hot path dla FM |
| Sticky behavior | IntersectionObserver + JS | CSS `position: sticky` | Natywne, zero JS, idealne dla sticky_parent pattern |
| Image optimization | `<img>` z ręcznym lazy-load | `next/image` | Automatyczny WebP, responsive, lazy-load |
| Smooth scroll to sections | Custom JS scroll handler | CSS `scroll-behavior: smooth` (już w globals.css) + anchor links | Już zaimplementowane, zero dodatkowego kodu |

**Kluczowy insight:** Ten navbar jest prosty wizualnie (kolumna z linkami). Złożoność leży w dokładnym odwzorowaniu wartości CSS z Elementora, nie w logice komponentu.

## Common Pitfalls

### Pitfall 1: Sticky nie działa
**Co się psuje:** `position: sticky` nie przykleja elementu.
**Przyczyna:** Parent ma `overflow: hidden` lub brak zdefiniowanego `top` value. Albo element nie ma constrainującego parent.
**Jak unikać:** Upewnić się, że żaden ancestor nie ma `overflow: hidden/auto`. Zawsze ustawić `top: 0`. W projekcie: wcześniejsza decyzja 02-01 mówi "brak overflow-hidden na hero" - to właśnie chroni sticky.
**Sygnały ostrzegawcze:** Navbar nie "przykleja się" podczas scrollowania.

### Pitfall 2: Desaturacja trójkątów
**Co się psuje:** Trójkąty wyglądają zielono zamiast szaro.
**Przyczyna:** Brak CSS filter `brightness(42%) saturate(0)`.
**Jak unikać:** Tailwind: `brightness-[0.42] saturate-0`. Sprawdzić wizualnie po implementacji.
**Sygnały ostrzegawcze:** Trójkąty są kolorowe zamiast szarych.

### Pitfall 3: Font fallback
**Co się psuje:** `neue-haas-grotesk-display` nie jest załadowany (wymaga Adobe Fonts embed code).
**Przyczyna:** Projekt używa Plus Jakarta Sans (z Google Fonts) jako główny font. Adobe Fonts nie jest skonfigurowany.
**Jak unikać:** Ustawić font-family z fallbackiem: `font-family: 'neue-haas-grotesk-display', var(--font-sans)`. Nawigacja będzie wyglądać poprawnie z Plus Jakarta Sans do czasu podłączenia Adobe Fonts.
**Sygnały ostrzegawcze:** Linki mają inny charakter typograficzny niż oryginał.

### Pitfall 4: Navbar jako osobna sekcja vs część layoutu
**Co się psuje:** Navbar renderowany jako osobny blok nie jest sticky w kontekście reszty strony.
**Przyczyna:** W Elementorze Navbar jest sticky wewnątrz sekcji "Home - D" (Section 2). Jeśli zrenderujemy go jako osobną `<nav>`, sticky zadziała tylko w obrębie tej `<nav>`.
**Jak unikać:** Navbar musi być wewnątrz kontenera, który obejmuje również treść pod nim. Albo: `position: sticky` na elemencie wewnątrz flex/grid parent, który jest wystarczająco wysoki.
**Sygnały ostrzegawcze:** Navbar unstickuje się za wcześnie.

### Pitfall 5: Rozbieżność 8 linków vs 3+5 w Elementorze
**Co się psuje:** Implementacja nie pasuje do wymagań.
**Przyczyna:** W Elementorze sticky sidebar ma 3 linki, a "Menu docelowe" ma 5 głównych kategorii z podlinkami. Wymagania mówią o 8 prostych linkach.
**Jak unikać:** Trzymać się wymagań (8 linków), ale zachować styl wizualny z Elementora (kolumna, trójkąty, typografia).

### Pitfall 6: "use client" propagacja
**Co się psuje:** Framer Motion wymaga Client Component, co może propagować na layout.
**Przyczyna:** Animacje wymagają JS po stronie klienta.
**Jak unikać:** Wyizolować animowany Navbar do osobnego pliku z `"use client"`. Import w page.tsx (Server Component) jest OK - Next.js tworzy boundary.

## Code Examples

### Navbar.tsx - rekomendowana struktura
```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="sticky top-0 flex w-[350px] shrink-0 flex-col py-0 px-0">
      {/* Logo z fadeInDown */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-0"
      >
        <div className="h-[95px]" /> {/* Spacer top: ~100px z Elementor */}
        <Link href="/" className="ml-10 block">
          <Image
            src="/images/FMF-white.png"
            alt="Future Minds Foundation"
            width={180}
            height={57}
            className="h-auto w-[180px]"
          />
        </Link>
      </motion.div>

      {/* Spacer między logo a linkami */}
      <div className="h-[95px]" />

      {/* Linki z fadeInLeft i stagger delay */}
      {NAV_ITEMS.map((item, index) => (
        <motion.div
          key={item.label}
          className="mt-[2px] mb-[-3px] flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
        >
          <Image
            src="/images/Green-Triangle.png"
            alt=""
            width={12}
            height={12}
            className="-mt-1 self-center brightness-[0.42] saturate-0"
            aria-hidden="true"
          />
          <Link
            href={item.href}
            className="ml-5 text-[20px] font-light leading-[1em] tracking-[1.1px] text-[#EAEAEA] transition-colors hover:text-fm-green"
            style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
          >
            {item.label}
          </Link>
        </motion.div>
      ))}

      {/* Spacery na dole */}
      <div className="h-[70px]" />
      <div className="h-[501px]" />
    </nav>
  );
}
```

### Aktualizacja NAV_ITEMS w constants.ts
```typescript
// Nowa kolejność i hrefs - zgodnie z wymaganiami fazy 3
export const NAV_ITEMS: NavItem[] = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Programy edukacyjne", href: "#programy-edukacyjne" },
  { label: "Programy stypendialne", href: "#programy-stypendialne" },
  { label: "Projekty", href: "#projekty" },
  { label: "Szkolenia", href: "#szkolenia" },
  { label: "Publikacje", href: "#baza-wiedzy" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];
```

### CSS filters dla trójkątów (Tailwind)
```tsx
// Green-Triangle.png - desaturowany do szarości
<Image
  src="/images/Green-Triangle.png"
  alt=""
  width={12}
  height={12}
  className="brightness-[0.42] saturate-0"
/>

// Hover: przywrócenie koloru (opcjonalne - nie w CONTEXT, ale naturalne)
// className="brightness-[0.42] saturate-0 group-hover:brightness-100 group-hover:saturate-100"
```

### Body background w globals.css
```css
body {
  font-family: var(--font-sans);
  color: var(--color-fm-text);
  background-color: var(--color-fm-dark);
  background-image: url('/images/Tlo-Szary-ciemny-wyostrzony.png');
  background-repeat: repeat;
  background-size: auto;
}
```

## State of the Art

| Stare podejście | Nowe podejście | Kiedy zmiana | Wpływ |
|-----------------|----------------|--------------|-------|
| JS scroll listeners dla sticky | CSS `position: sticky` | Lata temu, pełne wsparcie | Zero JS, prostsze, niezawodne |
| jQuery animacje on scroll | Framer Motion / CSS animations | React era | Deklaratywne, łatwiejsze zarządzanie |
| Hamburger menu | Zawsze widoczne menu (desktop-first) | Trend 2023+ dla prezentacyjnych stron | Lepsze UX na desktop |

**Deprecated/outdated:**
- `position: -webkit-sticky` - prefix niepotrzebny, pełne wsparcie w nowoczesnych przeglądarkach
- jQuery scroll handlers - zastąpione przez IntersectionObserver lub CSS sticky

## Open Questions

1. **Zakres sticky: cała strona vs sekcja Home**
   - Co wiemy: W Elementorze sticky jest wewnątrz sekcji "Home - D" (Section 2) z `sticky_parent: yes`. To oznacza sticky do końca rodzica.
   - Co niejasne: Czy w docelowej wersji Next.js Navbar ma być sticky na całej stronie (jak typowa nawigacja) czy tylko w obrębie jednej sekcji?
   - Rekomendacja: Zaimplementować jako sticky na całej stronie (od razu po Hero do Footer) - to bardziej użyteczne i łatwiejsze. Jeśli Maciej chce inaczej, łatwo zmienić.

2. **"Menu docelowe" z Elementora - co z nim?**
   - Co wiemy: W Elementorze obok sticky sidebar jest rozbudowane drzewo menu z kategoriami (48px/600) i podlinkami (20px/300). Plus blog widget.
   - Co niejasne: Faza 3 nie wspomina o tym elemencie. Wymagania mówią o 8 prostych linkach.
   - Rekomendacja: W fazie 3 implementujemy TYLKO sticky sidebar z 8 linkami. "Menu docelowe" to osobna treść sekcji Home - może być dodane w przyszłej fazie lub pominięte.

3. **Dekoracyjny trójkąt konturowy (Obszar-roboczy-2-kopia-2.png)**
   - Co wiemy: Wymaganie NAV-03 mówi "dekoracyjny trójkąt outline obok menu". W Elementorze te trójkąty są przy głównych kategoriach w "Menu docelowe", nie przy linkach w sticky sidebar.
   - Co niejasne: Gdzie dokładnie umieścić ten trójkąt? Obok listy linków? Jako duży element dekoracyjny?
   - Rekomendacja: Umieścić jako duży element dekoracyjny poniżej linków lub obok - zgodnie z duchem oryginału. W Elementorze trójkąt outline (`space: 40%`, `align: left`, `align_self: center`) jest przy każdej głównej kategorii, ale jako dekoracja przy navbarze wystarczy jeden.

4. **Font neue-haas-grotesk-display**
   - Co wiemy: To font z Adobe Fonts (Typekit), wymaga embed code. Projekt używa Plus Jakarta Sans.
   - Co niejasne: Kiedy/czy Maciej dostarczy Adobe Fonts embed code.
   - Rekomendacja: Użyć `font-family: 'neue-haas-grotesk-display', var(--font-sans)` - będzie działać z fallbackiem, a po dodaniu Adobe Fonts automatycznie się przełączy.

5. **Menu mobilne**
   - Co wiemy: Elementor ma osobną sekcję (Section 3, `hidden-desktop`) z uproszczonym menu. Zawiera: Programy edukacyjne, FLL, Edukacja Energetyczna, Programy stypendialne, Współpraca z biznesem, FLL4B, CSR, Projekty, Szkolenia, Blog, Baza wiedzy.
   - Co niejasne: Czy implementować hamburger menu z tymi pozycjami, czy uproszczone menu, czy pominąć mobile w tej fazie (desktop-first approach).
   - Rekomendacja: Faza 3 skupia się na desktop. Mobile: ukryć kolumnę linków na mobile, dodać proste hamburger menu z listą 8 linków. Nie implementować rozbudowanego drzewa mobilnego z Elementora.

## Sources

### Primary (HIGH confidence)
- `elementor/content/page/12561.json` - Section 2 ("Home - D") i Section 3 ("Home - M")
  - Section 2, Element 0: sticky sidebar (350px), Logo + 3 linki + spacery
  - Section 2, Element 1: Menu docelowe z kategoriami i podlinkami + blog widget
  - Pełne wartości CSS: font-size, font-weight, colors, margins, animacje, filters
- `elementor/site-settings.json` - Global colors i typography
  - Color `380b317` = "Greeeeeen" = #9AFC4E (hover)
  - Typography `80cf5e2` = neue-haas-grotesk-display, 20px, 300, ls 1.1px, lh 1em
  - Color `a9b4f23` = "Full Transparency" = #FFFFFF00 (tło sekcji)
- Istniejący kod: `src/components/layout/Navbar.tsx`, `src/lib/constants.ts`, `src/app/globals.css`
- `package.json` - Next.js 16.1.6, Tailwind 4.1.18, Framer Motion 12.31.0

### Secondary (MEDIUM confidence)
- Wizualna weryfikacja obrazków: `Green-Triangle.png` (solid zielony), `Obszar-roboczy-2-kopia-2.png` (outline zielony)
- CSS sticky behavior - standardowa specyfikacja, pełne wsparcie przeglądarek
- Framer Motion stagger pattern - standardowy wzorzec z dokumentacji

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - projekt już zainicjalizowany, żadne nowe zależności
- Architecture: HIGH - pełne dane z Elementor JSON, jasna struktura
- Pitfalls: HIGH - sticky, font fallback, trójkąty - dobrze udokumentowane
- Rozbieżność wymagań vs oryginał: MEDIUM - 8 linków upraszcza oryginał, ale to świadoma decyzja

**Research date:** 2026-02-11
**Valid until:** 2026-03-11 (stabilna domena, brak szybko zmieniających się elementów)

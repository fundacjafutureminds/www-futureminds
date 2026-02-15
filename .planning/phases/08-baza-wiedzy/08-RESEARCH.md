# Phase 8: Baza Wiedzy - Research

**Researched:** 2026-02-15
**Domain:** Sekcja tresci strony glownej — sticky sidebar "05 Wiedza", opis bazy wiedzy, overlay dekoracyjny (2 warstwy), grid 6 artykulow/publikacji, CTA "Pelna baza wiedzy", obrazek ksiazki
**Confidence:** HIGH

## Summary

Zbadano pelna strukture sekcji Baza Wiedzy z Elementor JSON (page 20657, sekcja 13 — desktop, hide_mobile). Sekcja juz istnieje w `page.tsx` jako inline `BazaWiedzySection()`, ale jest **znacznie uproszczona** wzgledem oryginalnego Elementora. Kluczowe roznice:

1. **Brakuje duzego naglowka dekoracyjnego** "Baza wiedzy" (100px, w100) — ten naglowek jest obecny w kazdej sekcji od Phase 4.
2. **Brakuje overlay dekoracyjnych** — Elementor ma 2 warstwy: `Baza-wiedzy.png` jako background (bottom right, initial, no-repeat) i `baza-wieedzy.png` jako overlay (opacity 0.2). Baza-wiedzy.png to bialy outline laptopa/tabletu (niewidoczny na bialym tle, widoczny na ciemnym). Baza-wieedzy.png to laptop na ksiazkach (dekoracyjny overlay ~20% opacity).
3. **Grid artykulow jest prymitywny** — obecny kod renderuje 2 linki z ramka border, Elementor ma pelny blog grid z 6 postami w 3 kolumnach, kazdym z kategoria (12px uppercase), tytulem (22px/w300), excerptm (15px), i przyciskiem "Wiecej" (13px uppercase, bg #FFFFFF1A).
4. **Brakuje CTA** "Pelna baza wiedzy" (44px/w600) i obrazka ksiazki (ksiazki.png, 259px szerokosc, link do /publikacje).
5. **Sidebar ma "Baza wiedzy"** ale w Elementorze naglowek sidebar to **"Wiedza"** (jednowyrazowy, 30px/w600).
6. **Intro heading z zielonymi akcentami** jest w obecnym kodzie ale wymaga korekty — pelny tekst z Elementora jest dluzszy.

Dane w `constants.ts` (tablica `ARTICLES`) juz istnieja z 6 pozycjami, ale wymagaja rozszerzenia o pole `excerpt` (20 znakow). Typ `Article` w `types.ts` juz ma odpowiednie pola.

**Primary recommendation:** Wyekstrahowac `BazaWiedzySection` do `src/components/sections/BazaWiedzySection.tsx`. Przebudowac zgodnie z Elementor: duzy naglowek 100px + overlay dekoracyjny (2 warstwy) + intro heading z zielonymi akcentami + 2 paragrafy opisu + grid 6 artykulow w 3 kolumnach (border-l, kategoria, tytul, excerpt, przycisk "Wiecej") + CTA "Pelna baza wiedzy" (44px/w600) + obrazek ksiazki (ksiazki.png). Wzorzec jest identyczny jak Phase 4-7: `StickySection` + `relative` wrapper z overlayem + `z-10` content.

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image component | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Zainstalowany |
| TypeScript | 5.9.3 | Typy | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja: overlay, obrazek ksiazki | TAK |
| next/link | (wbudowane) | Linki artykulow, CTA, /publikacje | TAK |

### Nowe wymagania
**Brak** — zero nowych pakietow. Faza 8 to czysto HTML/CSS/TSX.

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    sections/
      BazaWiedzySection.tsx          # NOWY — wyekstrahowany z page.tsx
  lib/
    constants.ts                     # AKTUALIZACJA — rozszerzenie ARTICLES o excerpty
    types.ts                         # BEZ ZMIAN — Article interface juz ma potrzebne pola
  app/
    page.tsx                         # AKTUALIZACJA — import BazaWiedzySection, usuniecie inline
```

### Pattern 1: Struktura sekcji Baza Wiedzy z Elementor (desktop, sekcja 13)

```
StickySection (sidebar "05" + "Wiedza" + navLinks z KNOWLEDGE_SECTION_NAV)
  +-- children (prawa kolumna):
      +-- Overlay wrapper (relative) z 2 warstwami dekoracyjnymi
      |   +-- Warstwa 1: Baza-wiedzy.png (bottom right, no-repeat, initial)
      |   +-- Warstwa 2: baza-wieedzy.png (overlay, opacity 0.2)
      |   +-- Content (relative z-10):
      |       +-- Container (width 60%):
      |       |   +-- Duzy naglowek "Baza wiedzy" (100px, w100, #EFEFEF)
      |       |   +-- Intro heading z zielonym akcentem (42px, w600, #FFFFFFF5)
      |       |   +-- Opis 1 (19px, w200, #E8E8E8)
      |       |   +-- Opis 2 (19px, w200, #E8E8E8)
      |       +-- Container (width 90%):
      |       |   +-- Grid 6 artykulow (3 kolumny, 33.33%)
      |       |       +-- Kazdy artykul:
      |       |           +-- Kategoria (12px, uppercase, w400)
      |       |           +-- Tytul (22px, w300, lh 1.1, #EAEAEA, hover: #9AFC4E)
      |       |           +-- Excerpt (15px, w400, lh 22px, #D9D9D9)
      |       |           +-- Przycisk "Wiecej" (13px, w300, uppercase, tracking 1.7px, bg #FFFFFF1A)
      |       |           +-- border-l 1px (z globalnych styli)
      |       |           +-- padding: 5px 35px 0 35px
      |       +-- Container (width 80%):
      |           +-- CTA "Pelna baza wiedzy" (44px, w600, #FFFFFF, hover: #9AFC4E)
      |           +-- Obrazek ksiazki (ksiazki.png, width 259px, link do /publikacje)
      +-- BRAK strzalki separatora (ostatnia sekcja przed footerem)
```

### Pattern 2: Duzy naglowek dekoracyjny 100px

**Source:** Elementor heading w sekcji 13

```tsx
<h2
  className="mb-16 text-section text-[#EFEFEF]"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Baza wiedzy
</h2>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 100px, w100 (ultra-thin)
- Color: #EFEFEF
- Text: "Baza wiedzy" (bez line break, w odroznieniu od Phase 4-7 ktore maja <br>)

### Pattern 3: Overlay dekoracyjny — 2 warstwy

**Source:** Elementor container sekcji 13

W Elementorze sa 2 oddzielne obrazki:
1. `Baza-wiedzy.png` — background_image sekcji (bottom right, initial, no-repeat). To jest bialy zarys (ledwo widoczny na ciemnym tle — delikatny pattern).
2. `baza-wieedzy.png` — background_overlay_image z opacity 0.2. To jest laptop na stosie ksiazek (dekoracyjny overlay).

**UWAGA:** Baza-wiedzy.png jest praktycznie niewidoczny na ciemnym tle (bialy outline na ciemnym tle staje sie ledwo dostrzegalny). Glowny wizualny efekt daje baza-wieedzy.png z opacity 0.2. Mozna uproscic do jednego overlay (baza-wieedzy.png) i uzyskac ten sam efekt co oryginalna strona.

```tsx
<div className="relative">
  {/* Overlay dekoracyjny — laptop na ksiazkach */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/baza-wieedzy.png"
      alt=""
      fill
      className="object-contain object-right-bottom opacity-20"
      aria-hidden="true"
    />
  </div>
  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</div>
```

Alternatywnie, dla pelnej wiernosci z Elementorem, mozna dodac oba overlay:

```tsx
<div className="relative">
  {/* Warstwa 1: subtelny pattern (Baza-wiedzy.png) */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/Baza-wiedzy.png"
      alt=""
      fill
      className="object-contain object-right-bottom opacity-20"
      aria-hidden="true"
    />
  </div>
  {/* Warstwa 2: laptop na ksiazkach (baza-wieedzy.png) */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/baza-wieedzy.png"
      alt=""
      fill
      className="object-contain object-right-bottom opacity-20"
      aria-hidden="true"
    />
  </div>
  <div className="relative z-10">
    {/* ... */}
  </div>
</div>
```

**Rekomendacja:** Uzyc OBU warstw dla wiernosci z Elementorem. Baza-wiedzy.png moze byc niewidoczny, ale zachowanie go nie szkodzi i jest zgodne z oryginalem.

### Pattern 4: Intro heading z zielonymi akcentami

**Source:** Elementor heading w sekcji 13

```tsx
<h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
  {`Stale analizujemy `}
  <span className="text-fm-green">
    {`skuteczno\u015B\u0107 naszych program\u00F3w`}
  </span>
  <br />
  {`i \u015Bledzimy mi\u0119dzynarodowe badania`}
  <br />
  {` w dziedzinie edukacji`}
  <span className="text-fm-green">{`. `}</span>
</h3>
```

**Pelny tekst z Elementora:**
```
Stale analizujemy [skutecznosc naszych programow] i sledzimy miedzynarodowe badania w dziedzinie edukacji.
```
Gdzie `[...]` = zielony kolor #9AFC4E. Elementor uzywa `<font color="#9afc4e">` i `<span style="color: #9AFC4E">`.

### Pattern 5: Opis bazy wiedzy (19px)

**Source:** Elementor headings w sekcji 13

```tsx
<p className="max-w-2xl text-body text-[#E8E8E8]">
  {`Baza wiedzy to zbi\u00F3r materia\u0142\u00F3w stworzonych przez trener\u00F3w fundacji oraz ekspert\u00F3w zewn\u0119trznych zajmuj\u0105cych si\u0119 nowoczesn\u0105 edukacj\u0105. `}
</p>
<p className="max-w-2xl text-body text-[#E8E8E8]">
  {`Znajduj\u0105 si\u0119 tam r\u00F3wnie\u017C badania i raporty publikowane przez jednostki naukowe.`}
</p>
```

### Pattern 6: Grid artykulow (blog widget) — KLUCZOWY ELEMENT

**Source:** Elementor premium-addon-blog w sekcji 13

Blog widget z Elementora renderuje grid 6 postow z kategorii "baza-wiedzy". W naszej statycznej wersji (v1) odtwarzamy to jako statyczny grid z danych w `ARTICLES`.

**Specyfikacja typografii z Elementor:**

| Element | Font-size | Weight | Color | Other |
|---------|-----------|--------|-------|-------|
| Kategoria | 12px | 400 | (muted) | uppercase, lh 2em |
| Tytul | 22px | 300 | #EAEAEA | lh 1.1, hover: #9AFC4E |
| Excerpt/content | 15px | (default) | #D9D9D9 | lh 22px, tracking 0.2px |
| "Wiecej" button | 13px | 300 | #E4E4E4 | uppercase, tracking 1.7px, bg #FFFFFF1A, padding 8px 30px |

**Layout grida:**
- 3 kolumny (33.33% kazda)
- column_spacing: 90px miedzy kolumnami
- posts_spacing: 20px miedzy wierszami
- Kazdy post ma border-left 1px
- Content padding: 5px 35px 0 35px
- Skin: "side" (thumbnail obok tresci, ale w tym wypadku blog nie wyswietla miniaturek — thumbnails sa ukryte/domyslne)
- Animacja: fadeIn slow

```tsx
function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border-l border-[#FFFFFF54] px-[35px] pt-[5px]">
      {/* Kategoria */}
      <p className="text-[12px] font-normal uppercase leading-[2em] text-fm-text-muted">
        {article.category}
      </p>
      {/* Tytul */}
      <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
        <Link href={article.href}>{article.title}</Link>
      </h4>
      {/* Excerpt */}
      {article.excerpt && (
        <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
          {article.excerpt}
        </p>
      )}
      {/* Przycisk "Wiecej" */}
      <Link
        href={article.href}
        className="mt-5 inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4] transition-colors hover:text-fm-green"
      >
        {`Wi\u0119cej`}
      </Link>
    </div>
  );
}
```

**Grid layout:**

```tsx
<div className="grid grid-cols-1 gap-x-[90px] gap-y-[20px] lg:grid-cols-3">
  {ARTICLES.map((article) => (
    <ArticleCard key={article.title} article={article} />
  ))}
</div>
```

### Pattern 7: CTA "Pelna baza wiedzy" (44px)

**Source:** Elementor premium-addon-button w sekcji 13

```tsx
<Link
  href="/publikacje"
  className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  {`Pe\u0142na baza wiedzy`}
</Link>
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 44px, w600
- Color normal: #FFFFFF (global: White Element + BG)
- Color hover: #9AFC4E (global: Greeeeeen)
- Background: transparent (brak)
- Tekst: "Pelna baza wiedzy" (bez line break)
- Link: /publikacje
- Identyczny wzorzec jak Phase 7 "Poznaj nasze szkolenia"

### Pattern 8: Obrazek ksiazki (ksiazki.png)

**Source:** Elementor image widget w sekcji 13

```tsx
<Link href="/publikacje">
  <Image
    src="/images/ksiazki.png"
    alt="Publikacje"
    width={259}
    height={200}
    className="h-auto w-[259px]"
  />
</Link>
```

**Wartosci z Elementor:**
- Image: ksiazki.png (stos ksiazek, outline, dekoracyjny)
- Width: 259px (z Elementor custom_dimension)
- Link: /publikacje (Elementor image link)
- Pozycja: ponizej CTA, w tym samym kontenerze (width 80%)

### Pattern 9: Sidebar title = "Wiedza" (nie "Baza Wiedzy")

**Source:** Elementor heading w sidebarze sekcji 13

W Elementorze sidebar naglowek to **"Wiedza"** (jednowyrazowy, 30px, w600, #EFEFEF). Numer sekcji to "05". Obecny kod ma "Baza wiedzy" — nalezy zmienic na "Wiedza".

**WAZNE:** Wzorzec z Phase 4-7 uzywa jednowyrazowych nagolowkow sidebarow:
- Phase 4: "Programy edukacyjne" (2 slowa — wyjatek, bo "Programy" to zbyt ogolne)
- Phase 5: "Programy stypendialne" (2 slowa — analogicznie)
- Phase 6: "Projekty"
- Phase 7: "Szkolenia"
- Phase 8: "Wiedza" (Elementor ma jednowyrazowy)

### Anti-Patterns to Avoid

- **NIE renderowac artykulow jako prostych linkow z ramka** — Elementor ma pelny blog grid z kategoria, tytulem, excerptm i przyciskiem "Wiecej" w 3 kolumnach. Obecny kod ma prymitywne 2 linki z border
- **NIE pomijac CTA "Pelna baza wiedzy"** — to duzy tekst-link 44px, identyczny wzorzec jak Phase 7
- **NIE pomijac obrazka ksiazki** — ksiazki.png z linkiem do /publikacje jest klikalny element dekoracyjny
- **NIE uzywac "Baza wiedzy" jako title sidebara** — Elementor ma jednowyrazowe "Wiedza". Duzy naglowek 100px "Baza wiedzy" jest w prawej kolumnie
- **NIE dodawac strzalki separatora na koncu** — to ostatnia sekcja przed footerem, nie ma strzalki w Elementorze
- **NIE pomijac overlay baza-wieedzy.png** — to kluczowy element dekoracyjny (laptop na ksiazkach)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z `Image` component | Built-in lazy loading, blur placeholder, WebP |
| Overlay positioning | Custom JS | CSS `absolute inset-0` z `object-contain` | Zero JS |
| Sticky sidebar | Custom scroll JS | `StickySection` component | Juz istnieje, przetestowany |
| Grid layout 3 kolumny | Custom flexbox hacki | Tailwind `grid grid-cols-3` | Prosty, czytelny |
| Blog widget | Custom CMS integration | Statyczny grid z `ARTICLES` constant | v1 jest statyczna |

**Key insight:** Faza 8 to czyste HTML/CSS/TSX — zero custom JavaScript, zero nowych bibliotek. Caly pattern jest identyczny z Phase 4-7. Jedyna nowa rzecz to karta artykulu (ArticleCard) ktora jest bardzo podobna do istniejacych BlogPost cards w Phase 5 i ProjectCard w Phase 6.

## Common Pitfalls

### Pitfall 1: Uproszczony grid artykulow (2 linki zamiast 6 kart)
**What goes wrong:** Sekcja wyglada pusto i nieprofesjonalnie — 2 proste linki zamiast pelnego grida 6 artykulow.
**Why it happens:** Obecny kod w page.tsx renderuje BazaWiedzySection jako prymitywna liste linkow.
**How to avoid:** Renderowac pelny grid 3x2 z ArticleCard — kategoria + tytul + excerpt + przycisk "Wiecej". Uzyc danych z `ARTICLES` constant.
**Warning signs:** Sekcja ma mniej niz 6 artykulow lub brak grida.

### Pitfall 2: Brak overlay dekoracyjnego
**What goes wrong:** Sekcja wyglada "golo" w porownaniu z innymi sekcjami.
**Why it happens:** Obecny kod nie ma overlay wrapper.
**How to avoid:** Uzyc wzorca `relative` wrapper z `absolute inset-0` overlay i `z-10` content. Minimum 1 overlay (baza-wieedzy.png), idealnie 2 (+ Baza-wiedzy.png).
**Warning signs:** Sekcja nie ma dekoracyjnego tla.

### Pitfall 3: Sidebar z "Baza wiedzy" zamiast "Wiedza"
**What goes wrong:** Sidebar jest niezgodny z Elementorem — za dlugi tekst.
**Why it happens:** Obecny kod uzywa pelnej nazwy "Baza wiedzy" zamiast jednowyrazowej "Wiedza".
**How to avoid:** Zmienic title StickySection na "Wiedza" (jednowyrazowy wzorzec jak Phase 6-7).
**Warning signs:** Sidebar ma 2 slowa zamiast 1.

### Pitfall 4: Brak CTA i obrazka ksiazki
**What goes wrong:** Sekcja konczy sie na gridzie artykulow bez "wyjscia" — brak CTA do pelnej bazy wiedzy.
**Why it happens:** CTA i obrazek ksiazki nie istnieja w obecnym uproszczonym kodzie.
**How to avoid:** Dodac CTA "Pelna baza wiedzy" (44px/w600) + klikalny obrazek ksiazki (ksiazki.png, 259px, link /publikacje).
**Warning signs:** Brak duzego tekstu-linku pod gridem artykulow.

### Pitfall 5: Unicode/polskie znaki w JSX
**What goes wrong:** Polskie znaki moga powodowac bledy przy Write tool.
**Why it happens:** Tool Write na Windows moze miec problemy z kodowaniem.
**How to avoid:** Uzyc unicode escape sequences (`\u0119` zamiast "e", `\u0142` zamiast "l" itd.) — locked decision z Phase 6/7.
**Warning signs:** Bledy kompilacji lub znieksztalcone znaki na stronie.

### Pitfall 6: Brak excerptow w danych ARTICLES
**What goes wrong:** Karty artykulow nie wyswietlaja krotkich opisow.
**Why it happens:** Obecny ARTICLES w constants.ts nie ma pola excerpt (Article interface ma `author?` ale nie `excerpt`).
**How to avoid:** Dodac pole `excerpt?: string` do interfejsu Article i uzupelnic dane w ARTICLES. Elementor uzywa excerpt_length=20 slow, wiec potrzebujemy krotkich opisow.
**Warning signs:** Karty artykulow maja tylko kategorie i tytul bez opisu.

## Code Examples

### Kompletna BazaWiedzySection (rekomendowany ksztalt)

```tsx
// Source: Elementor page 20657, section 13 (Baza Wiedzy desktop)
import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { ARTICLES, KNOWLEDGE_SECTION_NAV } from "@/lib/constants";
import type { Article } from "@/lib/types";

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border-l border-[#FFFFFF54] px-[35px] pt-[5px]">
      <p className="text-[12px] font-normal uppercase leading-[2em] text-fm-text-muted">
        {article.category}
      </p>
      <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
        <Link href={article.href}>{article.title}</Link>
      </h4>
      {article.excerpt && (
        <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
          {article.excerpt}
        </p>
      )}
      <Link
        href={article.href}
        className="mt-5 inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4] transition-colors hover:text-fm-green"
      >
        {`Wi\u0119cej`}
      </Link>
    </div>
  );
}

export function BazaWiedzySection() {
  return (
    <StickySection
      id="baza-wiedzy"
      title="Wiedza"
      sectionNumber="05"
      navLinks={KNOWLEDGE_SECTION_NAV}
    >
      <div className="relative">
        {/* Overlay 1: subtelny pattern Baza-wiedzy.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/Baza-wiedzy.png"
            alt=""
            fill
            className="object-contain object-right-bottom opacity-20"
            aria-hidden="true"
          />
        </div>
        {/* Overlay 2: laptop na ksiazkach baza-wieedzy.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/baza-wieedzy.png"
            alt=""
            fill
            className="object-contain object-right-bottom opacity-20"
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
            Baza wiedzy
          </h2>

          {/* Intro heading z zielonym akcentem (42px) */}
          <div className="mb-16 w-[60%] space-y-8">
            <h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
              {`Stale analizujemy `}
              <span className="text-fm-green">
                {`skuteczno\u015B\u0107 naszych program\u00F3w`}
              </span>
              <br />
              {`i \u015Bledzimy mi\u0119dzynarodowe badania`}
              <br />
              {` w dziedzinie edukacji`}
              <span className="text-fm-green">{`. `}</span>
            </h3>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Baza wiedzy to zbi\u00F3r materia\u0142\u00F3w stworzonych przez trener\u00F3w fundacji oraz ekspert\u00F3w zewn\u0119trznych zajmuj\u0105cych si\u0119 nowoczesn\u0105 edukacj\u0105. `}
            </p>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Znajduj\u0105 si\u0119 tam r\u00F3wnie\u017C badania i raporty publikowane przez jednostki naukowe.`}
            </p>
          </div>

          {/* Grid artykulow 3 kolumny */}
          <div className="w-[90%]">
            <div className="grid grid-cols-1 gap-x-[90px] gap-y-[20px] lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <ArticleCard key={article.title} article={article} />
              ))}
            </div>
          </div>

          {/* CTA + obrazek ksiazki */}
          <div className="mt-16 w-[80%]">
            <Link
              href="/publikacje"
              className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              {`Pe\u0142na baza wiedzy`}
            </Link>
            <div className="mt-8">
              <Link href="/publikacje">
                <Image
                  src="/images/ksiazki.png"
                  alt="Publikacje"
                  width={259}
                  height={200}
                  className="h-auto w-[259px]"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </StickySection>
  );
}
```

### Rozszerzenie Article interface i ARTICLES

Interfejs `Article` potrzebuje pola `excerpt`:

```typescript
// types.ts — AKTUALIZACJA
export interface Article {
  title: string;
  author?: string;
  category: string;
  href: string;
  image?: string;
  excerpt?: string; // NOWE — krotki opis ~20 slow
}
```

```typescript
// constants.ts — AKTUALIZACJA ARTICLES z excerptami
export const ARTICLES: Article[] = [
  {
    title: "Uczenie (si\u0119) przez tworzenie",
    author: "Jakub Piasecki",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
    excerpt: "Publikacja o metodyce nauczania przez tworzenie i kreatywne dzia\u0142anie w edukacji STEAM.",
  },
  {
    title: "Robotyka w programie \u201eLaboratoria Przysz\u0142o\u015Bci\u201d",
    author: "Wojciech Zuziak",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
    excerpt: "Analiza wdro\u017Cenia robotyki edukacyjnej w ramach rz\u0105dowego programu Laboratoria Przysz\u0142o\u015Bci.",
  },
  {
    title: "Wp\u0142yw edukacji STEAM na rozw\u00F3j kompetencji przysz\u0142o\u015Bci",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt: "Badanie wp\u0142ywu zintegrowanego nauczania STEAM na kszta\u0142towanie umiej\u0119tno\u015Bci kluczowych.",
  },
  {
    title: "FIRST LEGO League jako narz\u0119dzie kszta\u0142towania umiej\u0119tno\u015Bci mi\u0119kkich",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt: "Jak udzia\u0142 w turniejach FIRST LEGO League rozwija kompetencje spo\u0142eczne i komunikacyjne.",
  },
  {
    title: "Robotyka edukacyjna w polskich szko\u0142ach - raport",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt: "Raport o stanie robotyki edukacyjnej w Polsce — wyzwania, mo\u017Cliwo\u015Bci i rekomendacje.",
  },
  {
    title: "Metodyka nauczania STEAM w kontek\u015Bcie reformy edukacji",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt: "Przegl\u0105d metodyk nauczania STEAM i ich zastosowanie w kontek\u015Bcie polskiej reformy edukacji.",
  },
];
```

### Aktualizacja page.tsx

```tsx
// PRZED:
import { StickySection } from "@/components/ui/StickySection";
import { KNOWLEDGE_SECTION_NAV } from "@/lib/constants";

function BazaWiedzySection() { /* inline ~65 linii */ }

// PO:
import { BazaWiedzySection } from "@/components/sections/BazaWiedzySection";

// Inline BazaWiedzySection() usuniety z page.tsx
// Import KNOWLEDGE_SECTION_NAV usuniety z page.tsx (przeniesiony do BazaWiedzySection.tsx)
// Import StickySection usuniety z page.tsx (jesli nie jest uzywany przez nic innego)
```

## Elementor Structure Map (Baza Wiedzy desktop, sekcja 13)

```
Container (sekcja 13) — row, gap 0, fadeIn?
  bg_image: Baza-wiedzy.png (bottom right, initial, no-repeat)
  bg_overlay: baza-wieedzy.png (opacity 0.2)
  hide_mobile
  +-- menu-anchor (anchor: baza-wiedzy)
  +-- Sidebar container (width 350px, content_width full)
  |   +-- spacer
  |   +-- Sticky container (sticky: top, sticky_parent: yes)
  |   |   +-- spacer
  |   |   +-- Row container:
  |   |   |   +-- Green-Triangle.png
  |   |   |   +-- "Wiedza" heading (30px, w600, #EFEFEF)
  |   |   +-- spacer
  |   |   +-- Row container:
  |   |   |   +-- "Powrot na gore strony" button (15px, w200, link: #home)
  |   |   +-- spacer
  +-- Content container (content_width full, direction column)
      +-- Container (width 60%):
      |   +-- Container (width ~90%):
      |   |   +-- spacer
      |   |   +-- "Baza wiedzy" (100px, w100, #EFEFEF)
      |   |   +-- spacer
      |   +-- Container (width 100%):
      |       +-- Container:
      |           +-- Intro heading (42px, w600, #FFFFFFF5, z zielonym akcentem)
      |           +-- spacer
      |           +-- Opis 1 (19px, w200, #E8E8E8)
      |           +-- spacer
      |           +-- Opis 2 (19px, w200, #E8E8E8)
      +-- Container (width 90%):
      |   +-- spacer
      |   +-- premium-addon-blog:
      |       posts: 6
      |       columns: 33.33% (3 kolumny)
      |       category: baza-wiedzy
      |       column_spacing: 90px
      |       posts_spacing: 20px
      |       skin: side
      |       title: 22px/w300/#EAEAEA (hover: #9AFC4E)
      |       category_label: 12px/w400/uppercase
      |       content: 15px/lh22px/#D9D9D9
      |       read_more: "Wiecej" 13px/w300/uppercase/tracking 1.7px
      |       read_more_bg: #FFFFFF1A
      |       padding: 5px 35px 0 35px
      |       border: none (ale _border_width left=1)
      |       animation: fadeIn slow
      +-- Container (width 80%):
      |   +-- Container (row):
      |   |   +-- premium-addon-button:
      |   |       text: "Pelna baza wiedzy"
      |   |       font: 44px/w600
      |   |       color: #FFFFFF (hover: #9AFC4E)
      |   |       background: transparent
      |   |       link: /publikacje
      |   +-- spacer
      |   +-- Image:
      |       src: ksiazki.png
      |       width: 259px
      |       link: /publikacje
      +-- spacer (koncowy)
```

## State of the Art

| Obecny kod (BazaWiedzySection w page.tsx) | Wymagane (z Elementor) | Zmiana |
|------------------------------------------|------------------------|--------|
| Inline w page.tsx (~65 linii) | Osobny BazaWiedzySection.tsx | Wyekstrahowac |
| Brak overlay dekoracyjnego | 2 warstwy: Baza-wiedzy.png + baza-wieedzy.png (opacity 0.2) | Dodac overlaye |
| Brak duzego naglowka 100px | "Baza wiedzy" 100px w100 #EFEFEF | Dodac naglowek |
| Intro heading z innym tekstem | Pelny tekst z Elementora z zielonymi akcentami na "skutecznosc naszych programow" | Zaktualizowac |
| 2 proste linki z ramka border | Grid 6 artykulow w 3 kolumnach (kategoria + tytul + excerpt + przycisk "Wiecej") | Przebudowac |
| Brak CTA "Pelna baza wiedzy" | Tekst-link 44px/w600, hover zielony, link /publikacje | Dodac |
| Obrazek ksiazki z opacity-80 | Obrazek ksiazki 259px, klikalny link do /publikacje | Przebudowac |
| Sidebar "Baza wiedzy" (2 slowa) | Sidebar "Wiedza" (1 slowo — wzorzec jednowyrazowy) | Zmienic tytul |
| ARTICLES bez excerpt | ARTICLES z excerptami (~20 slow) | Rozszerzyc dane |

## Porownanie kart artykulu

### Obecny kod (DO ZASTAPIENIA):
```tsx
<Link href="/publikacje" className="block rounded-sm border border-white/10 p-6 ...">
  <p className="mb-2 text-xs text-fm-text-muted">Baza wiedzy</p>
  <p className="text-white">Uczenie (sie) przez tworzenie — Jakub Piasecki</p>
  <span className="mt-3 inline-block text-xs text-fm-green">Wiecej</span>
</Link>
```

### Wymagany z Elementor (DO IMPLEMENTACJI):
```tsx
<div className="border-l border-[#FFFFFF54] px-[35px] pt-[5px]">
  <p className="text-[12px] font-normal uppercase leading-[2em] text-fm-text-muted">
    Baza wiedzy
  </p>
  <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
    <Link href="/publikacje">Uczenie (sie) przez tworzenie</Link>
  </h4>
  <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
    Publikacja o metodyce nauczania przez tworzenie...
  </p>
  <Link href="/publikacje" className="mt-5 inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4]">
    Wiecej
  </Link>
</div>
```

## Open Questions

1. **Excerpty artykulow — skad wziac tresc?**
   - What we know: Elementor blog widget wyciaga excerpty z postow WP (excerpt_length=20 slow). Nasze dane sa statyczne w constants.ts.
   - What's unclear: Jakie dokladnie powinny byc excerpty? Oryginalne posty WP maja excerpty, ale nie mamy ich w eksporcie.
   - Recommendation: **Napisac placeholder excerpty** (ok. 20 slow) dla kazdego z 6 artykulow. Sa to dane statyczne v1 — moga byc przyblizone. Planner moze wygenerowac sensowne opisy na podstawie tytulow.

2. **Dwie warstwy overlay vs jedna**
   - What we know: Elementor ma 2 oddzielne obrazki: Baza-wiedzy.png (background) i baza-wieedzy.png (overlay). Baza-wiedzy.png jest praktycznie niewidoczny na ciemnym tle (bialy zarys).
   - What's unclear: Czy warto zachowac 2 warstwy skoro jedna jest niewidoczna?
   - Recommendation: **Zachowac obie warstwy** dla wiernosci z Elementorem. Baza-wiedzy.png moze byc widoczny przy roznych warunkach oswietlenia monitora. Nie szkodzi.

3. **Grid column_spacing 90px**
   - What we know: Elementor ma column_spacing 90px miedzy kolumnami grida artykulow. To jest duzy spacing.
   - What's unclear: Czy 90px gap-x nie spowoduje ze kolumny beda zbyt waskie?
   - Recommendation: **Uzyc gap-x-[90px]** zgodnie z Elementorem. Sprawdzic wizualnie — jesli za ciasno, zmniejszyc do 60px. Ale na 1400px max-width minus 350px sidebar = ~1050px content, minus 90px*2 gap = 870px na 3 kolumny = ~290px per kolumna — powinno byc OK.

4. **Brak numeru sekcji "05" w sidebarze w Elementorze**
   - What we know: StickySection komponent automatycznie renderuje sectionNumber. Elementor ma numer "05" (nie widzimy go explicite w heading ale pattern jest taki sam jak fazy 4-7).
   - What's unclear: Czy numer jest renderowany identycznie?
   - Recommendation: **Uzyc sectionNumber="05"** — wzorzec jest ustalony od Phase 4. StickySection renderuje go automatycznie.

## Sources

### Primary (HIGH confidence)
- Elementor JSON page 20657, sekcja 13 (desktop) — pelna struktura sekcji Baza Wiedzy: overlay Baza-wiedzy.png + baza-wieedzy.png (opacity 0.2), sidebar "Wiedza" (30px/w600), naglowek "Baza wiedzy" (100px/w100), intro heading z zielonymi akcentami (42px/w600), 2 paragrafy opisu (19px/w200), premium-addon-blog (6 postow, 3 kolumny, kategoria baza-wiedzy), CTA "Pelna baza wiedzy" (44px/w600), obrazek ksiazki (259px)
- Elementor premium-addon-blog settings — title 22px/w300/#EAEAEA (hover #9AFC4E), category 12px/w400/uppercase, content 15px/lh22px/#D9D9D9, read_more "Wiecej" 13px/w300/uppercase/tracking 1.7px/bg #FFFFFF1A, column_spacing 90px, posts_spacing 20px, padding 5px 35px 0 35px, border-left 1px
- Istniejacy codebase: page.tsx (obecna implementacja inline BazaWiedzySection), StickySection.tsx, constants.ts (ARTICLES — 6 pozycji, KNOWLEDGE_SECTION_NAV), types.ts (Article interface), globals.css (text-section, text-heading, text-body)
- Obrazki w public/images/ — zweryfikowane wizualnie: Baza-wiedzy.png (bialy zarys — liniowy rysunek), baza-wieedzy.png (laptop na ksiazkach — dekoracyjny overlay), ksiazki.png (stos ksiazek — outline)

### Secondary (MEDIUM confidence)
- Phase 4-7 RESEARCH.md i implementacje — potwierdzenie wzorcow: StickySection, overlay, duzy naglowek 100px, border-l kart, strzalka separator, CTA tekst-link 44px
- ProgramyStypendialneSection.tsx — analogiczny wzorzec blog widget (BlogPost card z kategoria + tytulem + excerptm + przyciskiem "Wiecej" w 2 postach)
- ProjektySection.tsx — analogiczny wzorzec grid kart (3 kolumny, border-l, padding, overlay dekoracyjny)

### Tertiary (LOW confidence)
- Brak — wszystkie kluczowe wartosci sa explicite w Elementor JSON

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (overlay, naglowek, CTA, grid): HIGH — dokladne wartosci z Elementor JSON
- Dane artykulow (tytuly, kategorie): HIGH — bezposrednio z constants.ts (juz istnieja)
- Dane artykulow (excerpty): MEDIUM — excerpty sa placeholder, bo oryginalne WP excerpty nie sa w eksporcie
- Typografia (100px naglowek, 22px tytul, 13px "Wiecej"): HIGH — explicite w Elementor JSON
- Overlay (2 warstwy, opacity 0.2): HIGH — explicite w Elementor background_overlay_opacity
- CTA "Pelna baza wiedzy" (44px, w600): HIGH — explicite w Elementor premium-addon-button
- Sidebar title "Wiedza": HIGH — explicite w Elementor heading (30px, w600)

**Research date:** 2026-02-15
**Valid until:** 2026-03-15 (stabilne technologie, 30 dni)

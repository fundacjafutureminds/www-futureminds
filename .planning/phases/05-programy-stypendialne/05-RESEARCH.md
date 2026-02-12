# Phase 5: Programy Stypendialne - Research

**Researched:** 2026-02-12
**Domain:** Sekcja tresci strony glownej — sticky sidebar, naglowki z zielonymi akcentami, 9 logotypow partnerow, karty CTA ze zdjeciami, blog widget, podwojny overlay
**Confidence:** HIGH

## Summary

Zbadano pelna strukture sekcji Programy Stypendialne z Elementor JSON (Section 7, id=78060b5a). Sekcja jest bogatsza niz poczatkowo zakladano w ROADMAP:

1. **Layout glowny** jest 2-kolumnowy: lewa czesc (60%) zawiera naglowki, tekst i logotypy partnerow; prawa czesc (40%) zawiera widget blogu z 2 najnowszymi wpisami. To nie jest prosty jednokolumnowy layout jak w obecnym kodzie page.tsx.

2. **Sa 3 karty CTA (nie 2)**: "Jak ufundowac stypendium?" z pudelko1.png, "Jak otrzymac stypendium?" z dzieci-stypendia-1.png, i "Jak zostac sponsorem FIRST LEGO League?" z dzieci-fll.png. ROADMAP wymaga 2, Elementor ma 3.

3. **Podwojne tlo**: sekcja ma background_image (Tlo-STYPENDIA.png, center right) PLUS background_overlay (skrzydlo2.png, top right, opacity 18%). To dwa nakladajace sie obrazy dekoracyjne.

4. **Logotypy partnerow**: 9 logotypow z roznym fadeIn delay (100-500ms). W obecnym kodzie (page.tsx) logotypy sa w flex wrap z identycznym stylem. Elementor uzywa wrappujacego kontenera o max-width 600px.

5. **Blog widget** to "premium-addon-blog" z Elementor — skin "side", 2 posty, filtr po kategorii "programy-stypendialne", z border-left 1px solid (kolor globals "Linia" #FFFFFF54), tytul 22px/w300, excerpt 15px/w400, "Wiecej" link 13px/w300 uppercase.

**Primary recommendation:** Wyekstrahowac ProgramyStypendialneSection do osobnego komponentu. Uzyc ustalonego wzorca StickySection z Phase 4 (per-sekcyjny sidebar "02 Programy Stypendialne"). Prawa kolumna (children StickySection) musi miec layout 60/40 dla naglowkow+logotypow vs blog widget, a pod nimi 2+1 karty CTA. Blog widget jest statyczny (v1) — dane z constants.ts.

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image component | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Zainstalowany |
| TypeScript | 5.9.3 | Typy | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja obrazkow logo partnerow i CTA | TAK |
| next/link | (wbudowane) | Linki CTA | TAK |

### Nowe wymagania
**Brak** — zero nowych pakietow. Faza 5 to czysto HTML/CSS/TSX. Blog widget jest statyczny (dane z constants.ts), bez premium-addon-blog.

## Architecture Patterns

### Pattern 1: Struktura sekcji z Elementor (Section 7)

**Cala sekcja** owinelina w StickySection (wzorzec z Phase 4):

```
StickySection (sidebar "02 Programy Stypendialne" + navLinks: Dla biznesu, Dla szkol)
  └── children (prawa kolumna):
      ├── Overlay wrapper (relative) z Tlo-STYPENDIA.png + skrzydlo2.png
      │   ├── Content (relative z-10):
      │   │   ├── Duzy naglowek "Programy stypendialne" (100px, w100, fadeInDown)
      │   │   ├── Layout 60/40:
      │   │   │   ├── Lewa 60%:
      │   │   │   │   ├── Intro naglowki z zielonymi akcentami
      │   │   │   │   ├── Body text (2 paragrafy)
      │   │   │   │   └── Grid 9 logotypow partnerow (max-w-[600px])
      │   │   │   └── Prawa 40%:
      │   │   │       └── Blog widget (2 wpisy, border-left, skin "side")
      │   │   ├── Karty CTA (2 obok siebie + 1 szersza):
      │   │   │   ├── Row: "Jak ufundowac?" (50%) + "Jak otrzymac?" (50%)
      │   │   │   └── "Jak zostac sponsorem FLL?" (~78% width)
      │   │   └── Strzalka w dol (separator)
```

### Pattern 2: Podwojne tlo — background + overlay

**Source:** Elementor Section 7 settings

```tsx
// Sekcja ma DWA obrazy w tle:
// 1. background_image: Tlo-STYPENDIA.png (center right, no-repeat, initial size)
// 2. background_overlay: skrzydlo2.png (top right, no-repeat, initial size, opacity 0.18)

<div className="relative">
  {/* Tlo STYPENDIA */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/Tlo-STYPENDIA.png"
      alt=""
      fill
      className="object-contain object-right opacity-20"
      aria-hidden="true"
    />
  </div>
  {/* Overlay skrzydlo */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/skrzydlo2.png"
      alt=""
      fill
      className="object-contain object-right-top opacity-[0.18]"
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
- Background: Tlo-STYPENDIA.png, position: center right, size: initial, no-repeat
- Overlay: skrzydlo2.png, position: top right, size: initial, no-repeat, opacity: 0.18

### Pattern 3: Layout 60/40 — naglowki + blog widget

**Source:** Elementor container 44c17ad7

```tsx
<div className="flex gap-0">
  {/* Lewa kolumna 60% — naglowki, tekst, logotypy */}
  <div className="w-[60%]">
    {/* Intro headings */}
    {/* Partner logos */}
  </div>
  {/* Prawa kolumna 40% — blog widget */}
  <div className="w-[40%]">
    {/* Blog widget */}
  </div>
</div>
```

### Pattern 4: Karta CTA z obrazkiem i duzym tekstem

**Source:** Elementor containers 5eb55f2d, 3845cfeb, 715142b0

```tsx
// Karta CTA — naglowek z zielonym akcentem + obrazek + button
<div className="space-y-6">
  <h3
    className="text-heading text-[#EFEFEF]"
    style={{ lineHeight: "1.1", letterSpacing: "0.6px" }}
  >
    Jak<br />
    <span className="text-fm-green text-[70px]">ufundowac</span>
    <br />stypendium?
  </h3>
  <Image
    src="/images/pudelko1.png"
    alt="Jak ufundowac stypendium"
    width={400}
    height={300}
    className="w-full"
  />
  <Link
    href="/csr"
    className="inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white"
  >
    WIECEJ &gt;
  </Link>
</div>
```

**Dokladne wartosci z Elementor (wspolne dla 3 kart CTA):**
- Naglowek: 42px, w600, line-height 1.1em, letter-spacing 0.6px, color #EFEFEF
- Slowo kluczowe (zielone): font-size 70px, color #9AFC4E (inline span)
- Font: neue-haas-grotesk-display
- CTA button: 10px, w300, uppercase, letter-spacing 2px, text #FFFFFFF2, bg #FFFFFF0A
- CTA hover: bg fm-green (#9AFC4E), text white

### Pattern 5: Blog widget (statyczny w v1)

**Source:** Elementor premium-addon-blog id=26b276f2

Widget blogu w Elementorze filtruje posty z kategorii "programy-stypendialne", skin "side" (obrazek obok tresci), 2 posty. W v1 renderujemy statycznie.

```tsx
// Blog widget — statyczne dane w v1
interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image?: string;
}

// Kazdy wpis:
<div className="border-l border-[#FFFFFF54] pl-[35px] pr-[35px]">
  <p className="text-[12px] font-normal uppercase leading-[2em] text-fm-text-muted">
    {post.category}
  </p>
  <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
    {post.title}
  </h4>
  <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
    {post.excerpt}
  </p>
  <Link
    href={post.href}
    className="inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4]"
  >
    Wiecej
  </Link>
</div>
```

**Wartosci z Elementor premium-addon-blog:**
- Skin: side (obrazek obok tresci)
- Posts: 2, filtr: category = "programy-stypendialne"
- Column spacing: 42px
- Title: neue-haas-grotesk-display, 22px, w300, line-height 1.1em, #EAEAEA, hover #9AFC4E
- Category: neue-haas-grotesk-display, 12px, w400, uppercase, line-height 2em
- Content/excerpt: neue-haas-grotesk-display, 15px, w400, line-height 22px, letter-spacing 0.2px, #D9D9D9
- "Wiecej" link: 13px, w300, uppercase, letter-spacing 1.7px, #E4E4E4, bg #FFFFFF1A
- Border: left 1px solid (globals "Linia" = #FFFFFF54)
- Content padding: 5px 35px 0 35px
- Animation: fadeInRight, delay 200ms

### Pattern 6: Grid 9 logotypow partnerow

**Source:** Elementor container 413053bd (max-w 600px, 9 obrazkow)

```tsx
<div>
  <p className="mb-8 text-body text-[#E8E8E8]">
    Partnerzy strategiczni
  </p>
  <div className="flex max-w-[600px] flex-wrap items-center gap-6">
    {PARTNER_LOGOS.map((partner) => (
      <Image
        key={partner.name}
        src={partner.src}
        alt={partner.name}
        width={140}
        height={50}
        className="h-10 w-auto opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
      />
    ))}
  </div>
</div>
```

**Kolejnosc z Elementor (NIE taka jak w constants.ts):**
1. Logo-Rockwell.png (80% width)
2. Screen-Shot-2019-12-27-at-1.50.07-PM-1024x232-1.png (LEGO Education) (75%)
3. Logo-RTX.png (80%)
4. Collins_Aerospace_logo_stack_white_300.png (Collins — UWAGA: inna wersja niz w constants.ts!)
5. Untitled-designapt.png (ENEA — UWAGA: inna nazwa niz w constants.ts!)
6. mmaltic.png (90%)
7. 3.png (OTIS)
8. 2.png (Xerox)
9. jo.png (John Deere) (92%)

**UWAGA — roznice z constants.ts:**
- Collins: Elementor uzywa `Collins_Aerospace_logo_stack_white_300.png` (stack version), constants.ts ma `Collins-aerospace-white.png`
- ENEA: Elementor uzywa `Untitled-designapt.png`, constants.ts ma `logo-ENEA-3-biale.png`
- Kolejnosc jest inna niz w constants.ts (Rockwell pierwszy, John Deere ostatni)
- Kazde logo ma indywidualny fadeIn delay (100-500ms)

### Pattern 7: Duzy naglowek dekoracyjny 100px

**Source:** Elementor heading 616a9b71

```tsx
<h2
  className="text-section text-[#EFEFEF]"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Programy<br /> stypendialne
</h2>
```

**Wartosci:** 100px, w100 (ultra-thin), color #EFEFEF, animation fadeInDown.
Identyczny pattern jak w Phase 4 (Programy edukacyjne).

### Anti-Patterns to Avoid

- **NIE uzywac jednokolumnowego layoutu** — Elementor uzywa 60/40 split na naglowki+logotypy vs blog widget. Obecny kod w page.tsx ma wszystko w jednej kolumnie.
- **NIE pomijac 3. karty CTA** — ROADMAP i requirements wymieniaja 2 karty, ale Elementor ma 3 ("Jak zostac sponsorem FLL?"). Trzecia karta jest szersza (~78% width) i pod dwoma pierwszymi.
- **NIE uzywac tego samego obrazka Collins** — Elementor uzywa `Collins_Aerospace_logo_stack_white_300.png` (stack), nie `Collins-aerospace-white.png` (horizontal).
- **NIE uzywac tego samego obrazka ENEA** — Elementor uzywa `Untitled-designapt.png`, nie `logo-ENEA-3-biale.png`.
- **NIE renderowac logotypow w jednym rzedzie** — 9 logotypow nie miesci sie. Elementor uzywa wrappujacego kontenera max-width ~600px, logotypy zawijaja sie.
- **NIE pomijac border-left na blog widget** — blog ma border-left 1px solid #FFFFFF54.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z `Image` component | Built-in lazy loading, blur placeholder, WebP |
| Blog widget | Dynamic blog z WP REST API | Statyczne dane w constants.ts | v1 = statyczny, WP integracja w v2 |
| Overlay positioning | Custom JS | CSS `absolute inset-0` z `object-contain` | Zero JS |
| 60/40 layout | Custom flex calculations | `w-[60%]` + `w-[40%]` w flex containerze | Proste Tailwind utility |

**Key insight:** Cala faza to HTML/CSS/TSX — zero custom JavaScript, zero nowych bibliotek. Blog jest statyczny. Animacje sa odroczone do Phase 10.

## Common Pitfalls

### Pitfall 1: Brak 3. karty CTA ("Jak zostac sponsorem")
**What goes wrong:** Sekcja ma 2 karty CTA zamiast 3.
**Why it happens:** ROADMAP i REQUIREMENTS (STYP-05, STYP-06) wymieniaja 2 karty. Elementor ma 3.
**How to avoid:** Dodac 3. karte "Jak zostac sponsorem FIRST LEGO League?" z obrazkiem dzieci-fll.png i linkiem /csr.
**Warning signs:** Sekcja wyglada "za krótko" w porownaniu z oryginalem.

### Pitfall 2: Bledne obrazki logotypow
**What goes wrong:** Logotypy Collins i ENEA wygladaja inaczej niz na oryginale.
**Why it happens:** constants.ts uzywa innych plikow niz Elementor.
**How to avoid:** Zaktualizowac constants.ts — Collins na `Collins_Aerospace_logo_stack_white_300.png`, ENEA na `Untitled-designapt.png`. Oba pliki SA w public/images/.
**Warning signs:** Collins ma logo poziome zamiast pionowego (stack).

### Pitfall 3: Brak layoutu 60/40
**What goes wrong:** Logotypy i blog widget sa jedne pod drugimi zamiast obok siebie.
**Why it happens:** Obecny kod w page.tsx uzywa jednokolumnowego layoutu.
**How to avoid:** Uzyc flex z w-[60%] i w-[40%]. Blog widget stoi obok naglowkow i logotypow.

### Pitfall 4: Blog widget bez border-left
**What goes wrong:** Blog widget nie ma wizualnego separatora.
**Why it happens:** Pominiecie border.
**How to avoid:** Kazdy wpis blogu ma `border-l border-[#FFFFFF54]` z padding-left 35px.

### Pitfall 5: CTA heading bez slowa w 70px
**What goes wrong:** Naglowki kart CTA wygladaja monotonnie.
**Why it happens:** Pominiecie inline style z `font-size: 70px` na slowie kluczowym.
**How to avoid:** Slowo kluczowe ("ufundowac", "otrzymac", "zostac sponsorem") renderowane w `<span className="text-fm-green text-[70px]">`.

### Pitfall 6: Kolejnosc logotypow
**What goes wrong:** Logotypy sa w innej kolejnosci niz na oryginale.
**Why it happens:** constants.ts ma inna kolejnosc niz Elementor.
**How to avoid:** Dostosowac kolejnosc w PARTNER_LOGOS do kolejnosci z Elementora.

## Elementor Structure Map (Section 7 — desktop)

```
Section 7 (78060b5a) — row, gap 0
  bg: Tlo-STYPENDIA.png (center right, no-repeat)
  overlay: skrzydlo2.png (top right, no-repeat, opacity 0.18)
  ├── menu-anchor (anchor: programy-stypendialne)
  ├── Sidebar (504e9088) — w=350px
  │   └── Sticky container (4ed7f17d) — sticky:top, sticky_parent:yes
  │       ├── Green-Triangle.png + "Programy Stypendialne" (30px, w600, #EFEFEF)
  │       ├── Link: "Dla biznesu" -> /csr
  │       ├── Link: "Dla szkol" -> /stypendia
  │       └── "Powrot na gore strony" -> #home
  └── Content (54bc033c) — flex-grow
      ├── Main layout (44c17ad7) — row
      │   ├── Lewa 60% (39e0976c):
      │   │   ├── Title (1dfe2586): "Programy stypendialne" (100px, w100, fadeInDown)
      │   │   ├── Intro (3ede8fc9):
      │   │   │   ├── "Laczymy odpowiedzialne..." (42px, w600, green: "odpowiedzialne spolecznie firmy")
      │   │   │   ├── "Sukces opiera sie..." (19px, w200, #E8E8E8)
      │   │   │   └── "Poprzez umozliwienie..." (19px, w200, #E8E8E8)
      │   │   ├── Partners (478e2929) — fadeIn:
      │   │   │   ├── "Partnerzy strategiczni" (19px, w200)
      │   │   │   └── Logo grid (413053bd) — max-w 600px, 9 logos:
      │   │   │       1. Rockwell (fadeIn 500ms)
      │   │   │       2. LEGO Education (fadeIn 400ms)
      │   │   │       3. RTX (fadeIn 500ms)
      │   │   │       4. Collins stack (fadeIn 100ms)
      │   │   │       5. ENEA/Untitled (fadeIn 500ms)
      │   │   │       6. mmaltic (fadeIn 500ms)
      │   │   │       7. OTIS/3.png (fadeIn 300ms)
      │   │   │       8. Xerox/2.png (fadeIn 500ms)
      │   │   │       9. John Deere (fadeIn 500ms)
      │   │   └── spacer
      │   └── Prawa 40% (6d4c608) — fadeIn:
      │       └── Blog widget (26b276f2) — fadeInRight delay 200ms
      │           skin: side, 2 posts, category: "programy-stypendialne"
      │           border-left 1px solid #FFFFFF54
      │           title: 22px/w300, excerpt: 15px/w400, link: 13px/w300
      ├── CTA area (1c299ce5) — row
      │   └── CTA container (4afbb5b1) — w=77.621%, column
      │       ├── CTA pair (40aeda51) — row
      │       │   ├── "Jak ufundowac?" (5eb55f2d) — 50%, fadeInLeft
      │       │   │   ├── Heading: 42px/w600, "ufundowac" w zielonym 70px
      │       │   │   ├── Image: pudelko1.png (fadeInLeft 400ms)
      │       │   │   └── Button: "WIECEJ >" -> /csr
      │       │   └── "Jak otrzymac?" (3845cfeb) — 50%, fadeInRight
      │       │       ├── Heading: 42px/w600, "otrzymac" w zielonym 70px
      │       │       ├── Image: dzieci-stypendia-1.png (fadeInRight 400ms)
      │       │       └── Button: "WIECEJ >" -> /stypendia
      │       ├── "Jak zostac sponsorem FLL?" (715142b0) — w=86.935%, fadeIn
      │       │   ├── Heading: 42px/w600, "zostac sponsorem" w zielonym 70px
      │       │   ├── Image: dzieci-fll.png (fadeIn)
      │       │   └── Button: "WIECEJ >" -> /csr
      │       └── Strzalka-w-dol.png (separator, 60% width)
```

## Code Examples

### Kompletna struktura ProgramyStypendialneSection

```tsx
// Source: Elementor Section 7 (id=78060b5a)
import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { PARTNER_LOGOS, SCHOLARSHIP_SECTION_NAV } from "@/lib/constants";

export function ProgramyStypendialneSection() {
  return (
    <StickySection
      id="programy-stypendialne"
      title="Programy Stypendialne"
      sectionNumber="02"
      navLinks={SCHOLARSHIP_SECTION_NAV}
    >
      <div className="relative">
        {/* Overlay: Tlo-STYPENDIA.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src="/images/Tlo-STYPENDIA.png" alt="" fill
            className="object-contain object-right opacity-20" aria-hidden="true" />
        </div>
        {/* Overlay: skrzydlo2.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src="/images/skrzydlo2.png" alt="" fill
            className="object-contain object-right-top opacity-[0.18]" aria-hidden="true" />
        </div>

        <div className="relative z-10">
          {/* Duzy naglowek 100px */}
          <h2 className="mb-16 text-section text-[#EFEFEF]"
            style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}>
            Programy<br /> stypendialne
          </h2>

          {/* Layout 60/40 */}
          <div className="flex gap-0">
            {/* Lewa 60% */}
            <div className="w-[60%] space-y-8">
              {/* Intro headings */}
              {/* Partner logos */}
            </div>
            {/* Prawa 40% */}
            <div className="w-[40%]">
              {/* Blog widget */}
            </div>
          </div>

          {/* Karty CTA */}
          {/* Strzalka separator */}
        </div>
      </div>
    </StickySection>
  );
}
```

### Dane do dodania/aktualizacji w constants.ts

```typescript
// Nowy typ BlogPost
export interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image?: string;
}

// Dane statycznego blog widgeta (v1)
export const SCHOLARSHIP_BLOG_POSTS: BlogPost[] = [
  {
    title: "Stypendia FIRST LEGO League 2024/2025",
    category: "Programy stypendialne",
    excerpt: "Nowy sezon stypendialny startuje! Dowiedz sie jak wziac udzial w programie...",
    href: "/aktualnosci",
  },
  {
    title: "Podsumowanie sezonu stypendialnego 2023/2024",
    category: "Programy stypendialne",
    excerpt: "W minionym sezonie fundacja przyznala stypendia ponad 200 uczniom z calej Polski...",
    href: "/aktualnosci",
  },
];

// Dane 3. karty CTA (nowa)
export const SCHOLARSHIP_CTA_CARDS = [
  {
    title: "Jak",
    keyword: "ufundowac",
    suffix: "stypendium?",
    image: "/images/pudelko1.png",
    href: "/csr",
  },
  {
    title: "Jak",
    keyword: "otrzymac",
    suffix: "stypendium?",
    image: "/images/dzieci-stypendia-1.png",
    href: "/stypendia",
  },
  {
    title: "Jak",
    keyword: "zostac sponsorem",
    suffix: "FIRST LEGO League",
    image: "/images/dzieci-fll.png",
    href: "/csr",
  },
];

// Aktualizacja PARTNER_LOGOS — poprawiona kolejnosc i obrazki:
export const PARTNER_LOGOS: Partner[] = [
  { name: "Rockwell Automation", src: "/images/Logo-Rockwell.png" },
  { name: "LEGO Education", src: "/images/Screen-Shot-2019-12-27-at-1.50.07-PM-1024x232-1.png" },
  { name: "RTX", src: "/images/Logo-RTX.png" },
  { name: "Collins Aerospace", src: "/images/Collins_Aerospace_logo_stack_white_300.png" },
  { name: "ENEA", src: "/images/Untitled-designapt.png" },
  { name: "Mmaltic", src: "/images/mmaltic.png" },
  { name: "OTIS", src: "/images/3.png" },
  { name: "Xerox", src: "/images/2.png" },
  { name: "John Deere", src: "/images/jo.png" },
];
```

### Blog widget post card

```tsx
// Source: Elementor premium-addon-blog id=26b276f2
<div className="border-l border-[#FFFFFF54] py-0 pl-[35px] pr-[35px]">
  <p className="text-[12px] font-normal uppercase leading-[2em]">
    {post.category}
  </p>
  <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
    <Link href={post.href}>{post.title}</Link>
  </h4>
  <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
    {post.excerpt}
  </p>
  <Link
    href={post.href}
    className="inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4]"
  >
    Wiecej
  </Link>
</div>
```

### CTA Button (ten sam co w Phase 4)

```tsx
// Source: Elementor buttons 48d448b3, 24c8c983, 6f014c23
const ctaClasses = "inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white";
```

## State of the Art

| Obecny kod (page.tsx) | Wymagane (z Elementor) | Zmiana |
|------------------------|------------------------|--------|
| Jednokolumnowy layout tresci | Layout 60/40 (naglowki+logotypy vs blog) | Dodac flex split |
| 2 karty CTA (prosty Link + tekst) | 3 karty CTA z duzymi naglowkami (70px zielone) + obrazkami | Przebudowac kompletnie |
| Brak obrazkow w kartach CTA | pudelko1.png, dzieci-stypendia-1.png, dzieci-fll.png | Dodac obrazki |
| CTA naglowek 21px prosty tekst | CTA naglowek 42px z 70px zielonym slowem kluczowym | Zmiana typografii |
| Brak blog widgeta | 2 statyczne wpisy z border-left i excerptami | Nowy komponent |
| Brak duzego naglowka 100px | "Programy stypendialne" 100px w100 | Dodac naglowek |
| Brak overlay | 2 overlaye: Tlo-STYPENDIA.png + skrzydlo2.png | Dodac 2 overlaye |
| `Collins-aerospace-white.png` | `Collins_Aerospace_logo_stack_white_300.png` (stack version) | Zmienic src |
| `logo-ENEA-3-biale.png` | `Untitled-designapt.png` | Zmienic src |
| Logotypy: `brightness-0 invert` | Logotypy: `opacity-70 brightness-0 invert hover:opacity-100` | OK (zblizone) |
| Brak Strzalki w dol | Strzalka-w-dol.png pod kartami CTA | Dodac separator |

## Open Questions

1. **3 karty CTA vs 2 w requirements**
   - What we know: REQUIREMENTS (STYP-05, STYP-06) wymieniaja 2 karty. Elementor ma 3 ("Jak zostac sponsorem FLL?").
   - What's unclear: Czy trzecia karta jest celowa i powinna byc w v1?
   - Recommendation: **TAK, dodac** — jest w oryginale Elementor, cel projektu to "wierna kopia". Trzecia karta wzmacnia sekcje wizualnie.

2. **Blog widget — jakie dane statyczne?**
   - What we know: Elementor filtruje posty z kategorii "programy-stypendialne". W v1 dane sa statyczne.
   - What's unclear: Jakie tytuly, excerpty i obrazki uzyc?
   - Recommendation: Uzyc przyblizonych danych — tytuly zwiazane z programami stypendialnymi. Dokladna tresc mozna potem zaktualizowac (v2 z WP REST API). Kluczowe jest zachowanie poprawnego layoutu i stylu, nie tresc.

3. **Collins i ENEA — ktore wersje logo?**
   - What we know: Elementor uzywa innych plikow niz obecne constants.ts. Oba pliki (stare i nowe) sa w public/images/.
   - What's unclear: Czy user preferuje konkretna wersje?
   - Recommendation: **Uzyc wersji z Elementora** — Collins stack i ENEA Untitled. To sa loga widoczne na produkcji.

4. **Kolejnosc logotypow**
   - What we know: Elementor ma inna kolejnosc niz constants.ts (Rockwell pierwszy, John Deere ostatni).
   - What's unclear: Czy kolejnosc jest istotna?
   - Recommendation: **TAK, zmienic** — pixel-perfect kopia wymaga zachowania kolejnosci.

5. **3. karta CTA szerokosc ~87%**
   - What we know: Trzecia karta ma width 86.935% kontenera CTA, ktory sam ma width 77.621% prawej kolumny.
   - What's unclear: Jak to przeliczac w kontekscie naszego layoutu?
   - Recommendation: Uzyc max-w-[85%] lub w-4/5 jako przyblizenie. Trzecia karta jest szersza niz dwie gornie (ktore sa po 50% kazdej).

## Sources

### Primary (HIGH confidence)
- Elementor JSON page 20657 — Section 7 (id=78060b5a) pelna ekstrakcja: sidebar, naglowki, logotypy, karty CTA, blog widget, background, overlay, animacje
- Elementor site-settings.json — kolory globalne: 380b317 = #9AFC4E (Green), 9bd1aa5 = #FFFFFF54 (Linia), 9c1207a = #FFFFFF0A (Tlo buttona)
- Istniejacy codebase: page.tsx (obecna implementacja), StickySection.tsx, constants.ts, types.ts, globals.css
- Obrazki w public/images/ — zweryfikowane: Tlo-STYPENDIA.png, skrzydlo2.png, pudelko1.png, dzieci-stypendia-1.png, dzieci-fll.png, Collins_Aerospace_logo_stack_white_300.png, Untitled-designapt.png, Strzalka-w-dol.png + 9 logotypow

### Secondary (MEDIUM confidence)
- Phase 4 RESEARCH.md i 04-02-SUMMARY.md — wzorzec StickySection per-sekcja, overlay wewnatrz children, usuniety globalny Navbar
- ROADMAP.md i REQUIREMENTS.md — wymagania STYP-01 do STYP-08

### Tertiary (LOW confidence)
- Blog widget dane statyczne — tytuly i excerpty sa przyblizeniowe, wymaga walidacji z produkcja
- Dokladna opacity Tlo-STYPENDIA.png — Elementor nie definiuje jej explicite (PROJECT.md mowi ~20%)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (layout 60/40, CTA cards, blog widget): HIGH — dokladne wartosci z Elementor JSON
- Logotypy (kolejnosc i pliki): HIGH — bezposrednio z Elementor, pliki zweryfikowane w public/images/
- Blog widget (styl): HIGH — dokladne wartosci typografii z premium-addon-blog
- Blog widget (dane statyczne): LOW — tytuly/excerpty to przyblizenie, nie oryginalne dane z WP
- Overlay: MEDIUM — opacity ~20% dla Tlo-STYPENDIA.png to przyblizenie; skrzydlo2.png ma explicite 0.18

**Research date:** 2026-02-12
**Valid until:** 2026-03-12 (stabilne technologie, 30 dni)

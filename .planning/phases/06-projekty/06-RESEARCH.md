# Phase 6: Projekty - Research

**Researched:** 2026-02-12
**Domain:** Sekcja tresci strony glownej — sticky sidebar, grid kart projektow, overlay dekoracyjny trybik3.png, naglowki z zielonymi akcentami
**Confidence:** HIGH

## Summary

Zbadano pelna strukture sekcji Projekty z Elementor JSON (Section 9, id=7c23b047 — desktop). Sekcja stosuje ten sam wzorzec co Phase 4 i 5: sidebar 350px + prawa kolumna z trescia. Kluczowe odkrycia:

1. **7 projektow, nie 6**: Elementor ma 7 kart projektow (%3+3+1 w wersji desktop). Siodmy to "Kto Ty jestes? - Polak maly" z linkiem do edukacjasteam.pl i obrazkiem 04_znak_-siatka_podstawowy_mono_ciemne_tlo-1.png. Obecny constants.ts ma 6 projektow — brakuje siodmego. ROADMAP mowi "grid 6 kart", ale Elementor ma 7. Rekomendacja: dodac 7. projekt do constants.ts.

2. **Grid 3-kolumnowy**: Karty sa ulozone w 3 kolumny (Linia 1: 3 karty, Linia 2: 3 karty, Linia 3: 1 karta + pusty placeholder). Kazda karta ma width 25vw. Obecny kod w page.tsx uzywa `space-y-6` (lista pionowa) — to jest bledne.

3. **Border-left, nie border pelny**: Karty maja `border-left: 1px solid #FFFFFF54` (kolor globalny "Linia"), nie `border border-white/10`. Identyczny pattern jak karty programow (Phase 4) i blog widget (Phase 5).

4. **Overlay trybik3.png**: Sekcja ma background_overlay z trybik3.png, pozycja top right, opacity 0.2 (20%), size initial. Plik trybik3.png jest dostepny w public/images/.

5. **Opisy projektow w Elementorze sa DLUZSZE** niz w constants.ts. Np. opis Enigmy ma dodatkowe zdanie, opis Pol'and Rock jest dluzszy, opis IOM ma wiecej detali. Rekomendacja: zaktualizowac constants.ts pelnym danymi z Elementora.

6. **Pierwszy projekt (Enigma) ma DWA logo** obok siebie: Logo-Enigma.png (width 212px) + Obszar-roboczy-1.png (width 159px). Pozostale karty maja po jednym logo.

7. **Brak CTA "WIECEJ"** na kartach projektow w Elementorze. W przeciwienstwie do kart programow (Phase 4), karty projektow NIE MAJA przyciskow "WIECEJ" — wyswietlaja tylko logo, tytul i opis. Jedyny projekt z linkiem to 7. ("Kto Ty jestes") — ma link na tytule i opisie do edukacjasteam.pl.

**Primary recommendation:** Wyekstrahowac ProjektySection do osobnego komponentu. Uzyc wzorca StickySection (per-sekcyjny sidebar "03 Projekty"). Grid 3-kolumnowy kart z border-left. Zaktualizowac constants.ts o 7. projekt i pelne opisy. NIE dodawac CTA "WIECEJ" na kartach (mimo ze REQUIREMENTS PROJ-05 to sugeruje — Elementor tego nie ma).

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image component | Zainstalowany |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Zainstalowany |
| TypeScript | 5.9.3 | Typy | Zainstalowany |
| React | 19.2.4 | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja obrazkow logo projektow | TAK |
| next/link | (wbudowane) | Link na 7. projekcie | TAK |

### Nowe wymagania
**Brak** — zero nowych pakietow. Faza 6 to czysto HTML/CSS/TSX.

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    sections/
      ProjektySection.tsx         # NOWY — wyekstrahowany z page.tsx
  lib/
    constants.ts                   # AKTUALIZACJA — 7. projekt + dluzsze opisy
    types.ts                       # BEZ ZMIAN — Project interface juz ma href?
```

### Pattern 1: Struktura sekcji z Elementor (Section 9 — desktop)

```
StickySection (sidebar "03 Projekty" + link "Powrot na gore strony")
  └── children (prawa kolumna):
      ├── Overlay wrapper (relative) z trybik3.png (top right, 20% opacity)
      │   ├── Content (relative z-10):
      │   │   ├── Naglowek container:
      │   │   │   └── "Projekty" (100px, w100, fadeInDown)
      │   │   ├── Wstep:
      │   │   │   ├── "Podejmujemy wyzwania..." (42px, w600, green: "realizacje projektow")
      │   │   │   ├── "Przez pryzmat innowacji..." (19px, w200, #E8E8E8)
      │   │   │   └── "Pracujemy nad rozwiazaniami..." (19px, w200, #E8E8E8)
      │   │   ├── Linia 1 (row, 3 karty):
      │   │   │   ├── Karta 1: Enigma (25vw, border-l, fadeInRight 100ms)
      │   │   │   ├── Karta 2: Pol'and Rock (25vw, border-l, fadeInRight)
      │   │   │   └── Karta 3: IOM (25vw, border-l, fadeInRight)
      │   │   ├── Linia 2 (row, 3 karty):
      │   │   │   ├── Karta 4: Noc Naukowcow (25vw, border-l, fadeInRight)
      │   │   │   ├── Karta 5: Mistrzostwa IT (25vw, border-l, fadeInRight)
      │   │   │   └── Karta 6: Laboratoria Przyszlosci (25vw, border-l, fadeInRight)
      │   │   ├── Linia 3 (row, 1 karta):
      │   │   │   ├── Karta 7: Kto Ty jestes (25vw, border-l, fadeInRight, z linkiem)
      │   │   │   └── Pusty placeholder (25vw)
      │   │   └── Strzalka w dol (separator)
```

### Pattern 2: Karta projektu

**Source:** Elementor containers 3795c717, 6b995e79, 7dcdbd2f, 29483879, 5434669b, 11f568b5, 1e3991ce

```tsx
// Karta projektu — logo + tytul + opis (BEZ CTA buttona)
<div className="w-1/3 border-l border-[#FFFFFF54] pl-[25px] pr-[25px]">
  {/* Logo */}
  <Image
    src={project.image}
    alt={project.title}
    width={200}
    height={70}
    className="mb-4 h-auto w-auto max-w-[212px]"
  />

  {/* Tytul */}
  <h4 className="mb-4 text-[22px] font-light leading-[1.1] tracking-[1px] text-[#EFEFEF]">
    {project.title}
  </h4>

  {/* Opis */}
  <p className="text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#E8E8E8]">
    {project.description}
  </p>
</div>
```

**Dokladne wartosci z Elementor:**
- Container: width 25vw, border-left 1px solid #FFFFFF54, flex_size: none
- Border-radius: 0 na kontenerze
- Justify: space-between (flex_justify_content)
- Align: flex-start (flex_align_items)
- Animation: fadeInRight, delay 100ms
- Tytul: neue-haas-grotesk-display, 22px, w300, line-height 1.1em, letter-spacing 1px, color #EFEFEF, margin 0 70px 0 25px
- Opis: neue-haas-grotesk-display, 15px, w400, line-height 22px, letter-spacing 0.2px, color #E8E8E8, margin 0 25px 0 25px
- Logo: align left, indywidualna szerokosc per projekt (od 120px do 365px)

### Pattern 3: Duzy naglowek dekoracyjny 100px

**Source:** Elementor heading 6258eaf2

```tsx
<h2
  className="mb-16 text-section text-[#EFEFEF]"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  Projekty
</h2>
```

**Wartosci:** 100px, w100 (ultra-thin), color #EFEFEF, letter-spacing 2px, line-height 1em, animation fadeInDown (slow).
Identyczny pattern jak Phase 4 ("Programy edukacyjne") i Phase 5 ("Programy stypendialne") — jednowyrazowy, bez `<br />`.

### Pattern 4: Overlay dekoracyjny — trybik3.png

**Source:** Elementor Section 9 background settings

```tsx
<div className="relative">
  {/* Overlay trybik */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/images/trybik3.png"
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
</div>
```

**Wartosci z Elementor:**
- Image: trybik3.png (WP: wp-content/uploads/2024/03/trybik3.png, local: public/images/trybik3.png)
- Position: top right
- Size: initial (natural size)
- Repeat: no-repeat
- Opacity: 0.2 (20%) — explicite w Elementor JSON!
- Background type: classic

### Pattern 5: Intro naglowki z zielonymi akcentami

**Source:** Elementor headings 74671e17, 6a00a049, 6d251b9d

```tsx
{/* Glowny naglowek 42px */}
<h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
  Podejmujemy wyzwania nowoczesnego swiata poprzez{" "}
  <span className="text-fm-green">realizacje projektow</span>
  , ktore angazuja lokalne spolecznosci.
</h3>

{/* Body paragraf 1 — 19px */}
<p className="max-w-2xl text-body text-[#E8E8E8]">
  Przez pryzmat innowacji i wspolpracy z lokalnymi spolecznosciami i partnerami
  na calym swiecie, tworzymy rozwiazania majace realny wplyw na poprawe jakosci
  zycia.
</p>

{/* Body paragraf 2 — 19px */}
<p className="max-w-2xl text-body text-[#E8E8E8]">
  Pracujemy nad rozwiazaniami, ktore nie tylko odpowiadaja na aktualne potrzeby
  spoleczne, ale rowniez przyczyniaja sie do budowania lepszej przyszlosci dla
  kolejnych pokolen. Nasze dzialania skupiaja sie na praktycznych rozwiazaniach,
  ktore przynosza realne korzysci i inspiruja do pozytywnych zmian w
  spoleczenstwie.
</p>
```

**Wartosci z Elementor:**
- Heading: 42px, w600, color #FFFFFFF5, letter-spacing 0.6px, line-height 1em
- Green accent: `<font color="#9afc4e">realizacje projektow</font>` — renderowany jako `<span className="text-fm-green">`
- Body: 19px, w200, color #E8E8E8, line-height 1.4em, letter-spacing 1px, word-spacing 1px

### Pattern 6: Grid kart projektow — 3 kolumny

**Source:** Elementor containers 7dc12865 (Linia 1), 4b2e935 (Linia 2), 6cfba343 (Linia 3)

```tsx
{/* Linia 1 — 3 karty */}
<div className="flex w-full gap-0">
  {/* Karta 1 */}
  {/* Karta 2 */}
  {/* Karta 3 */}
</div>

{/* Linia 2 — 3 karty */}
<div className="flex w-full gap-0">
  {/* Karta 4 */}
  {/* Karta 5 */}
  {/* Karta 6 */}
</div>

{/* Linia 3 — 1 karta + pusty */}
<div className="flex w-full gap-0">
  {/* Karta 7 */}
  {/* Pusty placeholder */}
</div>
```

**Wartosci z Elementor:**
- Kazdy rząd: flex_direction: row, gap 0, width 100%
- Kazda karta: width 25vw (w kontekscie prawej kolumny to w praktyce ~1/3), flex_size: none
- Brak spacera miedzy rzedami — sa spacery (widgets `spacer`) miedzy Linia 1 i Linia 2

**Implementacja w Tailwind:**
Poniewaz karty sa w prawej kolumnie za sidebarem 350px, 25vw nie jest dosłowne. W praktyce karty zajmuja ~1/3 dostepnej szerokosci. Najlepsze podejscie:
```tsx
<div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
  {PROJECTS.map((project) => (
    <ProjectCard key={project.title} project={project} />
  ))}
</div>
```
Lub alternatywnie renderowac w rzedach po 3 (jak w Elementorze).

### Pattern 7: Karta z pierwszym projektem (Enigma) — dwa logo obok siebie

**Source:** Elementor container 2e87ac1c (Logotypy)

Pierwszy projekt (Metropolitalna Liga ENIGMY) ma specjalny uklad — DWA logo obok siebie:
- Logo-Enigma.png (width 212px) — glowne logo programu
- Obszar-roboczy-1.png (width 159px) — logo partnera (Stowarzyszenie Metropolia Poznan)

Pozostale karty maja po jednym logo.

**Implementacja:** Mozna to obsluzyc na dwa sposoby:
1. Dodac pole `secondaryImage` do typu Project i danych Enigmy
2. Hardcodowac w komponencie (jesli tylko 1 projekt ma 2 logo)

Rekomendacja: Uzyc podejscia 1 (secondaryImage w interface) — bardziej elastyczne i czyste.

### Anti-Patterns to Avoid

- **NIE uzywac listy pionowej (space-y-6)** — Elementor uzywa gridu 3-kolumnowego. Obecny kod w page.tsx ma `space-y-6` — to jest bledne
- **NIE uzywac `border border-white/10` (pelnego bordera)** — karty maja TYLKO border-left 1px solid #FFFFFF54. Obecny kod uzywa `border border-white/10` — zla wartosc i zly styl
- **NIE dodawac CTA "WIECEJ" na kartach projektow** — mimo ze REQUIREMENTS PROJ-05 wspomina o CTA, Elementor NIE MA przyciskow na kartach projektow (w przeciwienstwie do kart programow). Jedyny link jest na 7. projekcie (tytul i opis)
- **NIE uzywac `rounded-sm`** — border-radius to 0 na kartach
- **NIE uzywac `brightness-0 invert` na logach** — loga projektow sa juz na ciemnym tle (biale/jasne)
- **NIE pomijac 7. projektu** — Elementor ma 7 projektow, constants.ts ma 6

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z `Image` component | Built-in lazy loading, blur placeholder, WebP |
| Overlay positioning | Custom JS | CSS `absolute inset-0` z `object-contain object-right-top` | Zero JS |
| Grid layout kart | Custom flex calculations z hardcoded 25vw | Tailwind `grid grid-cols-3` lub `flex` z `w-1/3` | Czystszy kod, responsywny |

**Key insight:** Faza 6 to czyste HTML/CSS/TSX — zero custom JavaScript, zero nowych bibliotek. Animacje sa odroczone do Phase 10.

## Common Pitfalls

### Pitfall 1: Lista pionowa zamiast gridu 3-kolumnowego
**What goes wrong:** Karty projektow sa ulozone jedna pod druga zamiast w rzedach po 3.
**Why it happens:** Obecny kod w page.tsx uzywa `space-y-6` — lista pionowa.
**How to avoid:** Uzyc `grid grid-cols-3` lub `flex` z kartami o `w-1/3`. Elementor uzywa row z 3 kartami po 25vw.
**Warning signs:** Sekcja jest zbyt dluga pionowo, karty sa zbyt szerokie.

### Pitfall 2: Brak 7. projektu ("Kto Ty jestes? - Polak maly")
**What goes wrong:** Sekcja ma 6 projektow zamiast 7.
**Why it happens:** constants.ts ma 6 pozycji. Elementor ma 7. ROADMAP mowi "grid 6 kart" — ale to byl skrot.
**How to avoid:** Dodac 7. projekt do PROJECTS w constants.ts:
```typescript
{
  title: "Kto Ty jestes? - Polak maly",
  description: "Projekt „Podwodny Swiat – edukacja STEAM z klockami LEGO", realizowany przez Fundacje Future Minds, objal 120 dzieci z 5 przedszkoli w roznych czesciach Polski, rozwijajac ich umiejetnosci w obszarach nauk przyrodniczych, technologii, inzynierii, matematyki i sztuki (STEAM). Projekt finansowany ze srodkow Ministra Edukacji w ramach programu \"Kto Ty jestes? - Polak maly\" na 2024 rok.",
  image: "/images/04_znak_-siatka_podstawowy_mono_ciemne_tlo-1.png",
  href: "https://edukacjasteam.pl/",
}
```
**Warning signs:** Trzeci rzad jest pusty.

### Pitfall 3: Bledny border na kartach
**What goes wrong:** Karty maja pelny border zamiast border-left.
**Why it happens:** Obecny kod uzywa `border border-white/10`. Elementor uzywa `border-left: 1px solid #FFFFFF54`.
**How to avoid:** Uzyc `border-l border-[#FFFFFF54]` — kolor globalny "Linia".
**Warning signs:** Karty wygladaja jak "pudelka" zamiast kart z akcentem po lewej.

### Pitfall 4: Obecnosc CTA "WIECEJ" na kartach
**What goes wrong:** Karty maja przyciski "WIECEJ" ktore nie istnieja w oryginale.
**Why it happens:** REQUIREMENTS PROJ-05 wspomina o CTA. Ale Elementor ich NIE MA.
**How to avoid:** NIE dodawac przyciskow CTA na kartach projektow. Jedyny link jest na 7. projekcie (na tytule i opisie).
**Warning signs:** Karty wygladaja przegadane w porownaniu z oryginalem.

### Pitfall 5: Brakujace lub krotkie opisy projektow
**What goes wrong:** Opisy w constants.ts sa krotsze niz w Elementorze.
**Why it happens:** Dane w constants.ts zostaly napisane uproszczone.
**How to avoid:** Zaktualizowac opisy pelnym tekstem z Elementor JSON.

### Pitfall 6: Brak drugiego logo przy Enigmie
**What goes wrong:** Karta Enigmy nie ma drugiego logo (Obszar-roboczy-1.png / Metropolia Poznan).
**Why it happens:** Project interface nie ma pola na drugie logo.
**How to avoid:** Dodac opcjonalne pole `secondaryImage?: string` do Project interface i wypelnic je dla Enigmy.

### Pitfall 7: Obrazek Pol'and Rock — bledny plik
**What goes wrong:** Karta Pol'and Rock uzywa Obszar-roboczy-1.png zamiast rock3.png.
**Why it happens:** constants.ts ma `image: "/images/Obszar-roboczy-1.png"`. Elementor uzywa rock3.png.
**How to avoid:** Zmienic image na `/images/rock3.png` dla Pol'and Rock. Plik rock3.png jest w public/images/.

## Code Examples

### Kompletna karta projektu

```tsx
// Source: Elementor Section 9, containers 3795c717 etc.
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const content = (
    <div className="border-l border-[#FFFFFF54] px-[25px] py-6">
      {/* Logo(s) */}
      {project.image && (
        <div className="mb-4 flex items-center gap-4">
          <Image
            src={project.image}
            alt={project.title}
            width={200}
            height={70}
            className="h-auto w-auto max-w-[212px]"
          />
          {project.secondaryImage && (
            <Image
              src={project.secondaryImage}
              alt=""
              width={160}
              height={70}
              className="h-auto w-auto max-w-[159px]"
            />
          )}
        </div>
      )}

      {/* Tytul */}
      <h4 className="mb-4 mr-[45px] text-[22px] font-light leading-[1.1] tracking-[1px] text-[#EFEFEF]">
        {project.href ? (
          <Link href={project.href} target="_blank" rel="noopener noreferrer">
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h4>

      {/* Opis */}
      <p className="text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#E8E8E8]">
        {project.description}
      </p>
    </div>
  );

  return content;
}
```

### Grid kart projektow (3 kolumny)

```tsx
// Source: Elementor containers 7dc12865, 4b2e935, 6cfba343
<div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
  {PROJECTS.map((project) => (
    <ProjectCard key={project.title} project={project} />
  ))}
</div>
```

### Overlay trybik3.png

```tsx
// Source: Elementor Section 9, background_overlay settings
<div className="pointer-events-none absolute inset-0 z-0">
  <Image
    src="/images/trybik3.png"
    alt=""
    fill
    className="object-contain object-right-top opacity-20"
    aria-hidden="true"
  />
</div>
```

### Dane 7. projektu do dodania do constants.ts

```typescript
// Source: Elementor Section 9, container 1e3991ce
{
  title: "Kto Ty jesteś? - Polak mały",
  description:
    'Projekt „Podwodny Świat – edukacja STEAM z klockami LEGO", realizowany przez Fundację Future Minds, objął 120 dzieci z 5 przedszkoli w różnych częściach Polski, rozwijając ich umiejętności w obszarach nauk przyrodniczych, technologii, inżynierii, matematyki i sztuki (STEAM). Projekt finansowany ze środków Ministra Edukacji w ramach programu "Kto Ty jesteś? - Polak mały" na 2024 rok.',
  image: "/images/04_znak_-siatka_podstawowy_mono_ciemne_tlo-1.png",
  href: "https://edukacjasteam.pl/",
}
```

### Zaktualizowane opisy projektow (z Elementor)

```typescript
// Enigma — dluzszy opis + secondaryImage
{
  title: "Metropolitalna Liga ENIGMY",
  description:
    "Projekt „Metropolitalna Liga ENIGMY", zrealizowany przez Fundację Future Minds i Stowarzyszenie Metropolia Poznań z finansowaniem europejskim, znacząco wzmocnił umiejętności matematyczne i informatyczne uczniów. Inicjatywa ta, łącząc konkursy międzyszkolne z edukacyjnymi celami, położyła podwaliny pod dalszy rozwój kształcenia w regionie.",
  image: "/images/Logo-Enigma.png",
  secondaryImage: "/images/Obszar-roboczy-1.png",
}

// Pol'and Rock — ZMIANA obrazka na rock3.png + dluzszy opis
{
  title: 'Pol\'and Rock 2022 "Budujemy państwo prawa"',
  description:
    'Fundacja we współpracy z Okręgową Izbą Radców Prawnych, zrealizowała projekt "Budujemy państwo prawa" na festiwalu Pol\'and Rock 2022, kładąc nacisk na prawa dziecka oraz zasady funkcjonowania państwa prawa poprzez interaktywne warsztaty z wykorzystaniem klocków LEGO\u00AE. Inicjatywa ta miała na celu nie tylko edukację prawną, ale również promowanie świadomości praw dziecka wśród młodszych pokoleń.',
  image: "/images/rock3.png",
}

// IOM — dluzszy opis
{
  title: "Realizacja grantu od Międzynarodowej Organizacji ds. Migracji ONZ",
  description:
    'Realizacja projektu "Działania integracyjne społeczności za pomocą FIRST LEGO League Explore" została wsparta grantem od Międzynarodowej Organizacji ds. Migracji (IOM), będącej częścią Systemu Organizacji Narodów Zjednoczonych (ONZ). Celem tego projektu było wspieranie integracji polskich i ukraińskich dzieci w miejscowości Karczmiska, województwo Lubelskie, przez wspólne uczestnictwo w edukacyjnych aktywnościach.',
  image: "/images/IOM.png",
}

// Noc Naukowcow — dluzszy opis
{
  title: "Noc Naukowców",
  description:
    "Od wielu lat Fundacja wraz z Wydziałem Matematyki i Informatyki na Uniwersytecie Adama Mickiewicza w Poznaniu bierze udział w Nocy Naukowców - największej w Europie imprezie promującej naukę, innowację i badania. Jest organizatorem takich wydarzeń otwartych jak budowanie i programowanie robotów (elementy FIRST LEGO League) czy Build The Change.",
  image: "/images/Noc-naukowcow.png",
}

// Mistrzostwa IT — dluzszy opis
{
  title: "Mistrzostwa IT",
  description:
    "Fundacja współorganizuje Dywizję Robotyki w ramach Mistrzostw IT odbywających się na Poznań Game Arena, prestiżowym wydarzeniu dla entuzjastów nowych technologii w Europie Środkowo-Wschodniej. Wydarzenie stanowi platformę dla promowania wiedzy, umiejętności i pasji, przygotowując młodzież do spełnienia wymagań współczesnego rynku pracy.",
  image: "/images/Obszar-roboczy-3.png",
}

// Laboratoria Przyszlosci — dluzszy opis
{
  title: "Laboratoria Przyszłości",
  description:
    "Laboratoria Przyszłości to rządowy program, który wspierał szkoły w całej Polsce w doposażeniu pracowni STEAM (m.in. pracowni technicznych, robotycznych czy informatycznych). Fundacja wspiera merytorycznie szkoły, które wybrały rozwiązania związane z LEGO Education i FIRST LEGO League, oferując kompleksowe wdrożenia i szkolenia dla nauczycieli.",
  image: "/images/logo-Laboratoria_Przyszlosci_poziom_biale-1-e1707145414838.png",
}
```

## Elementor Structure Map (Section 9 — desktop)

```
Section 9 (7c23b047) — row, gap 0, content_width full
  bg: brak (transparent)
  overlay: trybik3.png (top right, no-repeat, initial, opacity 0.2)
  hide_mobile: yes
  ├── menu-anchor (anchor: projekty)
  ├── Sidebar (3de6d130) — w=350px, animation: none
  │   └── Sticky container (1a3735b1) — sticky:top, sticky_parent:yes
  │       ├── Green-Triangle.png
  │       ├── "Projekty" (30px, w600, #EFEFEF, ml=20px, mb=8px)
  │       └── Button: "Powrot na gore strony" -> #home
  ├── Content (5132d2a8) — flex-grow
  │   ├── Title container:
  │   │   └── "Projekty" (100px, w100, #EFEFEF, letter-spacing 2px, fadeInDown slow)
  │   ├── Wstep (5a26b2fc):
  │   │   ├── "Podejmujemy wyzwania..." (42px, w600, #FFFFFFF5, green: "realizacje projektow")
  │   │   ├── "Przez pryzmat innowacji..." (19px, w200, #E8E8E8)
  │   │   └── "Pracujemy nad rozwiazaniami..." (19px, w200, #E8E8E8)
  │   ├── Linia 1 (7dc12865) — row, 100% width:
  │   │   ├── Karta 1: Enigma (3795c717) — 25vw, border-l 1px #FFFFFF54, fadeInRight 100ms
  │   │   │   ├── 2 logo: Logo-Enigma.png (212px) + Obszar-roboczy-1.png (159px)
  │   │   │   ├── "Metropolitalna Liga ENIGMY" (22px, w300, #EFEFEF)
  │   │   │   └── Pelny opis (15px, w400, #E8E8E8, line-height 22px)
  │   │   ├── Karta 2: Pol'and Rock (6b995e79) — 25vw, border-l, fadeInRight
  │   │   │   ├── rock3.png (142px)
  │   │   │   ├── Tytul z <br> (22px, w300)
  │   │   │   └── Pelny opis (15px, w400)
  │   │   └── Karta 3: IOM (7dcdbd2f) — 25vw, border-l, fadeInRight
  │   │       ├── IOM.png (120px)
  │   │       ├── Tytul (22px, w300)
  │   │       └── Pelny opis (15px, w400)
  │   ├── Spacer
  │   ├── Linia 2 (4b2e935) — row, 100% width:
  │   │   ├── Karta 4: Noc Naukowcow (29483879) — identyczny styl
  │   │   │   ├── Noc-naukowcow.png (130px)
  │   │   │   ├── Tytul + opis
  │   │   ├── Karta 5: Mistrzostwa IT (5434669b)
  │   │   │   ├── Obszar-roboczy-3.png (182px)
  │   │   │   ├── Tytul + opis
  │   │   └── Karta 6: Laboratoria (11f568b5)
  │   │       ├── logo-Laboratoria_Przyszlosci... (239px)
  │   │       ├── Tytul + opis
  │   ├── Spacer
  │   ├── Linia 3 (6cfba343) — row, 100% width:
  │   │   ├── Karta 7: Kto Ty jestes (1e3991ce) — z linkiem do edukacjasteam.pl
  │   │   │   ├── 04_znak_...png (365px) — z linkiem
  │   │   │   ├── Tytul z linkiem (22px, w300, #EFEFEF)
  │   │   │   └── Opis z linkiem (15px, w400) — caly klikalny do edukacjasteam.pl
  │   │   └── Pusty placeholder (797f3d27) — spacery
  │   └── Strzalka w dol (3ffaf070):
  │       └── Strzalka-w-dol.png
```

## State of the Art

| Obecny kod (page.tsx ProjektySection) | Wymagane (z Elementor) | Zmiana |
|---------------------------------------|------------------------|--------|
| 6 projektow w constants.ts | 7 projektow (+Kto Ty jestes) | Dodac 7. projekt |
| Lista pionowa `space-y-6` | Grid 3-kolumnowy (3+3+1) | Przebudowac layout |
| `border border-white/10` (pelny border) | `border-l border-[#FFFFFF54]` (tylko lewy) | Zmiana stylu |
| `rounded-sm` na kartach | `rounded-none` (0 border-radius) | Usunac zaokraglenia |
| Tytul 18px `text-lg font-light` | 22px, w300, line-height 1.1, letter-spacing 1px | Dokladniejsze wartosci |
| Opis `text-fm-text leading-relaxed` | 15px, w400, line-height 22px, letter-spacing 0.2px, #E8E8E8 | Dokladniejsze wartosci |
| Brak duzego naglowka 100px "Projekty" | "Projekty" 100px w100 | Dodac naglowek |
| Brak overlay trybik3.png | trybik3.png top-right, 20% opacity | Dodac overlay |
| Logo z `brightness-0 invert` | Logo BEZ filtrow (juz jasne) | Usunac filtry |
| CTA "Powrot na gore" na kazdym projekcie | Brak CTA na kartach, link tylko na 7. projekcie | Usunac CTA |
| Brak 2. logo przy Enigmie | Logo-Enigma.png + Obszar-roboczy-1.png | Dodac drugie logo |
| Pol'and Rock: Obszar-roboczy-1.png | rock3.png | Zmienic obrazek |
| Krotsze opisy | Pelne opisy z Elementora | Zaktualizowac teksty |
| Brak strzalki w dol (separator) | Strzalka-w-dol.png na koncu | Dodac separator |
| Inline w page.tsx | Osobny ProjektySection.tsx | Wyekstrahowac komponent |
| Intro: `text-3xl md:text-4xl font-light` | 42px, w600, #FFFFFFF5, letter-spacing 0.6px | Dokladniejsze wartosci |
| Intro body: `text-lg font-light text-fm-text` | 19px, w200, #E8E8E8, line-height 1.4em | Dokladniejsze wartosci |
| 1 paragraf intro | 2 paragrafy intro (+ inny tekst niz w kodzie) | Dodac 2. paragraf, poprawic teksty |

## Open Questions

1. **7 projektow vs 6 w ROADMAP**
   - What we know: ROADMAP mowi "grid 6 kart projektow". Elementor ma 7 (3+3+1). Siodmy to "Kto Ty jestes? - Polak maly" z linkiem do edukacjasteam.pl.
   - What's unclear: Czy siodmy projekt byl celowo pominiety w ROADMAP, czy to byl skrot?
   - Recommendation: **Dodac 7. projekt** — cel projektu to "wierna kopia" Elementora. Siodmy projekt jest na produkcyjnej stronie. ROADMAP "6 kart" to prawdopodobnie skrot wynikajacy z wczesniejszego stanu constants.ts.

2. **CTA "WIECEJ" — REQUIREMENTS vs Elementor**
   - What we know: REQUIREMENTS PROJ-05 mowi "CTA WIECEJ". Elementor NIE MA przyciskow CTA na kartach projektow. Jedyny link jest na 7. projekcie (na tytule i opisie prowadzi do edukacjasteam.pl).
   - What's unclear: Czy user chce CTA jak w REQUIREMENTS, czy wierna kopie Elementora (bez CTA)?
   - Recommendation: **Nie dodawac CTA "WIECEJ"** — kierujemy sie zrodlem prawdy (Elementor + zywą strona), nie uproszczonymi requirements. Karty projektow sa informacyjne, nie nawigacyjne (w przeciwienstwie do kart programow, ktore linkuja do podstron).

3. **Grid 3-kolumnowy — czy nie za waskie karty?**
   - What we know: Karty w Elementorze maja 25vw szerokosc. W naszym layoutzie prawa kolumna jest juz zawęzona przez sidebar 350px.
   - What's unclear: Czy 3 kolumny zmieszcza sie dobrze na mniejszych desktopach (1280px).
   - Recommendation: Uzyc `grid-cols-3` na `lg:` breakpoincie. Na desktopie 1400px (max-w-[1400px]) prawa kolumna ma ~1050px, wiec kazda karta ma ~350px — wystarczajaco. Na 1280px prawa kolumna ma ~930px, kazda karta ~310px — ciagle ok. Fallback: `grid-cols-1` na mniejszych ekranach.

4. **Interface Project — secondaryImage**
   - What we know: Tylko pierwszy projekt (Enigma) ma 2 logo. Pozostale maja 1 lub 0.
   - What's unclear: Czy rozszerzac interface o secondaryImage, czy hardcodowac?
   - Recommendation: **Dodac `secondaryImage?: string`** do Project interface — to czyste, rozszerzalne podejscie. Wypelnic dla Enigmy: `secondaryImage: "/images/Obszar-roboczy-1.png"`.

5. **Obrazek Pol'and Rock**
   - What we know: constants.ts ma `image: "/images/Obszar-roboczy-1.png"`. Elementor uzywa rock3.png.
   - What's unclear: Czy to celowa zmiana, czy blad w constants.ts?
   - Recommendation: **Zmienic na rock3.png** — to jest plik widoczny na produkcji. Obszar-roboczy-1.png to logo Metropolii Poznan (drugie logo Enigmy).

6. **Sidebar — brak navLinks (tylko "Powrot na gore strony")**
   - What we know: Elementor sidebar sekcji Projekty ma TYLKO: Green-Triangle.png, "Projekty" heading, "Powrot na gore strony" button. Brak linkow do projektow.
   - What's unclear: Czy PROJECTS_SECTION_NAV jest potrzebny? Obecny constants.ts ma go z jednym linkiem "Powrot na gore strony".
   - Recommendation: Uzyc `navLinks` z PROJECTS_SECTION_NAV (ktory ma "Powrot na gore strony") LUB nie podawac navLinks i polegac na linku wbudowanym w StickySection. Sprawdzic — StickySection juz ma wbudowany link "Powrot na gore strony" na dole. Wiec `navLinks` moze byc undefined.

## Sources

### Primary (HIGH confidence)
- Elementor JSON page 20657 — Section 9 (id=7c23b047) pelna ekstrakcja: sidebar (id=3de6d130, 350px), sticky (id=1a3735b1), 3 linie kart (7dc12865, 4b2e935, 6cfba343), overlay trybik3.png, 7 kart projektow z pelna typografia i wartosciami
- Elementor site-settings.json — kolory globalne: 9bd1aa5 = #FFFFFF54 (Linia — border kart), 50b259d = #FFFFFF (White Element)
- Istniejacy codebase: page.tsx (obecna implementacja ProjektySection inline), StickySection.tsx, constants.ts (PROJECTS, PROJECTS_SECTION_NAV), types.ts (Project interface)
- Obrazki w public/images/ — zweryfikowane: trybik3.png, Logo-Enigma.png, Obszar-roboczy-1.png, rock3.png, IOM.png, Noc-naukowcow.png, Obszar-roboczy-3.png, logo-Laboratoria_Przyszlosci...png, 04_znak_-siatka...png, Strzalka-w-dol.png, Green-Triangle.png

### Secondary (MEDIUM confidence)
- WebFetch futureminds.edu.pl — potwierdzenie 7 projektow na zywo (Kto Ty jestes widoczny na stronie)
- Phase 4 RESEARCH.md i Phase 5 RESEARCH.md — wzorce: StickySection, overlay, border-l, intro headings

### Tertiary (LOW confidence)
- Brak — wszystkie kluczowe wartosci (overlay opacity, border color, typografia) sa explicite w Elementor JSON

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (grid 3-kolumnowy, overlay, sidebar): HIGH — dokladne wartosci z Elementor JSON
- Dane projektow (7 projektow, opisy, obrazki): HIGH — bezposrednio z Elementor, pliki zweryfikowane w public/images/
- Typografia kart (22px/w300 tytul, 15px/w400 opis): HIGH — explicite w Elementor JSON
- Border kart (#FFFFFF54): HIGH — resolved z globalnych kolorow Elementor (9bd1aa5 = "Linia")
- Overlay trybik3.png (20% opacity): HIGH — explicite `background_overlay_opacity: 0.2` w Elementor JSON
- Brak CTA na kartach: HIGH — zweryfikowane w Elementor JSON i na zywo — karty nie maja przyciskow

**Research date:** 2026-02-12
**Valid until:** 2026-03-12 (stabilne technologie, 30 dni)

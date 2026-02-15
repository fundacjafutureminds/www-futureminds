# Phase 9: Footer - Research

**Researched:** 2026-02-15
**Domain:** Footer strony — stopka z logo FUTURE|MINDS, sloganami, linkami nawigacyjnymi, ikonami social media, informacja o partnerze Carrier
**Confidence:** HIGH

## Summary

Zbadano pelna strukture footera z Elementor template (ID 12442, wersja desktop — hide_mobile). Footer jest zbudowany jako **pojedyncza kolumna centricznie ulozona** (nie 4 kolumny jak w wymaganiach — wymagania mowia o "4 kolumnach informacji" ale Elementor implementuje to jako wertykalna strukture z wyraznym podzialem na sekcje). Kluczowe elementy od gory:

1. **Logo FUTURE | MINDS** — rozdzielone pionowa zielona kreska (`pionowa-greska-green-13.png`), z "Foundation" pod "MINDS". FUTURE (40px, w200, uppercase, align right) | kreska | MINDS (40px, w500, uppercase). To jest inne od obecnego kodu ktory uzywa `FMF-white.png` — Elementor footer ma rozdzielona wersje FUTURE/MINDS.
2. **Slogany** — "Nauka i technologia / to nasza pasja" (30px, w300, align right) oraz "Edukacja / to nasza misja." (30px, w600, align left) z zielona kropka na koncu. Rozmieszczone w dwoch kolumnach (40% + 2% gap + 40%).
3. **Linki nawigacyjne** — 10 linkow jako text buttons (16px, w300, neue-haas-grotesk, letter-spacing 1.1px, kolor #EAEAEA, hover: #9AFC4E). Ulozone wertykalnie.
4. **Social media ikony** — Facebook, Instagram, LinkedIn, YouTube jako FA ikony 32px, kolor bialy, w rzedzie.
5. **Partner Carrier** — tekst "Strona powstala dzieki wsparciu strategicznego partnera, firmy Carrier" (17px, w400) + logo carrier-logo.png (width 12%) z linkiem do carrier.com.

**UWAGA:** Obecny Footer.tsx juz istnieje i ma poprawna strukture logiczna (logo, slogan, linki, social links, partner), ale wymaga gruntownej przebudowy pod katem pixel-perfect zgodnosci z Elementorem. Glowne roznice: logo (FMF-white vs FUTURE|MINDS rozdzielone), layout (text-center vs specyficzny alignment), typografia (brak neue-haas-grotesk-display), brak obrazkow (carrier-logo, pionowa-greska-green-13).

**Primary recommendation:** Przebudowac Footer.tsx zgodnie z Elementor template 12442. Pobrac brakujace obrazki (carrier-logo.png, pionowa-greska-green-13.png). Zachowac istniejace dane z constants.ts (FOOTER_LINKS, SOCIAL_LINKS). Dodac dane Carrier do constants.ts. Uzyc ikon SVG zamiast Font Awesome (projekt nie uzywa FA).

## Standard Stack

### Core (juz zainstalowane)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, Image, Link | Zainstalowany |
| Tailwind CSS | 4.x | Utility-first CSS | Zainstalowany |
| TypeScript | 5.x | Typy | Zainstalowany |
| React | 19.x | UI rendering | Zainstalowany |
| next/image | (wbudowane) | Optymalizacja obrazkow (logo, carrier, kreska) | TAK |
| next/link | (wbudowane) | Linki nawigacyjne, social links | TAK |

### Nowe wymagania
**Brak nowych pakietow.** Jedyny wymog to pobranie brakujacych obrazkow z WordPressa:
- `carrier-logo.png` — https://futureminds.edu.pl/wp-content/uploads/2024/03/carrier-logo.png
- `pionowa-greska-green-13.png` — https://futureminds.edu.pl/wp-content/uploads/2023/08/pionowa-greska-green-13.png

### Ikony social media
Elementor uzywa Font Awesome (`fab fa-facebook`, `fab fa-instagram`, `fab fa-linkedin`, `fab fa-youtube`). Projekt **nie uzywa Font Awesome** — nalezy uzyc inline SVG lub tekstu (jak w obecnym kodzie). Rekomendacja: proste inline SVG ikony (16-20 linii kodu na ikone) zamiast dodawania calej biblioteki FA.

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    layout/
      Footer.tsx              # PRZEBUDOWA — pixel-perfect z Elementor template 12442
  lib/
    constants.ts               # AKTUALIZACJA — dodanie CARRIER_LINK
    types.ts                   # BEZ ZMIAN — NavItem juz wystarczajacy
  public/
    images/
      carrier-logo.png         # NOWY — do pobrania z WP
      pionowa-greska-green-13.png  # NOWY — do pobrania z WP
```

### Pattern 1: Pelna struktura footera z Elementor (desktop, template 12442)

```
<footer> (bg: fm-dark-bg, border-t border-white/10)
  <container> (max-w-[1400px], mx-auto, px-8, py-16, text-center)
    +-- Spacer gorny
    +-- Logo FUTURE | MINDS (row layout):
    |   +-- Container (w-40%, flex-col, items-end):
    |   |   +-- "FUTURE" (40px, w200, uppercase, align-right, neue-haas)
    |   +-- Pionowa kreska zielona (pionowa-greska-green-13.png)
    |   +-- Container (w-40%, flex-col, items-start):
    |       +-- "MINDS" (40px, w500, uppercase, neue-haas)
    |       +-- "Foundation" (11px, w500, uppercase, neue-haas)
    +-- Spacer (10px)
    +-- Slogany (row layout):
    |   +-- Container (w-40%):
    |   |   +-- "Nauka i technologia" <br> "to nasza pasja" (30px, w300, align-right)
    |   +-- Container (w-2%) — gap
    |   +-- Container (w-40%):
    |       +-- "Edukacja" <br> "to nasza misja." (30px, w600, align-left, kropka zielona)
    +-- Spacer (100px)
    +-- Spacer (20px)
    +-- Linki nawigacyjne (flex-wrap, center, gap):
    |   +-- Aktualnosci, Kontakt, FIRST LEGO League, Edukacja Energetyczna,
    |   +-- O nas, Szkolenia, Polityka prywatnosci, Regulamin sprzedazy,
    |   +-- Biznes / CSR, Stypendia
    |   (kazdy: 16px, w300, neue-haas, tracking 1.1px, #EAEAEA, hover: #9AFC4E)
    +-- Spacer (77px)
    +-- Social icons (row, center, gap):
    |   +-- Facebook, Instagram, LinkedIn, YouTube (32px, bialy, hover: zielony)
    +-- Spacer (67px)
    +-- Partner text: "Strona powstala..." (17px, w400, bialy)
    +-- Spacer (10px)
    +-- Logo Carrier (width ~12%, link do carrier.com)
    +-- Spacer (60px)
```

### Pattern 2: Logo FUTURE | MINDS (rozdzielone)

**Source:** Elementor template 12442 — headings "FUTURE", "MINDS", "Foundation"

W Elementorze footer **nie uzywa** obrazka FMF-white.png. Zamiast tego sa 3 headingi i obrazek zielonej kreski:

```tsx
{/* Logo FUTURE | MINDS */}
<div className="flex items-center justify-center gap-0">
  {/* FUTURE */}
  <div className="flex w-[40%] flex-col items-end">
    <span
      className="text-[40px] font-extralight uppercase leading-none tracking-normal text-white"
      style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
    >
      FUTURE
    </span>
  </div>

  {/* Pionowa kreska zielona */}
  <div className="mx-[3px]">
    <Image
      src="/images/pionowa-greska-green-13.png"
      alt=""
      width={4}
      height={50}
      className="h-[50px] w-auto"
      aria-hidden="true"
    />
  </div>

  {/* MINDS + Foundation */}
  <div className="flex w-[40%] flex-col items-start">
    <span
      className="text-[40px] font-medium uppercase leading-none tracking-normal text-white"
      style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
    >
      MINDS
    </span>
    <span
      className="text-[11px] font-medium uppercase leading-none tracking-normal text-white"
      style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
    >
      Foundation
    </span>
  </div>
</div>
```

**Wartosci z Elementor:**
- "FUTURE": neue-haas-grotesk-display, 40px, w200, uppercase, align right, kolor global #FFFFFF (50b259d)
- Kreska: `pionowa-greska-green-13.png`, width 100%, w kontenerze o ~2% szerokosc
- "MINDS": neue-haas-grotesk-display, 40px, w500, uppercase, align left, kolor global #FFFFFF (50b259d)
- "Foundation": neue-haas-grotesk-display, 11px, w500, uppercase, kolor global #FFFFFF (50b259d)

### Pattern 3: Slogany

**Source:** Elementor template 12442 — headings w kontenerze row

```tsx
<div className="flex items-end justify-center">
  {/* Lewa strona */}
  <div className="w-[40%] text-right">
    <p
      className="text-[30px] font-light leading-[1.2] tracking-[1px] text-white"
      style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
    >
      {`Nauka i technologia`}
      <br />
      {` to nasza pasja`}
    </p>
  </div>

  {/* Gap */}
  <div className="w-[2%]" />

  {/* Prawa strona */}
  <div className="w-[40%] text-left">
    <p
      className="text-[30px] font-semibold leading-[1.2] tracking-[1px] text-white"
      style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
    >
      {`Edukacja`}
      <br />
      {`to nasza misja`}
      <span className="text-fm-green">{`.`}</span>
    </p>
  </div>
</div>
```

**Wartosci z Elementor:**
- Slogan 1: 30px, w300, align right, kolor #FFFFFF (global 50b259d)
- Slogan 2: 30px, w600, align left, kolor #FFFFFF, z zielona kropka (#9AFC4E)
- Oba: neue-haas-grotesk-display, letter-spacing 1px, text-transform none

### Pattern 4: Linki nawigacyjne (text buttons)

**Source:** Elementor template 12442 — button widgets

```tsx
{FOOTER_LINKS.map((link) => (
  <Link
    key={link.label}
    href={link.href}
    className="text-[16px] font-light leading-none tracking-[1.1px] text-[#EAEAEA] transition-colors hover:text-fm-green"
    style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
  >
    {link.label}
  </Link>
))}
```

**Wartosci z Elementor:**
- Font: neue-haas-grotesk-display, 16px, w300
- Letter-spacing: 1.1px
- Color: #EAEAEA
- Hover color: #9AFC4E (global 380b317 = "Greeeeeen")
- Background: transparent (#00000000)
- Margin: 4px top, 3px bottom per link
- Text-transform: none
- Line-height: 1em

**Layout:** W Elementorze linki sa ulozone wertykalnie (column) ale na szerokim ekranie moga byc flex-wrap. Obecny Footer.tsx uzywa flex-wrap z gap — to dobry kompromis. Alternatywnie mozna uzyc grida 2 kolumny (5 linkow + 5 linkow) — trzeba zweryfikowac wizualnie na produkcji.

### Pattern 5: Social media ikony

**Source:** Elementor template 12442 — icon widgets z Font Awesome

```tsx
{/* Social icons */}
<div className="flex justify-center gap-6">
  {SOCIAL_LINKS.map((link) => (
    <a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white transition-colors hover:text-fm-green"
      aria-label={link.label}
    >
      {/* Inline SVG icon 32px */}
      <SocialIcon name={link.label} size={32} />
    </a>
  ))}
</div>
```

**Wartosci z Elementor:**
- Ikony: fab fa-facebook, fab fa-instagram, fab fa-linkedin, fab fa-youtube
- Size: 32px
- Color: #FFFFFF (global 50b259d)
- Hover: brak explicite (prawdopodobnie #9AFC4E jak linki)
- Layout: row, gap miedzy ikonami

**Rekomendacja dot. ikon:** Zamiast dodawac Font Awesome do projektu, uzyc inline SVG. Ikony Facebook, Instagram, LinkedIn i YouTube to standardowe SVG paths, latwo dostepne.

### Pattern 6: Partner Carrier

**Source:** Elementor template 12442 — text-editor + image widget

```tsx
{/* Partner Carrier */}
<p
  className="text-[17px] font-normal tracking-[0.5px] text-white"
  style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
>
  {`Strona powsta\u0142a dzi\u0119ki wsparciu strategicznego partnera, firmy Carrier`}
</p>
<div className="mt-[10px]">
  <a href="https://www.carrier.com/commercial/pl/pl/" target="_blank" rel="noopener noreferrer">
    <Image
      src="/images/carrier-logo.png"
      alt="Carrier"
      width={150}
      height={40}
      className="mx-auto h-auto w-[12%] min-w-[100px]"
    />
  </a>
</div>
```

**Wartosci z Elementor:**
- Tekst: "Strona powstala dzieki wsparciu strategicznego partnera, firmy Carrier"
- Font: 17px, w400
- Color: #FFFFFF (global 50b259d)
- Logo: carrier-logo.png, width 12%, link do https://www.carrier.com/commercial/pl/pl/ (external)

### Anti-Patterns to Avoid

- **NIE uzywac Font Awesome** — projekt nie ma FA, uzyc inline SVG zamiast tego
- **NIE uzywac FMF-white.png w footerze** — Elementor footer uzywa rozdzielonego logo FUTURE | MINDS (nie obrazka PNG calego logo). FMF-white.png jest uzywany w Navbarze, nie w footerze
- **NIE centrowac sloganow bez odpowiedniego layout** — slogany maja specyficzny alignment: lewy = right-aligned, prawy = left-aligned z zielona kropka
- **NIE pomijac pionowej zielonej kreski** — to kluczowy element wizualny oddzielajacy FUTURE od MINDS
- **NIE pomijac "Foundation" pod "MINDS"** — to maly tekst 11px ktory jest czescia logo w footerze
- **NIE dodawac reCAPTCHA** — to plugin WP, nie czesc naszego footera
- **NIE uzywac polskich znakow bezposrednio w JSX** — unicode escape sequences (locked decision z Phase 6)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom lazy loading | `next/image` z Image component | Built-in lazy loading, WebP |
| SVG social icons | Custom icon library | Inline SVG components | 4 ikony, proste SVG paths |
| Link routing | Custom router | next/link z Link component | App Router integration |
| Hover transitions | Custom JS | Tailwind `transition-colors hover:text-fm-green` | CSS-only, zero JS |

**Key insight:** Footer to czysty HTML/CSS/TSX — zero JavaScript interaktywnosci (oproc hover CSS). Najtrudniejszy element to pixel-perfect layout logo FUTURE|MINDS z kreska.

## Common Pitfalls

### Pitfall 1: Uzycie FMF-white.png zamiast rozdzielonego logo
**What goes wrong:** Footer wyglada inaczej niz oryginalna strona — cale logo PNG zamiast rozdzielonego FUTURE|MINDS z kreska.
**Why it happens:** Obecny Footer.tsx uzywa FMF-white.png bo bylo latwiejsze do implementacji.
**How to avoid:** Zaimplementowac logo jako 3 osobne elementy tekstowe (FUTURE, MINDS, Foundation) z obrazkiem zielonej kreski miedzy nimi.
**Warning signs:** Brak zielonej pionowej kreski w footerze.

### Pitfall 2: Brakujace obrazki (carrier-logo, pionowa-greska)
**What goes wrong:** Build fails lub broken images w footerze.
**Why it happens:** Obrazki carrier-logo.png i pionowa-greska-green-13.png nie sa w repozytorium (nigdy nie zostaly pobrane z WP).
**How to avoid:** Pobrac z WordPressa przed implementacja: `curl -O https://futureminds.edu.pl/wp-content/uploads/2024/03/carrier-logo.png` i `curl -O https://futureminds.edu.pl/wp-content/uploads/2023/08/pionowa-greska-green-13.png`.
**Warning signs:** 404 na obrazkach w footerze.

### Pitfall 3: Font-weight sloganow
**What goes wrong:** Slogany wygladaja identycznie zamiast miec kontrast wizualny.
**Why it happens:** Oba slogany maja ten sam font-weight.
**How to avoid:** Slogan 1 ("Nauka i technologia...") = w300 (font-light). Slogan 2 ("Edukacja...") = w600 (font-semibold). To celowy kontrast w Elementorze.
**Warning signs:** Oba teksty wygladaja jednakowo grube.

### Pitfall 4: Layout sloganow — alignment
**What goes wrong:** Oba slogany sa wycentrowane zamiast miec specyficzny alignment.
**Why it happens:** CSS `text-center` na calym footerze override'uje.
**How to avoid:** Slogan 1 = `text-right`, Slogan 2 = `text-left`. Kontener sloganow = `flex items-end justify-center`.
**Warning signs:** Slogany nie sa "lustrzane" wzgledem srodka.

### Pitfall 5: Unicode/polskie znaki w JSX
**What goes wrong:** Polskie znaki moga powodowac bledy przy Write tool.
**Why it happens:** Tool Write na Windows moze miec problemy z kodowaniem.
**How to avoid:** Uzyc unicode escape sequences (`\u0119`, `\u0142`, `\u015B` itd.) — locked decision z Phase 6.
**Warning signs:** Bledy kompilacji lub znieksztalcone znaki.

### Pitfall 6: Social media ikony — brak aria-label
**What goes wrong:** Ikony bez tekstu sa niedostepne (accessibility).
**Why it happens:** Ikony SVG nie maja tresci tekstowej.
**How to avoid:** Dodac `aria-label` na kazdym linku social media.
**Warning signs:** Lighthouse accessibility warnings.

## Code Examples

### Kompletna struktura Footer (rekomendowany ksztalt)

```tsx
// Source: Elementor template 12442 (Footer desktop)
import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-fm-dark-bg">
      <div className="mx-auto max-w-[1400px] px-8 py-16">
        {/* Logo FUTURE | MINDS */}
        <div className="flex items-center justify-center">
          <div className="flex w-[40%] flex-col items-end">
            <span
              className="text-[40px] font-extralight uppercase leading-none text-white"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              FUTURE
            </span>
          </div>
          <div className="mx-[3px]">
            <Image
              src="/images/pionowa-greska-green-13.png"
              alt=""
              width={4}
              height={50}
              className="h-[50px] w-auto"
              aria-hidden="true"
            />
          </div>
          <div className="flex w-[40%] flex-col items-start">
            <span
              className="text-[40px] font-medium uppercase leading-none text-white"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              MINDS
            </span>
            <span
              className="text-[11px] font-medium uppercase leading-none text-white"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              Foundation
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[10px]" />

        {/* Slogany */}
        <div className="flex items-end justify-center">
          <div className="w-[40%] text-right">
            <p
              className="text-[30px] font-light leading-[1.2] tracking-[1px] text-white"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              {`Nauka i technologia`}
              <br />
              {` to nasza pasja`}
            </p>
          </div>
          <div className="w-[2%]" />
          <div className="w-[40%] text-left">
            <p
              className="text-[30px] font-semibold leading-[1.2] tracking-[1px] text-white"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              {`Edukacja`}
              <br />
              {`to nasza misja`}
              <span className="text-fm-green">{`.`}</span>
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[120px]" />

        {/* Linki nawigacyjne */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-[7px]">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[16px] font-light leading-none tracking-[1.1px] text-[#EAEAEA] transition-colors hover:text-fm-green"
              style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="h-[77px]" />

        {/* Social icons */}
        <div className="flex justify-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-fm-green"
              aria-label={link.label}
            >
              <SocialIcon name={link.label} />
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div className="h-[67px]" />

        {/* Partner Carrier */}
        <p
          className="text-center text-[17px] font-normal text-white"
          style={{ fontFamily: "'neue-haas-grotesk-display', var(--font-sans)" }}
        >
          {`Strona powsta\u0142a dzi\u0119ki wsparciu strategicznego partnera, firmy Carrier`}
        </p>
        <div className="mt-[10px] flex justify-center">
          <a href="https://www.carrier.com/commercial/pl/pl/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/carrier-logo.png"
              alt="Carrier"
              width={150}
              height={40}
              className="h-auto w-[150px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

### Social Icon component (inline SVG)

```tsx
function SocialIcon({ name }: { name: string }) {
  const size = 32;
  const icons: Record<string, JSX.Element> = {
    Facebook: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    Instagram: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    LinkedIn: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    YouTube: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  };
  return icons[name] || null;
}
```

## Elementor Structure Map (Footer desktop, template 12442)

```
Container (flex-direction: column, hide_mobile)
  +-- menu-anchor (anchor: footer)
  +-- spacer
  +-- Row container (logo FUTURE | MINDS):
  |   +-- Container (w=40%, items-end):
  |   |   +-- spacers + heading "FUTURE" (40px/w200/uppercase/neue-haas/align-right)
  |   +-- Image: pionowa-greska-green-13.png (w=100%, link: futureminds.edu.pl)
  |   +-- Container (w=40%, items-start):
  |       +-- spacers + heading "MINDS" (40px/w500/uppercase)
  |       +-- heading "Foundation" (11px/w500/uppercase)
  +-- spacer (10px)
  +-- Row container (slogany):
  |   +-- Container (w=40%):
  |   |   +-- heading "Nauka i technologia<br>to nasza pasja" (30px/w300/align-right)
  |   +-- Container (w=2%)
  |   +-- Container (w=40%):
  |       +-- heading "Edukacja<br>to nasza misja." (30px/w600/align-left, kropka zielona)
  +-- spacer (100px)
  +-- spacer (20px)
  +-- 10x button widgets (linki nawigacyjne):
  |   Aktualnosci, Kontakt, FIRST LEGO League, Edukacja Energetyczna,
  |   O nas, Szkolenia, Polityka prywatnosci, Regulamin sprzedazy,
  |   Biznes / CSR, Stypendia
  |   (kazdy: 16px/w300/neue-haas/tracking 1.1px/#EAEAEA, hover: #9AFC4E)
  |   (bg: transparent, margin: 4px top 3px bottom)
  +-- spacer (77px)
  +-- Row container (social icons):
  |   +-- icon: fab fa-facebook (32px, bialy, link: facebook.com/fundacjafutureminds)
  |   +-- icon: fab fa-instagram (32px, bialy, link: instagram.com/fundacjafutureminds)
  |   +-- icon: fab fa-linkedin (32px, bialy, link: linkedin.com/company/fundacja-future-minds)
  |   +-- icon: fab fa-youtube (32px, bialy, link: youtube.com/@firstlegoleaguepolska)
  +-- spacer (67px)
  +-- text-editor: "Strona powstala dzieki wsparciu strategicznego partnera, firmy Carrier"
  |   (17px/w400/bialy)
  +-- spacer (10px)
  +-- image: carrier-logo.png (width 12%, link: carrier.com/commercial/pl/pl/)
  +-- spacer (60px)
  +-- text-editor: reCAPTCHA notice (16px/w300) — POMIJAMY (plugin WP)
```

## Porownanie obecnego kodu vs Elementor

| Obecny Footer.tsx | Elementor template 12442 | Zmiana |
|-------------------|--------------------------|--------|
| Logo: FMF-white.png (240px) | Logo: FUTURE \| kreska \| MINDS + Foundation (tekstowe, 40px) | Przebudowac na tekst + kreska |
| Slogan: jedna linia, md:flex-row | Slogan: 2 kolumny (40%+2%+40%), rozny weight | Przebudowac layout |
| Slogan text: font-light oba | Slogan 1: w300, Slogan 2: w600 | Roznicowac font-weight |
| Linki: text-sm | Linki: 16px, neue-haas, tracking 1.1px | Zaktualizowac typografie |
| Social: text-sm label | Social: SVG ikony 32px | Zamienic na SVG ikony |
| Partner text: text-xs | Partner text: 17px, w400 | Zaktualizowac rozmiar |
| Brak logo Carrier | Logo carrier-logo.png (12%) z linkiem | Dodac |
| Brak pionowej kreski | pionowa-greska-green-13.png | Dodac (pobrac z WP) |
| `text-center` layout | Specyficzny alignment per sekcja | Przebudowac |

## Dane do constants.ts

Istniejace dane `FOOTER_LINKS` i `SOCIAL_LINKS` sa **poprawne** — zawieraja wszystkie 10 linkow i 4 social media. Jedyna nowa stala to dane Carrier:

```typescript
export const CARRIER_PARTNER = {
  text: "Strona powsta\u0142a dzi\u0119ki wsparciu strategicznego partnera, firmy Carrier",
  logo: "/images/carrier-logo.png",
  href: "https://www.carrier.com/commercial/pl/pl/",
};
```

## Brakujace obrazki — do pobrania

| Obrazek | URL zrodlowe | Cel |
|---------|-------------|-----|
| `carrier-logo.png` | `https://futureminds.edu.pl/wp-content/uploads/2024/03/carrier-logo.png` | Logo partnera w footerze |
| `pionowa-greska-green-13.png` | `https://futureminds.edu.pl/wp-content/uploads/2023/08/pionowa-greska-green-13.png` | Zielona kreska miedzy FUTURE i MINDS |

## Open Questions

1. **Layout linkow — wertykalny vs flex-wrap**
   - What we know: Elementor renderuje linki jako oddzielne button widgets ulozone wertykalnie (flex-direction: column). Obecny kod uzywa flex-wrap (horyzontalnie).
   - What's unclear: Na produkcji linki wygladaja na flex-wrap (2-3 rzedy), nie stricte wertykalnie. Elementor moze miec responsywne zachowanie.
   - Recommendation: **Uzyc flex-wrap** (jak w obecnym kodzie) — to bardziej estetyczne na szerokim ekranie. Zweryfikowac wizualnie z produkcja.

2. **"Foundation" pod "MINDS" — czy widoczne na produkcji?**
   - What we know: Elementor template 12442 ma heading "Foundation" (11px, w500, uppercase) pod "MINDS".
   - What's unclear: Na produkcji tekst jest bardzo maly (11px) — moze byc ledwo widoczny.
   - Recommendation: **Zachowac** — jest w Elementorze, nawet jesli maly. Wiernosc.

3. **Obrazki do pobrania — czy dostepne?**
   - What we know: URLs sa znane z Elementor template.
   - What's unclear: Czy WordPress jest nadal online i serwuje te obrazki.
   - Recommendation: **Pobrac na poczatku planu 09-01** — jesli niedostepne, mozna wygenerowac zielona kreske (gradient CSS) i uzyc tekstu "Carrier" zamiast logo.

4. **Border-top footera**
   - What we know: Obecny kod ma `border-t border-white/10`. Elementor template nie ma explicite border.
   - What's unclear: Czy border-top jest z theme level (hello theme) czy z template?
   - Recommendation: **Zachowac border-t border-white/10** — jest subtelny i wizualnie separuje footer od contentu. Nawet jesli Elementor nie ma go explicite, moze byc z Hello theme CSS.

## Sources

### Primary (HIGH confidence)
- Elementor template 12442 (Footer desktop) — pelna struktura parsowana z JSON: logo FUTURE|MINDS (40px/w200+w500/neue-haas/uppercase), kreska (pionowa-greska-green-13.png), slogany (30px/w300+w600), 10 linkow (16px/w300/tracking 1.1px/#EAEAEA), 4 ikony social (32px), partner Carrier (17px + logo 12%)
- Istniejacy codebase: Footer.tsx (obecna implementacja), constants.ts (FOOTER_LINKS — 10 linkow, SOCIAL_LINKS — 4 social), types.ts (NavItem), globals.css (kolory fm-dark-bg, fm-green, fm-text-muted)
- Obrazki w public/images/ — zweryfikowane: FMF-white.png istnieje, carrier-logo.png BRAK, pionowa-greska-green-13.png BRAK
- Elementor global colors: 50b259d = #FFFFFF (White Element + BG), 380b317 = #9AFC4E (Greeeeeen), a9b4f23 = #FFFFFF00 (Full Transparency)

### Secondary (MEDIUM confidence)
- WebFetch https://futureminds.edu.pl — potwierdzenie struktury footera (logo, slogan, linki, social, Carrier)
- Phase 2-8 RESEARCH/PLAN — wzorce: unicode escape sequences, neue-haas-grotesk-display fontFamily, pattern kolorow i typografii

### Tertiary (LOW confidence)
- Dokladna szerokosc carrier-logo.png (12% w Elementorze = ~168px na 1400px container) — moze wymagac dostosowania po pobraniu i zobaczeniu proporcji

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero nowych bibliotek, wszystko w codebase
- Architecture (layout, typografia, kolory): HIGH — dokladne wartosci z Elementor template 12442
- Dane (FOOTER_LINKS, SOCIAL_LINKS): HIGH — juz istnieja w constants.ts i sa poprawne
- Obrazki (carrier-logo, kreska): MEDIUM — URLs znane, ale obrazki nie sa jeszcze pobrane
- SVG social icons: HIGH — standardowe SVG paths, dobrze znane

**Research date:** 2026-02-15
**Valid until:** 2026-03-15 (stabilne technologie, 30 dni)

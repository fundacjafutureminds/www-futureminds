# Phase 10: Integracja i Deploy - Research

**Researched:** 2026-02-15
**Domain:** Animacje scroll-triggered (Framer Motion), weryfikacja buildu/obrazkow, deploy na Vercel
**Confidence:** HIGH

## Summary

Faza 10 to finalna integracja wszystkich wczesniejszych faz (1-9) w spojna calosc. Projekt jest w doskonalym stanie technicznym: build Next.js przechodzi bez bledow, wszystkie 44 referencjonowane obrazki istnieja na dysku, 8 obrazkow jest nieuzywanych (sieroce), a architektura komponentow jest czysta. Glowna praca w tej fazie to:

1. **Animacje fadeIn** — jedyny duzy element brakujacy. Navbar (faza 3) juz uzywa Framer Motion z fadeIn/fadeInLeft/fadeInDown, ale pozostale sekcje (Hero, Programy Edukacyjne, Programy Stypendialne, Projekty, Szkolenia, Baza Wiedzy) nie maja zadnych animacji. Elementor definiuje fadeIn, fadeInDown, fadeInLeft, fadeInRight z roznymi delay na wielu elementach (naglowki, obrazki, logotypy, blog widgety).
2. **Dekoracyjne overlay** — juz zaimplementowane we wszystkich sekcjach (Tlo-EDUKACYJNE3.png, Tlo-STYPENDIA.png, skrzydlo2.png, trybik3.png, szkolenia.png, Baza-wiedzy.png, baza-wieedzy.png, dzieci-panorama4.png). Wymagaja jedynie wizualnej weryfikacji.
3. **Build verification** — build juz przechodzi (zweryfikowane). TypeScript strict mode wlaczony.
4. **Deploy na Vercel** — zero-config dla Next.js. Repo publiczne na GitHub (fundacjafutureminds/www-futureminds), co upraszcza polaczenie z Vercel.

**Primary recommendation:** Uzyc Framer Motion `whileInView` z `viewport={{ once: true }}` do implementacji animacji scroll-triggered we wszystkich sekcjach. Konwertowac sekcje na Client Components (dodac "use client") tylko tam gdzie to konieczne — idealnie wydzielic animowane wrappery jako osobne komponenty.

## Standard Stack

### Core
| Biblioteka | Wersja | Cel | Dlaczego standardowa |
|-----------|--------|-----|---------------------|
| Next.js | 16.1.6 | Framework, build, deploy | Juz w projekcie, zero-config na Vercel |
| Tailwind CSS | 4.1.18 | Stylowanie | Juz w projekcie, @theme inline + @theme |
| React | 19.2.4 | Komponenty UI | Juz w projekcie |
| framer-motion | 12.31.0 | Animacje fadeIn scroll-triggered | Juz zainstalowany, uzyty w Navbar |
| TypeScript | 5.9.3 | Typy statyczne | Juz skonfigurowany, strict mode |

### Supporting
| Biblioteka | Wersja | Cel | Kiedy uzyc |
|-----------|--------|-----|-----------|
| next/image | built-in | Optymalizacja obrazkow | Juz uzywany wszedzie |
| lucide-react | 0.563.0 | Ikony (nieuzywane jeszcze) | Opcjonalne — nie wymaga pracy |
| Vercel CLI | latest | Deploy z CLI (opcjonalny) | Alternatywa do Git-based deploy |

### Alternatives Considered
| Zamiast | Mozna | Tradeoff |
|---------|-------|----------|
| Framer Motion whileInView | Intersection Observer + CSS | Wiecej kodu, brak integracji z React, ale mniejszy bundle |
| Framer Motion whileInView | CSS @keyframes + scroll-timeline | Jeszcze eksperymentalne, slabe wsparcie przegladarek |
| Git-based Vercel deploy | Vercel CLI `vercel --prod` | CLI daje kontrole, ale Git integration jest prostsze |

**Instalacja:** Nic nowego nie trzeba instalowac. Wszystkie zaleznosci juz sa w package.json.

## Architecture Patterns

### Aktualny stan projektu
```
src/
  app/
    layout.tsx          # RootLayout z Plus Jakarta Sans + Footer
    page.tsx            # Home: HeroSection + 5x sekcji tematycznych
    globals.css         # Tailwind v4 @theme + kolory + typografia
    (podstrony)/        # Placeholder pages
  components/
    layout/
      Navbar.tsx        # NIEUZYWANY (export istnieje, ale nigdzie nie importowany)
      Footer.tsx        # Pixel-perfect z Elementor template 12442
    sections/
      HeroSection.tsx   # Server Component — brak animacji
      ProgramyEdukacyjneSection.tsx  # Server Component — brak animacji
      ProgramyStypendialneSection.tsx # Server Component — brak animacji
      ProjektySection.tsx # Server Component — brak animacji
      SzkoleniaSection.tsx # Server Component — brak animacji
      BazaWiedzySection.tsx # Server Component — brak animacji
    ui/
      Button.tsx
      SectionHeading.tsx
      StickySection.tsx  # Komponent wrappujacy sekcje z sticky sidebar
  lib/
    constants.ts        # Wszystkie dane statyczne (NAV_ITEMS, PROGRAMS, PROJECTS, itp.)
    types.ts            # Interfejsy TypeScript
public/
  images/              # 52 plikow, 6.7MB — wszystkie referencjonowane istnieja
```

### Pattern 1: Animowany wrapper z whileInView
**Co:** Wydzielony Client Component opakowujacy elementy, ktore maja animacje fadeIn.
**Kiedy:** Gdy sekcja jest Server Component i chcemy dodac animacje bez konwertowania calej sekcji na Client Component.
**Przyklad:**
```typescript
// src/components/ui/FadeIn.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

const directionMap: Record<FadeDirection, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -30 },
  right: { x: 30 },
  none: {},
};

export function FadeIn({
  children,
  direction = "none",
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  const offset = directionMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Kluczowa zaleta:** Sekcje pozostaja Server Components. Tylko `<FadeIn>` jest Client Component. To minimalizuje JavaScript po stronie klienta.

### Pattern 2: Stagger Container
**Co:** Kontener z opoznieniami dla grupy elementow (np. logotypy partnerow, karty projektow).
**Kiedy:** Gdy wiele elementow ma animacje z rosnacym delay.
**Przyklad:**
```typescript
// W FadeIn.tsx lub osobny komponent
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Element wewnatrz StaggerContainer
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 3: Vercel Git Integration Deploy
**Co:** Automatyczny deploy z GitHub push.
**Kiedy:** Standardowy flow dla Next.js na Vercel.
**Kroki:**
1. Zaloguj sie na vercel.com
2. "Add New" > "Project"
3. Importuj repo `fundacjafutureminds/www-futureminds`
4. Framework: Next.js (auto-detected)
5. Root Directory: `.` (domyslnie)
6. Build Command: `next build` (domyslnie)
7. Output Directory: `.next` (domyslnie)
8. Deploy

### Anti-Patterns do unikania
- **Anti-pattern: Konwersja calej sekcji na Client Component**: Nie dodawac `"use client"` do sekcji jak `ProgramyEdukacyjneSection.tsx`. Zamiast tego uzyc `<FadeIn>` wrappera wewnatrz Server Component.
- **Anti-pattern: Animacje na mount zamiast on-scroll**: Elementor animacje sa scroll-triggered (widoczne gdy element wchodzi w viewport). Uzyc `whileInView`, NIE `animate` (ktory triggeruje na mount).
- **Anti-pattern: Zbyt agresywne animacje**: Uzyc `viewport={{ once: true }}` zeby animacja odpalala sie tylko raz, nie przy kazdym scroll in/out.
- **Anti-pattern: Animowanie duzych kontenerow**: Animowac indywidualne elementy (naglowki, obrazki, karty), nie cale sekcje.

## Mapa animacji z Elementora

Kompletna mapa animacji wydobyta z `elementor/content/page/12561.json`:

### Hero Section
| Element | Animacja | Delay |
|---------|----------|-------|
| Ilustracja rakiety (logo FMF) | fadeInLeft | 0 |
| Tekst misji paragraf 1 | fadeInRight | 100ms |
| Tekst misji paragraf 2 | fadeInRight | 200ms |
| Tekst misji paragraf 3 | fadeInRight | 300ms |
| Tekst misji paragraf 4 | fadeInRight | 400ms |

### Programy Edukacyjne
| Element | Animacja | Delay |
|---------|----------|-------|
| Duzy naglowek "Programy edukacyjne" | fadeInDown | 0 |
| Teksty "szyte na miare" (3 paragrafy) | fadeIn | 0 |

### Programy Stypendialne
| Element | Animacja | Delay |
|---------|----------|-------|
| Duzy naglowek "Programy stypendialne" | fadeInDown | 0 |
| Logotypy partnerow (9 szt.) | fadeIn | 100-500ms (rozne) |
| Blog widget | fadeInRight | 200ms |
| Karta "Jak ufundowac?" — obrazek | fadeInLeft | 400ms |
| Karta "Jak otrzymac?" — obrazek | fadeInRight | 400ms |
| Karta "Jak zostac sponsorem?" — obrazek | fadeIn | 0 |

### Projekty
| Element | Animacja | Delay |
|---------|----------|-------|
| Duzy naglowek "Projekty" | fadeInDown | 0 |

### Szkolenia
| Element | Animacja | Delay |
|---------|----------|-------|
| Duzy naglowek "Szkolenia dla nauczycieli" | fadeInDown | 0 |

### Baza Wiedzy
| Element | Animacja | Delay |
|---------|----------|-------|
| Duzy naglowek "Baza wiedzy" | fadeInDown | 0 |
| Blog widget artykuly | fadeIn | 0 |

### Nawigacja (juz zaimplementowana)
| Element | Animacja | Delay | Status |
|---------|----------|-------|--------|
| Logo FMF | fadeInDown | 0 | DONE (Navbar.tsx) |
| Linki nawigacyjne (8 szt.) | fadeInLeft | 100-800ms | DONE (Navbar.tsx) |

**UWAGA:** Navbar.tsx uzywa `animate` (on mount), nie `whileInView`. To poprawne dla Navbara, bo jest sticky i widoczny od razu. Ale Navbar jest nieuzywany (nie importowany nigdzie) — per-sekcyjne StickySection sidebary zastapily go.

## Stan overlayow dekoracyjnych

Overlay sa juz zaimplementowane we wszystkich sekcjach:

| Sekcja | Overlay | Opacity | Status |
|--------|---------|---------|--------|
| Hero | dzieci-panorama4.png | 0.15 | DONE |
| Programy Edukacyjne | Tlo-EDUKACYJNE3.png | 0.20 | DONE |
| Programy Stypendialne | Tlo-STYPENDIA.png + skrzydlo2.png | 0.20 / 0.18 | DONE |
| Projekty | trybik3.png | 0.20 | DONE |
| Szkolenia | szkolenia.png | 0.19 | DONE |
| Baza Wiedzy | Baza-wiedzy.png + baza-wieedzy.png | 0.20 / 0.20 | DONE |

Wymaga jedynie wizualnej weryfikacji w przegladarce (porownanie z oryginalem).

## Stan obrazkow

### Referencjonowane w kodzie: 44 unikalne obrazki
Wszystkie istnieja na dysku — brak 404.

### Sieroce (w public/images/ ale nieuzywane w src/):
| Plik | Notatka |
|------|---------|
| Collins-aerospace-white.png | Alternatywne logo Collins (uzywane jest Collins_Aerospace_logo_stack_white_300.png) |
| dlon7.png | Niewykorzystana ilustracja |
| logo-ENEA-3-biale.png | Alternatywne logo ENEA (uzywane jest Untitled-designapt.png) |
| logo-short-light.png | Mniejsza wersja logo OZEdukacja (uzywane jest logo-short-light-1024x363.png) |
| Screen-Shot-2019-12-27-at-1.50.07-PM.png | Mniejsza wersja logo LEGO (uzywane jest wersja -1024x232-1) |
| szum-gray-1.png | Nieuzywany pattern szumu |
| Tlo-Szary-ciemny-wyostrzony.png | Tlo body (wspomniane w CONTEXT.md fazy 3 jako deferred) |
| wiatrak1.png | Niewykorzystana ilustracja wiatraka |

**Rekomendacja:** Nie usuwac sierocych obrazkow — moga byc potrzebne w przyszlosci. `Tlo-Szary-ciemny-wyostrzony.png` moze byc dodany jako `background-image: url(...)` na `body` w przyszlej fazie (mobile/responsive).

## Don't Hand-Roll

| Problem | Nie buduj | Uzyj | Dlaczego |
|---------|-----------|------|----------|
| Scroll-triggered fadeIn | IntersectionObserver + CSS @keyframes | Framer Motion `whileInView` | Juz zainstalowany, deklaratywny, stagger wbudowany |
| Image optimization | Reczny lazy-load + srcset | `next/image` | Juz uzywany, automatyczny WebP/AVIF na Vercel |
| Deploy pipeline | Custom CI/CD | Vercel Git Integration | Zero-config dla Next.js, auto-detect framework |
| TypeScript checking | Reczne sprawdzanie typow | `next build` (wbudowany tsc) | Build automatycznie uruchamia TypeScript checking |
| Obrazki statyczne validation | Reczne porownywanie list | Skrypt Node.js porownujacy src/ refs z public/images/ | Szybkie i deterministyczne |

**Kluczowy insight:** Faza 10 to przede wszystkim "klejenie" i weryfikacja. Nie ma tu nowej duzej logiki do budowania — animacje to jedyny feature.

## Common Pitfalls

### Pitfall 1: "use client" propagacja na Server Components
**Co sie psuje:** Dodanie `"use client"` do sekcji (np. ProgramyEdukacyjneSection.tsx) powoduje, ze caly komponent i jego dzieci staja sie Client Components, zwiekszajac bundle JS.
**Przyczyna:** Framer Motion wymaga Client Component. Jesli dodamy `motion.div` bezposrednio do sekcji, musimy dodac `"use client"`.
**Jak unikac:** Wydzielic `<FadeIn>` jako osobny Client Component. Sekcje pozostaja Server Components. `<FadeIn>` to boundary.
**Sygnaly ostrzegawcze:** Duzy bundle JS, wolniejszy FCP.

### Pitfall 2: Animacje na mount zamiast on-scroll
**Co sie psuje:** Wszystkie animacje odpalaja sie na zaladowanie strony, nie gdy element jest widoczny.
**Przyczyna:** Uzycie `animate` zamiast `whileInView`.
**Jak unikac:** Zawsze uzywac `whileInView` dla elementow ponizej fold. `animate` tylko dla Navbar (ktory jest widoczny od razu).
**Sygnaly ostrzegawcze:** Animacje "juz sie skonczyly" gdy user scrolluje do sekcji.

### Pitfall 3: Brak `viewport={{ once: true }}`
**Co sie psuje:** Animacja powtarza sie za kazdym razem gdy element wchodzi/wychodzi z viewportu.
**Przyczyna:** Domyslnie `whileInView` animuje przy kazdym wejsciu w viewport.
**Jak unikac:** Zawsze dodac `viewport={{ once: true }}`.
**Sygnaly ostrzegawcze:** Elementy "migaja" przy scrollowaniu w gore i w dol.

### Pitfall 4: Vercel deploy z niecommitowanymi zmianami
**Co sie psuje:** Deploy na Vercel bierze kod z Git, nie z lokalnego dysku.
**Przyczyna:** Vercel Git Integration buduje z ostatniego pushu.
**Jak unikac:** Commitowac i pushowac WSZYSTKIE zmiany przed sprawdzeniem deploy. Uzywac `git -c http.proxyAuthMethod=basic push` (proxy wymagany na tym koncie).
**Sygnaly ostrzegawcze:** Vercel build rozni sie od lokalnego.

### Pitfall 5: next/image z fill i brak width/height na Vercel
**Co sie psuje:** Obrazki z `fill` prop wymagaja kontenera z `position: relative` i zdefiniowanymi wymiarami.
**Przyczyna:** `fill` oznacza `position: absolute` na obrazku — potrzebuje parent z relatywnym pozycjonowaniem.
**Jak unikac:** Juz poprawnie zaimplementowane (overlay maja `pointer-events-none absolute inset-0`). Wystarczy weryfikacja.
**Sygnaly ostrzegawcze:** Overlay nie wyswietlaja sie lub zajmuja 0x0 px.

### Pitfall 6: Navbar.tsx nieuzywany — dead code
**Co sie psuje:** Navbar.tsx eksportuje komponent, ale nie jest importowany nigdzie po refaktorze z fazy 04-02.
**Przyczyna:** Globalny Navbar zastapiony per-sekcyjnymi StickySection sidebarami.
**Jak unikac:** Usunac lub przebudowac Navbar.tsx. Animacje fadeIn z Navbar sa uzywanem wzorcem do nasledowania.
**Sygnaly ostrzegawcze:** Dead code w repo, potencjalny TypeScript warning o nieuzywanych exportach.

## Code Examples

### Uzycie FadeIn w sekcji (Server Component)
```typescript
// src/components/sections/HeroSection.tsx (modyfikacja)
// UWAGA: Sekcja pozostaje Server Component!
import { FadeIn } from "@/components/ui/FadeIn";

export function HeroSection() {
  return (
    <section id="home" className="relative flex h-screen flex-col justify-center bg-fm-dark">
      {/* Overlay — bez animacji */}
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/dzieci-panorama4.png" ... />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-8 py-20">
        {/* Logo z fadeInLeft */}
        <FadeIn direction="left">
          <Image src="/images/FMF-white.png" ... />
        </FadeIn>

        {/* Tekst misji z fadeInRight i stagger delay */}
        <div className="max-w-xl space-y-6">
          <FadeIn direction="right" delay={0.1}>
            <p>Fundacja Future Minds wspiera...</p>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <p>Jako oficjalny operator...</p>
          </FadeIn>
          <FadeIn direction="right" delay={0.3}>
            <p>We wspolpracy z partnerami...</p>
          </FadeIn>
          <FadeIn direction="right" delay={0.4}>
            <p>Budujemy odpowiedzialne...</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

### Stagger logotypow partnerow
```typescript
// W ProgramyStypendialneSection.tsx
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

// Wewnatrz sekcji:
<StaggerContainer staggerDelay={0.08} className="flex max-w-[600px] flex-wrap items-center gap-6">
  {PARTNER_LOGOS.map((partner) => (
    <StaggerItem key={partner.name}>
      <Image src={partner.src} alt={partner.name} ... />
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Weryfikacja obrazkow (skrypt Node.js)
```javascript
// Uzyc jako ad-hoc check, nie komponent
const fs = require('fs');
const path = require('path');

// Zbierz referencje z src/
const srcDir = 'src';
const refs = new Set();
// ... grep /images/ z src/ i porownaj z ls public/images/
```

## State of the Art

| Stare podejscie | Nowe podejscie | Kiedy zmiana | Wplyw |
|-----------------|----------------|--------------|-------|
| CSS @keyframes + IntersectionObserver | Framer Motion whileInView | FM v7+ (2023) | Deklaratywne, mniej boilerplate |
| Vercel CLI deploy | Git Integration (auto-deploy on push) | 2020+ | Zero-config, preview na kazdym PR |
| next export (static) | next build (SSG domyslnie) | Next.js 13+ | Automatyczne SSG/SSR, Image Optimization |
| Manual image optimization | next/image (WebP/AVIF on Vercel) | Next.js 10+ | Automatyczne, zero konfiguracji |

**Deprecated/outdated:**
- `next export`: Zastapione przez `output: 'export'` w next.config.ts (ale NIE potrzebne — Vercel obsluguje SSG natywnie)
- `framer-motion` package name: Teraz oficjalnie `motion` (ale `framer-motion` nadal dziala, i projekt juz go uzywa pod ta nazwa)

## Open Questions

1. **Nieuzywany Navbar.tsx — co z nim?**
   - Co wiemy: Navbar.tsx jest zdefiniowany z animacjami Framer Motion, ale nie jest importowany nigdzie po refaktorze z fazy 04-02.
   - Co niejasne: Czy usunac plik (dead code), czy przebudowac na cos uzytecznego?
   - Rekomendacja: Pozostawic na razie — nie przeszkadza w buildzie. Moze byc przydatny jako wzorzec dla mobile navbar w przyszlosci.

2. **Body background texture (Tlo-Szary-ciemny-wyostrzony.png)**
   - Co wiemy: Odlozony w fazie 3 ("deferred"). Plik istnieje w public/images/.
   - Co niejasne: Czy dodac jako `background-image` na `body` w fazie 10?
   - Rekomendacja: Mozna dodac jako czesc planu 10-02 (overlay weryfikacja). Jednolinijkowa zmiana w globals.css.

3. **Vercel domena**
   - Co wiemy: Deploy na Vercel da subdomain `*.vercel.app`. Custom domain (futureminds.edu.pl) wymaga konfiguracji DNS.
   - Co niejasne: Czy Maciej chce custom domain w fazie 10, czy wystarczy subdomain Vercel?
   - Rekomendacja: W fazie 10 deploy na subdomain Vercel. Custom domain to osobne zadanie.

4. **Motion FX z Elementora (parallax, mouseTrack)**
   - Co wiemy: Faza 3 CONTEXT.md wyraznie definiuje "Motion FX to faza 10 (integracja)".
   - Co niejasne: Czy implementowac parallax/mouseTrack w fazie 10, czy to overkill?
   - Rekomendacja: Pominac Motion FX w fazie 10. Scope ograniczyc do fadeIn (ktore sa w wymaganiach). Parallax/mouseTrack to nice-to-have na przyszlosc.

## Sources

### Primary (HIGH confidence)
- Kod zrodlowy projektu — wszystkie komponenty, globals.css, constants.ts, package.json
- `elementor/content/page/12561.json` — pelna mapa animacji wydobyta skryptem Node.js
- Build Next.js (`npx next build`) — zweryfikowany, przechodzi bez bledow
- Analiza obrazkow — skrypt bash porownujacy referencje z plikami na dysku

### Secondary (MEDIUM confidence)
- [Vercel docs: Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) — zero-config deploy, Image Optimization
- [Framer Motion: whileInView](https://motion.dev/docs/react-animation) — scroll-triggered animations
- [Next.js 16 blog post](https://nextjs.org/blog/next-16) — potwierdzenie kompatybilnosci z Vercel

### Tertiary (LOW confidence)
- Brak — wszystkie ustalenia zweryfikowane kodem lub oficjalna dokumentacja

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — wszystko juz zainstalowane i dzialajace
- Architecture (animacje): HIGH — Framer Motion whileInView to standardowy pattern, Navbar juz go uzywa (choc z `animate`)
- Architecture (deploy): HIGH — Vercel + Next.js to natywna integracja, zero-config
- Pitfalls: HIGH — zidentyfikowane na podstawie analizy kodu i doswiadczenia z projektem
- Mapa animacji: HIGH — wydobyta bezposrednio z Elementor JSON, nie zgadywanie

**Research date:** 2026-02-15
**Valid until:** 2026-03-15 (stabilna domena — Framer Motion i Vercel sie nie zmienia drastycznie)

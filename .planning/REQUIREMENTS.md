# Requirements: www-futureminds

**Defined:** 2026-02-04
**Core Value:** Wierna kopia wizualna futureminds.edu.pl na szybkim, nowoczesnym stacku

## v1 Requirements

### Fundamenty (FUND)

- [x] **FUND-01**: Paleta kolorów zaktualizowana — #9AFC4E (lime green), #32373c (dark bg), #FFFFFF (text)
- [x] **FUND-02**: Font Plus Jakarta Sans zintegrowany via next/font/google (fallback dla neue-haas-grotesk)
- [x] **FUND-03**: Hierarchia typografii: 100px/w200 (sekcje), 42px/w600 (nagłówki), 30px/w600 (sidebar), 19px/w200 (body), 10px/uppercase (CTA)
- [x] **FUND-04**: StickySection zaktualizowany — lewa kolumna 350px, sticky:top, items-start, separator
- [x] **FUND-05**: globals.css @theme zaktualizowany z prawidłową paletą FM
- [x] **FUND-06**: constants.ts zaktualizowany z pełnymi danymi (9 partnerów, wszystkie programy, projekty)

### Hero (HERO)

- [x] **HERO-01**: Pełnoekranowa sekcja (100vh), ciemne tło #32373c
- [x] **HERO-02**: Logo FMF-white.png w lewym górnym rogu
- [x] **HERO-03**: Dekoracyjna ilustracja rakiety (liniowa, outline) jako tło
- [x] **HERO-04**: Tekst misji fundacji — paragrafy z zielonymi akcentami (#9AFC4E)
- [x] **HERO-05**: Strzałka w dół na dole sekcji (separator/scroll indicator)
- [ ] **HERO-06**: Animacja fadeIn na elementach tekstowych

### Nawigacja (NAV)

- [ ] **NAV-01**: Navbar z logo + linkami nawigacyjnymi, ciemne tło
- [ ] **NAV-02**: Linki: Aktualności, Programy edukacyjne, Programy stypendialne, Projekty, Szkolenia, Publikacje, O nas, Kontakt
- [ ] **NAV-03**: Dekoracyjny trójkąt outline (Obszar-roboczy-2-kopia-2.png) obok menu

### Programy Edukacyjne (PROG)

- [ ] **PROG-01**: Sticky sidebar 350px z nagłówkiem sekcji "01 Programy edukacyjne"
- [ ] **PROG-02**: Intro nagłówki o globalnych/lokalnych programach edukacyjnych z zielonymi akcentami
- [ ] **PROG-03**: Dekoracyjny overlay Tlo-EDUKACYJNE3.png ~20% opacity
- [ ] **PROG-04**: Karta programu FIRST LEGO League — logo, opis, link "WIĘCEJ"
- [ ] **PROG-05**: Karta programu Build the Change — logo, opis, link "WIĘCEJ"
- [ ] **PROG-06**: Karta programu OZEdukacja — logo, opis, link "WIĘCEJ"
- [ ] **PROG-07**: Sekcja "programy szyte na miarę" z opisem i CTA
- [ ] **PROG-08**: Karty z border-white/10, bez background, CTA: 10px uppercase, bg #FFFFFF0A, border-radius 2px
- [ ] **PROG-09**: Animacje fadeIn (fadeInLeft, fadeInRight) z opóźnieniami

### Programy Stypendialne (STYP)

- [ ] **STYP-01**: Sticky sidebar 350px z nagłówkiem "02 Programy stypendialne"
- [ ] **STYP-02**: Nagłówki o łączeniu biznesu z dziećmi, zielone akcenty
- [ ] **STYP-03**: Dekoracyjny overlay Tlo-STYPENDIA.png ~20% opacity
- [ ] **STYP-04**: 9 logotypów partnerów w rzędzie/gridzie (Rockwell, John Deere, RTX, Collins, ENEA, Mmaltic, + 3)
- [ ] **STYP-05**: Karta CTA "Jak ufundować stypendium?" z obrazkiem pudelko1.png
- [ ] **STYP-06**: Karta CTA "Jak otrzymać stypendium?" z obrazkiem dzieci-stypendia-1.png
- [ ] **STYP-07**: Blog widget — 2 najnowsze wpisy (statyczne w v1)
- [ ] **STYP-08**: Animacje fadeIn z opóźnieniami

### Projekty (PROJ)

- [ ] **PROJ-01**: Sticky sidebar 350px z nagłówkiem "03 Projekty"
- [ ] **PROJ-02**: Intro nagłówki z zielonymi akcentami
- [ ] **PROJ-03**: Dekoracyjny overlay trybik3.png ~20% opacity
- [ ] **PROJ-04**: Grid 6 kart projektów (tytuł + opis)
- [ ] **PROJ-05**: Styl kart: border-white/10, CTA "WIĘCEJ", animacje fadeIn

### Szkolenia (SZKL)

- [ ] **SZKL-01**: Sticky sidebar 350px z nagłówkiem "04 Szkolenia"
- [ ] **SZKL-02**: Opis szkoleń dla nauczycieli z zielonymi akcentami
- [ ] **SZKL-03**: Dekoracyjny overlay szkolenia.png ~20% opacity
- [ ] **SZKL-04**: Link "Poznaj nasze szkolenia"
- [ ] **SZKL-05**: Rząd ikon technologii: SPIKE, Raspberry Pi, Arduino, Python, AI

### Baza Wiedzy (BAZW)

- [ ] **BAZW-01**: Sticky sidebar 350px z nagłówkiem "05 Baza Wiedzy"
- [ ] **BAZW-02**: Opis bazy wiedzy z zielonymi akcentami
- [ ] **BAZW-03**: Dekoracyjny overlay Baza-wiedzy.png lub baza-wieedzy.png ~20% opacity
- [ ] **BAZW-04**: Grid 6 artykułów/publikacji (3 kolumny, statyczne w v1)
- [ ] **BAZW-05**: Linki do artykułów

### Footer (FOOT)

- [ ] **FOOT-01**: Ciemne tło, 4 kolumny informacji
- [ ] **FOOT-02**: Logo fundacji, dane kontaktowe
- [ ] **FOOT-03**: Social links (Facebook, YouTube, LinkedIn)
- [ ] **FOOT-04**: Link do polityki prywatności

### Ogólne (GENR)

- [ ] **GENR-01**: Build Next.js przechodzi bez błędów TypeScript
- [ ] **GENR-02**: Strona renderuje się poprawnie na desktop (1280px+)
- [ ] **GENR-03**: Wszystkie obrazki ładują się poprawnie
- [ ] **GENR-04**: Dekoracyjne overlay na tłach sekcji ~20% opacity
- [ ] **GENR-05**: Deploy na Vercel działa

## v2 Requirements

### Responsywność

- **RESP-01**: Tablet breakpoint (768px) — layout adaptacyjny
- **RESP-02**: Mobile breakpoint (375px) — pełna reorganizacja sekcji
- **RESP-03**: Mobile hamburger menu

### Podstrony

- **SUBS-01**: Pełna strona "O nas" z treścią z WordPress
- **SUBS-02**: Pełna strona "Kontakt" z formularzem
- **SUBS-03**: Pełna strona "Programy edukacyjne" z detalami
- **SUBS-04**: Pełna strona "Programy stypendialne"
- **SUBS-05**: Pełna strona "Projekty"
- **SUBS-06**: Pełna strona "Publikacje"
- **SUBS-07**: Pełna strona "Aktualności" z listą postów

### Dynamiczna treść

- **DYN-01**: Blog widget z prawdziwymi danymi (WP REST API lub CMS)
- **DYN-02**: Formularz kontaktowy działający
- **DYN-03**: SEO zaawansowane (sitemap, structured data)

## Out of Scope

| Feature | Reason |
|---------|--------|
| WordPress CMS integracja | v1 statyczna, dane w constants.ts |
| Panel administracyjny | Nie potrzebny dla strony prezentacyjnej |
| Wielojęzyczność | Tylko polska wersja strony |
| E-commerce / płatności | Fundacja nie sprzedaje online |
| Newsletter / mailing | Osobna usługa, nie część strony |
| Analytics zaawansowane | Google Analytics w v2 |
| Mobile-first design | Desktop-first, mobile w v2 |
| Wersja mobilna Elementor | 15 sekcji w Elementor: parzyste to mobile — pomijamy w v1 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FUND-01 | Phase 1: Fundamenty | Complete |
| FUND-02 | Phase 1: Fundamenty | Complete |
| FUND-03 | Phase 1: Fundamenty | Complete |
| FUND-04 | Phase 1: Fundamenty | Complete |
| FUND-05 | Phase 1: Fundamenty | Complete |
| FUND-06 | Phase 1: Fundamenty | Complete |
| HERO-01 | Phase 2: Hero | Complete |
| HERO-02 | Phase 2: Hero | Complete |
| HERO-03 | Phase 2: Hero | Complete |
| HERO-04 | Phase 2: Hero | Complete |
| HERO-05 | Phase 2: Hero | Complete |
| HERO-06 | Phase 10: Integracja i Deploy | Pending |
| NAV-01 | Phase 3: Nawigacja | Pending |
| NAV-02 | Phase 3: Nawigacja | Pending |
| NAV-03 | Phase 3: Nawigacja | Pending |
| PROG-01 | Phase 4: Programy Edukacyjne | Pending |
| PROG-02 | Phase 4: Programy Edukacyjne | Pending |
| PROG-03 | Phase 4: Programy Edukacyjne | Pending |
| PROG-04 | Phase 4: Programy Edukacyjne | Pending |
| PROG-05 | Phase 4: Programy Edukacyjne | Pending |
| PROG-06 | Phase 4: Programy Edukacyjne | Pending |
| PROG-07 | Phase 4: Programy Edukacyjne | Pending |
| PROG-08 | Phase 4: Programy Edukacyjne | Pending |
| PROG-09 | Phase 10: Integracja i Deploy | Pending |
| STYP-01 | Phase 5: Programy Stypendialne | Pending |
| STYP-02 | Phase 5: Programy Stypendialne | Pending |
| STYP-03 | Phase 5: Programy Stypendialne | Pending |
| STYP-04 | Phase 5: Programy Stypendialne | Pending |
| STYP-05 | Phase 5: Programy Stypendialne | Pending |
| STYP-06 | Phase 5: Programy Stypendialne | Pending |
| STYP-07 | Phase 5: Programy Stypendialne | Pending |
| STYP-08 | Phase 10: Integracja i Deploy | Pending |
| PROJ-01 | Phase 6: Projekty | Pending |
| PROJ-02 | Phase 6: Projekty | Pending |
| PROJ-03 | Phase 6: Projekty | Pending |
| PROJ-04 | Phase 6: Projekty | Pending |
| PROJ-05 | Phase 6: Projekty | Pending |
| SZKL-01 | Phase 7: Szkolenia | Pending |
| SZKL-02 | Phase 7: Szkolenia | Pending |
| SZKL-03 | Phase 7: Szkolenia | Pending |
| SZKL-04 | Phase 7: Szkolenia | Pending |
| SZKL-05 | Phase 7: Szkolenia | Pending |
| BAZW-01 | Phase 8: Baza Wiedzy | Pending |
| BAZW-02 | Phase 8: Baza Wiedzy | Pending |
| BAZW-03 | Phase 8: Baza Wiedzy | Pending |
| BAZW-04 | Phase 8: Baza Wiedzy | Pending |
| BAZW-05 | Phase 8: Baza Wiedzy | Pending |
| FOOT-01 | Phase 9: Footer | Pending |
| FOOT-02 | Phase 9: Footer | Pending |
| FOOT-03 | Phase 9: Footer | Pending |
| FOOT-04 | Phase 9: Footer | Pending |
| GENR-01 | Phase 10: Integracja i Deploy | Pending |
| GENR-02 | Phase 10: Integracja i Deploy | Pending |
| GENR-03 | Phase 10: Integracja i Deploy | Pending |
| GENR-04 | Phase 10: Integracja i Deploy | Pending |
| GENR-05 | Phase 10: Integracja i Deploy | Pending |

**Coverage:**
- v1 requirements: 56 total
- Mapped to phases: 56/56
- Unmapped: 0

---
*Requirements defined: 2026-02-04*
*Last updated: 2026-02-04 — traceability updated after roadmap creation*

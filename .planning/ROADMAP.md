# Roadmap: www-futureminds

## Overview

Odtworzenie strony futureminds.edu.pl z WordPress/Elementor na Next.js + Tailwind CSS v4. Projekt przebiega od fundamentow (kolory, fonty, komponenty bazowe) przez kolejne sekcje strony glownej (Hero, Navbar, kazda sekcja tematyczna, Footer) do finalnej integracji i deploy. Kazda faza dostarcza kompletna, weryfikowalna sekcje strony.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3...): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Fundamenty** - Kolory, fonty, typografia, bazowe komponenty i dane
- [x] **Phase 2: Hero** - Pelnoekranowa sekcja powitalna z logo, rakieta i tekstem misji
- [x] **Phase 3: Nawigacja** - Navbar z logo, linkami i dekoracjami
- [x] **Phase 4: Programy Edukacyjne** - Sticky sidebar + karty programow FLL/BtC/OZEdukacja
- [x] **Phase 5: Programy Stypendialne** - Sticky sidebar + partnerzy + karty CTA + blog widget
- [x] **Phase 6: Projekty** - Sticky sidebar + grid 7 kart projektow
- [x] **Phase 7: Szkolenia** - Sticky sidebar + opis + ikony technologii
- [x] **Phase 8: Baza Wiedzy** - Sticky sidebar + grid artykulow
- [ ] **Phase 9: Footer** - Stopka z danymi kontaktowymi i social links
- [ ] **Phase 10: Integracja i Deploy** - Build, weryfikacja, deploy na Vercel

## Phase Details

### Phase 1: Fundamenty
**Goal**: Uzytkownik otwiera strone i widzi prawidlowe kolory, fonty i typografie — bazowe elementy wizualne sa zgodne z oryginalem
**Depends on**: Nothing (first phase)
**Requirements**: FUND-01, FUND-02, FUND-03, FUND-04, FUND-05, FUND-06
**Success Criteria** (what must be TRUE):
  1. Strona uzywa palety kolorow #9AFC4E (lime green), #32373c (dark bg), #FFFFFF (text) — widoczne w devtools
  2. Font neue-haas-grotesk-display laduje sie na stronie (lub fallback system sans-serif jesli brak embed code)
  3. Hierarchia typografii jest zdefiniowana — 100px/w100 dla sekcji, 42px/w600 dla naglowkow, 30px/w600 dla sidebar, 19px/w200 dla body, 10px/uppercase dla CTA
  4. StickySection renderuje lewa kolumne 350px z zachowaniem sticky:top
  5. constants.ts zawiera pelne dane (9 partnerow, wszystkie programy, 6 projektow, artykuly)
**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Paleta kolorow + font Plus Jakarta Sans + hierarchia typografii (globals.css, layout.tsx)
- [x] 01-02-PLAN.md — Pelne dane i interfejsy TypeScript (types.ts, constants.ts)
- [x] 01-03-PLAN.md — Przebudowa StickySection (350px, sticky, separator, warianty)

### Phase 2: Hero
**Goal**: Uzytkownik laduje strone i widzi pelnoekranowa sekcje powitalna z logo fundacji, ilustracja rakiety i tekstem misji — identyczna z oryginalem
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06
**Success Criteria** (what must be TRUE):
  1. Sekcja Hero zajmuje pelny ekran (100vh) z ciemnym tlem #32373c
  2. Logo FMF-white.png jest widoczne w lewym gornym rogu
  3. Dekoracyjna ilustracja rakiety (liniowa, outline) wyswietla sie jako tlo sekcji
  4. Tekst misji fundacji jest czytelny, z zielonymi akcentami (#9AFC4E) na wybranych slowach
  5. Na dole sekcji widoczna strzalka w dol (scroll indicator)
**Plans:** 1 plan

Plans:
- [x] 02-01-PLAN.md — Ekstrakcja HeroSection do komponentu: dzieci-panorama4.png jako ilustracja, h-screen, klikalna strzalka scroll

### Phase 3: Nawigacja
**Goal**: Uzytkownik widzi pasek nawigacyjny z logo i 8 linkami do sekcji strony
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. Navbar wyswietla logo fundacji i 8 linkow nawigacyjnych na ciemnym tle
  2. Linki prowadza do: Aktualnosci, Programy edukacyjne, Programy stypendialne, Projekty, Szkolenia, Publikacje, O nas, Kontakt
  3. Dekoracyjny trojkat outline (Obszar-roboczy-2-kopia-2.png) jest widoczny obok menu
**Plans:** 1 plan

Plans:
- [x] 03-01-PLAN.md — Przebudowa Navbar na sticky kolumne z logo, 8 linkami, trojkatami i animacjami fadeIn

### Phase 4: Programy Edukacyjne
**Goal**: Uzytkownik scrolluje do sekcji Programy Edukacyjne i widzi sticky sidebar z numerem sekcji oraz karty 3 programow (FLL, BtC, OZEdukacja) z opisami i linkami
**Depends on**: Phase 1
**Requirements**: PROG-01, PROG-02, PROG-03, PROG-04, PROG-05, PROG-06, PROG-07, PROG-08, PROG-09
**Success Criteria** (what must be TRUE):
  1. Lewa kolumna 350px z napisem "01 Programy edukacyjne" jest sticky podczas scrollowania
  2. Intro naglowki o programach globalnych/lokalnych sa widoczne z zielonymi akcentami
  3. Trzy karty programow (FIRST LEGO League, Build the Change, OZEdukacja) wyswietlaja logo, opis i link "WIECEJ"
  4. Sekcja "programy szyte na miare" z opisem i CTA jest widoczna ponizej kart
  5. Dekoracyjny overlay Tlo-EDUKACYJNE3.png jest widoczny na tle sekcji (~20% opacity)
**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md — Ekstrakcja ProgramyEdukacyjneSection: 4 programy, overlay, duzy naglowek 100px, intro headings, karty z border-l, sekcja "szyte na miare"
- [x] 04-02-PLAN.md — Gap closure: usunac globalny Navbar, owinac ProgramyEdukacyjneSection w StickySection z numerem 01

### Phase 5: Programy Stypendialne
**Goal**: Uzytkownik scrolluje do sekcji Programy Stypendialne i widzi sticky sidebar, logotypy 9 partnerow, karty CTA o stypendiach oraz widget blogu
**Depends on**: Phase 1
**Requirements**: STYP-01, STYP-02, STYP-03, STYP-04, STYP-05, STYP-06, STYP-07, STYP-08
**Success Criteria** (what must be TRUE):
  1. Lewa kolumna 350px z napisem "02 Programy stypendialne" jest sticky podczas scrollowania
  2. Naglowki o laczeniu biznesu z dziecmi sa widoczne z zielonymi akcentami
  3. 9 logotypow partnerow (Rockwell, John Deere, RTX, Collins, ENEA, Mmaltic + 3) wyswietla sie w gridzie
  4. Dwie karty CTA ("Jak ufundowac stypendium?" z pudelko1.png i "Jak otrzymac stypendium?" z dzieci-stypendia-1.png) sa widoczne
  5. Blog widget z 2 najnowszymi wpisami (statyczne) jest widoczny
**Plans:** 2 plans

Plans:
- [x] 05-01-PLAN.md — Dane (types.ts + constants.ts) + ekstrakcja ProgramyStypendialneSection z overlayem, naglowkami, logotypami i layoutem 60/40
- [x] 05-02-PLAN.md — 3 karty CTA z naglowkami 70px, obrazkami i przyciskami + strzalka separator

### Phase 6: Projekty
**Goal**: Uzytkownik scrolluje do sekcji Projekty i widzi sticky sidebar oraz grid 7 kart projektow z tytulami, opisami i logami (bez CTA) — wiernie odwzorowujac Elementor
**Depends on**: Phase 1
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. Lewa kolumna 350px z napisem "03 Projekty" jest sticky podczas scrollowania
  2. Intro naglowki z zielonymi akcentami sa widoczne
  3. Grid 7 kart projektow w 3 kolumnach (3+3+1) wyswietla logo, tytul i opis
  4. Dekoracyjny overlay trybik3.png jest widoczny na tle (~20% opacity)
**Plans:** 2 plans

Plans:
- [x] 06-01-PLAN.md — Dane (types.ts + constants.ts: 7 projektow, secondaryImage) + ekstrakcja ProjektySection z overlayem i naglowkami
- [x] 06-02-PLAN.md — Grid 3-kolumnowy 7 kart projektow z border-l, logami, typografia + strzalka separator

### Phase 7: Szkolenia
**Goal**: Uzytkownik scrolluje do sekcji Szkolenia i widzi sticky sidebar, opis szkolen oraz rzad ikon technologii
**Depends on**: Phase 1
**Requirements**: SZKL-01, SZKL-02, SZKL-03, SZKL-04, SZKL-05
**Success Criteria** (what must be TRUE):
  1. Lewa kolumna 350px z napisem "04 Szkolenia" jest sticky podczas scrollowania
  2. Opis szkolen dla nauczycieli jest widoczny z zielonymi akcentami
  3. Link "Poznaj nasze szkolenia" jest klikalny
  4. Rzad ikon technologii (SPIKE, Raspberry Pi, Arduino, Python, AI) jest widoczny
  5. Dekoracyjny overlay szkolenia.png jest widoczny na tle (~20% opacity)
**Plans:** 2 plans

Plans:
- [x] 07-01-PLAN.md — Sticky sidebar + opis + overlay
- [x] 07-02-PLAN.md — Link CTA + rzad ikon technologii

### Phase 8: Baza Wiedzy
**Goal**: Uzytkownik scrolluje do sekcji Baza Wiedzy i widzi sticky sidebar, opis oraz grid 6 artykulow/publikacji
**Depends on**: Phase 1
**Requirements**: BAZW-01, BAZW-02, BAZW-03, BAZW-04, BAZW-05
**Success Criteria** (what must be TRUE):
  1. Lewa kolumna 350px z napisem "05 Baza Wiedzy" jest sticky podczas scrollowania
  2. Opis bazy wiedzy jest widoczny z zielonymi akcentami
  3. Grid 6 artykulow/publikacji w 3 kolumnach jest widoczny ze statycznymi danymi
  4. Linki do artykulow sa klikalne
  5. Dekoracyjny overlay (Baza-wiedzy.png) jest widoczny na tle (~20% opacity)
**Plans:** 2 plans

Plans:
- [x] 08-01-PLAN.md — Ekstrakcja BazaWiedzySection: dane (excerpt), overlay, naglowek 100px, intro heading, opis
- [x] 08-02-PLAN.md — Grid 6 artykulow (ArticleCard) + CTA "Pelna baza wiedzy" + obrazek ksiazki

### Phase 9: Footer
**Goal**: Uzytkownik scrolluje na sam dol strony i widzi stopke z danymi fundacji, linkami spolecznosciowymi i polityka prywatnosci
**Depends on**: Phase 1
**Requirements**: FOOT-01, FOOT-02, FOOT-03, FOOT-04
**Success Criteria** (what must be TRUE):
  1. Footer wyswietla sie na ciemnym tle z 4 kolumnami informacji
  2. Logo fundacji i dane kontaktowe sa widoczne
  3. Social links (Facebook, YouTube, LinkedIn) sa klikalne i prowadza do profili fundacji
  4. Link do polityki prywatnosci jest widoczny i klikalny
**Plans**: TBD

Plans:
- [ ] 09-01: Layout footera — 4 kolumny, logo, dane kontaktowe
- [ ] 09-02: Social links + link polityka prywatnosci

### Phase 10: Integracja i Deploy
**Goal**: Cala strona dziala jako spojna calosc — build przechodzi, obrazki laduja sie, animacje dzialaja, strona jest wdrozona na Vercel
**Depends on**: Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 8, Phase 9
**Requirements**: GENR-01, GENR-02, GENR-03, GENR-04, GENR-05, HERO-06, PROG-09, STYP-08
**Success Criteria** (what must be TRUE):
  1. `next build` przechodzi bez bledow TypeScript
  2. Strona renderuje sie poprawnie na desktopie (1280px+) — wszystkie sekcje widoczne w prawidlowej kolejnosci
  3. Wszystkie 48 obrazkow (w tym overlay, loga, ilustracje) laduja sie bez bledow 404
  4. Animacje fadeIn (fadeInLeft, fadeInRight, fadeInDown) dzialaja na elementach we wszystkich sekcjach
  5. Strona jest wdrozona na Vercel i dostepna publicznie
**Plans**: TBD

Plans:
- [ ] 10-01: Animacje fadeIn we wszystkich sekcjach
- [ ] 10-02: Dekoracyjne overlay — weryfikacja i poprawki
- [ ] 10-03: Build verification + naprawa bledow TypeScript
- [ ] 10-04: Weryfikacja renderingu desktop 1280px+ i obrazkow
- [ ] 10-05: Deploy na Vercel

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10
(Phases 2-9 moga byc wykonywane rownolegle po ukonczeniu Phase 1)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundamenty | 3/3 | Complete | 2026-02-04 |
| 2. Hero | 1/1 | Complete | 2026-02-04 |
| 3. Nawigacja | 1/1 | Complete | 2026-02-11 |
| 4. Programy Edukacyjne | 2/2 | Complete | 2026-02-12 |
| 5. Programy Stypendialne | 2/2 | Complete | 2026-02-12 |
| 6. Projekty | 2/2 | Complete | 2026-02-13 |
| 7. Szkolenia | 2/2 | Complete | 2026-02-14 |
| 8. Baza Wiedzy | 2/2 | Complete | 2026-02-15 |
| 9. Footer | 0/2 | Not started | - |
| 10. Integracja i Deploy | 0/5 | Not started | - |

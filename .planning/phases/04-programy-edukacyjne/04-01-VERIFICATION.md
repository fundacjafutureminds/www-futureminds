---
phase: 04-programy-edukacyjne
plan: 01
verified: 2026-02-11T23:45:00Z
status: gaps_found
score: 4/5 truths verified
re_verification: false

gaps:
  - truth: "Sticky sidebar z napisem 01 Programy edukacyjne jest widoczny podczas scrollowania sekcji"
    status: failed
    reason: "Sekcja renderuje sie bezposrednio w prawej kolumnie bez sticky sidebar z numerem. Navbar (lewa kolumna 350px) nie zawiera numeru sekcji 01 Programy edukacyjne — pokazuje tylko link Programy edukacyjne."
    artifacts:
      - path: "src/components/layout/Navbar.tsx"
        issue: "Brak numeru sekcji 01 — tylko link do #programy-edukacyjne"
      - path: "src/components/sections/ProgramyEdukacyjneSection.tsx"
        issue: "Sekcja nie uzywa StickySection — renderuje sie bezposrednio"
    missing:
      - "Sticky sidebar z numerem 01 Programy edukacyjne (zgodnie z ROADMAP success criteria 1)"
---

# Phase 04: Programy Edukacyjne — Weryfikacja Plan 01

**Cel Fazy (z ROADMAP):** Uzytkownik scrolluje do sekcji Programy Edukacyjne i widzi sticky sidebar z numerem sekcji oraz karty 3 programow (FLL, BtC, OZEdukacja) z opisami i linkami

**Zweryfikowano:** 2026-02-11T23:45:00Z  
**Status:** gaps_found  
**Re-weryfikacja:** Nie — weryfikacja poczatkowa

## Osiagniecie Celu

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Sticky sidebar z napisem 01 Programy edukacyjne jest widoczny podczas scrollowania | FAILED | Navbar (lewa kolumna 350px) zawiera tylko link Programy edukacyjne bez numeru 01. Sekcja nie uzywa StickySection — renderuje sie bezposrednio w prawej kolumnie. |
| 2 | Intro naglowki z zielonymi akcentami sa czytelne | VERIFIED | ProgramyEdukacyjneSection.tsx linie 34-49: naglowek h3 z text-fm-green na globalne i lokalne i kropce, 2 paragrafy body text |
| 3 | Karty 3+ programow (FLL, BtC, OZEdukacja) z logo, opisem i linkiem WIECEJ | EXCEEDED | constants.ts zawiera 4 programy (FLL, BtC, OZEdukacja, Edukacja Energetyczna). ROADMAP wymagal 3, PLAN dodal 4. program zgodnie z research Elementora. |
| 4 | Sekcja programy szyte na miare z opisem jest widoczna | VERIFIED | ProgramyEdukacyjneSection.tsx linie 85-117: naglowek h3 + 3 paragrafy z zielonymi akcentami |
| 5 | Overlay Tlo-EDUKACYJNE3.png jest widoczny w tle (~20% opacity) | VERIFIED | ProgramyEdukacyjneSection.tsx linie 9-16: absolute overlay z opacity-20, plik istnieje w public/images/ |

**Score:** 4/5 truths verified (truth 1 failed, truth 3 exceeded requirements)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| src/components/sections/ProgramyEdukacyjneSection.tsx | Wyekstrahowany komponent sekcji (min. 50 linii) | VERIFIED | 133 linie, zawiera overlay, duzy naglowek 100px, intro, karty, sekcje szyte na miare, separator |
| src/lib/constants.ts | 4 programy w PROGRAMS array | VERIFIED | PROGRAMS ma 4 pozycje (linie 21-50), kazdy z title/description/href/logo |
| src/app/page.tsx | Import i uzycie ProgramyEdukacyjneSection | VERIFIED | Import (linia 5), uzycie w renderze (linia 310) wewnatrz prawej kolumny flex-1 |
| public/images/Tlo-EDUKACYJNE3.png | Overlay background image | VERIFIED | Plik istnieje, 233KB |
| public/images/Lobo-Edukacja-Energetyczna.png | Logo 4. programu | VERIFIED | Plik istnieje, 23KB |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| src/app/page.tsx | ProgramyEdukacyjneSection.tsx | import | WIRED | Import linia 5, uzycie linia 310 |
| ProgramyEdukacyjneSection.tsx | src/lib/constants.ts | import PROGRAMS | WIRED | Import linia 3, mapowanie linia 59 |
| ProgramyEdukacyjneSection.tsx | Overlay image | Image component | WIRED | Image fill linia 10-14 |
| ProgramyEdukacyjneSection.tsx | Logo images | Image w .map() | WIRED | Image src={program.logo} linia 65-69 |

### Requirements Coverage

**Wymagania z ROADMAP (Phase 4):** PROG-01 do PROG-09

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| PROG-01 (sticky sidebar) | BLOCKED | Brak sticky sidebar z numerem 01 Programy edukacyjne |
| PROG-02 (intro z akcentami) | SATISFIED | Intro naglowki z text-fm-green |
| PROG-03 (karty programow) | SATISFIED | 4 karty (wiecej niz wymagane 3) |
| PROG-04 (szyte na miare) | SATISFIED | Sekcja z naglowkiem i 3 paragrafami |
| PROG-05 (overlay) | SATISFIED | Tlo-EDUKACYJNE3.png opacity-20 |

### Anti-Patterns Found

**Build Verification:**
- npx tsc --noEmit — przechodzi bez bledow
- TypeScript types — wszystkie typy poprawne
- Brak TODO/FIXME/placeholders w ProgramyEdukacyjneSection.tsx
- Brak stub patterns (return null, console.log only)

### Human Verification Required

#### 1. Wizualna weryfikacja overlay i layoutu

**Test:** Otworz localhost:3000, scrolluj do sekcji Programy Edukacyjne  
**Expected:** Overlay Tlo-EDUKACYJNE3.png widoczny w tle prawej gornej czesci (~20% opacity), duzy naglowek 100px czytelny, grid 2-kolumnowy kart na duzych ekranach, border-left na kartach widoczny jako subtelny akcent  
**Why human:** Opacity, rozmieszczenie w gridzie, subtelnosci border-left wymagaja oceny wizualnej

#### 2. Weryfikacja sticky behavior Navbar

**Test:** Scrolluj w dol strony od Hero do sekcji Programy Edukacyjne  
**Expected:** Navbar (lewa kolumna 350px) pozostaje sticky podczas scrollowania, link Programy edukacyjne jest widoczny  
**Why human:** Sticky positioning i scroll behavior wymagaja testowania w przegladarce

#### 3. Interakcja z linkami CTA WIECEJ

**Test:** Kliknij kazdy z 4 przyciskow WIECEJ w kartach programow  
**Expected:** FLL -> /fll, BtC -> lego.com, OZEdukacja -> oze.edu.pl, Edukacja Energetyczna -> energia.fll.edu.pl. Hover na CTA zmienia tlo na fm-green  
**Why human:** Nawigacja i hover states wymagaja interakcji uzytkownika

### Gaps Summary

**1 gap blokujacy osiagniecie celu fazy:**

**Gap 1: Brak sticky sidebar z numerem 01 Programy edukacyjne**

ROADMAP success criteria 1 zaklada: Lewa kolumna 350px z napisem 01 Programy edukacyjne jest sticky podczas scrollowania

**Stan obecny:**
- Navbar (lewa kolumna 350px) zawiera link Programy edukacyjne BEZ numeru 01
- Sekcja ProgramyEdukacyjneSection renderuje sie bezposrednio w prawej kolumnie (nie uzywa StickySection)

**Dlaczego to sie stalo:**

Research (04-RESEARCH.md) odkryl problem architektoniczny: podwojny sidebar — globalny Navbar (350px) + StickySection w kazdej sekcji (350px) = 700px sidebara zamiast 350px. Plan swiadomie zmienil architekture, aby uniknac tego problemu — sekcje renderuja sie bezposrednio w prawej kolumnie za Navbarem.

Decyzja byla UZASADNIONA — unika bledu layoutu. Ale NIE osiaga oryginalnego GOAL z ROADMAP, ktory zakladal sticky sidebar per-sekcja z numerem.

**Mozliwe rozwiazania:**

1. Scroll-aware Navbar (rekomendowane) — Navbar zmienia tresc w zaleznosci od widocznej sekcji. Gdy uzytkownik jest w sekcji Programy Edukacyjne, Navbar pokazuje 01 Programy edukacyjne zamiast listy linkow.

2. Per-sekcyjny sidebar w prawej kolumnie — Dodac mniejszy sidebar (np. 200px) wewnatrz prawej kolumny, dedykowany dla sekcji. Layout: Navbar 350px | separator | sidebar 200px | tresc sekcji.

3. Aktualizacja ROADMAP goal — Uznac ze nowa architektura (bez per-sekcyjnych sidebarow) jest zamierzonym kierunkiem i zaktualizowac ROADMAP aby odzwierciedlal to podejscie.

**Rekomendacja:** Opcja 3 (aktualizacja ROADMAP) JESLI Maciej zatwierdzi nowa architekture jako lepsza. W przeciwnym razie Opcja 1 (scroll-aware Navbar).

---

**Podsumowanie:** Plan 01 zostal technicznie wykonany zgodnie z PLAN.md — wszystkie tasks ukonczone, kod dziala, build przechodzi. Jednak NIE osiagnal oryginalnego GOAL z ROADMAP z powodu swiadomej decyzji architektonicznej (unikniecie podwojnego sidebara). Gap dotyczy rozbieznosci miedzy ROADMAP a PLAN, nie bledu implementacji.

---

_Zweryfikowano: 2026-02-11T23:45:00Z_  
_Weryfikator: Claude (gsd-verifier)_

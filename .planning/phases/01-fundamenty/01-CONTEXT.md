# Phase 1: Fundamenty - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Bazowe elementy wizualne strony: paleta kolorów, font, hierarchia typografii, komponent StickySection (layout 2-kolumnowy) oraz constants.ts z danymi (partnerzy, programy, projekty, artykuły). To fundament na którym stoją wszystkie kolejne fazy (2-10).

</domain>

<decisions>
## Implementation Decisions

### Paleta kolorów
- 3 główne kolory: #9AFC4E (lime green), #32373c (dark bg), #FFFFFF (text)
- Dodatkowe odcienie i szarości — Claude dobiera analizując oryginał
- Zielony (#9AFC4E) używany na: tekst (akcenty w nagłówkach) + elementy CTA (przyciski, linki)
- Tła sekcji: ciemne (#32373c) + białe — niektóre sekcje mają białe tło z ciemnym tekstem
- Hover na elementach interaktywnych: zmiana koloru/jasności (nie underline)

### Typografia
- Font główny: Plus Jakarta Sans (Google Fonts, darmowy) — z możliwością łatwej zamiany
- Font zaimplementowany jako CSS variable — łatwa podmiana na inny (np. Geist, neue-haas-grotesk)
- Nagłówki sekcji (~100px): MUSZĄ być ultra-cienkie (weight 100) — to kluczowa cecha designu
- Rozmiary z roadmapy (100px, 42px, 30px, 19px, 10px) to przybliżone wartości — wzorować się na oryginale, dopracowywać wizualnie
- Font-weight body — Claude dobiera na podstawie oryginału

### Komponent StickySection
- Lewa kolumna 350px, sticky do końca swojej sekcji (unstick gdy sekcja się kończy)
- Subtelna pionowa linia między kolumnami jako separator
- Kolor linii i zawartość sidebar (numer + nazwa) — Claude odwzorowuje z oryginału
- Tło sidebar transparentne (takie samo jak tło sekcji)
- Tylko desktop (1280px+) — responsywność poza zakresem tej fazy
- Komponent generyczny vs per-sekcja — Claude decyduje wg czystości kodu

### Struktura danych (constants.ts)
- TypeScript constants z typami i strukturą gotową do łatwej zamiany na fetch z bazy (Supabase CMS w przyszłości)
- Treści: prawdziwe nazwy i loga z futureminds.edu.pl, opisy mogą być skrócone/placeholder
- Zakres: 9 partnerów, programy edukacyjne (FLL, BtC, OZEdukacja), 6 projektów, artykuły
- Obrazki (loga, ilustracje, overlay): trzeba pobrać z oryginalnej strony
- Treści traktowane jako tymczasowe (lorem ipsum) — docelowo wszystko do wymiany/korekty

### Claude's Discretion
- Dobór dodatkowych odcieni i szarości w palecie
- Kolor i styl linii separatora w StickySection
- Layout tekstu w sidebar (numer nad nazwą vs w linii)
- Font-weight dla body tekstu
- Generyczny komponent vs osobne implementacje StickySection
- Dokładne rozmiary typografii (bazując na oryginale)

</decisions>

<specifics>
## Specific Ideas

- Font jako CSS variable — user chce móc łatwo przełączać między Plus Jakarta Sans a innymi fontami (Geist, ewentualnie docelowo neue-haas-grotesk z Adobe Fonts)
- Dane w constants.ts mają mieć czyste typy TypeScript, strukturę przygotowaną pod przyszłe zastąpienie fetchem z Supabase CMS
- Ultracienkie nagłówki (weight 100) to rozpoznawalny element designu oryginału — nie iść na kompromis
- Sekcje mają warianty tła: ciemne + białe — trzeba to uwzględnić w StickySection (musi działać na obu)

</specifics>

<deferred>
## Deferred Ideas

- CMS na Supabase (zarządzanie treściami przez bazę danych) — osobna faza/milestone
- Responsywność mobile/tablet — po ukończeniu desktop
- Adobe Fonts embed (neue-haas-grotesk-display) — do rozważenia gdy user dostarczy embed code

</deferred>

---

*Phase: 01-fundamenty*
*Context gathered: 2026-02-04*

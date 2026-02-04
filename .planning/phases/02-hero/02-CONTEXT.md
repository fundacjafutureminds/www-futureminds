# Phase 2: Hero - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Pelnoekranowa sekcja powitalna (100vh) z logo fundacji, liniowa ilustracja rakiety jako tlo i tekstem misji z zielonymi akcentami. Identyczna wizualnie z oryginalem futureminds.edu.pl. Statyczne PNG jako placeholdery — docelowo ilustracje beda zamienione na animacje w przyszlej fazie.

</domain>

<decisions>
## Implementation Decisions

### Uklad i kompozycja
- Logo FMF-white.png w lewym gornym rogu z marginesem
- Pelne 100vh — caly viewport, klasyczny fullscreen hero
- Uklad elementow (tekst, rakieta, logo) odwzorowany dokladnie z futureminds.edu.pl
- Ciemne tlo #32373c

### Ilustracja rakiety
- Liniowa/outline — szkic na przezroczystosci (PNG)
- Duze opacity, tekst misji nachodzi na rakiete
- Plik do pobrania z oryginalnej strony futureminds.edu.pl
- Traktowana jako tlo sekcji z tekstem na wierzchu

### Tekst misji i akcenty
- Tresc tekstu skopiowana dokladnie z futureminds.edu.pl
- Zielone akcenty (#9AFC4E) na dokladnie tych samych slowach co na oryginale
- Hierarchia wizualna zgodna z oryginalem

### Scroll indicator
- Strzalka w dol na dole sekcji Hero
- Subtelna animacja (pulsowanie lub bounce) — zachecajaca do scrollowania
- Klikniecie strzalki scrolluje smooth do nastepnej sekcji

### Claude's Discretion
- Implementacja rakiety jako tlo (background-image vs element DOM) — dobrac pod katem latwej zamiany na animacje w przyszlosci
- Styl scroll indicatora (chevron, strzalka, inna forma)
- Struktura tekstu misji (naglowek + opis vs jeden blok)
- Dokladne rozmiary i spacing elementow

</decisions>

<specifics>
## Specific Ideas

- Rakieta jest liniowym szkicem (outline) na przezroczystym PNG — nie jest wypelniona
- Duze opacity rakiety — widoczna wyraznie, nie subtelna
- Tekst nachodzi na rakiete — nie sa rozdzielone na osobne polowki ekranu
- Docelowo wszystkie statyczne ilustracje (rakieta, turbiny, wiatraki) beda zamienione na animacje w dedykowanej aplikacji i podmienione — implementacja powinna to ulatwic

</specifics>

<deferred>
## Deferred Ideas

- Zamiana statycznych ilustracji (rakieta, turbiny, wiatraki) na animacje — przyszla faza po dostarczeniu animowanych wersji
- Animacje fadeIn elementow Hero — Phase 10 (Integracja)

</deferred>

---

*Phase: 02-hero*
*Context gathered: 2026-02-04*

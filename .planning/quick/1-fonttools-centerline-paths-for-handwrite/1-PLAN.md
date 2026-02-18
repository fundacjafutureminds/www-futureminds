---
phase: quick-1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - scripts/generate-vectorline-paths.py
  - src/components/ui/handwrite-paths.json
  - src/components/ui/HandwriteTitle.tsx
autonomous: true

must_haves:
  truths:
    - "Napis 'Programy edukacyjne' renderuje sie poprawnie — wszystkie litery czytelne, w tym N"
    - "Animacja stroke-drawing dziala plynnie — pathLength 0->1 rysuje litere widocznie"
    - "Wszystkie litery maja jednakowa jasnosc — brak nakladajacych sie sciezek przy opacity"
    - "Plik handwrite-paths.json jest maly (<10KB) — bezier zamiast setek segmentow L"
  artifacts:
    - path: "scripts/generate-vectorline-paths.py"
      provides: "Wektorowy generator centerline z fonttools"
      contains: "fontTools"
    - path: "src/components/ui/handwrite-paths.json"
      provides: "Sciezki SVG bezier per litera"
    - path: "src/components/ui/HandwriteTitle.tsx"
      provides: "Komponent z animacja stroke-drawing"
      contains: "pathLength"
  key_links:
    - from: "scripts/generate-vectorline-paths.py"
      to: "src/components/ui/handwrite-paths.json"
      via: "json.dump output"
      pattern: "handwrite-paths\\.json"
    - from: "src/components/ui/HandwriteTitle.tsx"
      to: "src/components/ui/handwrite-paths.json"
      via: "import pathData"
      pattern: "import.*handwrite-paths"
---

<objective>
Zamiana rasterowego systemu generowania centerline paths (skeletonize + polyline) na wektorowy (fonttools + bezier). Rozwiazuje trzy problemy: zlamana litera N, brak animacji (zbyt wiele segmentow L), rozna jasnosc (nakladajace sie sciezki).

Purpose: Obecny system renderuje PIL -> skeletonize -> setki segmentow L per litera. To powoduje ogromny plik JSON (~150k tokenow), zlamana litere N, brak animacji pathLength (przegladarka nie radzi sobie z setkami L), i rozna jasnosc przy opacity (nakladajace sie sciezki). Nowy system wektorowo wyciaga centerline z konturow TTF i generuje czyste bezier SVG paths.

Output: Nowy skrypt Python, nowy handwrite-paths.json (~5-10KB), ewentualnie zaktualizowany komponent HandwriteTitle.tsx.
</objective>

<execution_context>
@C:/Users/mstrz/.claude-fundacja/get-shit-done/workflows/execute-plan.md
@C:/Users/mstrz/.claude-fundacja/get-shit-done/templates/summary.md
</execution_context>

<context>
@fonts/Geomanist-Thin-Webfont/geomanist-thin-webfont.ttf
@scripts/generate-centerline-paths.py
@src/components/ui/HandwriteTitle.tsx
@src/components/ui/handwrite-paths.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: Skrypt wektorowej ekstrakcji centerline z fonttools</name>
  <files>scripts/generate-vectorline-paths.py</files>
  <action>
Stworz nowy skrypt Python: `scripts/generate-vectorline-paths.py` (NIE nadpisuj starego `generate-centerline-paths.py` — zachowaj jako backup).

Wymagane biblioteki: `fonttools` (juz zainstalowane — uzyto do eksploracji). Nie uzywaj PIL, scikit-image, numpy — cala praca wektorowa.

**Algorytm centerline — kluczowe dane z analizy fontu:**

Geomanist Thin ma kreski szerokie ~20 UPM (unitsPerEm=2048). Kazdy glif to kontur opisujacy OBRYS cienkeij kreski. Dane z fonttools:

- TrueType quadratic bezier: punkt ON = on-curve, OFF = off-curve (control point)
- Miedzy dwoma kolejnymi OFF-curve punktami jest implicit ON-curve w srodku
- Kontury sa zamkniete (ostatni punkt laczy sie z pierwszym)

**Dwa typy glifow:**

A) **1-konturowe** (r, n, m, u, k, y, c, N): Kontur idzie JEDNA strona kreski w gore, potem DRUGA strona w dol. Trzeba podzielic kontur na dwie polowki i usrednic odpowiadajace sobie punkty.

   Dla n (24 punkty, endPts=[23]):
   - Punkty 0-12: lewa/gorna strona (trzon 172->193, bowl zewn. gora)
   - Punkty 13-23: prawa/dolna strona (trzon 918->938, bowl wewn. dol) — w odwrotnej kolejnosci

   Heurystyka podzialu: Znajdz pare punktow ktore sa najblizej siebie i stoja naprzeciwko (to punkty gdzie "kreska" ma szerokosc ~20). Jedna polowka to outer, druga to inner (odwrocona). Usrednienie daje centerline.

   **UWAGA — litery z prostymi krekami (N, y, k):** Te gliffy maja kontury z samych ON-curve, zero OFF-curve. N ma 10 pkt: (190,0)->(190,1434)->(209,1434)->(1206,41)->(1206,1434)->(1225,1434)->(1225,0)->(1225,0)->(1206,0)->(209,0). Centerline to srodek kazdej kreski — dla N: trzon lewy x=199.5, ukos, trzon prawy x=1215.5.

   **Proste podejscie do 1-konturowych:** Nie probuj automatycznie dopasowywac par — recznie zdefiniuj segmenty centerline per litera, lub uzyj sprytniejszej heurystyki: kontur zawsze idzie jedna strona i wraca druga, wiec polowka to [0..N/2] i [N/2+1..N-1] (odwrocona). Usrednij odpowiadajace pozycje wzdluz konturu.

B) **2-konturowe** (P, o, g, e, d, a, j): Zewnetrzny kontur = outer, wewnetrzny = inner (lub odwrotnie). Czesc konturu to "bowl" (zaokraglona czesc), a czesc to proste kreski.

   Dla P (kontury 0: 11 pkt, 1: 9 pkt):
   - Kontur 0 (outer): trzon (190,0)-(190,1434)-(211,0) + bowl outer (489,1434 -> krzywa -> 489,682)
   - Kontur 1 (inner): bowl inner (211,702)-(489,702 -> krzywa -> 489,1413)-(211,1413)
   - Centerline trzon: x = (190+211)/2 = 200.5
   - Centerline bowl: usrednic outer i inner krzywe bezier

   **Podejscie:** Rozbij na segmenty logiczne (trzon, bowl, etc.), usrednij odpowiadajace sobie segmenty.

**PODEJSCIE PRAKTYCZNE (REKOMENDOWANE):**

Zamiast skomplikowanego automatycznego algorytmu, uzyj **hybrydowe podejscie**:

1. Z fonttools wyciagnij kontury jako liste segmentow (linie proste + quadratic bezier)
2. Dla kazdego glifu wygeneruj **outline SVG path** (czysty kontur z fontu)
3. Oblicz centerline jako **srodek** miedzy odpowiadajacymi sobie punktami obu stron konturu
4. Dla uproszczenia: zeskaluj kontury do viewBox kompatybilnego z obecnym (width ~812, height ~237)
5. Dla glifow z prostymi krekami: centerline = srodkowa linia prosta miedzy dwoma bokami

**Alternatywne proste podejscie — JESLI powyzsze za skomplikowane:**

Uzyj fonttools do renderowania konturow, potem wyciagnij centerline jako **srodek bounding box kazdego segmentu konturu**. Albo: Przeiteruj po konturze, grupuj segmenty w pary (odpowiadajace sobie fragmenty obu stron kreski), usredniaj.

**Format wyjsciowy** (identyczny z obecnym handwrite-paths.json):
```json
{
  "line1": {
    "width": 812,
    "height": 237,
    "paths": [
      { "char": "P", "paths": ["M200.5 189 L200.5 51 ...Q... ..."] },
      ...
    ]
  },
  "line2": { ... }
}
```

Roznice vs stary format:
- Kazda litera ma JEDNA sciezke centerline (nie 2-3 nakladajace sie)
- Sciezki uzywaja M, L, Q (quadratic bezier) — NIE setek L co 0.75px
- Plik powinien miec <10KB (vs obecne ~400KB)

**Skalowanie:** UPM=2048 fontu trzeba przeskalowac do viewBox. Obecny viewBox to 812x237.
- Oblicz advance width calego tekstu w UPM, potem skaluj do docelowej szerokosci
- Uzyj ascent/descent z fontu do obliczenia wysokosci
- Pamietaj: TrueType ma os Y w gore (y=0 na baseline), SVG ma Y w dol — odwroc Y

**Kolejnosc implementacji:**
1. Wczytaj font, wyciagnij metryki (UPM, ascent, descent, advance widths)
2. Dla kazdego znaku wyciagnij kontury jako ciag segmentow
3. Oblicz centerline per znak
4. Przelicz do wspolrzednych SVG (skala + flip Y)
5. Zbuduj SVG path string z M/L/Q
6. Zapisz JSON

**Trudne przypadki do obslugi:**
- Litera 'j' ma descender (y < 0 w foncie)
- Litera 'g' ma descender
- Litera 'y' ma descender
- Dot na 'j' — osobny kontur (maly prostokat/kolo)
- Kreska na 'e' — horizontal stroke w srodku
  </action>
  <verify>
Uruchom skrypt: `python scripts/generate-vectorline-paths.py`
Sprawdz, ze:
1. Plik `src/components/ui/handwrite-paths.json` zostal wygenerowany
2. Rozmiar pliku < 20KB (wczesniej ~400KB)
3. Kazda litera ma dokladnie 1 sciezke (lub 2-3 dla liter z oddzielonymi elementami jak j=kreska+dot)
4. Sciezki zawieraja Q lub C (bezier), nie tylko setki L
5. Wygeneruj tymczasowy SVG do debugowania: `python -c "import json; d=json.load(open('src/components/ui/handwrite-paths.json')); [print(p) for c in d['line1']['paths'] for p in c['paths']]"` — sprawdz wizualnie czy sciezki wygladaja sensownie
  </verify>
  <done>
Skrypt generuje handwrite-paths.json z czystymi bezier paths. Kazda litera "Programy" i "edukacyjne" ma centerline path(s). Plik JSON jest <20KB. Litera N jest poprawna.
  </done>
</task>

<task type="auto">
  <name>Task 2: Aktualizacja HandwriteTitle.tsx i weryfikacja wizualna</name>
  <files>src/components/ui/HandwriteTitle.tsx</files>
  <action>
Sprawdz czy nowy format handwrite-paths.json jest kompatybilny z obecnym komponentem HandwriteTitle.tsx. Obecny komponent oczekuje:

```typescript
pathData = {
  line1: { width: number, height: number, paths: { char: string, paths: string[] }[] },
  line2: { ... }
}
```

Jesli nowy JSON ma ten sam format (a powinien), komponent moze nie wymagac zmian. Ale sprawdz:

1. **strokeWidth** — obecne `strokeWidth="1"` z `vectorEffect="non-scaling-stroke"`. Przy nowym viewBox i czystych bezier paths moze byc za cienka lub za gruba. Dostosuj jesli trzeba. Przy viewBox ~812x237 i renderowaniu na pelna szerokosc sekcji, strokeWidth=1 z non-scaling-stroke powinien wynosic 1px fizyczny — to moze byc za cienko. Rozważ strokeWidth="2" lub "1.5".

2. **Animacja pathLength** — z nowymi czystymi bezier paths (kilka-kilkanascie segmentow zamiast setek L), animacja pathLength powinna dzialac plynnie. Jezeli kazda litera ma teraz 1 sciezke zamiast 2-3, parametry `edgeDuration` i `edgeIdx` w renderChar moga wymagac uproszczenia.

3. **Kolor/opacity** — obecne `stroke="currentColor"` z klasa `text-white/10` na uzyciu. Przy 1 sciezce per litera (brak nakladania) jasnosc bedzie jednolita — to jest pozadany efekt.

4. Uruchom dev server (`npm run dev` na porcie 4510) i sprawdz wizualnie na http://localhost:4510 czy napis wyglada poprawnie.

5. Jesli cos wyglada zle, iteruj: popraw skrypt generujacy, re-generuj JSON, sprawdz ponownie.

**NIE zmieniaj:** struktury komponentu (framer-motion, useInView, etc.), API propsow, ogolnego podejscia do animacji.
  </action>
  <verify>
1. `npm run dev` dziala bez bledow
2. Na http://localhost:4510 napis "Programy edukacyjne" renderuje sie w sekcji Programy Edukacyjne
3. Animacja rysowania liter odgrywa sie przy scrollowaniu do sekcji
4. Wszystkie litery czytelne (w tym N)
5. Jednolita jasnosc — brak jasniejszych/ciemniejszych fragmentow
6. `npm run build` przechodzi bez bledow
  </verify>
  <done>
HandwriteTitle renderuje "Programy edukacyjne" z czytelnym ksztaltem kazdej litery, plynna animacja stroke-drawing, jednolita jasnosc. Build przechodzi.
  </done>
</task>

</tasks>

<verification>
1. `python scripts/generate-vectorline-paths.py` — generuje JSON bez bledow
2. Rozmiar `src/components/ui/handwrite-paths.json` < 20KB
3. `npm run build` — przechodzi bez bledow
4. Dev server: napis widoczny i animowany na stronie
5. Litera N wyglada poprawnie (nie jest zlamana)
6. Brak nakladajacych sie sciezek (jednolita jasnosc)
</verification>

<success_criteria>
- Nowy skrypt Python uzywa fonttools (nie PIL/skeletonize) do ekstrakcji centerline
- handwrite-paths.json < 20KB z bezier paths (M/L/Q zamiast setek L)
- Kazda litera: 1 sciezka centerline (+ opcjonalnie dodatkowe dla dotu na j, itp.)
- Animacja pathLength dziala plynnie
- Litera N poprawna
- Jednolita jasnosc przy text-white/10
- Build przechodzi
</success_criteria>

<output>
Po zakonczeniu utworz `.planning/quick/1-fonttools-centerline-paths-for-handwrite/1-SUMMARY.md`
</output>

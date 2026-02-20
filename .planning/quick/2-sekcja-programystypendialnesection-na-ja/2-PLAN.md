---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/StickySection.tsx
  - src/components/sections/ProgramyStypendialneSection.tsx
autonomous: true
must_haves:
  truths:
    - "Sekcja Programy Stypendialne ma jasne tlo z tekstura szum-lightgrey-1.png"
    - "Teksty w sekcji sa ciemne i czytelne na jasnym tle"
    - "Sidebar (nawigacja, strzalki) uzywa ciemnych kolorow na jasnym tle"
    - "Linia pozioma (hr) i content divider dostosowane do jasnego wariantu"
    - "Logotypy partnerow wyswietlane bez inwersji (naturalnie ciemne)"
    - "Sekcja z ciemnym tlem (ProgramyEdukacyjne) nadal wyglada poprawnie"
  artifacts:
    - path: "src/components/ui/StickySection.tsx"
      provides: "Warunkowe kolory hr, navlinks, strzalek, content dividera w zaleznosci od variant"
    - path: "src/components/sections/ProgramyStypendialneSection.tsx"
      provides: "variant=light + ciemne kolory tekstow, borderow, logotypow"
  key_links:
    - from: "ProgramyStypendialneSection.tsx"
      to: "StickySection.tsx"
      via: "prop variant=light"
      pattern: "variant=\"light\""
---

<objective>
Przerobienie sekcji ProgramyStypendialneSection na jasne tlo z ciemnymi czcionkami.

Purpose: Sekcja stypendii na oryginalnej stronie Elementor ma jasne tlo — trzeba odtworzyc ten wyglad.
Output: Sekcja stypendii renderowana na jasnym tle z poprawna czytelnoscia wszystkich elementow.
</objective>

<execution_context>
@C:/Users/mstrz/.claude-fundacja/get-shit-done/workflows/execute-plan.md
@C:/Users/mstrz/.claude-fundacja/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/ui/StickySection.tsx
@src/components/sections/ProgramyStypendialneSection.tsx
@src/app/globals.css (kolory: fm-dark=#32373c, fm-dark-bg=#2b2f33, fm-text=#c4c4c4, fm-text-muted=#8a8a8a)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Dokoncz wariant light w StickySection.tsx</name>
  <files>src/components/ui/StickySection.tsx</files>
  <action>
StickySection.tsx juz ma prop `variant` i zmienna `isDark`. Trzeba dokonczyc warunkowe kolory w 4 miejscach:

1. **Linia pozioma hr** (linia 57): zmien `bg-white/10` na warunkowe:
   - dark: `bg-white/10`
   - light: `bg-black/10`

2. **Nav links tekst** (linia 100): zmien `text-[#E8E8E8]` na warunkowe:
   - dark: `text-[#E8E8E8]`
   - light: `text-[#3C3C3C]`

3. **Nav triangle strzalki** (linia 103): zmien `border-l-white/60` na warunkowe:
   - dark: `border-l-white/60`
   - light: `border-l-black/40`

4. **Content divider** (linia 66): zmien `bg-white/5` na warunkowe:
   - dark: `bg-white/5`
   - light: `bg-black/8`

UWAGA: contentDividerLeft jest w WEWNETRZNYM scopie — nie ma bezposrednio dostepu do `isDark`. Trzeba przekazac wariant przez warunkowy className. Sprawdz czy `isDark` jest widoczny w tym scopie (jest — deklarowany na poczatku komponentu).

Uzyj template literals z ternary: `${isDark ? "bg-white/5" : "bg-black/8"}`
  </action>
  <verify>
Uruchom `npx next build --no-lint 2>&1 | head -20` — brak bledow TypeScript.
Wizualnie: sekcja ProgramyEdukacyjne (dark) nie zmienila wygladu — sidebar, linie, strzalki nadal jasne.
  </verify>
  <done>
Wszystkie 4 elementy StickySection (hr, navlinks, strzalki, content divider) uzywaja warunkowych kolorow dark/light. Wariant dark zachowuje dokladnie dotychczasowe kolory.
  </done>
</task>

<task type="auto">
  <name>Task 2: ProgramyStypendialneSection — variant light + ciemne kolory</name>
  <files>src/components/sections/ProgramyStypendialneSection.tsx</files>
  <action>
Zmiany w ProgramyStypendialneSection.tsx:

1. **Dodaj `variant="light"` do StickySection** (linia 14):
   ```
   <StickySection variant="light" id="programy-stypendialne" ...>
   ```

2. **Section title** (linia 21): `text-[#EFEFEF]` -> `text-[#2b2f33]` (fm-dark-bg)

3. **Heading h3** (linia 56): `text-[#EFEFEF]` -> `text-[#2b2f33]`

4. **Body text p** (linie 63, 67, 78): `text-[#E8E8E8]` -> `text-[#3C3C3C]` (Elementor "Tekst na szarym tle")

5. **Blog posty prawa kolumna:**
   - Border left (linia 104): `border-[#FFFFFF54]` -> `border-black/15`
   - Kategoria (linia 106): `text-fm-text-muted` -> `text-[#6b6b6b]` (ciemniejszy muted na jasnym tle)
   - Tytul bloga (linia 109): `text-[#EAEAEA]` -> `text-[#2b2f33]`
   - Excerpt (linia 112): `text-[#D9D9D9]` -> `text-[#3C3C3C]`
   - Link "Wiecej" (linia 117): `text-[#FFFFFFF2]` -> `text-[#2b2f33]`, `border-white/10` -> `border-black/10`

6. **Logotypy partnerow** (linia 89): usun `brightness-0 invert` — logotypy beda w naturalnych kolorach na jasnym tle. Zachowaj `opacity-70 transition-opacity hover:opacity-100`.

7. **Karty CTA — tytuly** (linie 141, 173): `text-[#EFEFEF]` -> `text-[#2b2f33]`

8. **Karty CTA — linki "Wiecej"** (linie 159, 191): `text-[#FFFFFFF2]` -> `text-[#2b2f33]`, `border-white/10` -> `border-black/10`

9. **Strzalka separator** (linia 208): dodaj `invert` do className (strzalka jest biala, na jasnym tle musi byc ciemna): `className="opacity-40 invert"`

10. **Dekoracyjne overlaye** (Tlo-STYPENDIA.png, skrzydlo2.png): zmniejsz opacity:
    - Tlo-STYPENDIA (linia 35): `opacity-20` -> `opacity-10`
    - skrzydlo2 (linia 45): `opacity-[0.18]` -> `opacity-[0.08]`
    Na jasnym tle te obrazy (zaprojektowane na ciemne tlo) beda zbyt dominujace — delikatniejsza obecnosc.
  </action>
  <verify>
Uruchom `npx next build --no-lint 2>&1 | head -20` — brak bledow.
Wizualnie na `localhost:4510`: sekcja stypendii ma jasne tlo, ciemne teksty, czytelne logotypy, ciemna strzalke.
  </verify>
  <done>
Sekcja ProgramyStypendialneSection renderuje sie na jasnym tle (bialy + tekstura szum-lightgrey-1) z ciemnymi czcionkami. Wszystkie teksty, bordery, logotypy i dekoracje dostosowane do jasnego wariantu. fm-green accent zachowany bez zmian.
  </done>
</task>

</tasks>

<verification>
- Dev server (`npm run dev -- --port 4510`) startuje bez bledow
- Sekcja "Programy Edukacyjne" (dark) wyglada identycznie jak przed zmianami
- Sekcja "Programy Stypendialne" (light) ma jasne tlo z czytelnym ciemnym tekstem
- Sidebar nawigacja w sekcji stypendialnej ma ciemne kolory
- Logotypy partnerow widoczne bez inwersji
- Linki "Wiecej" z ciemnym tekstem i hover na fm-green
- Strzalka separatora ciemna (inverted)
</verification>

<success_criteria>
Sekcja ProgramyStypendialneSection wyswietla sie na jasnym tle z ciemnymi czcionkami, zachowujac identyczny layout i interakcje (hover, animacje FadeIn). Sekcja ProgramyEdukacyjne nie zmienila wygladu.
</success_criteria>

<output>
Po zakonczeniu utworz `.planning/quick/2-sekcja-programystypendialnesection-na-ja/2-SUMMARY.md`
</output>

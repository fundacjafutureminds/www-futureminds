import type {
  Partner,
  Program,
  Project,
  Article,
  NavItem,
  StickyNavLink,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Programy edukacyjne", href: "#programy-edukacyjne" },
  { label: "Programy stypendialne", href: "#programy-stypendialne" },
  { label: "Projekty", href: "#projekty" },
  { label: "Szkolenia", href: "#szkolenia" },
  { label: "Baza wiedzy", href: "#baza-wiedzy" },
];

export const PROGRAMS: Program[] = [
  {
    title: "FIRST® LEGO® League",
    description:
      "FIRST LEGO League to inicjatywa edukacyjna, łącząca pasje do robotyki z naukami ścisłymi, zachęcając młodzież do odkrywania świata nauki i innowacji. Drużyny z całego świata spotykają się na turniejach, projektując roboty i proponując rozwiązania dla rzeczywistych wyzwań naukowych. W Polsce program FIRST LEGO League jest organizowany od 2008 roku, a fundacja Future Minds jest jego jedynym oficjalnym organizatorem.",
    href: "/fll",
    logo: "/images/Logo-First-Lego-League.png",
  },
  {
    title: "Build the Change",
    description:
      '"Build the Change" koncentruje się na dawaniu dzieciom głosu i umożliwianiu im wyrażania swoich nadziei i pomysłów na lepszą przyszłość. Dzieci wykorzystują swoją kreatywność do rozwiązywania rzeczywistych wyzwań za pomocą klocków LEGO® i innych kreatywnych materiałów – wszystko to osiągane jest poprzez uczenie się poprzez zabawę.',
    href: "https://www.lego.com/en-us/sustainability/children/build-the-change",
    logo: "/images/Logo-FIRST-LEGO-LEAGUE-biel-13.png",
  },
  {
    title: "OZEdukacja",
    description:
      "Program OZEdukacja, stworzony z inicjatywy Fundacji Enea Energia Wspólnoty i realizowany przez Fundację Future Minds, to ogólnopolski program edukacyjny dla uczniów klas 6–8, którego celem jest budowanie świadomości energetycznej i promocja odnawialnych źródeł energii.",
    href: "https://www.oze.edu.pl/",
    logo: "/images/logo-short-light-1024x363.png",
  },
];

export const EDUCATION_SECTION_NAV: StickyNavLink[] = [
  { label: "FIRST® LEGO® League", href: "/fll" },
  {
    label: "Build the Change",
    href: "https://www.lego.com/en-us/sustainability/children/build-the-change",
  },
  { label: "OZEdukacja", href: "https://www.oze.edu.pl/" },
  { label: "Edukacja Energetyczna", href: "http://energia.fll.edu.pl" },
];

export const SCHOLARSHIP_SECTION_NAV: StickyNavLink[] = [
  { label: "Dla biznesu", href: "/csr" },
  { label: "Dla szkół", href: "/stypendia" },
];

export const PARTNER_LOGOS: Partner[] = [
  { name: "Rockwell Automation", src: "/images/Logo-Rockwell.png" },
  { name: "John Deere", src: "/images/jo.png" },
  { name: "RTX", src: "/images/Logo-RTX.png" },
  { name: "Collins Aerospace", src: "/images/Collins-aerospace-white.png" },
  { name: "ENEA", src: "/images/logo-ENEA-3-biale.png" },
  { name: "Mmaltic", src: "/images/mmaltic.png" },
  { name: "Xerox", src: "/images/2.png" },
  { name: "OTIS", src: "/images/3.png" },
  {
    name: "LEGO Education",
    src: "/images/Screen-Shot-2019-12-27-at-1.50.07-PM-1024x232-1.png",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Metropolitalna Liga ENIGMY",
    description:
      "Projekt \u201eMetropolitalna Liga ENIGMY\u201d, zrealizowany przez Fundacj\u0119 Future Minds i Stowarzyszenie Metropolia Pozna\u0144 z finansowaniem europejskim, znacz\u0105co wzmocni\u0142 umiej\u0119tno\u015bci matematyczne i informatyczne uczni\u00f3w.",
    image: "/images/Logo-Enigma.png",
  },
  {
    title: 'Pol\'and Rock 2022 "Budujemy państwo prawa"',
    description:
      'Fundacja we współpracy z Okręgową Izbą Radców Prawnych, zrealizowała projekt "Budujemy państwo prawa" na festiwalu Pol\'and Rock 2022, kładąc nacisk na prawa dziecka oraz zasady funkcjonowania państwa prawa poprzez interaktywne warsztaty z wykorzystaniem klocków LEGO®.',
    image: "/images/Obszar-roboczy-1.png",
  },
  {
    title:
      "Realizacja grantu od Międzynarodowej Organizacji ds. Migracji ONZ",
    description:
      'Realizacja projektu "Działania integracyjne społeczności za pomocą FIRST LEGO League Explore" została wsparta grantem od Międzynarodowej Organizacji ds. Migracji (IOM). Celem tego projektu było wspieranie integracji polskich i ukraińskich dzieci.',
    image: "/images/IOM.png",
  },
  {
    title: "Noc Naukowców",
    description:
      "Od wielu lat Fundacja wraz z Wydziałem Matematyki i Informatyki na Uniwersytecie Adama Mickiewicza w Poznaniu bierze udział w Nocy Naukowców - największej w Europie imprezie promującej naukę, innowację i badania.",
    image: "/images/Noc-naukowcow.png",
  },
  {
    title: "Mistrzostwa IT",
    description:
      "Fundacja współorganizuje Dywizję Robotyki w ramach Mistrzostw IT odbywających się na Poznań Game Arena, prestiżowym wydarzeniu dla entuzjastów nowych technologii w Europie Środkowo-Wschodniej.",
  },
  {
    title: "Laboratoria Przyszłości",
    description:
      "Laboratoria Przyszłości to rządowy program, który wspierał szkoły w całej Polsce w doposażeniu pracowni STEAM. Fundacja wspiera merytorycznie szkoły, które wybrały rozwiązania związane z LEGO Education i FIRST LEGO League.",
    image:
      "/images/logo-Laboratoria_Przyszlosci_poziom_biale-1-e1707145414838.png",
  },
];

export const ARTICLES: Article[] = [
  {
    title: "Uczenie (się) przez tworzenie",
    author: "Jakub Piasecki",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
  },
  {
    title: 'Robotyka w programie "Laboratoria Przyszłości"',
    author: "Wojciech Zuziak",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
  },
  {
    title: "Wpływ edukacji STEAM na rozwój kompetencji przyszłości",
    category: "Baza wiedzy",
    href: "/publikacje",
  },
  {
    title:
      "FIRST LEGO League jako narzędzie kształtowania umiejętności miękkich",
    category: "Baza wiedzy",
    href: "/publikacje",
  },
  {
    title: "Robotyka edukacyjna w polskich szkołach - raport",
    category: "Baza wiedzy",
    href: "/publikacje",
  },
  {
    title: "Metodyka nauczania STEAM w kontekście reformy edukacji",
    category: "Baza wiedzy",
    href: "/publikacje",
  },
];

export const PROJECTS_SECTION_NAV: StickyNavLink[] = [
  { label: "Powrót na górę strony", href: "#home" },
];

export const TRAINING_SECTION_NAV: StickyNavLink[] = [
  { label: "Akademia Future Minds", href: "/szkolenia" },
  { label: "Akademia LEGO® Education", href: "/szkolenia" },
];

export const KNOWLEDGE_SECTION_NAV: StickyNavLink[] = [
  { label: "Powrót na górę strony", href: "#home" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "FIRST LEGO League", href: "/fll" },
  { label: "Edukacja Energetyczna", href: "https://energia.fll.edu.pl/" },
  { label: "O nas", href: "/o-nas" },
  { label: "Szkolenia", href: "/szkolenia" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Regulamin sprzedaży", href: "/regulamin-sprzedazy" },
  { label: "Biznes / CSR", href: "/csr" },
  { label: "Stypendia", href: "/stypendia" },
];

export const SOCIAL_LINKS: NavItem[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/fundacjafutureminds/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fundacjafutureminds",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fundacja-future-minds",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@firstlegoleaguepolska",
  },
];

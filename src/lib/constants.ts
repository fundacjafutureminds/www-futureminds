import type {
  Partner,
  Program,
  Project,
  Article,
  BlogPost,
  ScholarshipCtaCard,
  NavItem,
  StickyNavLink,
  TechIcon,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Programy edukacyjne", href: "#programy-edukacyjne" },
  { label: "Programy stypendialne", href: "#programy-stypendialne" },
  { label: "Projekty", href: "#projekty" },
  { label: "Szkolenia", href: "#szkolenia" },
  { label: "Publikacje", href: "#baza-wiedzy" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
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
      "Program OZEdukacja, stworzony z inicjatywy Fundacji Enea Energia Wspólnoty i realizowany przez Fundację Future Minds, to ogólnopolski program edukacyjny dla uczniów klas 6–8, którego celem jest budowanie świadomości energetycznej i promocja odnawialnych źródeł energii. Program obejmuje konkurs, filmy edukacyjne i scenariusze lekcji.",
    href: "https://www.oze.edu.pl/",
    logo: "/images/logo-short-light-1024x363.png",
  },
  {
    title: "Edukacja Energetyczna",
    description:
      "Program ten kształtuje świadomość energetyczną u dzieci, prowadząc je przez cały cykl energii - od produkcji, przez przechowywanie, po jej wykorzystanie. Dzięki analizie różnorodnych źródeł energii, dzieci uczą się świadomych wyborów, zwłaszcza w kontekście odnawialnych źródeł. Główne projekty badawcze koncentrują się na zielonej energii, oszczędzaniu i innowacyjnych rozwiązaniach dla bezpieczeństwa energetycznego.",
    href: "http://energia.fll.edu.pl",
    logo: "/images/Lobo-Edukacja-Energetyczna.png",
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

export const SCHOLARSHIP_BLOG_POSTS: BlogPost[] = [
  {
    title: "Stypendia FIRST LEGO League 2024/2025",
    category: "Programy stypendialne",
    excerpt:
      "Nowy sezon stypendialny startuje! Dowiedz się jak wziąć udział w programie...",
    href: "/aktualnosci",
  },
  {
    title: "Podsumowanie sezonu stypendialnego 2023/2024",
    category: "Programy stypendialne",
    excerpt:
      "W minionym sezonie fundacja przyznała stypendia ponad 200 uczniom z całej Polski...",
    href: "/aktualnosci",
  },
];

export const SCHOLARSHIP_CTA_CARDS: ScholarshipCtaCard[] = [
  {
    title: "Jak",
    keyword: "ufundować",
    suffix: "stypendium?",
    image: "/images/pudelko1.png",
    href: "/csr",
  },
  {
    title: "Jak",
    keyword: "otrzymać",
    suffix: "stypendium?",
    image: "/images/dzieci-stypendia-1.png",
    href: "/stypendia",
  },
  {
    title: "Jak",
    keyword: "zostać sponsorem",
    suffix: "FIRST LEGO League?",
    image: "/images/dzieci-fll.png",
    href: "/csr",
  },
];

export const PARTNER_LOGOS: Partner[] = [
  { name: "Rockwell Automation", src: "/images/Logo-Rockwell.png" },
  {
    name: "LEGO Education",
    src: "/images/Screen-Shot-2019-12-27-at-1.50.07-PM-1024x232-1.png",
  },
  { name: "RTX", src: "/images/Logo-RTX.png" },
  {
    name: "Collins Aerospace",
    src: "/images/Collins_Aerospace_logo_stack_white_300.png",
  },
  { name: "ENEA", src: "/images/Untitled-designapt.png" },
  { name: "Mmaltic", src: "/images/mmaltic.png" },
  { name: "OTIS", src: "/images/3.png" },
  { name: "Xerox", src: "/images/2.png" },
  { name: "John Deere", src: "/images/jo.png" },
];

export const PROJECTS: Project[] = [
  {
    title: "Metropolitalna Liga ENIGMY",
    description:
      "Projekt \u201eMetropolitalna Liga ENIGMY\u201d, zrealizowany przez Fundacj\u0119 Future Minds i Stowarzyszenie Metropolia Pozna\u0144 z finansowaniem europejskim, znacz\u0105co wzmocni\u0142 umiej\u0119tno\u015bci matematyczne i informatyczne uczni\u00f3w. Inicjatywa ta, \u0142\u0105cz\u0105c konkursy mi\u0119dzyszkolne z edukacyjnymi celami, po\u0142o\u017cy\u0142a podwaliny pod dalszy rozw\u00f3j kszta\u0142cenia w regionie.",
    image: "/images/Logo-Enigma.png",
    secondaryImage: "/images/Obszar-roboczy-1.png",
  },
  {
    title: 'Pol\'and Rock 2022 "Budujemy pa\u0144stwo prawa"',
    description:
      'Fundacja we wsp\u00f3\u0142pracy z Okr\u0119gow\u0105 Izb\u0105 Radc\u00f3w Prawnych, zrealizowa\u0142a projekt "Budujemy pa\u0144stwo prawa" na festiwalu Pol\'and Rock 2022, k\u0142ad\u0105c nacisk na prawa dziecka oraz zasady funkcjonowania pa\u0144stwa prawa poprzez interaktywne warsztaty z wykorzystaniem klock\u00f3w LEGO\u00ae. Inicjatywa ta mia\u0142a na celu nie tylko edukacj\u0119 prawn\u0105, ale r\u00f3wnie\u017c promowanie \u015bwiadomo\u015bci praw dziecka w\u015br\u00f3d m\u0142odszych pokole\u0144.',
    image: "/images/rock3.png",
  },
  {
    title:
      "Realizacja grantu od Mi\u0119dzynarodowej Organizacji ds. Migracji ONZ",
    description:
      'Realizacja projektu "Dzia\u0142ania integracyjne spo\u0142eczno\u015bci za pomoc\u0105 FIRST LEGO League Explore" zosta\u0142a wsparta grantem od Mi\u0119dzynarodowej Organizacji ds. Migracji (IOM), b\u0119d\u0105cej cz\u0119\u015bci\u0105 Systemu Organizacji Narod\u00f3w Zjednoczonych (ONZ). Celem tego projektu by\u0142o wspieranie integracji polskich i ukrai\u0144skich dzieci w miejscowo\u015bci Karczmiska, wojew\u00f3dztwo Lubelskie, przez wsp\u00f3lne uczestnictwo w edukacyjnych aktywno\u015bciach.',
    image: "/images/IOM.png",
  },
  {
    title: "Noc Naukowc\u00f3w",
    description:
      "Od wielu lat Fundacja wraz z Wydzia\u0142em Matematyki i Informatyki na Uniwersytecie Adama Mickiewicza w Poznaniu bierze udzia\u0142 w Nocy Naukowc\u00f3w - najwi\u0119kszej w Europie imprezie promuj\u0105cej nauk\u0119, innowacj\u0119 i badania. Jest organizatorem takich wydarze\u0144 otwartych jak budowanie i programowanie robot\u00f3w (elementy FIRST LEGO League) czy Build The Change.",
    image: "/images/Noc-naukowcow.png",
  },
  {
    title: "Mistrzostwa IT",
    description:
      "Fundacja wsp\u00f3\u0142organizuje Dywizj\u0119 Robotyki w ramach Mistrzostw IT odbywaj\u0105cych si\u0119 na Pozna\u0144 Game Arena, presti\u017cowym wydarzeniu dla entuzjast\u00f3w nowych technologii w Europie \u015arodkowo-Wschodniej. Wydarzenie stanowi platform\u0119 dla promowania wiedzy, umiej\u0119tno\u015bci i pasji, przygotowuj\u0105c m\u0142odzie\u017c do spe\u0142nienia wymaga\u0144 wsp\u00f3\u0142czesnego rynku pracy.",
    image: "/images/Obszar-roboczy-3.png",
  },
  {
    title: "Laboratoria Przysz\u0142o\u015bci",
    description:
      "Laboratoria Przysz\u0142o\u015bci to rz\u0105dowy program, kt\u00f3ry wspiera\u0142 szko\u0142y w ca\u0142ej Polsce w doposa\u017ceniu pracowni STEAM (m.in. pracowni technicznych, robotycznych czy informatycznych). Fundacja wspiera merytorycznie szko\u0142y, kt\u00f3re wybra\u0142y rozwi\u0105zania zwi\u0105zane z LEGO Education i FIRST LEGO League, oferuj\u0105c kompleksowe wdro\u017cenia i szkolenia dla nauczycieli.",
    image:
      "/images/logo-Laboratoria_Przyszlosci_poziom_biale-1-e1707145414838.png",
  },
  {
    title: "Kto Ty jeste\u015b? - Polak ma\u0142y",
    description:
      'Projekt \u201ePodwodny \u015awiat \u2013 edukacja STEAM z klockami LEGO\u201d, realizowany przez Fundacj\u0119 Future Minds, obj\u0105\u0142 120 dzieci z 5 przedszkoli w r\u00f3\u017cnych cz\u0119\u015bciach Polski, rozwijaj\u0105c ich umiej\u0119tno\u015bci w obszarach nauk przyrodniczych, technologii, in\u017cynierii, matematyki i sztuki (STEAM). Projekt finansowany ze \u015brodk\u00f3w Ministra Edukacji w ramach programu "Kto Ty jeste\u015b? - Polak ma\u0142y" na 2024 rok.',
    image: "/images/04_znak_-siatka_podstawowy_mono_ciemne_tlo-1.png",
    href: "https://edukacjasteam.pl/",
  },
];

export const ARTICLES: Article[] = [
  {
    title: "Uczenie (się) przez tworzenie",
    author: "Jakub Piasecki",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
    excerpt:
      "Publikacja o metodyce nauczania przez tworzenie i kreatywne dzia\u0142anie w edukacji STEAM.",
  },
  {
    title: 'Robotyka w programie "Laboratoria Przyszłości"',
    author: "Wojciech Zuziak",
    category: "Baza wiedzy",
    href: "/publikacje",
    image: "/images/ksiazki.png",
    excerpt:
      "Analiza wdro\u017Cenia robotyki edukacyjnej w ramach rz\u0105dowego programu Laboratoria Przysz\u0142o\u015Bci.",
  },
  {
    title: "Wpływ edukacji STEAM na rozwój kompetencji przyszłości",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt:
      "Badanie wp\u0142ywu zintegrowanego nauczania STEAM na kszta\u0142towanie umiej\u0119tno\u015Bci kluczowych.",
  },
  {
    title:
      "FIRST LEGO League jako narzędzie kształtowania umiejętności miękkich",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt:
      "Jak udzia\u0142 w turniejach FIRST LEGO League rozwija kompetencje spo\u0142eczne i komunikacyjne.",
  },
  {
    title: "Robotyka edukacyjna w polskich szkołach - raport",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt:
      "Raport o stanie robotyki edukacyjnej w Polsce \u2014 wyzwania, mo\u017Cliwo\u015Bci i rekomendacje.",
  },
  {
    title: "Metodyka nauczania STEAM w kontekście reformy edukacji",
    category: "Baza wiedzy",
    href: "/publikacje",
    excerpt:
      "Przegl\u0105d metodyk nauczania STEAM i ich zastosowanie w kontek\u015Bcie polskiej reformy edukacji.",
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

export const TECH_ICONS: TechIcon[] = [
  { src: "/images/23744_20138_spike5a.png", alt: "SPIKE", width: 149 },
  { src: "/images/raspberry-pi-svgrepo-com.png", alt: "Raspberry Pi", width: 34 },
  { src: "/images/arduino-logo-vector-01.png", alt: "Arduino", width: 63 },
  { src: "/images/python-svgrepo-com.png", alt: "Python", width: 45 },
  { src: "/images/ai.png", alt: "AI", width: 47 },
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

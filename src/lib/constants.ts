import type {
  NavItem,
  Program,
  Partner,
  Project,
  NewsItem,
  FooterColumn,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "O nas", href: "/o-nas" },
  { label: "Programy edukacyjne", href: "/programy-edukacyjne" },
  { label: "Programy stypendialne", href: "/programy-stypendialne" },
  { label: "Projekty", href: "/projekty" },
  { label: "Publikacje", href: "/publikacje" },
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Kontakt", href: "/kontakt" },
];

export const PROGRAMS: Program[] = [
  {
    title: "Akademia Przyszłości",
    description:
      "Kompleksowy program edukacyjny rozwijający kompetencje cyfrowe i technologiczne u młodzieży.",
    icon: "GraduationCap",
    href: "/programy-edukacyjne",
  },
  {
    title: "Warsztaty STEM",
    description:
      "Praktyczne warsztaty z nauk ścisłych, technologii, inżynierii i matematyki.",
    icon: "Microscope",
    href: "/programy-edukacyjne",
  },
  {
    title: "Klub Młodego Programisty",
    description:
      "Regularne spotkania dla dzieci i młodzieży zainteresowanych programowaniem.",
    icon: "Code",
    href: "/programy-edukacyjne",
  },
  {
    title: "Letnia Szkoła Innowacji",
    description:
      "Intensywny program wakacyjny łączący naukę, technologię i kreatywność.",
    icon: "Lightbulb",
    href: "/programy-edukacyjne",
  },
];

export const PARTNERS: Partner[] = [
  { name: "Ministerstwo Edukacji i Nauki" },
  { name: "Fundacja PZU" },
  { name: "Google.org" },
  { name: "Microsoft Philanthropies" },
  { name: "Uniwersytet Warszawski" },
  { name: "Politechnika Wrocławska" },
];

export const PROJECTS: Project[] = [
  {
    title: "Cyfrowa Szkoła",
    description:
      "Wyposażenie szkół w nowoczesne narzędzia dydaktyczne i szkolenie nauczycieli.",
    tags: ["edukacja", "technologia", "szkoły"],
  },
  {
    title: "Code for Good",
    description:
      "Hackathony i projekty technologiczne rozwiązujące lokalne problemy społeczne.",
    tags: ["programowanie", "społeczność", "hackathon"],
  },
  {
    title: "Mentor Tech",
    description:
      "Program mentoringowy łączący ekspertów IT z młodymi adeptami technologii.",
    tags: ["mentoring", "IT", "rozwój"],
  },
  {
    title: "EduLab",
    description:
      "Laboratorium edukacyjne tworzące innowacyjne materiały dydaktyczne.",
    tags: ["innowacje", "materiały", "badania"],
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    title: "Rusza rekrutacja do Akademii Przyszłości 2025",
    excerpt:
      "Zapraszamy uczniów klas 7-8 oraz licealistów do udziału w nowej edycji programu.",
    date: "2025-01-15",
    href: "/aktualnosci",
  },
  {
    title: "Podsumowanie hackathonu Code for Good",
    excerpt:
      "Ponad 120 uczestników, 24 projekty i 3 wdrożenia — tak wyglądała tegoroczna edycja.",
    date: "2024-12-10",
    href: "/aktualnosci",
  },
  {
    title: "Nowe partnerstwo z Google.org",
    excerpt:
      "Fundacja nawiązała współpracę z Google.org w ramach programu wsparcia edukacji cyfrowej.",
    date: "2024-11-28",
    href: "/aktualnosci",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "O Fundacji",
    links: [
      { label: "O nas", href: "/o-nas" },
      { label: "Misja i wizja", href: "/o-nas" },
      { label: "Zespół", href: "/o-nas" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Programy",
    links: [
      { label: "Programy edukacyjne", href: "/programy-edukacyjne" },
      { label: "Programy stypendialne", href: "/programy-stypendialne" },
      { label: "Projekty", href: "/projekty" },
      { label: "Szkolenia", href: "/programy-edukacyjne" },
    ],
  },
  {
    title: "Wiedza",
    links: [
      { label: "Publikacje", href: "/publikacje" },
      { label: "Aktualności", href: "/aktualnosci" },
      { label: "Baza wiedzy", href: "/publikacje" },
    ],
  },
  {
    title: "Prawne",
    links: [
      { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
      { label: "Regulamin", href: "/polityka-prywatnosci" },
    ],
  },
];

export const SCHOLARSHIP_STATS = [
  { value: "150+", label: "Przyznanych stypendiów" },
  { value: "500 tys.", label: "Złotych wsparcia" },
  { value: "95%", label: "Stypendystów kontynuuje naukę" },
];

export const TRAINING_TECHNOLOGIES = [
  "Python",
  "JavaScript",
  "React",
  "Data Science",
  "AI/ML",
  "Cybersecurity",
  "Cloud Computing",
  "UX/UI Design",
];

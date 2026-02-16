export interface NavItem {
  label: string;
  href: string;
}

export interface StickyNavLink {
  label: string;
  href: string;
}

export interface Partner {
  name: string;
  src: string;
  href?: string;
}

export interface Program {
  title: string;
  description: string;
  href: string;
  logo: string;
  logoWidth?: number;
  logoHeight?: number;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  secondaryImage?: string; // Drugie logo (np. Enigma ma 2 loga)
  href?: string;
}

export interface Article {
  title: string;
  author?: string;
  category: string;
  href: string;
  image?: string;
  excerpt?: string;
}

export interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image?: string;
}

export interface NewsPost {
  title: string;
  category: string;
  date: string; // ISO date string, e.g. "2026-02-16T14:30:00"
}

export interface ScholarshipCtaCard {
  title: string;
  keyword: string;
  suffix: string;
  image: string;
  href: string;
}

export interface TechIcon {
  src: string;
  alt: string;
  width: number; // naturalna szerokosc w px z Elementora
}

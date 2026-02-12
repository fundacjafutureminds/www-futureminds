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
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

export interface Article {
  title: string;
  author?: string;
  category: string;
  href: string;
  image?: string;
}

export interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image?: string;
}

export interface ScholarshipCtaCard {
  title: string;
  keyword: string;
  suffix: string;
  image: string;
  href: string;
}

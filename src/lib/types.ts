export interface NavItem {
  label: string;
  href: string;
}

export interface Program {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

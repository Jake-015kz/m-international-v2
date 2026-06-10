export interface ProductData {
  name: string;
  subtitle: string;
  description: string;
  benefits?: string[];
  short?: string;
  composition?: string;
  url?: string;
}

export interface NavItem {
  key: string;
  label: string;
  href: string;
}

export interface StatData {
  value: string;
  label: string;
}

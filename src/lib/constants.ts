export const SITE_CONFIG = {
  name: "M-International",
  url: "https://m-internation.kz",
  description: "Натуральные добавки для здоровья и долголетия",
} as const;

export const LOCALES = ["ru", "en", "kk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

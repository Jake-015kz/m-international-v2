export const SITE_CONFIG = {
  name: "M-International",
  url: "https://m-internation.kz",
  description: "Интеллект природы для вашего долголетия",
} as const;

export const LOCALES = ["ru", "en", "kk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

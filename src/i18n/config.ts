export const locales = ["en", "si", "ja", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { native: string; english: string; short: string }> = {
  en: { native: "English", english: "English", short: "EN" },
  si: { native: "සිංහල", english: "Sinhala", short: "සිං" },
  ja: { native: "日本語", english: "Japanese", short: "日本" },
  zh: { native: "中文", english: "Chinese", short: "中文" },
};

/** BCP 47 tags used for Intl formatting and the <html lang> attribute. */
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  si: "si-LK",
  ja: "ja-JP",
  zh: "zh-CN",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

/** Prefixes an app path with the locale segment, e.g. ("si", "/shop") -> "/si/shop". */
export function localePath(locale: Locale, path = "/"): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

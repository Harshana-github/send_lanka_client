import type { Locale } from "./config";
import type { Dictionary } from "./translate";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  si: () => import("./dictionaries/si.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

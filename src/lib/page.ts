import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createTranslator, type Dictionary, type Translate } from "@/i18n/translate";

/** Resolves the `[lang]` route param into the locale, its dictionary and a translator. */
export async function resolveLocale(
  params: Promise<{ lang: string }>,
): Promise<{ locale: Locale; dictionary: Dictionary; t: Translate }> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  return { locale: lang, dictionary, t: createTranslator(dictionary) };
}

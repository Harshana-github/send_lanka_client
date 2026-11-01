import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

type Join<K extends string, P extends string> = `${K}.${P}`;

/** Every dotted key path that points at a string in the dictionary, e.g. "nav.home". */
export type TranslationKey = {
  [K in keyof Dictionary & string]: Dictionary[K] extends string
    ? K
    : Join<K, keyof Dictionary[K] & string>;
}[keyof Dictionary & string];

export type TranslationValues = Record<string, string | number>;

export type Translate = (key: TranslationKey, values?: TranslationValues) => string;

export function createTranslator(dictionary: Dictionary): Translate {
  return (key, values) => {
    const text = key
      .split(".")
      .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], dictionary);

    if (typeof text !== "string") return key;
    if (!values) return text;

    return text.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in values ? String(values[name]) : match,
    );
  };
}

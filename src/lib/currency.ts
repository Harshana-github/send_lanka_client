import { localeTags, type Locale } from "@/i18n/config";

export const currencies = ["LKR", "USD"] as const;

export type Currency = (typeof currencies)[number];

/** Indicative rate used to show rupee prices. Update from the admin panel in production. */
export const LKR_PER_USD = 330;

/** Rupee prices are rounded to the nearest Rs. 50 so they read like real shelf prices. */
export function usdToLkr(usd: number): number {
  return Math.round((usd * LKR_PER_USD) / 50) * 50;
}

export function convert(usd: number, currency: Currency): number {
  return currency === "LKR" ? usdToLkr(usd) : usd;
}

export function formatMoney(usd: number, currency: Currency, locale: Locale): string {
  const amount = convert(usd, currency);
  const digits = currency === "LKR" || Number.isInteger(amount) ? 0 : 2;

  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency,
    currencyDisplay: currency === "LKR" ? "code" : "symbol",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

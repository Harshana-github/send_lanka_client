import { localeTags, type Locale } from "@/i18n/config";

export const currencies = ["LKR", "USD"] as const;

export type Currency = (typeof currencies)[number];

/** Used only until the rate from the admin panel has loaded. */
const DEFAULT_LKR_PER_USD = 330;

/** Rupee prices are rounded to the nearest Rs. 50 so they read like real shelf prices. */
function usdToLkr(usd: number, rate: number): number {
  return Math.round((usd * rate) / 50) * 50;
}

export function formatMoney(usd: number, currency: Currency, locale: Locale, rate = DEFAULT_LKR_PER_USD): string {
  const amount = currency === "LKR" ? usdToLkr(usd, rate) : usd;
  const digits = currency === "LKR" || Number.isInteger(amount) ? 0 : 2;

  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency,
    currencyDisplay: currency === "LKR" ? "code" : "symbol",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

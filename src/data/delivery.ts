import type { Localized } from "@/i18n/config";
import { sriLankaDate } from "@/lib/dates";
import { LKR_PER_USD } from "@/lib/currency";
import type { Product } from "./catalog";
import postalCodes from "./postal-codes.json";

/**
 * Sample delivery setup for the demo, in the same shape as Delivery Zones in the admin panel.
 * The admin panel can't share its data until the Laravel API exists. Then this file and
 * postal-codes.json go away, and /api/delivery is replaced by the Laravel endpoint.
 */
type CategoryRate = { lkr?: number; days?: number };
type Rate = { methodId: keyof typeof methods; lkr: number; days: number; categories?: Record<string, CategoryRate> };
type Zone = { districts: string[]; rates: Rate[] };

const methods = {
  own: { en: "Own delivery", si: "අපගේම බෙදාහැරීම" },
  koombiyo: { en: "Koombiyo Delivery", si: "කූම්බියෝ ඩිලිවරි" },
};

const colombo: Zone = {
  districts: ["Colombo", "Gampaha"],
  rates: [
    { methodId: "own", lkr: 350, days: 0, categories: { large: { lkr: 800, days: 1 } } },
    { methodId: "koombiyo", lkr: 450, days: 2, categories: { large: { days: 3 } } },
  ],
};

const islandwide: Zone = {
  districts: [],
  rates: [{ methodId: "koombiyo", lkr: 600, days: 3, categories: { large: { lkr: 1000, days: 4 } } }],
};

const zoneOf = (district: string) => (colombo.districts.includes(district) ? colombo : islandwide);

/** Orders after this hour in Sri Lanka can't go out the same day. */
const CUTOFF_HOUR = 14;

export type DeliveryOption = { id: string; name: Localized; priceUsd: number; earliestDate: string; today: boolean };

export type DeliveryPlace = { town: Localized; district: Localized; methods: DeliveryOption[] };

/**
 * What one method costs for a cart. The dearest item sets the price and the slowest sets the days.
 * Free-delivery items add nothing to the price, so a cart of only those delivers free.
 */
function quote(rate: Rate, items: Product[]): DeliveryOption {
  const priceOf = (item: Product) => (item.deliveryCategory ? rate.categories?.[item.deliveryCategory]?.lkr : undefined) ?? rate.lkr;
  const daysOf = (item: Product) => (item.deliveryCategory ? rate.categories?.[item.deliveryCategory]?.days : undefined) ?? rate.days;

  const lkr = Math.max(0, ...items.filter((item) => !item.freeDelivery).map(priceOf));
  const preparation = items.every((item) => item.sameDay) ? 0 : 1;
  const wait = preparation + Math.max(rate.days, ...items.map(daysOf));
  const pastCutoff = new Date(Date.now() + 5.5 * 60 * 60 * 1000).getUTCHours() >= CUTOFF_HOUR;
  const offset = wait === 0 && pastCutoff ? 1 : wait;

  return { id: rate.methodId, name: methods[rate.methodId], priceUsd: lkr / LKR_PER_USD, earliestDate: sriLankaDate(offset), today: offset === 0 };
}

/** The towns a postal code covers, each with its delivery options, cheapest first. Empty if we don't deliver there. */
export function deliveryPlaces(postalCode: string, items: Product[]): DeliveryPlace[] {
  const towns = (postalCodes as Record<string, Pick<DeliveryPlace, "town" | "district">[]>)[postalCode] ?? [];
  return towns.map((place) => ({
    ...place,
    methods: zoneOf(place.district.en).rates.map((rate) => quote(rate, items)).sort((a, b) => a.priceUsd - b.priceUsd),
  }));
}

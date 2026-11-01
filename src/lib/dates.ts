import { localeTags, type Locale } from "@/i18n/config";

/** Formats a calendar date stored as "YYYY-MM-DD" without shifting it across time zones. */
export function formatDate(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(localeTags[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Today's date in Sri Lanka (UTC+5:30) plus an offset, as "YYYY-MM-DD". Call only in the browser. */
export function sriLankaDate(offsetDays = 0): string {
  const now = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  now.setUTCDate(now.getUTCDate() + offsetDays);
  return now.toISOString().slice(0, 10);
}

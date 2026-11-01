import type { Locale } from "@/i18n/config";

// Spelled out instead of using Intl: Node and browsers ship different ICU data for Sinhala,
// and a server/client difference in a single character breaks hydration.
const names: Record<Locale, { months: string[]; weekdays: string[] }> = {
  en: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  si: {
    months: [
      "ජනවාරි",
      "පෙබරවාරි",
      "මාර්තු",
      "අප්‍රේල්",
      "මැයි",
      "ජූනි",
      "ජූලි",
      "අගෝස්තු",
      "සැප්තැම්බර්",
      "ඔක්තෝබර්",
      "නොවැම්බර්",
      "දෙසැම්බර්",
    ],
    weekdays: ["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"],
  },
};

/** Formats a calendar date stored as "YYYY-MM-DD", e.g. "Sun, Nov 1, 2026" / "2026 නොවැම්බර් 1, ඉරිදා". */
export function formatDate(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;

  const { months, weekdays } = names[locale];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const weekday = weekdays[date.getUTCDay()];
  const year = date.getUTCFullYear();

  return locale === "si" ? `${year} ${month} ${day}, ${weekday}` : `${weekday}, ${month} ${day}, ${year}`;
}

/** Today's date in Sri Lanka (UTC+5:30) plus an offset, as "YYYY-MM-DD". Call only in the browser. */
export function sriLankaDate(offsetDays = 0): string {
  const now = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  now.setUTCDate(now.getUTCDate() + offsetDays);
  return now.toISOString().slice(0, 10);
}

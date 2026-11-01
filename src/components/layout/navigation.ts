import type { TranslationKey } from "@/i18n/translate";

export const navItems: { key: TranslationKey; path: string }[] = [
  { key: "nav.home", path: "/" },
  { key: "nav.shop", path: "/shop" },
  { key: "nav.occasions", path: "/occasions" },
  { key: "nav.howItWorks", path: "/how-it-works" },
  { key: "nav.track", path: "/track" },
  { key: "nav.contact", path: "/contact" },
];

/** A nav item is active on its own page; "Shop" also stays active on product pages. */
export function isNavActive(pathname: string, href: string, path: string): boolean {
  if (path === "/") return pathname === href;
  if (path === "/shop" && /^\/[a-z]{2}\/product\//.test(pathname)) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

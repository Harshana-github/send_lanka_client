"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { cartOpened } from "@/store/cartSlice";
import { useAppDispatch, useCartLines } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { isNavActive, navItems } from "./navigation";

export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { count } = useCartLines();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-navy-900 text-white">
        <Container className="flex h-9 items-center justify-center gap-3 text-center text-xs font-medium sm:justify-between">
          <p className="truncate text-brand-100">{t("announcement")}</p>
          <a
            href={whatsappLink(t("cta.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 text-white hover:text-brand-200 sm:flex"
          >
            <WhatsAppIcon className="size-3.5" />
            {site.whatsappDisplay}
          </a>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo href={localePath(locale)} tagline={t("brand.tagline")} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const href = localePath(locale, item.path);
                const active = isNavActive(pathname, href, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                        active ? "text-navy-900" : "text-muted hover:text-navy-900",
                      )}
                    >
                      {t(item.key)}
                      {active && (
                        <span className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded-full bg-brand-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <LanguageSwitcher />
              <CurrencySwitcher className="w-[116px]" />
            </div>

            <button
              type="button"
              onClick={() => dispatch(cartOpened())}
              aria-label={`${t("nav.openCart")} (${count})`}
              className="relative grid size-11 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-50"
            >
              <ShoppingBag className="size-5.5" aria-hidden />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute top-1 right-1 grid min-w-5 animate-pop place-items-center rounded-full bg-brand-500 px-1 text-[11px] leading-5 font-bold text-white ring-2 ring-white"
                >
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.openMenu")}
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t("nav.menu")}>
          <button
            type="button"
            aria-label={t("nav.close")}
            className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(88vw,380px)] animate-slide-in-left flex-col bg-white shadow-lift">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo href={localePath(locale)} tagline={t("brand.tagline")} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t("nav.close")}
                className="grid size-10 place-items-center rounded-full hover:bg-navy-50"
                autoFocus
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const href = localePath(locale, item.path);
                  const active = isNavActive(pathname, href, item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                          active ? "bg-brand-50 text-navy-900" : "text-ink hover:bg-surface",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-5 border-t border-line px-1 pt-6">
                <div>
                  <p className="mb-2.5 text-xs font-bold tracking-wider text-muted uppercase">{t("common.language")}</p>
                  <LanguageSwitcher variant="list" />
                </div>
                <div>
                  <p className="mb-2.5 text-xs font-bold tracking-wider text-muted uppercase">{t("common.currency")}</p>
                  <CurrencySwitcher className="h-11" />
                </div>
              </div>
            </nav>

            <div className="border-t border-line p-4">
              <Button href={whatsappLink(t("cta.whatsappMessage"))} external variant="whatsapp" fullWidth>
                <WhatsAppIcon className="size-5" />
                {site.whatsappDisplay}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

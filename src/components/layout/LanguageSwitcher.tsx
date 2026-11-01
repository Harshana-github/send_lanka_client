"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "list" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(`${segments.join("/")}${window.location.search}`, { scroll: false });
  }

  if (variant === "list") {
    return (
      <div role="radiogroup" aria-label={t("common.language")} className="grid grid-cols-2 gap-2">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={code === locale}
            onClick={() => switchTo(code)}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3.5 py-3 text-sm font-semibold transition-colors",
              code === locale
                ? "border-brand-500 bg-brand-50 text-navy-900"
                : "border-line text-muted hover:border-navy-200 hover:text-navy-900",
            )}
          >
            <span lang={code}>{localeLabels[code].native}</span>
            {code === locale && <Check className="size-4 text-brand-600" aria-hidden />}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t("common.language")}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
      >
        <Globe className="size-4.5 text-brand-600" aria-hidden />
        <span lang={locale}>{localeLabels[locale].short}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("common.language")}
          className="absolute right-0 z-50 mt-2 w-48 animate-fade-in overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift"
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  code === locale ? "bg-brand-50 font-semibold text-navy-900" : "text-ink hover:bg-surface",
                )}
              >
                <span className="flex flex-col">
                  <span lang={code}>{localeLabels[code].native}</span>
                  <span className="text-xs text-muted">{localeLabels[code].english}</span>
                </span>
                {code === locale && <Check className="size-4 text-brand-600" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { currencies } from "@/lib/currency";
import { useI18n } from "@/i18n/I18nProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { currencyChanged } from "@/store/preferencesSlice";
import { cn } from "@/lib/utils";

export function CurrencySwitcher({ className }: { className?: string }) {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.preferences.currency);

  return (
    <div
      role="radiogroup"
      aria-label={t("common.currency")}
      className={cn("flex h-10 items-center rounded-full bg-surface p-1 ring-1 ring-line", className)}
    >
      {currencies.map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={currency === code}
          onClick={() => dispatch(currencyChanged(code))}
          className={cn(
            "h-full flex-1 rounded-full px-3 text-xs font-bold tracking-wide transition-all",
            currency === code ? "bg-navy-900 text-white shadow-sm" : "text-muted hover:text-navy-900",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

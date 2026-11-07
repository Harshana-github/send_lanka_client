"use client";

import { Truck } from "lucide-react";
import type { DeliveryOption } from "@/types";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { useMoney } from "@/store/hooks";

type Props = { options: DeliveryOption[]; selectedId: string; onChange: (id: string) => void };

export function DeliveryMethods({ options, selectedId, onChange }: Props) {
  const { locale, t } = useI18n();
  const money = useMoney();

  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-1.5 text-sm font-semibold text-navy-900">{t("checkout.deliveryMethod")}</legend>
      <div className="space-y-3">
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-2xl p-4 ring-1 transition-all",
                selected ? "bg-brand-50/60 ring-2 ring-brand-500" : "bg-white ring-line hover:ring-navy-200",
              )}
            >
              <input type="radio" name="deliveryMethod" value={option.id} checked={selected} onChange={() => onChange(option.id)} className="size-4 accent-brand-600" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold text-navy-900">
                  <Truck className="size-4.5 shrink-0 text-brand-600" aria-hidden />
                  {option.name[locale]}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {option.today ? t("checkout.arrivesToday") : t("checkout.arrivesFrom", { date: formatDate(option.earliestDate, locale) })}
                </span>
              </span>
              {option.priceUsd === 0 ? (
                <span className="font-bold text-whatsapp">{t("common.free")}</span>
              ) : (
                <span className="font-bold text-navy-900 tabular-nums">{money(option.priceUsd)}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useCartLines, useMoney } from "@/store/hooks";

export function OrderSummary({ children }: { children?: ReactNode }) {
  const { locale, t } = useI18n();
  const { lines, subtotalUsd } = useCartLines();
  const money = useMoney();

  return (
    <div className="rounded-3xl bg-surface p-5 ring-1 ring-line sm:p-6">
      <h2 className="text-lg font-extrabold text-navy-900">{t("cart.summary")}</h2>
      <ul className="mt-4 space-y-4">
        {lines.map(({ product, quantity }) => (
          <li key={product.slug} className="flex items-center gap-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-line">
              <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
              <span className="absolute top-0.5 right-0.5 grid min-w-5 place-items-center rounded-full bg-navy-900 px-1 text-[11px] leading-5 font-bold text-white">
                {quantity}
              </span>
            </span>
            <span className="line-clamp-2 flex-1 text-sm font-semibold text-navy-900">{product.name[locale]}</span>
            <span className="text-sm font-bold tabular-nums">{money(product.priceUsd * quantity)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">{t("common.subtotal")}</dt>
          <dd className="font-semibold tabular-nums">{money(subtotalUsd)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">{t("common.delivery")}</dt>
          <dd className="font-semibold text-whatsapp">{t("common.free")}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base">
          <dt className="font-bold text-navy-900">{t("common.total")}</dt>
          <dd className="text-xl font-extrabold text-navy-900 tabular-nums">{money(subtotalUsd)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted">{t("cart.note")}</p>
      {children}
    </div>
  );
}

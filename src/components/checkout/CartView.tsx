"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { itemRemoved, quantityChanged } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector, useCartLines, useMoney } from "@/store/hooks";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";

export function EmptyCart({ title, text }: { title: string; text: string }) {
  const { locale, t } = useI18n();
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-brand-50">
        <ShoppingBag className="size-9 text-brand-500" aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-bold text-navy-900">{title}</h2>
      <p className="mt-2 text-muted">{text}</p>
      <Button href={localePath(locale, "/shop")} size="lg" className="mt-6">
        {t("common.shopNow")}
      </Button>
    </div>
  );
}

export function LoadingBlock() {
  return <div aria-hidden className="h-72 animate-pulse rounded-3xl bg-surface" />;
}

export function CartView() {
  const { locale, t } = useI18n();
  const dispatch = useAppDispatch();
  const hydrated = useAppSelector((state) => state.preferences.hydrated);
  const { lines } = useCartLines();
  const money = useMoney();

  if (!hydrated) return <LoadingBlock />;
  if (lines.length === 0) return <EmptyCart title={t("cart.empty")} text={t("cart.emptyHint")} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <ul className="divide-y divide-line rounded-3xl ring-1 ring-line">
        {lines.map(({ product, quantity, deliveryDate }) => {
          const href = localePath(locale, `/product/${product.slug}`);
          return (
            <li key={product.slug} className="flex gap-4 p-4 sm:gap-5 sm:p-5">
              <Link href={href} className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-surface sm:size-28">
                <Image src={product.image} alt={product.name[locale]} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={href} className="font-semibold text-navy-900 hover:text-brand-600">
                      {product.name[locale]}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {deliveryDate
                        ? t("cart.deliveryOn", { date: formatDate(deliveryDate, locale) })
                        : t("cart.noDate")}
                    </p>
                  </div>
                  <p className="font-bold text-navy-900 tabular-nums">{money(product.priceUsd * quantity)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantityStepper
                    size="sm"
                    value={quantity}
                    onChange={(value) => dispatch(quantityChanged({ slug: product.slug, quantity: value }))}
                  />
                  <button
                    type="button"
                    onClick={() => dispatch(itemRemoved(product.slug))}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-muted hover:bg-rose/10 hover:text-rose"
                  >
                    <Trash2 className="size-4" aria-hidden />
                    {t("common.remove")}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="lg:sticky lg:top-28">
        <OrderSummary>
          <Button href={localePath(locale, "/checkout")} size="lg" fullWidth className="mt-5">
            {t("common.checkout")}
          </Button>
          <Button href={localePath(locale, "/shop")} variant="ghost" fullWidth className="mt-2">
            {t("common.continueShopping")}
          </Button>
        </OrderSummary>
      </div>
    </div>
  );
}

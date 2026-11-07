"use client";

import { ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { cartClosed, itemRemoved, quantityChanged } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector, useCartLines, useMoney } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/product/QuantityStepper";

export function CartDrawer() {
  const { locale, t } = useI18n();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const { lines, count, subtotalUsd } = useCartLines();
  const money = useMoney();
  const close = () => dispatch(cartClosed());

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && dispatch(cartClosed());
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <button
        type="button"
        aria-label={t("nav.close")}
        className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm"
        onClick={close}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-white shadow-lift">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <h2 id="cart-drawer-title" className="text-lg font-extrabold text-navy-900">
            {t("cart.title")}
            {count > 0 && (
              <span className="ml-2 text-sm font-semibold text-muted">
                ({count === 1 ? t("common.itemCountOne") : t("common.itemCount", { count })})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t("nav.close")}
            className="grid size-10 place-items-center rounded-full hover:bg-navy-50"
            autoFocus
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-brand-50">
              <ShoppingBag className="size-9 text-brand-500" aria-hidden />
            </span>
            <p className="mt-5 text-lg font-bold text-navy-900">{t("cart.empty")}</p>
            <p className="mt-1.5 text-sm text-muted">{t("cart.emptyHint")}</p>
            <Button href={localePath(locale, "/shop")} onClick={close} className="mt-6">
              {t("common.shopNow")}
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map(({ product, quantity, deliveryDate }) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <Link
                    href={localePath(locale, `/product/${product.slug}`)}
                    onClick={close}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface"
                  >
                    <Image src={product.image} alt={product.name[locale]} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={localePath(locale, `/product/${product.slug}`)}
                        onClick={close}
                        className="line-clamp-2 text-sm font-semibold text-navy-900 hover:text-brand-600"
                      >
                        {product.name[locale]}
                      </Link>
                      <button
                        type="button"
                        onClick={() => dispatch(itemRemoved(product.slug))}
                        aria-label={`${t("common.remove")}: ${product.name[locale]}`}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-rose/10 hover:text-rose"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {deliveryDate ? t("cart.deliveryOn", { date: formatDate(deliveryDate, locale) }) : t("cart.noDate")}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        size="sm"
                        value={quantity}
                        onChange={(value) => dispatch(quantityChanged({ slug: product.slug, quantity: value }))}
                      />
                      <span className="font-bold text-navy-900 tabular-nums">{money(product.priceUsd * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line bg-surface/60 p-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t("common.subtotal")}</span>
                <span className="font-semibold tabular-nums">{money(subtotalUsd)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t("common.delivery")}</span>
                <span className="text-muted">{t("common.calculatedAtCheckout")}</span>
              </div>
              <Button href={localePath(locale, "/checkout")} onClick={close} size="lg" fullWidth>
                {t("common.checkout")}
              </Button>
              <Button href={localePath(locale, "/cart")} onClick={close} variant="ghost" fullWidth>
                {t("cart.viewCart")}
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

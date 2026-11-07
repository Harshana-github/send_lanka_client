"use client";

import { Plus, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { whatsappLink } from "@/lib/site";
import { itemAdded } from "@/store/cartSlice";
import { useAppDispatch, useMoney } from "@/store/hooks";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Price } from "./Price";
import { ProductBadge } from "./ProductBadge";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { locale, t } = useI18n();
  const dispatch = useAppDispatch();
  const money = useMoney();
  const name = product.name[locale];
  const href = localePath(locale, `/product/${product.slug}`);
  const whatsappMessage = t("product.whatsappMessage", { product: product.name.en, price: money(product.priceUsd) });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-200">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-surface" tabIndex={-1} aria-hidden>
        <Image
          src={product.image}
          alt=""
          fill
          loading={priority ? "eager" : undefined}
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5 sm:top-3 sm:left-3">
          {product.badge && <ProductBadge type={product.badge} label={t(`badges.${product.badge}`)} />}
          {product.sameDay && <ProductBadge type="sameDay" label={t("badges.sameDay")} />}
          {product.freeDelivery && <ProductBadge type="freeDelivery" label={t("badges.freeDelivery")} />}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center gap-1 text-xs text-muted">
          {product.reviewCount > 0 ? (
            <>
              <Star className="size-3.5 fill-gold text-gold" aria-hidden />
              <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount})</span>
            </>
          ) : (
            <span>{t("reviews.none")}</span>
          )}
        </div>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 font-semibold text-navy-900 sm:text-[15px]">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {name}
          </Link>
        </h3>
        <Price usd={product.priceUsd} compareAtUsd={product.compareAtUsd} size="sm" className="mt-1.5" />

        {/* Narrow cards (2-up on phones) show an icon-only add button; wider cards show the label too. */}
        <div className="@container relative z-10 mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => dispatch(itemAdded({ slug: product.slug, quantity: 1 }))}
            aria-label={`${t("common.addToCart")}: ${name}`}
            className="flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-navy-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-navy-800 sm:text-sm"
          >
            <ShoppingBag className="size-4 shrink-0" aria-hidden />
            <Plus className="-ml-1 size-3.5 shrink-0 @[10.5rem]:hidden" aria-hidden />
            <span className="hidden truncate @[10.5rem]:inline">{t("common.addShort")}</span>
          </button>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("common.orderOnWhatsApp")}: ${name}`}
            title={t("common.orderOnWhatsApp")}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-hover"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

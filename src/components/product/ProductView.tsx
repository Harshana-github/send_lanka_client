"use client";

import { Landmark, Camera, CheckCircle2, ChevronDown, ChevronRight, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { relatedProducts } from "@/lib/products";
import { useAppSelector } from "@/store/hooks";
import { ProductBadge } from "./ProductBadge";
import { ProductGrid } from "./ProductGrid";
import { PurchasePanel } from "./PurchasePanel";

export function ProductView({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const { products, categories } = useAppSelector((state) => state.catalog);
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = relatedProducts(products, product);
  const shopHref = localePath(locale, "/shop");
  const categoryName = categories.find((category) => category.id === product.category)?.name[locale];

  const details = [
    { title: t("product.included"), body: <IncludedList items={product.includes[locale]} />, open: true },
    { title: t("product.deliveryInfoTitle"), body: <p>{t("product.deliveryInfo")}</p> },
    { title: t("product.qualityTitle"), body: <p>{t("product.quality")}</p> },
  ];

  return (
    <div className="pb-28 lg:pb-0">
      <Container className="pt-5 sm:pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted">
            <li>
              <Link href={localePath(locale)} className="hover:text-navy-900">
                {t("nav.home")}
              </Link>
            </li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li>
              <Link href={shopHref} className="hover:text-navy-900">
                {t("product.breadcrumbShop")}
              </Link>
            </li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li>
              <Link href={`${shopHref}?category=${product.category}`} className="hover:text-navy-900">
                {categoryName}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
              <Image
                src={product.image}
                alt={product.name[locale]}
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 flex flex-col items-start gap-2">
                {product.badge && <ProductBadge type={product.badge} label={t(`badges.${product.badge}` as const)} />}
                {product.sameDay && <ProductBadge type="sameDay" label={t("badges.sameDay")} />}
                {product.freeDelivery && <ProductBadge type="freeDelivery" label={t("badges.freeDelivery")} />}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
              {categoryName}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 text-balance sm:text-4xl">
              {product.name[locale]}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {product.reviewCount > 0 ? (
                <a href="#reviews" className="group flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Star
                      key={index}
                      className={index < Math.round(product.rating) ? "size-4 fill-gold text-gold" : "size-4 text-line"}
                      aria-hidden
                    />
                  ))}
                  <span className="ml-1 font-bold text-navy-900">{product.rating.toFixed(1)}</span>
                  <span className="text-muted underline-offset-4 group-hover:text-navy-900 group-hover:underline">
                    · {t("common.reviews", { count: product.reviewCount })}
                  </span>
                </a>
              ) : (
                <a href="#reviews" className="text-muted underline-offset-4 hover:text-navy-900 hover:underline">
                  {t("reviews.none")}
                </a>
              )}
              <span className="flex items-center gap-1.5 font-semibold text-whatsapp">
                <CheckCircle2 className="size-4" aria-hidden />
                {t(product.isService ? "product.available" : "product.inStock")}
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted">{product.description[locale]}</p>

            <div className="mt-6 rounded-3xl bg-surface p-5 ring-1 ring-line sm:p-6">
              <PurchasePanel product={product} />
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-navy-900">
              {[
                { icon: Truck, label: t("hero.badgeIslandwide") },
                { icon: Landmark, label: t("checkout.payBankTitle") },
                { icon: Camera, label: t("product.photoProof") },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 rounded-2xl p-3 ring-1 ring-line">
                  <Icon className="size-5 text-brand-600" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 divide-y divide-line rounded-2xl ring-1 ring-line">
              {details.map((detail) => (
                <details key={detail.title} className="group" open={detail.open}>
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                    {detail.title}
                    <ChevronDown className="size-5 text-brand-600 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{detail.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <ProductReviews product={product} />
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line py-14 sm:py-20">
          <Container>
            <SectionHeading title={t("product.related")} />
            <ProductGrid products={related} />
          </Container>
        </section>
      )}
    </div>
  );
}

function IncludedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
          <span className="text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

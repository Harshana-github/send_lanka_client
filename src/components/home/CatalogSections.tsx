"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CatalogGate } from "@/components/CatalogGate";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translate";
import { useAppSelector } from "@/store/hooks";

function ViewAllLink({ href }: { href: string }) {
  const { t } = useI18n();
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600">
      {t("common.viewAll")}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

const Placeholder = () => <div aria-hidden className="h-64 animate-pulse rounded-3xl bg-surface" />;

export function CategoryRail() {
  const { locale, t } = useI18n();
  const categories = useAppSelector((state) => state.catalog.categories).filter((category) => category.featured);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={t("categories.title")} subtitle={t("categories.subtitle")} />
        <CatalogGate fallback={<Placeholder />}>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-5 lg:grid-cols-6">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`${localePath(locale, "/shop")}?category=${category.id}`} className="group flex flex-col items-center gap-3 text-center">
                  <span className="relative aspect-square w-full overflow-hidden rounded-full bg-surface ring-4 ring-brand-50 transition-all duration-300 group-hover:ring-brand-200">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 190px, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-sm font-semibold text-navy-900 group-hover:text-brand-600">{category.name[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CatalogGate>
      </Container>
    </section>
  );
}

/** Popular gifts, then a section for each main category. */
export function HomeProducts() {
  const { locale, t } = useI18n();
  const products = useAppSelector((state) => state.catalog.products);
  const categories = useAppSelector((state) => state.catalog.categories).filter((category) => category.featured);
  const mainIds = categories.map((category) => category.id);
  const popular = products.filter((product) => !mainIds.includes(product.category)).slice(0, 8);
  const shopHref = localePath(locale, "/shop");

  // A category added in the admin panel has no written subtitle, and the section is fine without one.
  const subtitleOf = (id: string) => {
    const key = `categorySections.${id}` as TranslationKey;
    return t(key) === key ? undefined : t(key);
  };

  return (
    <>
      <section className="pb-14 sm:pb-20">
        <Container>
          <SectionHeading title={t("featured.title")} subtitle={t("featured.subtitle")} action={<ViewAllLink href={shopHref} />} />
          <CatalogGate fallback={<Placeholder />}>
            <ProductGrid products={popular} />
          </CatalogGate>
        </Container>
      </section>

      {categories.map((category, index) => (
        <section
          key={category.id}
          className={index % 2 === 0 ? "bg-gradient-to-br from-brand-50 via-white to-white py-14 sm:py-20" : "py-14 sm:py-20"}
        >
          <Container>
            <SectionHeading
              title={category.name[locale]}
              subtitle={subtitleOf(category.id)}
              action={<ViewAllLink href={`${shopHref}?category=${category.id}`} />}
            />
            <ProductGrid products={products.filter((product) => product.category === category.id).slice(0, 4)} />
          </Container>
        </section>
      ))}
    </>
  );
}

export function OccasionRail() {
  const { locale, t } = useI18n();

  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading title={t("occasions.title")} subtitle={t("occasions.subtitle")} action={<ViewAllLink href={localePath(locale, "/occasions")} />} />
        <OccasionGrid compact />
      </Container>
    </section>
  );
}

export function OccasionGrid({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useI18n();
  const all = useAppSelector((state) => state.catalog.occasions);
  const products = useAppSelector((state) => state.catalog.products);
  const occasions = compact ? all.slice(0, 4) : all;

  return (
    <CatalogGate fallback={<Placeholder />}>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {occasions.map((occasion, index) => (
          <li key={occasion.id} className={!compact && index === 0 ? "col-span-2 lg:row-span-2" : undefined}>
            <Link
              href={`${localePath(locale, "/shop")}?occasion=${occasion.id}`}
              className="group relative flex aspect-[4/5] h-full w-full items-end overflow-hidden rounded-2xl bg-navy-900 sm:aspect-[3/4]"
            >
              <Image
                src={occasion.image}
                alt=""
                fill
                loading={!compact && index < 3 ? "eager" : undefined}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
              <span className="relative flex w-full items-end justify-between gap-2 p-4 sm:p-5">
                <span>
                  <span className="block text-lg font-bold text-white sm:text-xl">{occasion.name[locale]}</span>
                  <span className="text-xs font-medium text-brand-100 sm:text-sm">
                    {t("occasions.giftCount", { count: products.filter((product) => product.occasions.includes(occasion.id)).length })}
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-navy-900">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CatalogGate>
  );
}

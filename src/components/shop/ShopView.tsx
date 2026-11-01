"use client";

import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  categoryIds,
  isCategoryId,
  isOccasionId,
  occasionIds,
  products,
  type Product,
} from "@/data/catalog";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

const sorts = ["featured", "priceLow", "priceHigh", "rating"] as const;
type Sort = (typeof sorts)[number];

const sortLabels = {
  featured: "shop.sortFeatured",
  priceLow: "shop.sortPriceLow",
  priceHigh: "shop.sortPriceHigh",
  rating: "shop.sortRating",
} as const;

function sortProducts(list: Product[], sort: Sort): Product[] {
  const sorted = [...list];
  if (sort === "priceLow") sorted.sort((a, b) => a.priceUsd - b.priceUsd);
  if (sort === "priceHigh") sorted.sort((a, b) => b.priceUsd - a.priceUsd);
  if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  return sorted;
}

export function ShopView() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const occasionParam = searchParams.get("occasion");
  const sortParam = searchParams.get("sort");
  const category = isCategoryId(categoryParam) ? categoryParam : null;
  const occasion = isOccasionId(occasionParam) ? occasionParam : null;
  const sort: Sort = (sorts as readonly string[]).includes(sortParam ?? "") ? (sortParam as Sort) : "featured";

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  function updateParams(changes: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (occasion && !product.occasions.includes(occasion)) return false;
      if (!needle) return true;
      // Match in the current language and in English, so "cake" works on every locale.
      return [product.name[locale], product.name.en, product.description[locale]].some((text) =>
        text.toLowerCase().includes(needle),
      );
    });
    return sortProducts(filtered, sort);
  }, [category, occasion, sort, query, locale]);

  const hasFilters = Boolean(category || occasion || query);

  function clearFilters() {
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  const chipClass = (active: boolean) =>
    cn(
      "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      active ? "bg-navy-900 text-white shadow-sm" : "bg-white text-navy-900 ring-1 ring-line hover:ring-navy-200",
    );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:top-[72px] sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t("shop.searchLabel")}</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("shop.searchPlaceholder")}
              lang={locale}
              className="h-11 w-full rounded-full bg-surface pr-10 pl-11 text-sm ring-1 ring-line outline-none placeholder:text-muted focus:bg-white focus:ring-2 focus:ring-brand-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("shop.clearFilters")}
                className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-line"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </label>

          <div className="grid grid-cols-2 gap-3 lg:flex">
            <label className="relative">
              <span className="sr-only">{t("shop.occasion")}</span>
              <select
                value={occasion ?? ""}
                onChange={(event) => updateParams({ occasion: event.target.value || null })}
                className="h-11 w-full cursor-pointer appearance-none rounded-full bg-white pr-9 pl-4 text-sm font-semibold text-navy-900 ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400 lg:w-48"
              >
                <option value="">{t("shop.allOccasions")}</option>
                {occasionIds.map((id) => (
                  <option key={id} value={id}>
                    {t(`occasions.${id}` as const)}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
            </label>
            <label className="relative">
              <span className="sr-only">{t("shop.sortBy")}</span>
              <select
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value === "featured" ? null : event.target.value })}
                className="h-11 w-full cursor-pointer appearance-none rounded-full bg-white pr-9 pl-4 text-sm font-semibold text-navy-900 ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400 lg:w-52"
              >
                {sorts.map((value) => (
                  <option key={value} value={value}>
                    {t(sortLabels[value])}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
            </label>
          </div>
        </div>

        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0" role="group" aria-label={t("shop.category")}>
          <button type="button" className={chipClass(!category)} onClick={() => updateParams({ category: null })} aria-pressed={!category}>
            {t("shop.allCategories")}
          </button>
          {categoryIds.map((id) => (
            <button
              key={id}
              type="button"
              className={chipClass(category === id)}
              onClick={() => updateParams({ category: category === id ? null : id })}
              aria-pressed={category === id}
            >
              {t(`categories.${id}` as const)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted" aria-live="polite">
          {t("shop.results", { count: results.length })}
        </p>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="text-sm font-semibold text-brand-700 hover:text-brand-600">
            {t("shop.clearFilters")}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} priorityCount={4} />
      ) : (
        <div className="flex flex-col items-center rounded-3xl bg-surface px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-white ring-1 ring-line">
            <SearchX className="size-7 text-brand-500" aria-hidden />
          </span>
          <p className="mt-4 text-lg font-bold text-navy-900">{t("shop.noResultsTitle")}</p>
          <p className="mt-1 text-sm text-muted">{t("shop.noResultsText")}</p>
          <Button onClick={clearFilters} variant="outline" className="mt-5">
            {t("shop.clearFilters")}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ShopViewSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-32 rounded-2xl bg-surface" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="aspect-[3/4] rounded-2xl bg-surface" />
        ))}
      </div>
    </div>
  );
}

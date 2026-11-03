import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import {
  CategoryRail,
  HowItWorksSection,
  OccasionRail,
  Testimonials,
  WhatsAppCta,
  WhyChooseUs,
} from "@/components/home/HomeSections";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredCategoryIds, isFeaturedCategory, products } from "@/data/catalog";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/lib/page";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { locale, t } = await resolveLocale(params);
  // Popular gifts come from the other categories; the main ones get their own sections below.
  const featured = products.filter((product) => !isFeaturedCategory(product.category)).slice(0, 8);

  return (
    <>
      <Hero locale={locale} t={t} />
      <CategoryRail locale={locale} t={t} />

      <section className="pb-14 sm:pb-20">
        <Container>
          <SectionHeading
            title={t("featured.title")}
            subtitle={t("featured.subtitle")}
            action={
              <Link
                href={localePath(locale, "/shop")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
              >
                {t("common.viewAll")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <ProductGrid products={featured} />
        </Container>
      </section>

      {featuredCategoryIds.map((id, index) => (
        <section
          key={id}
          className={index % 2 === 0 ? "bg-gradient-to-br from-brand-50 via-white to-white py-14 sm:py-20" : "py-14 sm:py-20"}
        >
          <Container>
            <SectionHeading
              title={t(`categories.${id}` as const)}
              subtitle={t(`categorySections.${id}` as const)}
              action={
                <Link
                  href={`${localePath(locale, "/shop")}?category=${id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
                >
                  {t("common.viewAll")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              }
            />
            <ProductGrid products={products.filter((product) => product.category === id).slice(0, 4)} />
          </Container>
        </section>
      ))}

      <OccasionRail locale={locale} t={t} />
      <HowItWorksSection locale={locale} t={t} />
      <WhyChooseUs t={t} />
      <Testimonials t={t} />
      <WhatsAppCta t={t} />
    </>
  );
}

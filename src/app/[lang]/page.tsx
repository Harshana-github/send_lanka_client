import { Hero } from "@/components/home/Hero";
import { CategoryRail, HomeProducts, OccasionRail } from "@/components/home/CatalogSections";
import { HowItWorksSection, Testimonials, WhatsAppCta, WhyChooseUs } from "@/components/home/HomeSections";
import { resolveLocale } from "@/lib/page";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} t={t} />
      <CategoryRail />
      <HomeProducts />
      <OccasionRail />
      <HowItWorksSection locale={locale} t={t} />
      <WhyChooseUs t={t} />
      <Testimonials t={t} />
      <WhatsAppCta t={t} />
    </>
  );
}

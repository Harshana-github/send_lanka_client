import type { Metadata } from "next";
import { OccasionGrid, WhatsAppCta } from "@/components/home/HomeSections";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/occasions">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("occasions.pageTitle"), description: t("occasions.pageSubtitle") };
}

export default async function OccasionsPage({ params }: PageProps<"/[lang]/occasions">) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <PageHeader title={t("occasions.pageTitle")} subtitle={t("occasions.pageSubtitle")} />
      <Container className="py-10 sm:py-14">
        <OccasionGrid locale={locale} t={t} />
      </Container>
      <WhatsAppCta t={t} />
    </>
  );
}

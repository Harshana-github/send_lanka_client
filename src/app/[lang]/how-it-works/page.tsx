import type { Metadata } from "next";
import { FaqList } from "@/components/home/FaqList";
import { HowItWorksSteps, WhatsAppCta } from "@/components/home/HomeSections";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/how-it-works">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("how.pageTitle"), description: t("how.pageSubtitle") };
}

export default async function HowItWorksPage({ params }: PageProps<"/[lang]/how-it-works">) {
  const { t } = await resolveLocale(params);

  return (
    <>
      <PageHeader title={t("how.pageTitle")} subtitle={t("how.pageSubtitle")} />
      <Container className="py-12 sm:py-16">
        <HowItWorksSteps t={t} />
      </Container>

      <section id="faq" className="scroll-mt-24 bg-surface py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading title={t("how.faqTitle")} align="center" />
          <FaqList />
        </Container>
      </section>

      <div className="pt-14 sm:pt-20">
        <WhatsAppCta t={t} />
      </div>
    </>
  );
}

import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import { HowItWorksSteps, WhatsAppCta } from "@/components/home/HomeSections";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TranslationKey } from "@/i18n/translate";
import { resolveLocale } from "@/lib/page";

const faqs = [1, 2, 3, 4] as const;

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
          <div className="space-y-3">
            {faqs.map((number) => (
              <details
                key={number}
                className="group rounded-2xl bg-white ring-1 ring-line open:shadow-card"
                open={number === 1}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {t(`how.faq${number}Q` as TranslationKey)}
                  <ChevronDown
                    className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">
                  {t(`how.faq${number}A` as TranslationKey)}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-14 sm:pt-20">
        <WhatsAppCta t={t} />
      </div>
    </>
  );
}

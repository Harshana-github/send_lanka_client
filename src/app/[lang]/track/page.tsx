import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingBlock } from "@/components/checkout/CartView";
import { TrackOrder } from "@/components/checkout/TrackOrder";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/track">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("track.title"), description: t("track.subtitle") };
}

export default async function TrackPage({ params }: PageProps<"/[lang]/track">) {
  const { t } = await resolveLocale(params);

  return (
    <>
      <PageHeader title={t("track.title")} subtitle={t("track.subtitle")} />
      <Container className="py-10 sm:py-14">
        <Suspense fallback={<LoadingBlock />}>
          <TrackOrder />
        </Suspense>
      </Container>
    </>
  );
}

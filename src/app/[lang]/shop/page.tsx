import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogGate } from "@/components/CatalogGate";
import { ShopView, ShopViewSkeleton } from "@/components/shop/ShopView";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/shop">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("shop.title"), description: t("shop.subtitle") };
}

export default async function ShopPage({ params }: PageProps<"/[lang]/shop">) {
  const { t } = await resolveLocale(params);

  return (
    <>
      <PageHeader title={t("shop.title")} subtitle={t("shop.subtitle")} />
      <Container className="pt-4 pb-16 sm:pt-6">
        <Suspense fallback={<ShopViewSkeleton />}>
          <CatalogGate fallback={<ShopViewSkeleton />}>
            <ShopView />
          </CatalogGate>
        </Suspense>
      </Container>
    </>
  );
}

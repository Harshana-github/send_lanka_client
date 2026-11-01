import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingBlock } from "@/components/checkout/CartView";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/checkout/success">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("success.title"), robots: { index: false } };
}

export default function OrderSuccessPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Suspense fallback={<LoadingBlock />}>
        <OrderConfirmation />
      </Suspense>
    </Container>
  );
}

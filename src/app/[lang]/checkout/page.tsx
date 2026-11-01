import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/checkout">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("checkout.title"), robots: { index: false } };
}

export default async function CheckoutPage({ params }: PageProps<"/[lang]/checkout">) {
  const { t } = await resolveLocale(params);

  return (
    <div className="bg-surface/50">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t("checkout.title")}</h1>
        <p className="mt-2 mb-8 text-muted">{t("checkout.subtitle")}</p>
        <CheckoutForm />
      </Container>
    </div>
  );
}

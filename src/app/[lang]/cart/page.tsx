import type { Metadata } from "next";
import { CartView } from "@/components/checkout/CartView";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[lang]/cart">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("cart.title"), robots: { index: false } };
}

export default async function CartPage({ params }: PageProps<"/[lang]/cart">) {
  const { t } = await resolveLocale(params);

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t("cart.title")}</h1>
      <CartView />
    </Container>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { api } from "@/api";
import { CatalogGate } from "@/components/CatalogGate";
import { ProductView } from "@/components/product/ProductView";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/page";

// Search engines and link previews read these on the server, so they don't wait for the store.
export async function generateMetadata({ params }: PageProps<"/[lang]/product/[slug]">): Promise<Metadata> {
  const [{ locale }, { slug }] = await Promise.all([resolveLocale(params), params]);
  const product = await api.product(slug).catch(() => null);
  if (!product) return {};
  return {
    title: product.name[locale],
    description: product.description[locale],
    openGraph: { images: [{ url: product.image }] },
  };
}

// The shell stays URL-independent so navigating between products is instant; the details stream in.
export default function ProductPage({ params }: PageProps<"/[lang]/product/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/[lang]/product/[slug]">, "params">) {
  const { slug } = await params;

  return (
    <CatalogGate fallback={<ProductSkeleton />}>
      <ProductView slug={slug} />
    </CatalogGate>
  );
}

function ProductSkeleton() {
  return (
    <Container className="pt-5 pb-16 sm:pt-8" aria-hidden>
      <div className="mb-5 h-4 w-48 animate-pulse rounded-full bg-surface" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square animate-pulse rounded-3xl bg-surface" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded-full bg-surface" />
          <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-surface" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-surface" />
          <div className="h-20 animate-pulse rounded-2xl bg-surface" />
          <div className="h-72 animate-pulse rounded-3xl bg-surface" />
        </div>
      </div>
    </Container>
  );
}

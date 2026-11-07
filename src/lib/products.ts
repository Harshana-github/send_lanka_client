import type { Product } from "@/types";

export function relatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((item) => item.slug !== product.slug && item.category === product.category);
  const sharedOccasion = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category !== product.category &&
      item.occasions.some((occasion) => product.occasions.includes(occasion)),
  );
  return [...sameCategory, ...sharedOccasion].slice(0, limit);
}

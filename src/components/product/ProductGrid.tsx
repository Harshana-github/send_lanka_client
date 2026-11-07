import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.slug} className="flex">
          <div className="w-full">
            <ProductCard product={product} priority={index < priorityCount} />
          </div>
        </li>
      ))}
    </ul>
  );
}

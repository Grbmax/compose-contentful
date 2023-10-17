"use client";
import { Product } from "@/lib/contentful/products";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

interface ProductListRendererProps {
  products: Product[];
}

const ProductListRenderer: React.FC<ProductListRendererProps> = ({
  products,
}) => {
  const updatedProducts = useContentfulLiveUpdates<Product[]>(products);
  return (
    <main className="px-4 py-8 flex space-y-4 flex-col">
      <h1 className="text-2xl">Products</h1>
      <ul>
        {updatedProducts.map((product) => (
          <li key={product.slug}>
            <Link
              className="border rounded-xl bg-secondary p-2"
              href={`/products/${product.slug}`}
            >
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ProductListRenderer;

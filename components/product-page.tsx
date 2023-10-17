"use client";
import RichText from "@/lib/contentful/RichText";
import { Product } from "@/lib/contentful/products";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

interface ProductPageRendererProps {
  product: Product;
}

const ProductPageRenderer: React.FC<ProductPageRendererProps> = ({
  product,
}) => {
  const updatedProducts = useContentfulLiveUpdates<Product>(product);
  return (
    <div className="px-4 py-8 space-y-6">
      <Link className="border rounded-xl bg-secondary p-2" href="/">
        ← Products
      </Link>
      <div>
        {updatedProducts.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={updatedProducts.image.src}
            //Use contentful Images API to render responsive images
            srcSet={`${updatedProducts.image.src}?w=300 1x, ${updatedProducts.image.src} 2x`}
            width={300}
            height={300}
            alt={updatedProducts.image.alt}
          />
        ) : null}
        <h1>{updatedProducts.title}</h1>
        <RichText document={updatedProducts.description} />
      </div>
    </div>
  );
};

export default ProductPageRenderer;

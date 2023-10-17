import RichText from "@/lib/contentful/RichText";
import { fetchProducts, fetchProduct } from "@/lib/contentful/products";
import { ResolvingMetadata, Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

interface ProductPageParams {
  slug: string;
}

interface ProductPageProps {
  params: ProductPageParams;
}

//Generate static params for all products at build
export async function generateStaticParams(): Promise<ProductPageParams[]> {
  const products = await fetchProducts({ preview: false });
  return products.map((product) => ({ slug: product.slug }));
}

//Generate metadata for each product
export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const products = await fetchProduct({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!products) {
    return notFound();
  }

  return {
    title: products.title,
  };
}

//Product Component
async function ProductPage({ params }: ProductPageProps) {
  // Fetch a single product by slug, use preview mode if enabled
  const product = await fetchProduct({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  const updatedProduct = useContentfulLiveUpdates(product);

  if (!product || !updatedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="px-4 py-8 space-y-6">
      <Link className="border rounded-xl bg-secondary p-2" href="/">
        ← Products
      </Link>
      <div>
        {updatedProduct.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={updatedProduct.image.src}
            //Use contentful Images API to render responsive images
            srcSet={`${updatedProduct.image.src}?w=300 1x, ${product.image.src} 2x`}
            width={300}
            height={300}
            alt={updatedProduct.image.alt}
          />
        ) : null}
        <h1>{updatedProduct.title}</h1>
        <RichText document={updatedProduct.description} />
      </div>
    </div>
  );
}

export default ProductPage;

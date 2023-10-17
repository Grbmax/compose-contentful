import RichText from "@/lib/contentful/RichText";
import { fetchProducts, fetchProduct } from "@/lib/contentful/products";
import { ResolvingMetadata, Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import ProductPageRenderer from "@/components/product-page";

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

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPageRenderer product={product} />;
}

export default ProductPage;

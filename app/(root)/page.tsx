import { draftMode } from "next/headers";
import { fetchProducts } from "@/lib/contentful/products";
import Link from "next/link";
import ProductListRenderer from "@/components/product-list";

async function Home() {
  const products = await fetchProducts({ preview: draftMode().isEnabled });

  return <ProductListRenderer products={products} />;
}

export default Home;

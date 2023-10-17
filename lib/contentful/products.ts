import { TypeProductsSkeleton } from "@/app/types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentImage, parseContentfulContentImage } from "./contentImage";
import contentfulClient from "./client";

type ProductEntry = Entry<TypeProductsSkeleton, undefined, string>;

export interface Product {
  title: string;
  slug: string;
  name: string;
  description: RichTextDocument | null;
  image: ContentImage | null;
}

export function parseContentfulProduct(
  productEntry?: ProductEntry
): Product | null {
  if (!productEntry) return null;

  return {
    title: productEntry.fields.title || "",
    slug: productEntry.fields.slug,
    image: parseContentfulContentImage(productEntry.fields.image),
    description: productEntry.fields.description || null,
    name: productEntry.fields.name,
  };
}

// Function to fetch all products
interface FetchProductsOptions {
  preview: boolean;
}
export async function fetchProducts({
  preview,
}: FetchProductsOptions): Promise<Product[]> {
  const contentful = contentfulClient({ preview });

  const productsResult = await contentful.getEntries<TypeProductsSkeleton>({
    content_type: "products",
    include: 10,
    order: ["fields.title"],
  });

  return productsResult.items.map(
    (product) => parseContentfulProduct(product) as Product
  );
}

// Function to fetch a single product
interface FetchProductOptions {
  preview: boolean;
  slug: string;
}
export async function fetchProduct({
  preview,
  slug,
}: FetchProductOptions): Promise<Product | null> {
  const contentful = contentfulClient({ preview });

  const productResult = await contentful.getEntries<TypeProductsSkeleton>({
    content_type: "products",
    "fields.slug": slug,
    include: 10,
  });

  return parseContentfulProduct(productResult.items[0]);
}

import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProductsFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    name: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
}

export type TypeProductsSkeleton = EntrySkeletonType<TypeProductsFields, "products">;
export type TypeProducts<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProductsSkeleton, Modifiers, Locales>;

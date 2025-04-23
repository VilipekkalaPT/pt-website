import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageSkeleton } from "./TypePackage";

export interface TypePricingPageDataFields {
  bannerText: EntryFields.Symbol;
  packages: Entry<TypePackageSkeleton>[];
}

export interface TypePricingPageDataSkeleton extends EntrySkeletonType {
  fields: TypePricingPageDataFields;
  contentTypeId: "bannerContent";
}

export type TypePricingPageData = Entry<TypePricingPageDataSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackage } from "./TypePackage";

export interface TypePricingPageDataFields {
  bannerText: EntryFields.Symbol;
  packages: TypePackage[];
}

export interface TypePricingPageDataSkeleton extends EntrySkeletonType {
  fields: TypePricingPageDataFields;
  contentTypeId: "bannerContent";
}

export type TypePricingPageData = Entry<TypePricingPageDataSkeleton>;

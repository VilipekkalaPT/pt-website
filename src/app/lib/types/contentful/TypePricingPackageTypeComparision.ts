import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypePricingPackageTypeComparisionFields {
  features: EntryFields.Symbol;
  availableFor?: ("combo" | "diet" | "gym" | "plan")[];
  gymBestFor?: EntryFields.Symbol;
  dietBestFor?: EntryFields.Symbol;
  planBestFor?: EntryFields.Symbol;
  comboBestFor?: EntryFields.Symbol;
  extraText?: EntryFields.Symbol;
}

export interface TypePricingPackageTypeComparisionSkeleton
  extends EntrySkeletonType {
  fields: TypePricingPackageTypeComparisionFields;
  contentTypeId: "pricingPackageTypeComparision";
}

export type TypePricingPackageTypeComparision =
  Entry<TypePricingPackageTypeComparisionSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeImageCardSkeleton } from "./TypeImageCard";
import { TypePricingPackageTypeComparisionSkeleton } from "./TypePricingPackageTypeComparision";
import { TypePricingDifferentServicesComparisonSkeleton } from "./TypePricingDifferentServicesComparison";

export interface TypePricingPageDataFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Symbol;
  headingImage: Asset;
  packageCards: Entry<TypeImageCardSkeleton>[];
  offerText: EntryFields.Symbol[];
  compareDecideTitle: EntryFields.Symbol;
  steps: ("Focus areas" | "Service types")[];
  packageTypeComparisonRows: Entry<TypePricingPackageTypeComparisionSkeleton>[];
  differentServicesComparisonRows: Entry<TypePricingDifferentServicesComparisonSkeleton>[];
  actionButtonText1: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
}

export interface TypePricingPageDataSkeleton extends EntrySkeletonType {
  fields: TypePricingPageDataFields;
  contentTypeId: "pricingPageData";
}

export type TypePricingPageData = Entry<TypePricingPageDataSkeleton>;

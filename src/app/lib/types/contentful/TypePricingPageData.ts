import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeImageCardSkeleton } from "./TypeImageCard";
import { TypePricingPackageTypeComparisionSkeleton } from "./TypePricingPackageTypeComparision";
import { TypePricingDifferentServicesComparisonSkeleton } from "./TypePricingDifferentServicesComparison";

export interface TypePricingPageDataFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Symbol;
  headingImage: Asset;
  heading1: EntryFields.Symbol;
  heading2: EntryFields.Symbol;
  subheading: EntryFields.Symbol;
  headingContent: EntryFields.RichText;
  packagesTitle: EntryFields.Symbol;
  packagesSubtitle: EntryFields.Symbol;
  packageImageCards: Entry<TypeImageCardSkeleton>[];
  packageTypeComparisonTitle: EntryFields.Symbol;
  packageTypeComparisonRows: Entry<TypePricingPackageTypeComparisionSkeleton>[];
  offerText: EntryFields.Symbol[];
  differentServicesComparisonTitle: EntryFields.Symbol;
  differenceServicesComparisonSubtitle: EntryFields.Symbol;
  differentServicesComparisonRows: Entry<TypePricingDifferentServicesComparisonSkeleton>[];
  infoSectionTitle: EntryFields.Symbol;
  infoSectionSubtitle: EntryFields.Symbol;
  infoImageCards?: Entry<TypeImageCardSkeleton>[];
}

export interface TypePricingPageDataSkeleton extends EntrySkeletonType {
  fields: TypePricingPageDataFields;
  contentTypeId: "pricingPageData";
}

export type TypePricingPageData = Entry<TypePricingPageDataSkeleton>;

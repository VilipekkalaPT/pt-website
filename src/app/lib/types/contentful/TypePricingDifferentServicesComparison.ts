import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypePricingDifferentServicesComparisonFields {
  criteria: EntryFields.Symbol;
  slayFitVili: EntryFields.Symbol;
  typicalGymPt: EntryFields.Symbol;
  fitnessApp: EntryFields.Symbol;
}

export interface TypePricingDifferentServicesComparisonSkeleton
  extends EntrySkeletonType {
  fields: TypePricingDifferentServicesComparisonFields;
  contentTypeId: "pricingDifferentServicesComparison";
}

export type TypePricingDifferentServicesComparison =
  Entry<TypePricingDifferentServicesComparisonSkeleton>;

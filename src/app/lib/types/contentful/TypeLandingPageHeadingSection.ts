import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeLandingPageHeadingSectionFields {
  heading: EntryFields.Symbol;
  subheading: EntryFields.Text;
}

export interface TypeLandingPageHeadingSectionSkeleton
  extends EntrySkeletonType {
  fields: TypeLandingPageHeadingSectionFields;
  contentTypeId: "landingPageHeadingSection";
}

export type TypeLandingPageHeadingSection =
  Entry<TypeLandingPageHeadingSectionSkeleton>;

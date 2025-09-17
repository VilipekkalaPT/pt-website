import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeLandingPagePainPointsFields {
  image: Asset;
  overlayText: EntryFields.RichText;
  backText: EntryFields.Text;
}

export interface TypeLandingPagePainPointsSkeleton extends EntrySkeletonType {
  fields: TypeLandingPagePainPointsFields;
  contentTypeId: "landingPagePainPoints";
}

export type TypeLandingPagePainPoints =
  Entry<TypeLandingPagePainPointsSkeleton>;

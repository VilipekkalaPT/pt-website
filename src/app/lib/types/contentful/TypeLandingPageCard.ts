import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeLandingPageCardFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  actionButtonText: EntryFields.Symbol;
  image: Asset;
}

export interface TypeLandingPageCardSkeleton extends EntrySkeletonType {
  fields: TypeLandingPageCardFields;
  contentTypeId: "landingPageCard";
}

export type TypeLandingPageCard = Entry<TypeLandingPageCardSkeleton>;

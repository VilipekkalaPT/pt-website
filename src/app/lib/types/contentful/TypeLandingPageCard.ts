import type {
  Asset,
  AssetFields,
  Entry,
  EntryFields,
  EntrySkeletonType,
} from "contentful";

export interface TypeLandingPageCardFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  actionButtonText: EntryFields.Symbol;
  image: Asset;
  slug?: EntryFields.Symbol;
}

export interface TypeLandingPageCardSkeleton extends EntrySkeletonType {
  fields: TypeLandingPageCardFields;
  contentTypeId: "landingPageCard";
}

export type TypeLandingPageCard = Entry<TypeLandingPageCardSkeleton>;

export interface TypeLandingPageCardFieldsWithImage {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  actionButtonText: EntryFields.Symbol;
  image: AssetFields;
  slug?: EntryFields.Symbol;
}

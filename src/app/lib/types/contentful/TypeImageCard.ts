import type {
  Asset,
  AssetFields,
  Entry,
  EntryFields,
  EntrySkeletonType,
} from "contentful";

export interface TypeImageCardFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  image: Asset;
  actionButtonText: EntryFields.Symbol;
  url?: EntryFields.Symbol;
}

export interface TypeImageCardSkeleton extends EntrySkeletonType {
  fields: TypeImageCardFields;
  contentTypeId: "imageCard";
}

export type TypeImageCard = Entry<TypeImageCardSkeleton>;

export interface TypeImageCardFieldsWithImage {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  actionButtonText: EntryFields.Symbol;
  image: AssetFields;
  url?: EntryFields.Symbol;
}

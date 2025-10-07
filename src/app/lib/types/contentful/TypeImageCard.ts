import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeImageCardFields {
  title: EntryFields.Symbol;
  subtitle?: EntryFields.Symbol;
  image?: Asset;
  actionButtonText: EntryFields.Symbol;
  url?: EntryFields.Symbol;
}

export interface TypeImageCardSkeleton extends EntrySkeletonType {
  fields: TypeImageCardFields;
  contentTypeId: "imageCard";
}

export type TypeImageCard = Entry<TypeImageCardSkeleton>;

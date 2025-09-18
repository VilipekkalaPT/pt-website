import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeImageCardFields {
  title: EntryFields.Symbol;
  actionButtonText: EntryFields.Symbol;
  url?: EntryFields.Symbol;
}

export interface TypeImageCardSkeleton extends EntrySkeletonType {
  fields: TypeImageCardFields;
  contentTypeId: "imageCard";
}

export type TypeImageCard = Entry<TypeImageCardSkeleton>;

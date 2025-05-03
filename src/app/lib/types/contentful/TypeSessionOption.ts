import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeSessionOptionFields {
  title: EntryFields.Symbol;
  numberOfSessions: 1 | 10 | 15;
  price: EntryFields.Integer;
}

export interface TypeSessionOptionSkeleton extends EntrySkeletonType {
  fields: TypeSessionOptionFields;
  contentTypeId: "review";
}

export type TypeSessionOption = Entry<TypeSessionOptionSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeSessionOptionFields {
  title: EntryFields.Symbol;
  numberOfSessions: 1 | 10 | 15;
  price: EntryFields.Integer;
  priceUnit: "package" | "plan" | "session";
}

export interface TypeSessionOptionSkeleton extends EntrySkeletonType {
  fields: TypeSessionOptionFields;
  contentTypeId: "sessionOption";
}

export type TypeSessionOption = Entry<TypeSessionOptionSkeleton>;

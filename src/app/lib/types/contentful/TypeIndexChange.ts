import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeIndexChangeFields {
  id: EntryFields.Integer;
  name: EntryFields.Symbol;
  change: EntryFields.Symbol;
}

export interface TypeIndexChangeSkeleton extends EntrySkeletonType {
  fields: TypeIndexChangeFields;
  contentTypeId: "indexChange";
}

export type TypeIndexChange = Entry<TypeIndexChangeSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeFooterColumnLinkFields {
  id: EntryFields.Integer;
  label: EntryFields.Symbol;
  url?: EntryFields.Symbol;
  description?: EntryFields.Symbol;
}

export interface TypeFooterColumnLinkFields extends EntrySkeletonType {
  fields: TypeFooterColumnLinkFields;
  contentTypeId: "navigation";
}

export type TypeFooterColumnLink = Entry<TypeFooterColumnLinkFields>;

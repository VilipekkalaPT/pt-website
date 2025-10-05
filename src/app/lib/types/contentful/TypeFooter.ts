import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeFooterFields {
  label: EntryFields.Symbol;
  description?: EntryFields.Symbol;
  url?: EntryFields.Symbol;
  column: "contact" | "explore" | "condtion & policy";
  show: EntryFields.Boolean;
}

export interface TypeFooterSkeleton extends EntrySkeletonType {
  fields: TypeFooterFields;
  contentTypeId: "footer";
}

export type TypeFooter = Entry<TypeFooterSkeleton>;

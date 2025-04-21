import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeFooterColumnFields {
  id: EntryFields.Integer;
  columnTitle: EntryFields.Symbol;
  items: Entry<{ fields: { [key: string]: unknown }; contentTypeId: string }>[];
  order: EntryFields.Integer;
}

export interface TypeFooterColumnSkeleton extends EntrySkeletonType {
  fields: TypeFooterColumnFields;
  contentTypeId: "bannerContent";
}

export type TypeFooterColumn = Entry<TypeFooterColumnSkeleton>;

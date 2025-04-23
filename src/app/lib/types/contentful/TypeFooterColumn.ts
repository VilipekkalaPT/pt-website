import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeFooterColumnLinkSkeleton } from "./TypeFooterColumnLink";

export interface TypeFooterColumnFields {
  id: EntryFields.Integer;
  columnTitle: EntryFields.Symbol;
  items: Entry<TypeFooterColumnLinkSkeleton>[];
  order: EntryFields.Integer;
}

export interface TypeFooterColumnSkeleton extends EntrySkeletonType {
  fields: TypeFooterColumnFields;
  contentTypeId: "bannerContent";
}

export type TypeFooterColumn = Entry<TypeFooterColumnSkeleton>;

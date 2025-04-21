import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeKickOffProcessFields {
  id: EntryFields.Integer;
  title: EntryFields.Symbol;
  description: EntryFields.Symbol;
  order: EntryFields.Integer;
}

export interface TypeKickOffProcessSkeleton extends EntrySkeletonType {
  fields: TypeKickOffProcessFields;
  contentTypeId: "bannerContent";
}

export type TypeKickOffProcess = Entry<TypeKickOffProcessSkeleton>;

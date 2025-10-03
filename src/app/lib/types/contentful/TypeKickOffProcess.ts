import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeKickOffProcessFields {
  id: EntryFields.Integer;
  title: EntryFields.Symbol;
  description: EntryFields.Symbol;
}

export interface TypeKickOffProcessSkeleton extends EntrySkeletonType {
  fields: TypeKickOffProcessFields;
  contentTypeId: "kickOffProcess";
}

export type TypeKickOffProcess = Entry<TypeKickOffProcessSkeleton>;

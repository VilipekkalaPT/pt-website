import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeNavigationFields {
  id: EntryFields.Symbol;
  label: EntryFields.Symbol;
  url: EntryFields.Symbol;
  order: EntryFields.Integer;
  children?: Entry<TypeNavigationSkeleton>[];
  isChild: EntryFields.Boolean;
  isButton?: EntryFields.Boolean;
}

export interface TypeNavigationSkeleton extends EntrySkeletonType {
  fields: TypeNavigationFields;
  contentTypeId: "navigation";
}

export type TypeNavigation = Entry<TypeNavigationSkeleton>;

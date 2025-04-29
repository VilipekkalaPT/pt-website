import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypePackageAccordionFields {
  title: EntryFields.Symbol;
  description: EntryFields.RichText;
}

export interface TypePackageAccordionSkeleton extends EntrySkeletonType {
  fields: TypePackageAccordionFields;
  contentTypeId: "packageAccordion";
}

export type TypePackageAccordion = Entry<TypePackageAccordionSkeleton>;

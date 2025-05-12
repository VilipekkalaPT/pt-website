import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeContactFormFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Symbol;
}

export interface TypeContactFormSkeleton extends EntrySkeletonType {
  fields: TypeContactFormFields;
  contentTypeId: "bannerContent";
}

export type TypeContactForm = Entry<TypeContactFormSkeleton>;

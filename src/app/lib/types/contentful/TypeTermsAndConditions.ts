import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeTermsAndConditionsFields {
  title: EntryFields.Symbol;
  content: EntryFields.RichText;
}

export interface TypeTermsAndConditionsSkeleton extends EntrySkeletonType {
  fields: TypeTermsAndConditionsFields;
  contentTypeId: "TypeTermsAndConditionsFields";
}

export type TypeTermsAndConditions = Entry<TypeTermsAndConditionsSkeleton>;

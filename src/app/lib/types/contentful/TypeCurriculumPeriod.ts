import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeCurriculumPeriodFields {
  title: EntryFields.Symbol;
  description: EntryFields.RichText;
}

export interface TypeCurriculumPeriodSkeleton extends EntrySkeletonType {
  fields: TypeCurriculumPeriodFields;
  contentTypeId: "curriculumPeriod";
}

export type TypeCurriculumPeriod = Entry<TypeCurriculumPeriodSkeleton>;

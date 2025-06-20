import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeCurriculumPeriodSkeleton } from "./TypeCurriculumPeriod";

export interface TypeCurriculumFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  disclaimer: EntryFields.Symbol;
  curriculumPeriods: Entry<TypeCurriculumPeriodSkeleton>[];
}

export interface TypeCurriculumSkeleton extends EntrySkeletonType {
  fields: TypeCurriculumFields;
  contentTypeId: "curriculum";
}

export type TypeCurriculum = Entry<TypeCurriculumPeriodSkeleton>;

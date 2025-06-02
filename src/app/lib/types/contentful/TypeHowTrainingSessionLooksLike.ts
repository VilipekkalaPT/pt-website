import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHowTrainingSessionLooksLikeFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  content: EntryFields.RichText;
}

export interface TypeHowTrainingSessionLooksLikeSkeleton
  extends EntrySkeletonType {
  fields: TypeHowTrainingSessionLooksLikeFields;
  contentTypeId: "howTrainingSessionLooksLike";
}

export type TypeHowTrainingSessionLooksLike =
  Entry<TypeHowTrainingSessionLooksLikeSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHowTrainingSessionLooksLikeFields {
  image: Asset;
  title: EntryFields.Symbol;
  description: EntryFields.Symbol;
}

export interface TypeHowTrainingSessionLooksLikeSkeleton
  extends EntrySkeletonType {
  fields: TypeHowTrainingSessionLooksLikeFields;
  contentTypeId: "howTrainingSessionLooksLike";
}

export type TypeHowTrainingSessionLooksLike =
  Entry<TypeHowTrainingSessionLooksLikeSkeleton>;

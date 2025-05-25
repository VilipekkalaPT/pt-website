import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeReviewFields {
  id: EntryFields.Integer;
  title: EntryFields.Symbol;
  reviewer: EntryFields.Symbol;
  content: EntryFields.RichText;
  package: (
    | "bronze-skin-iron-mind"
    | "come-train-with-me"
    | "duo-training-plan"
    | "eat-better-live-better"
    | "go-the-distance"
    | "golden-body-golden-mind"
    | "move-better-live-better"
    | "silver-evoluation-silver-impact"
    | "together-total-slay"
    | "train-together-slay-together"
  )[];
  changes?: EntryFields.Symbol[];
  rating: EntryFields.Number;
  showOnLandingPage: EntryFields.Boolean;
}

export interface TypeReviewSkeleton extends EntrySkeletonType {
  fields: TypeReviewFields;
  contentTypeId: "review";
}

export type TypeReview = Entry<TypeReviewSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeReviewFields {
  id: EntryFields.Integer;
  title: EntryFields.Symbol;
  images?: Asset[];
  reviewer: EntryFields.Symbol;
  content: EntryFields.RichText;
  package: (
    | "Bronze skin iron mind"
    | "Come train with Vili"
    | "Duo training plan"
    | "Eat better live better"
    | "Go the distance"
    | "Golden body golden mind"
    | "Move better live better"
    | "Silver evoluation silver impact"
    | "Together total slay"
    | "Train together slay together"
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

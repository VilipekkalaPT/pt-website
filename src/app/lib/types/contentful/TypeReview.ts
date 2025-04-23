import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeIndexChangeSkeleton } from "./TypeIndexChange";

export interface TypeReviewFields {
  id: EntryFields.Integer;
  title: EntryFields.Symbol;
  reviewer: EntryFields.Symbol;
  body: EntryFields.Text;
  reviewDate: EntryFields.Date;
  package: EntryFields.Symbol;
  duration: EntryFields.Symbol;
  indexChanges: Entry<TypeIndexChangeSkeleton>[];
  showOnLandingPage: EntryFields.Boolean;
}

export interface TypeReviewSkeleton extends EntrySkeletonType {
  fields: TypeReviewFields;
  contentTypeId: "review";
}

export type TypeReview = Entry<TypeReviewSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeReviewSkeleton } from "./TypeReview";

export interface TypeReviewsPageDataFields {
  heading: EntryFields.Symbol;
  subheading: EntryFields.Symbol;
  image: Asset;
  reviewSectionTitle: EntryFields.Symbol;
  reviewSectionSubtitle: EntryFields.Symbol;
  allReviews: Entry<TypeReviewSkeleton>[];
  infoSectionTitle: EntryFields.Symbol;
  infoSectionSubtitle: EntryFields.Symbol;
  infoButtonText1: EntryFields.Symbol;
  infoButtonText2: EntryFields.Symbol;
  infoButton1Url: EntryFields.Symbol;
  infoButton2Url: EntryFields.Symbol;
}

export interface TypeReviewsPageDataSkeleton extends EntrySkeletonType {
  fields: TypeReviewsPageDataFields;
  contentTypeId: "reviewsPageData";
}

export type TypeReviewsPageData = Entry<TypeReviewsPageDataSkeleton>;

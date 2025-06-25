import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeReviewSkeleton } from "./TypeReview";
import { TypeImageCardSkeleton } from "./TypeImageCard";

export interface TypeReviewsPageDataFields {
  heading: EntryFields.Symbol;
  subheading: EntryFields.Symbol;
  image: Asset;
  reviewSectionTitle: EntryFields.Symbol;
  reviewSectionSubtitle: EntryFields.Symbol;
  allReviews: Entry<TypeReviewSkeleton>[];
  infoSectionTitle: EntryFields.Symbol;
  infoSectionSubtitle: EntryFields.Symbol;
  infoImageCards: Entry<TypeImageCardSkeleton>[];
}

export interface TypeReviewsPageDataSkeleton extends EntrySkeletonType {
  fields: TypeReviewsPageDataFields;
  contentTypeId: "reviewsPageData";
}

export type TypeReviewsPageData = Entry<TypeReviewsPageDataSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeLandingPageHeadingSectionSkeleton } from "./TypeLandingPageHeadingSection";
import { TypeLandingPageServicesSkeleton } from "./TypeLandingPageServices";
import { TypeLandingPageCardSkeleton } from "./TypeLandingPageCard";

export interface TypeLandingPageDataFields {
  banner: Asset;
  headingSections: Entry<TypeLandingPageHeadingSectionSkeleton>[];
  actionButtonText1: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
  serviceTitle: EntryFields.Symbol;
  serviceSubtitle: EntryFields.Symbol;
  services: Entry<TypeLandingPageServicesSkeleton>[];
  goalTitle: EntryFields.Symbol;
  goals: EntryFields.Symbol[];
  imageCards: Entry<TypeLandingPageCardSkeleton>[];
  faqTitle: EntryFields.Symbol;
  faqSubtitle: EntryFields.Symbol;
  faqContent: EntryFields.RichText;
  faqButtonText: EntryFields.Symbol;
  faqImage: Asset;
}

export interface TypeLandingPageDataSkeleton extends EntrySkeletonType {
  fields: TypeLandingPageDataFields;
  contentTypeId: "landingPageData";
}

export type TypeLandingPageData = Entry<TypeLandingPageDataSkeleton>;

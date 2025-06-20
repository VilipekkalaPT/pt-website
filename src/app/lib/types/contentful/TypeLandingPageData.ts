import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeLandingPageHeadingSectionSkeleton } from "./TypeLandingPageHeadingSection";
import { TypeLandingPageServicesSkeleton } from "./TypeLandingPageServices";
import { TypeLandingPagePainPointsSkeleton } from "./TypeLandingPagePainPoints";
import { TypeImageCardSkeleton } from "./TypeImageCard";

export interface TypeLandingPageDataFields {
  banner: Asset;
  headingSections: Entry<TypeLandingPageHeadingSectionSkeleton>[];
  painPointsSectionTitle: EntryFields.Symbol;
  painPointsSectionSubtitle: EntryFields.Symbol;
  painPoints: Entry<TypeLandingPagePainPointsSkeleton>[];
  actionButtonText1: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
  serviceTitle: EntryFields.Symbol;
  serviceSubtitle: EntryFields.Symbol;
  services: Entry<TypeLandingPageServicesSkeleton>[];
  goalTitle: EntryFields.Symbol;
  goals: EntryFields.Symbol[];
  imageCards: Entry<TypeImageCardSkeleton>[];
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

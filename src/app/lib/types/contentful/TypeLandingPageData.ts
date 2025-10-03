import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeLandingPagePainPointsSkeleton } from "./TypeLandingPagePainPoints";
import { TypeImageCardSkeleton } from "./TypeImageCard";

export interface TypeLandingPageDataFields {
  banner: Asset;
  heading1: EntryFields.Symbol;
  subheading1: EntryFields.Symbol;
  heading2: EntryFields.Symbol;
  subheading2: EntryFields.Symbol;
  heading3: EntryFields.Symbol;
  subheading3: EntryFields.Symbol;
  painPointsSectionTitle: EntryFields.Symbol;
  painPointsSectionSubtitle: EntryFields.Symbol;
  painPoints: Entry<TypeLandingPagePainPointsSkeleton>[];
  actionButtonText1: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
  serviceTitle: EntryFields.Symbol;
  serviceSubtitle: EntryFields.Symbol;
  services: EntryFields.Symbol[];
  imageCards: Entry<TypeImageCardSkeleton>[];
  faqTitle: EntryFields.Symbol;
  faqContent: EntryFields.RichText;
  faqButtonText: EntryFields.Symbol;
  faqImage: Asset;
}

export interface TypeLandingPageDataSkeleton extends EntrySkeletonType {
  fields: TypeLandingPageDataFields;
  contentTypeId: "landingPageData";
}

export type TypeLandingPageData = Entry<TypeLandingPageDataSkeleton>;

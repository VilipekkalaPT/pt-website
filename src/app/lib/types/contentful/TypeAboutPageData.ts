import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeTimelinePeriodSkeleton } from "./TypeTimelinePeriod";

export interface TypeAboutPageDataFields {
  name: EntryFields.Symbol;
  shortDescription: EntryFields.Symbol;
  headingSectionImage: Asset;
  vision: EntryFields.Symbol;
  philosophyTitle: EntryFields.Symbol;
  philosophySubtitle: EntryFields.Symbol;
  philosophyContent: EntryFields.RichText;
  philosophyImage: Asset;
  journeyTitle: EntryFields.Symbol;
  journeySubtitle?: EntryFields.Symbol;
  journeyTimelinePeriods: Entry<TypeTimelinePeriodSkeleton>[];
  infoSectionTitle: EntryFields.Symbol;
  infoSectionSubtitle: EntryFields.Symbol;
  infoButtonText1: EntryFields.Symbol;
  infoButtonText2: EntryFields.Symbol;
}

export interface TypeAboutPageDataSkeleton extends EntrySkeletonType {
  fields: TypeAboutPageDataFields;
  contentTypeId: "aboutPageData";
}

export type TypeAboutPageData = Entry<TypeAboutPageDataSkeleton>;

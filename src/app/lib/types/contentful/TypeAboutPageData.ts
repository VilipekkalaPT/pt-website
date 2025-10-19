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
  slogans: EntryFields.Symbol[];
  journeyTitle: EntryFields.Symbol;
  journeySubtitle?: EntryFields.Symbol;
  journeyTimelinePeriods: Entry<TypeTimelinePeriodSkeleton>[];
}

export interface TypeAboutPageDataSkeleton extends EntrySkeletonType {
  fields: TypeAboutPageDataFields;
  contentTypeId: "aboutPageData";
}

export type TypeAboutPageData = Entry<TypeAboutPageDataSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeAboutPageDataFields {
  name: EntryFields.Symbol;
  shortDescription: EntryFields.Symbol;
  image: Asset;
  vision: EntryFields.Symbol;
  philosophyTitle: EntryFields.Symbol;
  philosophySubtitle: EntryFields.Symbol;
  philosophyContent: EntryFields.RichText;
  slogans: EntryFields.Symbol[];
  journeyTitle: EntryFields.Symbol;
  journeySubtitle?: EntryFields.Symbol;
  journeyImages: Asset[];
}

export interface TypeAboutPageDataSkeleton extends EntrySkeletonType {
  fields: TypeAboutPageDataFields;
  contentTypeId: "aboutPageData";
}

export type TypeAboutPageData = Entry<TypeAboutPageDataSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeAboutPageDataFields {
  name: EntryFields.Symbol;
  shortDescription: EntryFields.Symbol;
  vision: EntryFields.Symbol;
  philosophyTitle: EntryFields.Symbol;
  philosophySubtitle: EntryFields.Symbol;
  philosophyContent: EntryFields.RichText;
  slogans: EntryFields.Symbol[];
  journeyTitle: EntryFields.Symbol;
  journeySubtitle?: EntryFields.Symbol;
  awardsAndAchievementsTitle: EntryFields.Symbol;
  awardsAndAchievementsSubtitle?: EntryFields.Symbol;
}

export interface TypeAboutPageDataSkeleton extends EntrySkeletonType {
  fields: TypeAboutPageDataFields;
  contentTypeId: "aboutPageData";
}

export type TypeAboutPageData = Entry<TypeAboutPageDataSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeFaqSkeleton } from "./TypeFaq";

export interface TypeFaQsPageDataFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  image: Asset;
  questions: Entry<TypeFaqSkeleton>[];
  infoSectionTitle: EntryFields.Symbol;
  infoSectionSubtitle: EntryFields.Symbol;
  infoButtonText1: EntryFields.Symbol;
  infoButtonText2: EntryFields.Symbol;
  button1Url: EntryFields.Symbol;
  button2Url: EntryFields.Symbol;
}

export interface TypeFaQsPageDataSkeleton extends EntrySkeletonType {
  fields: TypeFaQsPageDataFields;
  contentTypeId: "faQsPageData";
}

export type TypeFaQsPageData = Entry<TypeFaQsPageDataSkeleton>;

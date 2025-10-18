import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeFaqSkeleton } from "./TypeFaq";

export interface TypeFaQsPageDataFields {
  title: EntryFields.Symbol;
  subtitle: EntryFields.Text;
  image: Asset;
  questions: Entry<TypeFaqSkeleton>[];
}

export interface TypeFaQsPageDataSkeleton extends EntrySkeletonType {
  fields: TypeFaQsPageDataFields;
  contentTypeId: "faQsPageData";
}

export type TypeFaQsPageData = Entry<TypeFaQsPageDataSkeleton>;

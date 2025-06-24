import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeTimelinePeriodFields {
  period: EntryFields.Symbol;
  title: EntryFields.Symbol;
  description: EntryFields.Text;
  images: Asset[];
  buttonText?: EntryFields.Symbol;
}

export interface TypeTimelinePeriodSkeleton extends EntrySkeletonType {
  fields: TypeTimelinePeriodFields;
  contentTypeId: "timelinePeriod";
}

export type TypeTimelinePeriod = Entry<TypeTimelinePeriodSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeBannerContentFields {
  title: EntryFields.Symbol;
  subTitle: EntryFields.Symbol;
  actionButtonText1: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
}

export interface TypeBannerContentSkeleton extends EntrySkeletonType {
  fields: TypeBannerContentFields;
  contentTypeId: "bannerContent";
}

export type TypeBannerContent = Entry<TypeBannerContentSkeleton>;

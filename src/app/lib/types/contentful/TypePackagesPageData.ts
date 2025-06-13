import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageSkeleton } from "./TypePackage";
import { TypeFaqSkeleton } from "./TypeFaq";

export interface TypePackagesPageDataFields {
  title: EntryFields.Symbol;
  slug?: EntryFields.Symbol;
  subtitle: EntryFields.Symbol;
  image: Asset;
  packages: Entry<TypePackageSkeleton>[];
  faqsTitle: EntryFields.Symbol;
  faqsSubtitle: EntryFields.Symbol;
  faqs: Entry<TypeFaqSkeleton>[];
  infoTitle: EntryFields.Symbol;
  infoSubtitle: EntryFields.Text;
  infoButtonText: EntryFields.Symbol;
}

export interface TypePackagesPageDataSkeleton extends EntrySkeletonType {
  fields: TypePackagesPageDataFields;
  contentTypeId: "packagesPageData";
}

export type TypePackagesPageData = Entry<TypePackagesPageDataSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageSkeleton } from "./TypePackage";
import { TypeFaqSkeleton } from "./TypeFaq";

export interface TypePackagesPageDataFields {
  title: EntryFields.Symbol;
  slug?: EntryFields.Symbol;
  subtitle: EntryFields.Symbol;
  image: Asset;
  comboSectionTitle?: EntryFields.Symbol;
  comboSectionSubtitle?: EntryFields.Symbol;
  comboPackages?: Entry<TypePackageSkeleton>[];
  packageSectionTitle: EntryFields.Symbol;
  packageSectionSubtitle: EntryFields.Symbol;
  packages: Entry<TypePackageSkeleton>[];
  actionButtonText1: EntryFields.Symbol;
  button1Url: EntryFields.Symbol;
  actionButtonText2: EntryFields.Symbol;
  button2Url: EntryFields.Symbol;
  faqsTitle: EntryFields.Symbol;
  faqsSubtitle: EntryFields.Symbol;
  faqs: Entry<TypeFaqSkeleton>[];
}

export interface TypePackagesPageDataSkeleton extends EntrySkeletonType {
  fields: TypePackagesPageDataFields;
  contentTypeId: "packagesPageData";
}

export type TypePackagesPageData = Entry<TypePackagesPageDataSkeleton>;

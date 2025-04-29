import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageAccordionSkeleton } from "./TypePackageAccordion";

export interface TypePackageFields {
  id: EntryFields.Integer;
  type: "combo" | "duo" | "solo";
  name: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  mode: "offline" | "online";
  price: EntryFields.Integer;
  priceUnit: "plan" | "session";
  numberOfSessions?: EntryFields.Integer;
  content: EntryFields.RichText;
  packageAccordions: Entry<TypePackageAccordionSkeleton>[];
}

export interface TypePackageSkeleton extends EntrySkeletonType {
  fields: TypePackageFields;
  contentTypeId: "package";
}

export type TypePackage = Entry<TypePackageSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypePackageFields {
  id: EntryFields.Integer;
  type: "combo" | "duo" | "solo";
  name: EntryFields.Symbol;
  mode: "offline" | "online";
  price: EntryFields.Integer;
  priceUnit: "plan" | "session";
  content: EntryFields.RichText;
  explanation: EntryFields.Symbol;
  forWhom: EntryFields.Symbol[];
  notForWhom: EntryFields.Symbol[];
  expectedResults: EntryFields.RichText;
}

export interface TypePackageSkeleton extends EntrySkeletonType {
  fields: TypePackageFields;
  contentTypeId: "package";
}

export type TypePackage = Entry<TypePackageSkeleton>;

import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeSessionOptionSkeleton } from "./TypeSessionOption";

export interface TypePackageFields {
  id: EntryFields.Integer;
  slug: EntryFields.Symbol;
  type: "duo" | "solo";
  name: EntryFields.Symbol;
  shortDescription: EntryFields.Symbol;
  image: Asset;
  mode: "hybrid" | "offline" | "online";
  price: EntryFields.Integer;
  priceUnit: "package" | "session";
  sessionOptions?: Entry<TypeSessionOptionSkeleton>[];
  content: EntryFields.RichText;
  why: EntryFields.RichText;
  expectedResults: EntryFields.RichText;
  forWhom: EntryFields.RichText;
  notForWhom: EntryFields.RichText;
  tags: ("diet" | "gym" | "plan")[];
}

export interface TypePackageSkeleton extends EntrySkeletonType {
  fields: TypePackageFields;
  contentTypeId: "package";
}

export type TypePackage = Entry<TypePackageSkeleton>;

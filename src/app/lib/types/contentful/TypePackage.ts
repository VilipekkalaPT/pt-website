import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageAccordionSkeleton } from "./TypePackageAccordion";
import { TypeSessionOptionSkeleton } from "./TypeSessionOption";
import { TypeCurriculumSkeleton } from "./TypeCurriculum";

export interface TypePackageFields {
  id: EntryFields.Integer;
  type: "combo" | "duo" | "solo";
  name: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  mode: "hybrid" | "offline" | "online";
  price: EntryFields.Integer;
  priceUnit: "package" | "plan" | "session";
  sessionOptions?: Entry<TypeSessionOptionSkeleton>[];
  content: EntryFields.RichText;
  packageAccordions: Entry<TypePackageAccordionSkeleton>[];
  curriculum: Entry<TypeCurriculumSkeleton>;
}

export interface TypePackageSkeleton extends EntrySkeletonType {
  fields: TypePackageFields;
  contentTypeId: "package";
}

export type TypePackage = Entry<TypePackageSkeleton>;

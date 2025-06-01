import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypePackageSkeleton } from "./TypePackage";
import { TypePackagesPageDataSkeleton } from "./TypePackagesPageData";

export interface TypeFaqFields {
  topic:
    | "Diet myths"
    | "Gaining muscles"
    | "General"
    | "Gym and trainings for female"
    | "Supplements"
    | "Weight loss";
  topicType:
    | "DIET_MYTHS"
    | "FEMALE_GYM"
    | "GAINING_MUSCLES"
    | "GENERAL"
    | "SUPPLEMENTS"
    | "WEIGHT_LOSS";
  question: EntryFields.Text;
  answer: EntryFields.RichText;
  recommendedPackages:
    | Entry<TypePackageSkeleton>[]
    | Entry<TypePackagesPageDataSkeleton>[];
}

export interface TypeFaqSkeleton extends EntrySkeletonType {
  fields: TypeFaqFields;
  contentTypeId: "faq";
}

export type TypeFaq = Entry<TypeFaqSkeleton>;

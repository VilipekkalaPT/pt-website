import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeFaqFields {
  topic:
    | "Diet myths"
    | "Gaining muscles"
    | "Gym and trainings for female"
    | "Supplements"
    | "Weight loss";
  topicType:
    | "DIET_MYTHS"
    | "FEMALE_GYM"
    | "GAINING_MUSCLES"
    | "SUPPLEMENTS"
    | "WEIGHT_LOSS";
  question: EntryFields.Text;
  answer: EntryFields.RichText;
}

export interface TypeFaqSkeleton extends EntrySkeletonType {
  fields: TypeFaqFields;
  contentTypeId: "faq";
}

export type TypeFaq = Entry<TypeFaqSkeleton>;

import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { TypeTransformationProcessSkeleton } from "./TypeTransformationProcessText";

export interface TypeAboutPageDataFields {
  name: EntryFields.Symbol;
  roles: EntryFields.Symbol[];
  introduction: EntryFields.Text;
  transformationProcessText: Entry<TypeTransformationProcessSkeleton>;
}

export interface TypeAboutPageDataSkeleton extends EntrySkeletonType {
  fields: TypeAboutPageDataFields;
  contentTypeId: "aboutPageData";
}

export type TypeAboutPageData = Entry<TypeAboutPageDataSkeleton>;

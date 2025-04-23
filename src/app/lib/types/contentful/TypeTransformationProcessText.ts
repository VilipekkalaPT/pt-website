import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeTransformationProcessTextFields {
  title: EntryFields.Text;
  subtitle: EntryFields.Text;
  body: EntryFields.Text;
}

export interface TypeTransformationProcessSkeleton extends EntrySkeletonType {
  fields: TypeTransformationProcessTextFields;
  contentTypeId: "transformationProcessText";
}

export type TypeTransformationProcessText =
  Entry<TypeTransformationProcessSkeleton>;

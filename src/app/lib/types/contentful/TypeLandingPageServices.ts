import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeLandingPageServicesFields {
  title: EntryFields.Symbol;
  description: EntryFields.Text;
  tag: EntryFields.Symbol;
}

export interface TypeLandingPageServicesSkeleton extends EntrySkeletonType {
  fields: TypeLandingPageServicesFields;
  contentTypeId: "landingPageServices";
}

export type TypeLandingPageServices = Entry<TypeLandingPageServicesSkeleton>;

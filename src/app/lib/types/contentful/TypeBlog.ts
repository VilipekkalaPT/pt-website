import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeBlogFields {
  id: EntryFields.Integer;
  title: EntryFields.Text;
  content: EntryFields.RichText;
}

export interface TypeBBlogSkeleton extends EntrySkeletonType {
  fields: TypeBlogFields;
  contentTypeId: "blog";
}

export type TypeBlog = Entry<TypeBBlogSkeleton>;

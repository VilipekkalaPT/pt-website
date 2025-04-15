import * as Contentful from "contentful";

export interface NavigationSkeleton {
  contentTypeId: "navigation";
  fields: {
    id: Contentful.EntryFieldTypes.Text;
    label: Contentful.EntryFieldTypes.Text;
    url: Contentful.EntryFieldTypes.Text;
    order: Contentful.EntryFieldTypes.Number;
  };
}

export interface Navigation {
  id: string;
  label: string;
  url: string;
  order: number;
}

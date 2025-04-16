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

export interface BannerContentSkeleton {
  contentTypeId: "bannerContent";
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    subTitle: Contentful.EntryFieldTypes.Text;
    actionButtonText1: Contentful.EntryFieldTypes.Text;
    actionButtonText2: Contentful.EntryFieldTypes.Text;
  };
}

export interface BannerContent {
  title: string;
  subTitle: string;
  actionButtonText1: string;
  actionButtonText2: string;
}

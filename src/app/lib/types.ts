import { EntrySkeletonType } from "contentful";

export interface NavigationSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    label: string;
    url: string;
    order: number;
  };
}

export interface BannerContentSkeleton extends EntrySkeletonType {
  fields: {
    title: string;
    subTitle: string;
    actionButtonText1: string;
    actionButtonText2: string;
  };
}

export interface FooterColumnSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    columnTitle: string;
    items: FooterColumnLinkSkeleton[];
    order: number;
  };
}

export interface FooterColumnLinkSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    label: string;
    url?: string;
    description?: string;
  };
}

export interface KickOffProcessSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    title: string;
    description: string;
    order: number;
  };
}

export interface ReviewSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    title: string;
    reviewer: string;
    body: string;
    reviewDate: string;
    package: string;
    duration: string;
    indexChange: IndexChangeSkeleton[];
    showOnLandingPage: boolean;
  };
}

export interface IndexChangeSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    name: string;
    change: string;
  };
}

export interface PricingPageDataSkeleton extends EntrySkeletonType {
  fields: {
    bannerText: string;
    packages: PackageSkeleton[];
  };
}

export interface PackageSkeleton extends EntrySkeletonType {
  fields: {
    id: number;
    type: string;
    name: string;
    mode: string;
    price: string;
    priceUnit: string;
    content: {
      content: NestedContent[];
    };
    explanation: string;
    forWhom: string[];
    notForWhom: string[];
    expectedResults: string[];
  };
}

export interface NestedContent {
  content: PackageContentValue[];
}

export interface PackageContentValue {
  value: string;
}

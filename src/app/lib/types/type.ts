import { Document } from "@contentful/rich-text-types";
export interface HeadingSection {
  heading: string;
  subheading: string;
}

export interface Tab {
  label: string;
  subtitle?: string;
  infoCards: InfoCardType[];
}

export interface InfoCardType {
  title: string;
  content: Document;
}

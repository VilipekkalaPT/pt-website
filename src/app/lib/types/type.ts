import { Document } from "@contentful/rich-text-types";
import { AssetFields } from "contentful";

export interface HeadingSectionType {
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

export interface FitQuiz {
  steps: FitQuizStep[];
}

export interface FitQuizStep {
  id: number;
  title: string;
  options: FitQuizOption[];
}

interface FitQuizOption {
  id: string;
  label: string;
  description: string;
}

export interface Footer {
  columns: FooterColumn[];
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  url?: string;
  description?: string;
}

export interface TrainingSessionData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface CarouselImage {
  image: AssetFields;
  title?: string;
  description?: string;
}

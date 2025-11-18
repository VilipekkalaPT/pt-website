"use client";

import { useState } from "react";
import InfoSection from "app/components/InfoSection";
import { TypeHowTrainingSessionLooksLikeFields } from "app/lib/types/contentful";
import { CarouselImage, TrainingSessionData } from "app/lib/types/type";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import ExpandableHorizontalCard from "./ExpandableHorizontalCard";
import Carousel from "app/components/Carousel";

interface HowTrainingSessionLookLikeProps {
  title: string;
  subtitle?: string;
  data?: TypeHowTrainingSessionLooksLikeFields[];
}

export default function HowTrainingSessionLookLike({
  title,
  subtitle,
  data,
}: HowTrainingSessionLookLikeProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  if (!data || data.length === 0) return null;

  const trainingSessionData: TrainingSessionData[] = data.map((item) => ({
    title: item.title,
    description: item.description,
    imageUrl: getAssetUrl(item.image.fields as AssetFields | undefined),
  }));

  return (
    <div className="py-6 md:py-12 w-full">
      <InfoSection title={title} subtitle={subtitle} />
      <DesktopTrainingSessionLookLike
        trainingSessionData={trainingSessionData}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
      <MobileTrainingSessionLookLike data={data} />
    </div>
  );
}

const DesktopTrainingSessionLookLike = ({
  trainingSessionData,
  expandedIndex,
  setExpandedIndex,
}: {
  trainingSessionData: TrainingSessionData[];
  expandedIndex: number;
  setExpandedIndex: (index: number) => void;
}) => {
  return (
    <div className="hidden md:flex gap-4 mt-12">
      {trainingSessionData.map((session, index) => (
        <ExpandableHorizontalCard
          key={session.title}
          trainingSessionData={session}
          index={index}
          expandedIndex={expandedIndex}
          setExpandedIndex={(idx: number) => setExpandedIndex(idx)}
        />
      ))}
    </div>
  );
};

const MobileTrainingSessionLookLike = ({
  data,
}: {
  data: TypeHowTrainingSessionLooksLikeFields[];
}) => {
  const carouselImages: CarouselImage[] = data.map((session) => ({
    image: session.image.fields as AssetFields,
    title: session.title,
    description: session.description,
  }));

  return (
    <div className="md:hidden mt-6">
      <Carousel carouselImages={carouselImages} sliderPerView={1} />
    </div>
  );
};

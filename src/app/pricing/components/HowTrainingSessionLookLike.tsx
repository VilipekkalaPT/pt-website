"use client";

import { useState } from "react";
import InfoSection from "app/components/InfoSection";
import { TypeHowTrainingSessionLooksLikeFields } from "app/lib/types/contentful";
import { TrainingSessionData } from "app/lib/types/type";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import ExpandableHorizontalCard from "./ExpandableHorizontalCard";

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
    <div className="py-12 w-full">
      <InfoSection title={title} subtitle={subtitle} />
      <div className="flex gap-4 mt-12">
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
    </div>
  );
}

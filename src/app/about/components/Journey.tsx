"use client";

import { useState } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import Lightbox from "yet-another-react-lightbox";
import { AssetFields } from "contentful";
import { TypeTimelinePeriodFields } from "app/lib/types/contentful/TypeTimelinePeriod";
import { getAssetUrl } from "app/utils/utils";

import "react-vertical-timeline-component/style.min.css";
import "yet-another-react-lightbox/styles.css";
import "./Journey.css";
import JourneyTimeLineElement from "./JourneyTimelineElement";

interface JourneyProps {
  title: string;
  subtitle: string;
  timelinePeriods: TypeTimelinePeriodFields[];
}

export default function Journey({
  title,
  subtitle,
  timelinePeriods,
}: JourneyProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImages, setCurrentImages] = useState<AssetFields[]>([]);

  const handleImageClick = (
    event: React.MouseEvent<HTMLDivElement>,
    images: AssetFields[]
  ) => {
    const target = event.target as Element;
    if (target.closest(".prev-btn") || target.closest(".next-btn")) {
      return;
    }
    setCurrentImages(images);
    setOpenLightbox(true);
  };

  const closeLightbox = () => {
    setOpenLightbox(false);
    setCurrentImages([]);
  };

  return (
    <div className="my-15 mx-12">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-gray-500 mt-1 mb-4">{subtitle}</p>
      <VerticalTimeline lineColor="#e6e6e6">
        {timelinePeriods.map((period, index) => (
          <JourneyTimeLineElement
            key={index}
            period={period}
            handleImageClick={handleImageClick}
          />
        ))}
      </VerticalTimeline>
      <Lightbox
        open={openLightbox}
        close={closeLightbox}
        slides={currentImages.map((img) => ({ src: getAssetUrl(img) }))}
      />
    </div>
  );
}

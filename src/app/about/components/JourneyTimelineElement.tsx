"use client";

import { AssetFields } from "contentful";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TypeTimelinePeriodFields } from "app/lib/types/contentful/TypeTimelinePeriod";
import Carousel from "@/app/about/components/Carousel";
import { useEffect, useState } from "react";

interface JourneyTimeLineElementProps {
  period: TypeTimelinePeriodFields;
  handleImageClick: (
    event: React.MouseEvent<HTMLDivElement>,
    journeyImages: AssetFields[]
  ) => void;
}

export default function JourneyTimeLineElement({
  period,
  handleImageClick,
}: JourneyTimeLineElementProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1170);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const journeyImages = period.images.map(
    (image) => image.fields
  ) as AssetFields[];

  return (
    <VerticalTimelineElement
      date={isDesktop ? period.period : ""}
      dateClassName={`${isDesktop ? "date-style" : ""}`}
    >
      {!isDesktop && <div className="date-style">{period.period}</div>}
      <div
        onClick={(event) => handleImageClick(event, journeyImages)}
        className="card glass-effect"
      >
        <Carousel images={journeyImages} />
        <div className="p-6">
          <p className="title">{period.title}</p>
          <p className="content">{period.description}</p>
        </div>
      </div>
    </VerticalTimelineElement>
  );
}

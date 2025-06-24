"use client";

import { useRouter } from "next/navigation";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { AssetFields } from "contentful";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TypeTimelinePeriodFields } from "app/lib/types/contentful/TypeTimelinePeriod";
import Button from "app/components/Button";
import Carousel from "app/components/Carousel";
import { ROUTES } from "app/utils/routes";

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
  const router = useRouter();
  const journeyImages = period.images.map(
    (image) => image.fields
  ) as AssetFields[];

  return (
    <VerticalTimelineElement
      date={period.period}
      dateClassName="date-style"
      iconStyle={{ background: "#2c2c2c", color: "#fff" }}
      icon={<BriefcaseIcon />}
    >
      <div
        onClick={(event) => handleImageClick(event, journeyImages)}
        className="card"
      >
        <Carousel images={journeyImages} />
        <p className="title">{period.title}</p>
        <p className="content">{period.description}</p>
        {period.buttonText && (
          <Button
            label={period.buttonText}
            variant="primary"
            className="mt-6"
            onClick={() => router.push(ROUTES.CONTACT)}
          />
        )}
      </div>
    </VerticalTimelineElement>
  );
}

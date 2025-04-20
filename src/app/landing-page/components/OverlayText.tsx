"use client";

import Button from "app/components/Button";
import { BannerContentSkeleton } from "app/lib/types";

interface OverlayTextProps {
  bannerContent: BannerContentSkeleton["fields"][];
}

export default function OverlayText({ bannerContent }: OverlayTextProps) {
  const { title, subTitle, actionButtonText1, actionButtonText2 } =
    bannerContent[0];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center py-8 px-16 bg-black/60 text-white w-[70vw]">
      <p className="text-3xl mb-3">{title}</p>
      <p className="text-xl mb-3">{subTitle}</p>
      <div className="flex justify-center">
        <Button
          label={actionButtonText1}
          type="secondary"
          onClick={() => {}}
          className="mr-4"
        />
        <Button label={actionButtonText2} type="primary" onClick={() => {}} />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { TypeLandingPagePainPointsFields } from "app/lib/types/contentful";
import RichTextRenderer from "app/components/RichTextRenderer";
import Button from "app/components/Button";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import {
  ClockIcon,
  HeartIcon,
  StarIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ROUTES } from "app/utils/routes";

interface PainPointsSectionProps {
  title: string;
  subtitle: string;
  painPoints: TypeLandingPagePainPointsFields[];
}

export default function PainPointsSection({
  title,
  subtitle,
  painPoints,
}: PainPointsSectionProps) {
  const router = useRouter();

  return (
    <div className="mt-20 px-12 flex flex-col items-center">
      <p className="text-2xl font-bold mb-1">{title}</p>
      <p className="text-xl text-gray-400 mb-10">{subtitle}</p>
      <div className="w-3/4 h-[400px] flex gap-4">
        {painPoints.map((point, index) => {
          const image = point.image.fields as AssetFields;
          const imageUrl = getAssetUrl(image);

          return (
            <div
              key={index}
              className="group w-full h-[384px] [perspective:1000px]"
              role="button"
              tabIndex={0}
              aria-label={`Pain point: ${point.overlayText}`}
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                  <Image
                    src={imageUrl}
                    alt="Pain Point Image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute w-full h-full inset-0 flex items-center justify-center text-center text-white p-4 bg-black/60 bg-opacity-40 rounded-lg [backface-visibility:hidden]">
                  <RichTextRenderer
                    text={point.overlayText}
                    paragraphClassName="mb-4 text-lg font-semibold"
                  />
                </div>

                <div className="absolute w-full h-full inset-0 border-1 border-gray-200 rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-between bg-white p-4">
                  {getIcon(index)}
                  <p className="mb-4 text-xl font-semibold flex-2 flex items-center text-center">
                    {point.backText}
                  </p>
                  {point.backButtonText && (
                    <Button
                      label={point.backButtonText}
                      variant="primary"
                      onClick={() => router.push(ROUTES.PRICING)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getIcon = (index: number) => {
  const iconStyle = "size-10";

  switch (index) {
    case 0:
      return <ClockIcon className={iconStyle} />;
    case 1:
      return <SunIcon className={iconStyle} />;
    case 2:
      return <HeartIcon className={iconStyle} />;
    case 3:
      return <StarIcon className={iconStyle} />;
    default:
      return <StarIcon className={iconStyle} />;
  }
};

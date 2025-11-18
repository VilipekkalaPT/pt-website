"use client";

import { useState } from "react";
import Image from "next/image";
import { GiftIcon } from "@heroicons/react/24/outline";
import { PACKAGE_IMAGE } from "app/utils/variables";
import {
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import RichTextRenderer from "app/components/RichTextRenderer";
import SessionSelector from "./SessionSelector";
import {
  calculateSavedAmount,
  capitalizeFirstLetter,
  getAssetUrl,
  getChipColor,
} from "app/utils/utils";
import Chip from "app/components/Chip";
import { PricePackageDetails } from "./PricePackageDetails";
import cn from "classnames";

interface PackageDetailsProps {
  packageDetails: TypePackageFields;
  soloPackages: TypePackageFields[];
  image?: AssetFields;
}

export default function PackageDetails({
  packageDetails,
  soloPackages,
  image,
}: PackageDetailsProps) {
  const imageUrl = getAssetUrl(image);
  const sessionOptions = packageDetails.sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];
  const [selectedOption, setSelectedOption] = useState<
    TypeSessionOptionFields | undefined
  >(sessionOptions ? sessionOptions[0] : undefined);

  const savedAmount = calculateSavedAmount(
    packageDetails,
    soloPackages,
    selectedOption,
    sessionOptions
  );

  const desktopStyle = "md:grid-cols-2 md:gap-16";
  const mobileStyle = "grid-cols-1 gap-8";

  return (
    <div className={cn("grid", desktopStyle, mobileStyle)}>
      <div className="relative w-full h-[20rem] md:h-[33rem]">
        <Image
          src={imageUrl}
          alt={image?.title || PACKAGE_IMAGE}
          fill
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute top-4 right-4">
          <Chip
            label=""
            color="green"
            className="rounded-full w-13 h-13 p-0 justify-center"
            glassmorphism
            iconRight={<GiftIcon className="size-6 stroke-[1.5]" />}
          />
        </div>
      </div>
      <div>
        <p className="heading">{packageDetails.name}</p>
        <div className="flex gap-2 mt-2 mb-2">
          <Chip
            label={capitalizeFirstLetter(packageDetails.mode)}
            color={getChipColor(packageDetails.mode)}
            glassmorphism
          />
        </div>
        <PricePackageDetails
          price={selectedOption?.price ?? packageDetails.price}
          priceUnit={packageDetails.priceUnit}
          savedAmount={savedAmount}
        />
        <RichTextRenderer
          text={packageDetails.content}
          listClassName="list-disc ml-5 mt-4 mb-6 body-strong text-white/70"
        />
        <SessionSelector
          selectedOption={selectedOption}
          sessionOptions={sessionOptions}
          onSelect={setSelectedOption}
        />
      </div>
    </div>
  );
}

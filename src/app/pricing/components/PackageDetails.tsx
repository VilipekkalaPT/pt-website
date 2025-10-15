"use client";

import { useState } from "react";
import Image from "next/image";
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

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={image?.title || PACKAGE_IMAGE}
          fill
          className="object-cover w-full h-full"
        />
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

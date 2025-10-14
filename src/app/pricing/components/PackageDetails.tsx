"use client";

import { useState } from "react";
import Image from "next/image";
import { PACKAGE_IMAGE, SAVED_AMOUNT } from "app/utils/variables";
import {
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import Price from "./Price";
import RichTextRenderer from "app/components/RichTextRenderer";
import SessionSelector from "./SessionSelector";
import {
  calculateSavedAmount,
  capitalizeFirstLetter,
  getAssetUrl,
} from "app/utils/utils";
import Chip from "app/components/Chip";
import { getChipColor } from "app/utils/packageUtils";

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
        <div className="flex gap-2 mt-2">
          <Chip
            label={capitalizeFirstLetter(packageDetails.mode)}
            color={getChipColor(packageDetails.mode)}
            glassmorphism
          />
          {!!savedAmount && (
            <Chip label={`${SAVED_AMOUNT} €${savedAmount}`} color="green" />
          )}
        </div>
        <Price
          price={selectedOption?.price ?? packageDetails.price}
          priceUnit={packageDetails.priceUnit}
          variant="large"
          className="my-4"
        />
        <RichTextRenderer
          text={packageDetails.content}
          listClassName="list-disc ml-5 mb-6 body-strong text-white/70"
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

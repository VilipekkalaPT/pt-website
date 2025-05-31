"use client";

import { useState } from "react";
import Image from "next/image";
import { BANNER } from "app/utils/variables";
import {
  TypePackageAccordionFields,
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
  getTitle,
} from "app/utils/utils";
import AccordionComponent from "app/components/AccordionComponent";
import Chip from "app/components/Chip";

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
  const imageUrl = `https:${image?.file?.url ?? ""}`;
  const sessionOptions = packageDetails.sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];
  const [selectedOption, setSelectedOption] = useState<
    TypeSessionOptionFields | undefined
  >(sessionOptions ? sessionOptions[0] : undefined);
  const [selectedAccordion, setSelectedAccordion] = useState<string>("");

  const savedAmount = calculateSavedAmount(
    packageDetails,
    soloPackages,
    selectedOption,
    sessionOptions
  );

  return (
    <div className="grid grid-cols-2 gap-10 px-12">
      <Image
        src={imageUrl}
        alt={BANNER}
        width={image?.file?.details.image?.width}
        height={image?.file?.details.image?.height}
        className="block w-full h-auto"
      />
      <div>
        <p className="text-2xl font-bold">{packageDetails.name}</p>
        <div className="flex gap-2 mt-2">
          <Chip label={capitalizeFirstLetter(packageDetails.mode)} />
          {!!savedAmount && (
            <Chip label={`Saved: $${savedAmount}`} variant="success" />
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
          listClassName="list-disc ml-5 mb-6 text-sm text-gray-500"
        />
        <SessionSelector
          selectedOption={selectedOption}
          sessionOptions={sessionOptions}
          onSelect={setSelectedOption}
        />
        {packageDetails.packageAccordions.map((accordion) => {
          const accordionField = accordion.fields as TypePackageAccordionFields;
          return (
            <AccordionComponent
              key={accordionField.title}
              triggerText={getTitle(accordionField.title)}
              accordionContent={
                <RichTextRenderer
                  text={accordionField.description}
                  listClassName="list-disc ml-5 "
                />
              }
              value={accordionField.title}
              selectedAccordion={selectedAccordion}
              onValueChange={(value) => setSelectedAccordion(value)}
            />
          );
        })}
      </div>
    </div>
  );
}

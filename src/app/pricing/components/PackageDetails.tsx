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
import Accordion from "app/components/Accordion";
import SessionSelector from "./SessionSelector";
import { getTitle } from "app/utils/utils";

interface PackageDetailsProps {
  packageDetails: TypePackageFields;
  image?: AssetFields;
}

export default function PackageDetails({
  packageDetails,
  image,
}: PackageDetailsProps) {
  const [selectOption, setSelectOption] = useState<
    TypeSessionOptionFields | undefined
  >();
  const imageUrl = `https:${image?.file?.url ?? ""}`;
  const sessionOptions = packageDetails.sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <div className="grid grid-cols-2 gap-10 px-6">
      <Image
        src={imageUrl}
        alt={BANNER}
        width={image?.file?.details.image?.width}
        height={image?.file?.details.image?.height}
        className="block w-full h-auto"
      />
      <div>
        <p className="text-2xl font-bold">{packageDetails.name}</p>
        <p className="text-sm font-bold text-gray-500 mt-1">
          {packageDetails.subheading}
        </p>
        <Price
          price={selectOption?.price ?? packageDetails.price}
          priceUnit={packageDetails.priceUnit}
        />
        <RichTextRenderer
          text={packageDetails.content}
          listClassName="list-disc ml-5 text-sm text-gray-500"
        />
        {sessionOptions && (
          <SessionSelector
            sessionOptions={sessionOptions}
            onSelect={setSelectOption}
          />
        )}
        {packageDetails.packageAccordions.map((accordion) => {
          const accordionField = accordion.fields as TypePackageAccordionFields;
          return (
            <Accordion
              key={accordionField.title}
              buttonText={getTitle(accordionField.title)}
              accordionContent={
                <RichTextRenderer
                  text={accordionField.description}
                  listClassName="list-disc ml-5 "
                />
              }
              className="mb-4"
            />
          );
        })}
      </div>
    </div>
  );
}

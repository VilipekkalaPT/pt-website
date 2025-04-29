import Image from "next/image";
import { BANNER } from "app/utils/variables";
import {
  TypePackageAccordionFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import Price from "./Price";
import RichTextRenderer from "app/components/RichTextRenderer";
import Accordion from "app/components/Accordion";

interface PackageDetailsProps {
  packageDetails: TypePackageFields;
  image?: AssetFields;
}

export default function PackageDetails({
  packageDetails,
  image,
}: PackageDetailsProps) {
  const imageUrl = `https:${image?.file?.url ?? ""}`;

  console.log(packageDetails);

  return (
    <div className="grid grid-cols-2 gap-10">
      <Image
        src={imageUrl}
        alt={BANNER}
        width={image?.file?.details.image?.width}
        height={image?.file?.details.image?.height}
        className="block w-full h-auto"
      />
      <div>
        <p className="text-2xl font-bold">{packageDetails.name}</p>
        <Price
          price={packageDetails.price}
          priceUnit={packageDetails.priceUnit}
        />
        <RichTextRenderer
          text={packageDetails.content}
          listClassName="text-sm text-gray-500 mb-4"
        />
        {packageDetails.packageAccordions.map((accordion) => {
          const accordionField = accordion.fields as TypePackageAccordionFields;
          return (
            <Accordion
              key={accordionField.title}
              buttonText={accordionField.title}
              accordionContent={
                <RichTextRenderer text={accordionField.description} />
              }
              className="mb-4"
            />
          );
        })}
      </div>
    </div>
  );
}

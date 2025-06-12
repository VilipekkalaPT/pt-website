import HeroSection from "app/components/HeroSection";
import { HeadingSection } from "app/lib/types/type";
import { Asset, AssetFields } from "contentful";
import { Document } from "@contentful/rich-text-types";
import RichTextRenderer from "app/components/RichTextRenderer";

interface PricingPageHeadingProps {
  image: Asset;
  title: string;
  subtitle: string;
  heading1: string;
  heading2: string;
  subheading?: string;
  content: Document;
}

export default function PricingPageHeading({
  image,
  title,
  subtitle,
  heading1,
  heading2,
  subheading,
  content,
}: PricingPageHeadingProps) {
  const imageField: AssetFields = image.fields as AssetFields;
  const headingSections: HeadingSection[] = [
    {
      heading: title,
      subheading: subtitle,
    },
  ];

  return (
    <>
      <HeroSection
        image={imageField}
        headingSections={headingSections}
        fillImage={false}
      />
      <div className="w-2/3 mx-auto mt-20 flex items-center">
        <div className="flex-2 flex flex-col pr-20">
          <p className="text-2xl font-semibold text-gray-800 w-full">
            {heading2}
          </p>
          <p className="mt-1 mb-4 text-xl text-gray-400">{subheading}</p>
          <RichTextRenderer
            text={content}
            paragraphClassName="mt-4 text-gray-600"
          />
        </div>
        <p className="flex-1 text-center text-5xl font-bold text-gray-500">
          {heading1}
        </p>
      </div>
    </>
  );
}

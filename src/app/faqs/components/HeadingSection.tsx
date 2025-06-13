import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import RichTextRenderer from "app/components/RichTextRenderer";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import { HEADING_IMAGE } from "app/utils/variables";

interface HeadingSectionProps {
  title: string;
  description: Document;
  image: AssetFields;
}

export default function HeadingSection({
  title,
  description,
  image,
}: HeadingSectionProps) {
  const imageUrl = getAssetUrl(image);

  return (
    <div className="px-12 pt-16 grid grid-cols-2 gap-16">
      <div>
        <p className="text-6xl font-bold mb-8 w-1/2">{title}</p>
        <RichTextRenderer
          text={description}
          paragraphClassName="text-gray-400 mb-4"
        />
      </div>
      <Image
        src={imageUrl}
        alt={image.title || HEADING_IMAGE}
        width={image.file?.details.image?.width}
        height={image.file?.details.image?.height}
        className="block w-full h-auto flex-2"
      />
    </div>
  );
}

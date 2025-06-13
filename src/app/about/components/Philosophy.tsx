import Image from "next/image";
import RichTextRenderer from "app/components/RichTextRenderer";
import { AssetFields } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { StarIcon } from "@heroicons/react/24/solid";
import { getAssetUrl } from "app/utils/utils";

interface PhilosophyProps {
  title: string;
  subtitle: string;
  content: Document;
  image: AssetFields;
}

export default function Philosophy({
  title,
  subtitle,
  content,
  image,
}: PhilosophyProps) {
  const imageUrl = getAssetUrl(image);

  return (
    <div className="my-15 mx-12 grid grid-cols-2 gap-10">
      <Image
        src={imageUrl}
        alt="Philosophy Banner"
        width={image.file?.details.image?.width}
        height={image.file?.details.image?.height}
      />
      <div className="mr-15">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-xl text-gray-400 pb-2">{subtitle}</p>
        <RichTextRenderer
          text={content}
          listClassName="text-gray-700"
          listIcon={<StarIcon className="size-4" />}
          paragraphClassName="mt-4 text-gray-700"
        />
      </div>
    </div>
  );
}

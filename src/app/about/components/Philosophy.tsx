import Image from "next/image";
import RichTextRenderer from "app/components/RichTextRenderer";
import { BANNER } from "app/utils/variables";
import { AssetFields } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { StarIcon } from "@heroicons/react/24/solid";
import { getAssetUrl } from "app/utils/utils";

interface PhilosophyProps {
  title: string;
  subtitle: string;
  content: Document;
  images: AssetFields[];
}

export default function Philosophy({
  title,
  subtitle,
  content,
  images,
}: PhilosophyProps) {
  const image = images.find((image) => image.title === BANNER);
  const imageUrl = image ? getAssetUrl(image) : "";

  return (
    <div className="flex my-15 mx-12 gap-12">
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={imageUrl}
          alt="Philosophy Banner"
          width={image?.file?.details.image?.width}
          height={image?.file?.details.image?.height}
        />
      </div>

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

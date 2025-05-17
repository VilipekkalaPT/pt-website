import Image from "next/image";
import RichTextRenderer from "app/components/RichTextRenderer";
import { BANNER } from "app/utils/variables";
import { AssetFields } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { StarIcon } from "@heroicons/react/24/solid";

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
  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

  return (
    <div className="flex my-15 mx-12 gap-12">
      <Image
        src={bannerUrl}
        alt={BANNER}
        width={banner?.file?.details.image?.width}
        height={banner?.file?.details.image?.height}
        className="block w-full h-auto flex-2"
      />
      <div className="flex-1 mr-15">
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

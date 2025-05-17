import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import RichTextRenderer from "app/components/RichTextRenderer";
import { BANNER } from "app/utils/variables";
import { AssetFields } from "contentful";

interface HeadingSectionProps {
  title: string;
  description: Document;
  images: AssetFields[];
}

export default function HeadingSection({
  title,
  description,
  images,
}: HeadingSectionProps) {
  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

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
        src={bannerUrl}
        alt={BANNER}
        width={banner?.file?.details.image?.width}
        height={banner?.file?.details.image?.height}
        className="block w-full h-auto flex-2"
      />
    </div>
  );
}

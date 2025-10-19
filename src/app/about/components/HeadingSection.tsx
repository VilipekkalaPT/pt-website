import { EREPS, HEADING_IMAGE, EQF } from "@/app/utils/variables";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Image from "next/image";

interface HeadingSectionProps {
  name: string;
  shortDescription: string;
  image: AssetFields;
}

export default function HeadingSection({
  name,
  shortDescription,
  image,
}: HeadingSectionProps) {
  const imageUrl = getAssetUrl(image);

  return (
    <div className="relative w-screen h-screen">
      <Image
        src={imageUrl}
        alt={image.title ?? HEADING_IMAGE}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/0" />
      <div className="absolute bottom-12 flex flex-col w-full px-16">
        <p className="title-hero">{name}</p>
        <p className="subtitle text-white/70">{shortDescription}</p>
        <p className="mt-16 leading-[1.4] text-white/40">{EREPS}</p>
        <p className="leading-[1.4] text-white/40">{EQF}</p>
      </div>
    </div>
  );
}

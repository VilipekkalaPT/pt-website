"use client";

import { Asset, AssetFields } from "contentful";
import Carousel from "../../components/Carousel";

interface JourneyProps {
  title: string;
  subtitle: string;
  images: Asset[];
}

export default function Journey({ title, subtitle, images }: JourneyProps) {
  const journeyImages = images.map((image) => image.fields) as AssetFields[];

  return (
    <div className="my-15 mx-12">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-gray-500 mt-1 mb-4">{subtitle}</p>
      <Carousel images={journeyImages} />
    </div>
  );
}

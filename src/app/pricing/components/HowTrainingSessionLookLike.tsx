import Carousel from "app/components/Carousel";
import { Asset, AssetFields } from "contentful";

interface HowTrainingSessionLookLikeProps {
  title: string;
  subtitle?: string;
  images?: Asset[];
}

export default function HowTrainingSessionLookLike({
  title,
  subtitle,
  images,
}: HowTrainingSessionLookLikeProps) {
  const imageFields = images?.map((image) => image.fields as AssetFields) ?? [];

  return (
    <div className="mt-25 px-12 w-full">
      <p className="text-2xl font-bold mb-2">{title}</p>
      <p className="text-xl text-gray-500 mb-4">{subtitle}</p>
      <div className="w-full h-[700px]">
        {imageFields.length > 0 && (
          <Carousel images={imageFields} sliderPerView={3} fillImage={false} />
        )}
      </div>
    </div>
  );
}

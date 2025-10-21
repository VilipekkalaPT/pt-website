import Carousel from "./Carousel";
import InfoSection from "app/components/InfoSection";
import { TypeHowTrainingSessionLooksLikeFields } from "app/lib/types/contentful";
import { TrainingSessionData } from "app/lib/types/type";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";

interface HowTrainingSessionLookLikeProps {
  title: string;
  subtitle?: string;
  data?: TypeHowTrainingSessionLooksLikeFields[];
}

export default function HowTrainingSessionLookLike({
  title,
  subtitle,
  data,
}: HowTrainingSessionLookLikeProps) {
  if (!data || data.length === 0) return null;

  const trainingSessionData: TrainingSessionData[] = data.map((item) => ({
    title: item.title,
    description: item.description,
    imageUrl: getAssetUrl(item.image.fields as AssetFields | undefined),
  }));

  return (
    <div className="py-12 w-full">
      <InfoSection title={title} subtitle={subtitle} />
      <div className="mt-12">
        <Carousel trainingSessionData={trainingSessionData} />
      </div>
    </div>
  );
}

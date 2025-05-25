import ReviewCard from "app/landing-page/components/ReviewCard";
import { getAssets, getEntries } from "app/lib/contentfulDataService";
import { TypeReviewSkeleton } from "app/lib/types/contentful/TypeReview";
import { BANNER } from "app/utils/variables";
import Image from "next/image";

export default async function ClientSpotlights() {
  const [images, reviews] = await Promise.all([
    getAssets(),
    getEntries<TypeReviewSkeleton>("review"),
  ]);

  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

  return (
    <div className="mt-30">
      <Image
        src={bannerUrl}
        alt={BANNER}
        width={banner?.file?.details.image?.width}
        height={banner?.file?.details.image?.height}
        className="block w-full h-auto"
      />
      <div className="mt-10 px-6 grid grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} showChanges />
        ))}
      </div>
    </div>
  );
}

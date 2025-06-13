import ReviewCard from "app/landing-page/components/ReviewCard";
import { getEntries } from "app/lib/contentfulDataService";
import { TypeReviewSkeleton } from "app/lib/types/contentful/TypeReview";

export default async function ClientSpotlights() {
  const reviews = await getEntries<TypeReviewSkeleton>("review");

  return (
    <>
      <div className="mt-10 px-6 grid grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} showChanges />
        ))}
      </div>
    </>
  );
}

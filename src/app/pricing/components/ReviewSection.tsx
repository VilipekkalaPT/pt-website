import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";
import { LATEST_REVIEWS } from "app/utils/variables";

interface ReviewSectionProps {
  reviews: TypeReviewFields[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <>
      <p className="px-12 text-2xl font-bold mt-35 mb-10">{LATEST_REVIEWS}</p>
      <div className="px-12 grid grid-cols-3 gap-8 mb-15">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showRating
              reviewerNamePostion="bottom"
            />
          ))}
      </div>
    </>
  );
}

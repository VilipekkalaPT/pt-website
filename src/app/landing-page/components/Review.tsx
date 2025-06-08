import { LATEST_REVIEWS } from "app/utils/variables";
import ReviewCard from "./ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";

interface ReviewProps {
  reviews: TypeReviewFields[];
}

export default function Review({ reviews }: ReviewProps) {
  const displayedReviews = reviews.filter((review) => review.showOnLandingPage);

  return (
    <div className="mt-40 px-12">
      <p className="text-2xl font-bold text-center">{LATEST_REVIEWS}</p>
      <div className="grid grid-cols-3 gap-10 mt-10">
        {displayedReviews.map((review: TypeReviewFields) => (
          <ReviewCard
            key={review.id}
            review={review}
            showRating
            reviewerNamePostion="bottom"
          />
        ))}
      </div>
    </div>
  );
}

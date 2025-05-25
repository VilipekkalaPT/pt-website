import ReviewCard from "./ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";

interface ReviewProps {
  reviews: TypeReviewFields[];
}

export default function Review({ reviews }: ReviewProps) {
  const displayedReviews = reviews.filter((review) => review.showOnLandingPage);

  return (
    <div className="p-6">
      <p className="text-2xl font-bold">Latest reviews</p>
      <div className="grid grid-cols-2 gap-6 mt-4">
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

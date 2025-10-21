import { CLIENT_REVIEWS } from "app/utils/variables";
import ReviewCard from "./ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";

interface ReviewProps {
  reviews: TypeReviewFields[];
}

export default function Review({ reviews }: ReviewProps) {
  const displayedReviews = reviews.filter((review) => review.showOnLandingPage);

  return (
    <div className="mx-16 py-12">
      <p className="heading text-center">{CLIENT_REVIEWS}</p>
      <div className="grid grid-cols-3 gap-12 mt-12">
        {displayedReviews.map((review: TypeReviewFields) => (
          <ReviewCard
            key={review.id}
            review={review}
            reviewCardType="compact"
          />
        ))}
      </div>
    </div>
  );
}

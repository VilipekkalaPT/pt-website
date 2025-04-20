import { ReviewSkeleton } from "app/lib/types";
import ReviewCard from "./ReviewCard";

export type Review = ReviewSkeleton["fields"];

interface ReviewProps {
  reviews: Review[];
}

export default function Review({ reviews }: ReviewProps) {
  const displayedReviews = reviews.filter((review) => review.showOnLandingPage);

  return (
    <div className="p-6">
      <p className="text-2xl font-bold">Latest reviews</p>
      <div className="grid grid-cols-2 gap-6 mt-4">
        {displayedReviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

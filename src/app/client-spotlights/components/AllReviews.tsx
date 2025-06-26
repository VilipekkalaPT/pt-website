import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";

interface AllReviewsProps {
  title: string;
  subtitle: string;
  allReviews: TypeReviewFields[];
}

export default function AllReviews({
  title,
  subtitle,
  allReviews,
}: AllReviewsProps) {
  return (
    <div className="mt-10 px-24">
      <p className="text-2xl font-bold mb-1">{title}</p>
      <p className="text-gray-500">{subtitle}</p>
      <div className="mt-10 grid grid-cols-3 gap-8">
        {allReviews.map((review) => (
          <ReviewCard key={review.id} review={review} showChanges />
        ))}
      </div>
    </div>
  );
}

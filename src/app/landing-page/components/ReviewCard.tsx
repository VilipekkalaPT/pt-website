import Card, { CardContent, CardHeader } from "app/components/Card";

import { TypeReviewFields } from "app/lib/types/contentful";
import Divider from "app/components/Divider";
import RichTextRenderer from "app/components/RichTextRenderer";
import Rating from "app/components/Rating";

interface ReviewCardProps {
  review: TypeReviewFields;
  showRating?: boolean;
  showChanges?: boolean;
  reviewerNamePostion?: "top" | "bottom";
}

export default function ReviewCard({
  review,
  showRating = false,
  showChanges = false,
  reviewerNamePostion = "top",
}: ReviewCardProps) {
  return (
    <Card key={review.id}>
      <CardHeader>
        {showRating && <Rating rating={review.rating} />}
        {reviewerNamePostion === "top" && (
          <ReviewerInfo reviewer={review.reviewer} packages={review.package} />
        )}
      </CardHeader>
      <CardContent className="mt-4 flex-1">
        <p className="text-xl font-bold">{review.title}</p>
        <RichTextRenderer text={review.content} />
        {showChanges && (
          <>
            <Divider />
            {review.changes?.map((change: string, index: number) => {
              return (
                <div
                  key={`${change}-${index}`}
                  className="grid grid-cols-2 mt-4 text-gray-500"
                >
                  <p>{change}</p>
                </div>
              );
            })}
          </>
        )}
        <Divider />
        {reviewerNamePostion === "bottom" && (
          <ReviewerInfo
            reviewer={review.reviewer}
            packages={review.package}
            className="mt-4"
          />
        )}
      </CardContent>
    </Card>
  );
}

function ReviewerInfo({
  reviewer,
  packages,
  className,
}: {
  reviewer: string;
  packages: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-sm text-gray-600 font-bold">{reviewer}</p>
      <p className="text-sm text-gray-500">{packages.join(", ")}</p>
    </div>
  );
}

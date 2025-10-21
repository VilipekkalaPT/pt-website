"use client";

import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";
import Sort from "app/pricing/components/Sort";
import { sortOptions, useSort } from "app/pricing/hooks/useSort";

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
  const { sortedReviews, selectedSort, handleSortChange } = useSort(allReviews);

  return (
    <div className="mt-16 mx-16">
      <div className="text-center">
        <p className="heading">{title}</p>
        <p className="subheading text-white/70 mt-1">{subtitle}</p>
      </div>

      <Sort
        selectedSort={selectedSort}
        options={sortOptions}
        handleSortChange={handleSortChange}
      />
      <div className="mt-6 grid grid-cols-2 gap-6 items-start">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} reviewCardType="full" />
        ))}
      </div>
    </div>
  );
}

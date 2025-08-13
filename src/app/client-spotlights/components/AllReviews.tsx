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
    <div className="mt-10 px-24">
      <p className="text-2xl font-bold mb-1">{title}</p>
      <p className="text-gray-500 mb-4">{subtitle}</p>
      <Sort
        selectedSort={selectedSort}
        options={sortOptions}
        handleSortChange={handleSortChange}
      />
      <div className="mt-10 grid grid-cols-3 gap-8 items-start">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} reviewCardType="full" />
        ))}
      </div>
    </div>
  );
}

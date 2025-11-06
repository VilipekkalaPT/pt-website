"use client";

import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";
import Sort from "app/client-spotlights/components/Sort";
import Filter from "./Filter";
import { sortOptions, useSort } from "app/client-spotlights/hooks/useSort";
import { useFilter } from "app/client-spotlights/hooks/useFilter";

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
  const {
    filteredReviews,
    selectedFilter,
    handleFilterChange,
    clearAllFilters,
  } = useFilter(allReviews);
  const { sortedReviews, selectedSort, handleSortChange } =
    useSort(filteredReviews);

  return (
    <div className="py-16 w-4/5 mx-auto">
      <div className="text-center">
        <p className="heading">{title}</p>
        <p className="subheading text-white/70 mt-1">{subtitle}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <div className="w-1/2 flex gap-6">
          <Filter
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
          />
          <Sort
            selectedSort={selectedSort}
            options={sortOptions}
            handleSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} reviewCardType="full" />
          ))
        ) : (
          <p className="text-center col-span-2 text-white/70">
            No reviews found.
          </p>
        )}
      </div>
    </div>
  );
}

import { useState, useCallback, useMemo } from "react";

import { TypeReviewFields } from "app/lib/types/contentful";

export type ReviewChange =
  | "Adopt a new lifestyle"
  | "Boost overall fitness"
  | "Improve posture"
  | "Increase strength"
  | "Look more fit"
  | "Lose weight"
  | "Move better"
  | "Sleep better";

export const filterOptions: ReviewChange[] = [
  "Adopt a new lifestyle",
  "Boost overall fitness",
  "Improve posture",
  "Increase strength",
  "Look more fit",
  "Lose weight",
  "Move better",
  "Sleep better",
];

export const useFilter = (allReviews: TypeReviewFields[]) => {
  const [selectedFilter, setSelectedFilter] = useState<ReviewChange[]>([]);

  const handleFilterChange = useCallback((value: string) => {
    const filterValue = value as ReviewChange;

    setSelectedFilter((prev) => {
      if (prev.includes(filterValue)) {
        return prev.filter((filter) => filter !== filterValue);
      } else {
        return [...prev, filterValue];
      }
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedFilter([]);
  }, []);

  const filteredReviews = useMemo(() => {
    if (selectedFilter.length === 0) {
      return allReviews;
    }
    return allReviews.filter((review) => {
      if (!review.changes || review.changes.length === 0) return false;
      return selectedFilter.some((filter) => review.changes?.includes(filter));
    });
  }, [allReviews, selectedFilter]);

  return {
    filteredReviews,
    selectedFilter,
    handleFilterChange,
    clearAllFilters,
  };
};

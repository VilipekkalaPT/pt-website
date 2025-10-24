import { useState, useCallback, useMemo } from "react";

import { TypeReviewFields } from "app/lib/types/contentful";
import { FILTER_NONE } from "app/utils/variables";

export type ReviewChange =
  | "Adopt a new lifestyle"
  | "Boost overall fitness"
  | "Improve posture"
  | "Increase strength"
  | "Look more fit"
  | "Lose weight"
  | "Move better"
  | "Sleep better";

export type FilterValue = ReviewChange | typeof FILTER_NONE;

export const filterOptions: FilterValue[] = [
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
  const [selectedFilter, setSelectedFilter] =
    useState<FilterValue>(FILTER_NONE);

  const handleFilterChange = useCallback(
    (value: string) => {
      if (selectedFilter === value) {
        setSelectedFilter(FILTER_NONE);
        return;
      }
      setSelectedFilter(value as FilterValue);
    },
    [selectedFilter]
  );

  const filteredReviews = useMemo(() => {
    if (selectedFilter === FILTER_NONE) {
      return allReviews;
    }

    return allReviews.filter((review) =>
      review.changes?.includes(selectedFilter)
    );
  }, [allReviews, selectedFilter]);

  return {
    filteredReviews,
    selectedFilter,
    handleFilterChange,
  };
};

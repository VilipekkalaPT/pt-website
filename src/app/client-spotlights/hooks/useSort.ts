import { TypeReviewFields } from "app/lib/types/contentful";
import { useCallback, useMemo, useState } from "react";

export enum SORT_TYPE {
  RATING_ASC = "rating-asc",
  RATING_DESC = "rating-desc",
  DATE_ASC = "date-asc",
  DATE_DESC = "date-desc",
}

export interface SortOption {
  label: string;
  type: SORT_TYPE;
}

export const sortOptions: SortOption[] = [
  { label: "Rating ascending", type: SORT_TYPE.RATING_ASC },
  { label: "Rating descending", type: SORT_TYPE.RATING_DESC },
  { label: "Oldest first", type: SORT_TYPE.DATE_ASC },
  { label: "Newest first", type: SORT_TYPE.DATE_DESC },
];

const sortingFunctions: Record<
  SORT_TYPE,
  (a: TypeReviewFields, b: TypeReviewFields) => number
> = {
  [SORT_TYPE.RATING_ASC]: (a, b) => Number(a.rating) - Number(b.rating),

  [SORT_TYPE.RATING_DESC]: (a, b) => Number(b.rating) - Number(a.rating),

  [SORT_TYPE.DATE_ASC]: (a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),

  [SORT_TYPE.DATE_DESC]: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
};

export const useSort = (allReviews: TypeReviewFields[]) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[3]);

  const handleSortChange = useCallback((value: string) => {
    const newSortOption = sortOptions.find((option) => option.label === value);
    if (newSortOption) {
      setSelectedSort(newSortOption);
    }
  }, []);

  const sortedReviews = useMemo(() => {
    if (!allReviews.length) return [];

    const sortFunction = sortingFunctions[selectedSort.type];
    if (!sortFunction) {
      console.warn(`Unknown sort type: ${selectedSort}`);
      return [...allReviews];
    }

    return [...allReviews].sort(sortFunction);
  }, [allReviews, selectedSort]);

  return {
    sortedReviews,
    selectedSort,
    handleSortChange,
  };
};

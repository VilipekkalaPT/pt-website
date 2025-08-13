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
  value: SORT_TYPE;
}

export const sortOptions: SortOption[] = [
  { label: "Rating ascending", value: SORT_TYPE.RATING_ASC },
  { label: "Rating descending", value: SORT_TYPE.RATING_DESC },
  { label: "Oldest first", value: SORT_TYPE.DATE_ASC },
  { label: "Newest first", value: SORT_TYPE.DATE_DESC },
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
  const [selectedSort, setSelectedSort] = useState<SORT_TYPE>(
    SORT_TYPE.DATE_DESC
  );

  const handleSortChange = useCallback((value: SORT_TYPE) => {
    setSelectedSort(value);
  }, []);

  const sortedReviews = useMemo(() => {
    if (!allReviews.length) return [];

    const sortFunction = sortingFunctions[selectedSort];
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

import { TypeReviewFields } from "app/lib/types/contentful";
import { useMemo, useState } from "react";

export enum SORT_TYPE {
  RATING_ASC = "rating-asc",
  RATING_DESC = "rating-desc",
}

export interface SortOption {
  label: string;
  value: SORT_TYPE;
}

export const sortOptions: SortOption[] = [
  { label: "Rating ascending", value: SORT_TYPE.RATING_ASC },
  { label: "Rating descending", value: SORT_TYPE.RATING_DESC },
];

export const useSort = (allReviews: TypeReviewFields[]) => {
  const [selectedSort, setSelectedSort] = useState<SORT_TYPE>(
    SORT_TYPE.RATING_DESC
  );

  const handleSortChange = (value: SORT_TYPE) => {
    setSelectedSort(value);
  };

  const result = useMemo(() => {
    const sortedReviews = [...allReviews];

    if (selectedSort === SORT_TYPE.RATING_ASC) {
      sortedReviews.sort((a, b) => Number(a.rating) - Number(b.rating));
    } else {
      sortedReviews.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return sortedReviews;
  }, [allReviews, selectedSort]);

  return {
    result,
    selectedSort,
    handleSortChange,
  };
};

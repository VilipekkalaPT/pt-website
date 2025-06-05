import { SORT_TYPE } from "app/utils/variables";
import { useMemo, useState } from "react";
import { TypePackageFields } from "app/lib/types/contentful";

export const sortOptions = [
  { label: "Price ascending", value: SORT_TYPE.PRICE_ASC },
  { label: "Price descending", value: SORT_TYPE.PRICE_DESC },
];

export const useSort = (allPackages: TypePackageFields[]) => {
  const [selectedSort, setSelectedSort] = useState<SORT_TYPE>(
    sortOptions[0].value
  );

  const handleSortChange = (value: SORT_TYPE) => {
    setSelectedSort(value);
  };

  const result = useMemo(() => {
    const sortedPackages = [...allPackages];

    if (selectedSort === SORT_TYPE.PRICE_ASC) {
      sortedPackages.sort((a, b) => Number(a.price) - Number(b.price));
    } else {
      sortedPackages.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return sortedPackages;
  }, [allPackages, selectedSort]);

  return {
    result,
    selectedSort,
    handleSortChange,
  };
};

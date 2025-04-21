"use client";

import { PACKAGE_TYPE, SORT_TYPE } from "app/utils/variables";
import { useMemo, useState } from "react";
import { TypePackageFields } from "app/lib/types/contentful";

export const sortOptions = [
  { label: "Price ascending", value: SORT_TYPE.PRICE_ASC },
  { label: "Price descending", value: SORT_TYPE.PRICE_DESC },
];

export const tabs: PACKAGE_TYPE[] = [
  PACKAGE_TYPE.ALL,
  PACKAGE_TYPE.SOLO,
  PACKAGE_TYPE.DUO,
  PACKAGE_TYPE.COMBO,
];

export const useSearchSortFilter = (packageList: TypePackageFields[]) => {
  const [selectedSort, setSelectedSort] = useState<SORT_TYPE>(
    sortOptions[0].value
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<PACKAGE_TYPE>(PACKAGE_TYPE.ALL);

  const handleSortChange = (value: SORT_TYPE) => {
    setSelectedSort(value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleTabChange = (tab: PACKAGE_TYPE) => {
    setActiveTab(tab);
  };

  const result = useMemo(() => {
    let filteredPackages = [...packageList];

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredPackages = filteredPackages.filter((pkg: TypePackageFields) =>
        pkg.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (activeTab !== PACKAGE_TYPE.ALL) {
      filteredPackages = filteredPackages.filter(
        (p) => p.type === activeTab.toLowerCase()
      );
    }

    if (selectedSort === SORT_TYPE.PRICE_ASC) {
      filteredPackages.sort((a, b) => Number(a.price) - Number(b.price));
    } else {
      filteredPackages.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filteredPackages;
  }, [activeTab, packageList, searchTerm, selectedSort]);

  return {
    result,
    selectedSort,
    searchTerm,
    activeTab,
    handleSortChange,
    handleSearch,
    handleTabChange,
  };
};

"use client";

import PackageCard from "./PackageCard";
import Search from "./Search";
import Sort from "./Sort";
import Filter from "./Filter";
import {
  sortOptions,
  tabs,
  useSearchSortFilter,
} from "../hooks/useSearchSortFilter";
import { TypePackageFields } from "app/lib/types/contentful";

interface PricingContainerProps {
  allPackages: TypePackageFields[];
}

export default function PricingContainer({
  allPackages,
}: PricingContainerProps) {
  const {
    result,
    searchTerm,
    selectedSort,
    activeTab,
    handleSearch,
    handleSortChange,
    handleTabChange,
  } = useSearchSortFilter(allPackages);

  const renderResults = () => {
    if (result.length === 0) {
      return <p>No packages found.</p>;
    }

    return result.map((p: TypePackageFields) => {
      return <PackageCard key={p.id} singlePackage={p} slug={p.slug} />;
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        <Sort
          selectedSort={selectedSort}
          options={sortOptions}
          handleSortChange={handleSortChange}
        />
      </div>
      <Filter
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="grid grid-cols-3 gap-4 mb-10">{renderResults()}</div>
    </>
  );
}

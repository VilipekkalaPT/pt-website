"use client";

import { TypePackageFields } from "app/lib/types/contentful";
import { sortOptions, useSort } from "../hooks/useSort";
import Sort from "./Sort";
import PackageCard from "./PackageCard";

interface PackagesContainerProps {
  type: string;
  packages: TypePackageFields[];
}

export default function PackagesContainer({
  type,
  packages,
}: PackagesContainerProps) {
  const { result, selectedSort, handleSortChange } = useSort(packages);

  return (
    <div className="px-12">
      <Sort
        selectedSort={selectedSort}
        options={sortOptions}
        handleSortChange={handleSortChange}
        className="justify-end"
      />
      <div className="grid grid-cols-3 gap-8 mt-10">
        {result.map((pkg) => (
          <PackageCard
            key={pkg.slug}
            singlePackage={pkg}
            href={`${type}/${pkg.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

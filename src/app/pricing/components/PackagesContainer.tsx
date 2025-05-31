"use client";

import { TypePackageFields } from "app/lib/types/contentful";
import { sortOptions, useSort } from "../hooks/useSort";
import Sort from "./Sort";
import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";

interface PackagesContainerProps {
  type: string;
  packages: TypePackageFields[];
  soloPackages: TypePackageFields[];
}

export default function PackagesContainer({
  type,
  packages,
  soloPackages,
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
        {result.map((pkg) => {
          const savedAmount = calculateSavedAmount(pkg, soloPackages);

          return (
            <PackageCard
              key={pkg.slug}
              singlePackage={pkg}
              href={`${type}/${pkg.slug}`}
              savedAmount={savedAmount}
            />
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { TypePackageFields } from "app/lib/types/contentful";

import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";

interface PackagesContainerProps {
  type: string;
  packages: TypePackageFields[];
}

export default function PackagesContainer({
  type,
  packages,
}: PackagesContainerProps) {
  // const { result } = useSort(packages);

  const numberOfColumns = packages.length % 2 === 0 ? 2 : 3;

  return (
    <div className="px-12">
      {/* <Sort
        selectedSort={selectedSort}
        options={sortOptions}
        handleSortChange={handleSortChange}
        className="justify-end"
      /> */}
      <div className={`grid grid-cols-${numberOfColumns} gap-8 mt-10`}>
        {packages.map((pkg) => {
          const savedAmount = calculateSavedAmount(pkg, packages);

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

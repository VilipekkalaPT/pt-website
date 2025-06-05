import {
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Card from "app/components/Card";
import { FitQuizStep } from "app/lib/data/fitQuiz";
import React from "react";
import cn from "classnames";
import { FilteredPackage, PackageFilter } from "../hooks/useFilter";
import RecommendedPackageCard from "./RecommendedPackageCard";

interface FitQuizContentProps {
  stepData: FitQuizStep;
  filters: PackageFilter[];
  selectFilter: (filter: PackageFilter) => void;
  filteredPackages: FilteredPackage[];
  showResult: boolean;
}

export default function FitQuizContent({
  stepData,
  filters,
  selectFilter,
  filteredPackages,
  showResult,
}: FitQuizContentProps) {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <p className="mt-8 text-2xl font-semibold">{stepData.question}</p>
      <p className="mt-1 mb-6 text-xl text-gray-400">{stepData.subtitle}</p>
      {showResult ? (
        <div className="grid grid-cols-3 gap-8">
          {filteredPackages.map((p) => (
            <RecommendedPackageCard key={p.package.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="flex justify-between gap-8">
          {stepData.options.map((option, index) => (
            <Card
              key={option.id}
              className={cn(
                "flex-1 items-center text-center py-6 px-8 cursor-pointer hover:bg-gray-100",
                {
                  "bg-gray-100": filters.includes(option.id as PackageFilter),
                }
              )}
              onClick={() => selectFilter(option.id as PackageFilter)}
            >
              {getIconComponent(index)}
              <p className="text-xl font-semibold">{option.label}</p>
              <p className="text-gray-700">{option.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

const getIconComponent = (index: number) => {
  const style = "size-10 mb-4";

  switch (index) {
    case 0:
      return <UserIcon className={style} />;
    case 1:
      return <UsersIcon className={style} />;
    case 2:
      return <UserGroupIcon className={style} />;
    default:
      return <UserIcon className={style} />;
  }
};

import { TypePackageFields } from "app/lib/types/contentful";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";

interface PackagesContainerProps {
  type: string;
  title: string;
  subtitle: string;
  packages: TypePackageFields[];
}

export default function PackagesContainer({
  type,
  title,
  subtitle,
  packages,
}: PackagesContainerProps) {
  const numberOfColumns = packages.length % 2 === 0 ? 2 : 3;

  return (
    <div className="w-4/5 mx-auto mt-20 flex flex-col items-center">
      <ArrowDownIcon className="size-12 text-icon-secondary stroke-2" />
      <p className="heading mt-8 mb-1">{title}</p>
      <p className="subheading text-white/70">{subtitle}</p>
      <div className={`grid grid-cols-${numberOfColumns} gap-8 mt-6`}>
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

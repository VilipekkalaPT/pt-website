import { TypePackageFields } from "app/lib/types/contentful";
import cn from "classnames";

import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";
import InfoSection from "app/components/InfoSection";

interface PackagesContainerProps {
  type: string;
  title: string;
  subtitle: string;
  packages: TypePackageFields[];
  hasComboPackages?: boolean;
}

export default function PackagesContainer({
  type,
  title,
  subtitle,
  packages,
  hasComboPackages = false,
}: PackagesContainerProps) {
  const numberOfColumns = packages.length % 2 === 0 ? 2 : 3;

  return (
    <div
      className={cn("w-[90%] md:w-3/5 mx-auto flex flex-col items-center", {
        "pt-16 pb-12": !hasComboPackages,
        "pt-4 pb-6": hasComboPackages,
      })}
    >
      <InfoSection title={title} subtitle={subtitle} />
      <div
        className={`grid grid-cols-1 md:grid-cols-${numberOfColumns} gap-6 ${
          hasComboPackages ? "mt-6" : "mt-12"
        }`}
      >
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

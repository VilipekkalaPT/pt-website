import { TypePackageFields } from "app/lib/types/contentful";
import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";

interface ComboSectionProps {
  type: string;
  title?: string;
  subtitle?: string;
  comboPackages: TypePackageFields[];
  soloPackages: TypePackageFields[];
}

export default function ComboSection({
  type,
  title,
  subtitle,
  comboPackages,
  soloPackages,
}: ComboSectionProps) {
  return (
    <div className="mt-20 w-[95%] mx-auto flex flex-col items-center">
      <h2 className="heading">{title}</h2>
      <p className="subheading text-white/70 mt-1 mb-8">{subtitle}</p>
      <div className="flex gap-8">
        {comboPackages?.map((pkg) => {
          const savedAmount = calculateSavedAmount(pkg, soloPackages);
          return (
            <PackageCard
              key={pkg.slug}
              singlePackage={pkg}
              href={`${type}/${pkg.slug}`}
              savedAmount={savedAmount}
              darkMode
            />
          );
        })}
      </div>
    </div>
  );
}

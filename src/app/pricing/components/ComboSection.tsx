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
    <div className="mt-35 bg-black text-gray-100 pt-8 pb-16 px-12">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <p className="mt-2 mb-8 text-xl text-center text-gray-400">{subtitle}</p>
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

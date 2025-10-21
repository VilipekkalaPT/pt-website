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
    <div className="mx-8 py-16 flex flex-col items-center">
      <h2 className="heading">{title}</h2>
      <p className="subheading text-white/70 mt-1">{subtitle}</p>
      <div className="mt-12 flex gap-8">
        {comboPackages?.map((pkg) => {
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

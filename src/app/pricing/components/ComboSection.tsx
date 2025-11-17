"use client";

import { useMemo } from "react";
import { TypePackageFields } from "app/lib/types/contentful";
import PackageCard from "./PackageCard";
import { calculateSavedAmount } from "app/utils/utils";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface ComboSectionProps {
  type: string;
  title?: string;
  subtitle?: string;
  comboPackages: TypePackageFields[];
  soloPackages: TypePackageFields[];
}

interface PackageWithSavings {
  package: TypePackageFields;
  savedAmount: number;
}

export default function ComboSection({
  type,
  title,
  subtitle,
  comboPackages,
  soloPackages,
}: ComboSectionProps) {
  // Calculate saved amounts for all packages
  const packagesWithSavings = useMemo<PackageWithSavings[]>(() => {
    if (!comboPackages || comboPackages.length === 0) {
      return [];
    }

    return comboPackages.map((pkg) => ({
      package: pkg,
      savedAmount: calculateSavedAmount(pkg, soloPackages),
    }));
  }, [comboPackages, soloPackages]);

  return (
    <section aria-label={title || "Combo packages section"}>
      <div className="hidden md:block">
        <div className="w-4/5 mx-auto py-16">
          <SectionHeader title={title} subtitle={subtitle} />
          <div className="grid grid-cols-3 gap-8">
            {packagesWithSavings.map(({ package: pkg, savedAmount }) => (
              <PackageCard
                key={pkg.slug}
                singlePackage={pkg}
                href={`${type}/${pkg.slug}`}
                savedAmount={savedAmount}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden w-full py-16">
        <div className="px-4">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
        <MobilePackageCarousel
          packagesWithSavings={packagesWithSavings}
          type={type}
        />
      </div>
    </section>
  );
}

const SectionHeader = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => (
  <div className="text-center mb-6 md:mb-12">
    <h2 className="heading">{title}</h2>
    {subtitle && <p className="subheading text-white/70 mt-1">{subtitle}</p>}
  </div>
);

const MobilePackageCarousel = ({
  packagesWithSavings,
  type,
}: {
  packagesWithSavings: PackageWithSavings[];
  type: string;
}) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 1.2,
      spacing: 16,
    },
  });

  return (
    <div ref={sliderRef} className="md:hidden keen-slider">
      {packagesWithSavings.map(({ package: pkg, savedAmount }) => (
        <div className="keen-slider__slide" key={pkg.slug}>
          <PackageCard
            singlePackage={pkg}
            href={`${type}/${pkg.slug}`}
            savedAmount={savedAmount}
            className="h-full min-h-[40rem]"
          />
        </div>
      ))}
    </div>
  );
};

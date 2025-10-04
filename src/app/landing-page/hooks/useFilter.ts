import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import { BEST_MATCH, MOST_POPULAR, BEST_VALUE } from "app/utils/variables";
import { useMemo, useState } from "react";

export type TagFilter = "gym" | "plan" | "diet";
export type TypeFilter = "solo" | "duo";
export type PackageFilter = TypeFilter | TagFilter;
export type FilteredPackage = {
  tag: string;
  package: TypePackageFields;
};

export const useFilter = (packages: TypePackageFields[]) => {
  const [selectedOptions, setSelectedOptions] = useState<Map<number, string[]>>(
    new Map()
  );

  const handleOptionSelect = (stepId: number, option: string) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev.get(stepId) || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((opt) => opt !== option)
        : [...currentOptions, option];
      return new Map(prev).set(stepId, newOptions);
    });
  };

  const clearSelectedOptions = () => {
    setSelectedOptions(new Map());
  };

  const filteredPackages = useMemo(() => {
    const typeFilters = selectedOptions.get(1) || [];
    const tagFilters = selectedOptions.get(2) || [];

    const filtered = packages.filter((pkg) => {
      const matchesType =
        typeFilters.length === 0 ||
        typeFilters.includes(pkg.type as TypeFilter);

      const matchesTags =
        tagFilters.length === 0 ||
        (tagFilters.length === pkg.tags.length &&
          tagFilters.every((tag) => pkg.tags.includes(tag as TagFilter)));

      return matchesType && matchesTags;
    });

    const taggedPackages = filtered.map((pkg) => ({
      package: pkg,
      tag: BEST_MATCH,
    }));

    return taggedPackages;
  }, [packages, selectedOptions]);

  const specialPackages = addSpecialPackages(selectedOptions, packages);

  return {
    selectedOptions,
    filteredPackages: filteredPackages,
    specialPackages: specialPackages,
    handleOptionSelect,
    clearSelectedOptions,
  };
};

const addSpecialPackages = (
  selectedOptions: Map<number, string[]>,
  allPackages: TypePackageFields[]
): FilteredPackage[] => {
  const result: FilteredPackage[] = [];

  const specialPackages = {
    golden: findPackage("golden", allPackages),
    bronze: findPackage("bronze", allPackages),
    duoGymPlan: allPackages.find(
      (p) =>
        p.type === "duo" && p.tags.includes("gym") && p.tags.includes("plan")
    ),
  };
  const typeFilter = selectedOptions.get(1) || [];

  if (typeFilter.includes("duo") && specialPackages.duoGymPlan) {
    result.push({
      package: specialPackages.duoGymPlan,
      tag: BEST_VALUE,
    });
    return result;
  }

  if (specialPackages.golden) {
    result.push({
      package: specialPackages.golden,
      tag: BEST_VALUE,
    });
  }

  if (specialPackages.bronze) {
    result.push({
      package: specialPackages.bronze,
      tag: MOST_POPULAR,
    });
  }

  return result;
};

const findPackage = (slug: string, allPackages: TypePackageFields[]) =>
  allPackages.find((p) => p.slug.includes(slug));

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
    const typeFilters = selectedOptions.get(0) || [];
    const tagFilters = selectedOptions.get(1) || [];

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

  const specialPackages = addSpecialPackages(
    selectedOptions,
    packages,
    filteredPackages
  );
  const finalPackages = specialPackages.slice(0, 3);

  return {
    selectedOptions,
    hasMatchedPackages: filteredPackages.length > 0,
    finalPackages: finalPackages,
    handleOptionSelect,
    clearSelectedOptions,
  };
};

const addSpecialPackages = (
  selectedOptions: Map<number, string[]>,
  allPackages: TypePackageFields[],
  filteredPackages: FilteredPackage[]
): FilteredPackage[] => {
  const result: FilteredPackage[] = [...filteredPackages];
  const existingPackageIds = new Set(result.map((p) => p.package.id));

  const specialPackages = {
    golden: findPackage("golden", allPackages),
    bronze: findPackage("bronze", allPackages),
    silver: findPackage("silver", allPackages),
    duoSpecial: allPackages.find(
      (p) =>
        p.type === "duo" && p.tags.includes("gym") && p.tags.includes("plan")
    ),
  };
  const typeFilter = selectedOptions.get(0) || [];

  if (
    !specialPackages.golden ||
    !specialPackages.bronze ||
    !specialPackages.silver ||
    !specialPackages.duoSpecial
  )
    return result;

  if (typeFilter.includes("duo")) {
    pushIfNotExists(
      result,
      existingPackageIds,
      specialPackages.duoSpecial,
      BEST_VALUE
    );
    existingPackageIds.add(specialPackages.duoSpecial.id);
  }

  pushIfNotExists(
    result,
    existingPackageIds,
    specialPackages.golden,
    BEST_VALUE
  );
  pushIfNotExists(
    result,
    existingPackageIds,
    specialPackages.bronze,
    MOST_POPULAR
  );
  pushIfNotExists(
    result,
    existingPackageIds,
    specialPackages.silver,
    BEST_VALUE
  );

  return result;
};

const findPackage = (slug: string, allPackages: TypePackageFields[]) =>
  allPackages.find((p) => p.slug.includes(slug));

const pushIfNotExists = (
  result: FilteredPackage[],
  existingPackageIds: Set<number>,
  pkg: TypePackageFields,
  tag: string
) => {
  if (!existingPackageIds.has(pkg.id)) {
    result.push({ package: pkg, tag });
    existingPackageIds.add(pkg.id);
  }
};

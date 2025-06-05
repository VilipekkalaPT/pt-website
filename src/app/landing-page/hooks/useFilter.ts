import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import { BEST_MATCH, MOST_POPULAR, MOST_VALUABLE } from "app/utils/variables";
import { useCallback, useMemo, useState } from "react";

export type TagFilter = "gym" | "plan" | "diet";
export type TypeFilter = "solo" | "duo";
export type PackageFilter = TagFilter | TypeFilter;
export type FilteredPackage = {
  tag: string;
  package: TypePackageFields;
};

export const useFilter = (packages: TypePackageFields[]) => {
  const [filters, setFilters] = useState<PackageFilter[]>([]);

  const selectFilter = (filter: PackageFilter) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const filteredPackages = useMemo(() => {
    const typeFilters = filters.filter(isTypeFilter);
    const tagFilters = filters.filter(isTagFilter);

    const filteredResults = packages.filter((pkg) => {
      const matchesType =
        typeFilters.length === 0 ||
        typeFilters.includes(pkg.type.toLowerCase() as TypeFilter);

      const matchesTag =
        tagFilters.length === 0 ||
        tagFilters.every((tag) =>
          pkg.tags.every((t) => t.toLowerCase() === tag.toLowerCase())
        );

      return matchesType && matchesTag;
    });

    const packagesWithTags = filteredResults.map((pkg) => ({
      package: pkg,
      tag: BEST_MATCH,
    }));

    // Handle special prioritization for certain packages
    return prioritizeSpecialPackages(packagesWithTags, packages);
  }, [filters, packages]);

  return {
    filteredPackages,
    filters,
    selectFilter,
    clearFilters,
  };
};

const isTypeFilter = (filter: PackageFilter): filter is TypeFilter => {
  return filter === "solo" || filter === "duo";
};

const isTagFilter = (filter: PackageFilter): filter is TagFilter => {
  return filter === "gym" || filter === "plan" || filter === "diet";
};

function prioritizeSpecialPackages(
  filteredResults: FilteredPackage[],
  allPackages: TypePackageFields[]
): FilteredPackage[] {
  if (filteredResults.length === 1) {
    const result = [...filteredResults];
    const packages = result.map((p) => p.package);
    const goldenPackage = allPackages.find((p) => p.slug.includes("golden"));
    const bronzePackage = allPackages.find((p) => p.slug.includes("bronze"));

    if (goldenPackage && !packages.includes(goldenPackage)) {
      result.unshift({ package: goldenPackage, tag: MOST_VALUABLE });
    }

    if (bronzePackage && !packages.includes(bronzePackage)) {
      result.push({ package: bronzePackage, tag: MOST_POPULAR });
    }

    return result;
  }

  return filteredResults;
}

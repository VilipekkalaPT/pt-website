import { useState, useMemo } from "react";
import { TypePackageFields } from "app/lib/types/contentful";
import { BEST_MATCH, MOST_POPULAR, BEST_VALUE } from "app/utils/variables";
import {
  loadFitQuiz,
  saveFitQuiz,
  clearFitQuiz,
} from "app/utils/fitQuizStorage";

export type TagFilter = "gym" | "plan" | "diet";
export type TypeFilter = "solo" | "duo";
export type PackageFilter = TypeFilter | TagFilter;
export type FilteredPackage = {
  tag: string;
  package: TypePackageFields;
};

export const useFitQuizManager = (
  allPackages: TypePackageFields[],
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [selectedOptions, setSelectedOptions] = useState<Map<number, string[]>>(
    new Map()
  );
  const [storedFilterPackages, setStoredFilterPackages] = useState<
    FilteredPackage[]
  >([]);
  const [showFitQuiz, setShowFitQuiz] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  useMemo(() => {
    const stored = loadFitQuiz();
    if (stored) {
      setSelectedOptions(new Map(stored.answers));
      setStoredFilterPackages(stored.result);
      setShowFitQuiz(true);
      setShowResult(true);
      setActiveStep(stored.result.length);
    }
  }, []);

  const filteredPackages: FilteredPackage[] = useMemo(() => {
    return filterPackages(selectedOptions, allPackages);
  }, [selectedOptions, allPackages]);

  const specialPackages = useMemo(() => {
    return addSpecialPackages(selectedOptions, allPackages, filteredPackages);
  }, [selectedOptions, allPackages, filteredPackages]);

  const finalPackages = useMemo(
    () => specialPackages.slice(0, 3),
    [specialPackages]
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

  const handleShowResult = (showResult: boolean) => {
    setShowResult(showResult);
    if (showResult) {
      saveFitQuiz({
        answers: Array.from(selectedOptions.entries()),
        result: finalPackages,
      });
    } else {
      clearFitQuiz();
    }
  };

  const handleClose = () => {
    setShowFitQuiz(false);
    setActiveStep(0);
    setShowResult(false);
    setSelectedOptions(new Map());
    clearFitQuiz();
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    showFitQuiz,
    activeStep,
    showResult,
    hasMatchedPackages: filteredPackages.length > 0,
    selectedOptions,
    storedFilterPackages,
    finalPackages,
    setActiveStep,
    setShowFitQuiz,
    handleOptionSelect,
    handleShowResult,
    handleClose,
  };
};

const filterPackages = (
  selectedOptions: Map<number, string[]>,
  packages: TypePackageFields[]
): FilteredPackage[] => {
  const typeFilters = selectedOptions.get(0) || [];
  const tagFilters = selectedOptions.get(1) || [];

  const filtered = packages.filter((pkg) => {
    const matchesType =
      typeFilters.length === 0 || typeFilters.includes(pkg.type as TypeFilter);

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

  if (typeFilter.includes("solo")) {
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
  }

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

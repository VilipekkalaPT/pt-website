import {
  FIT_QUIZ_RESULT_DESCRIPTION,
  FIT_QUIZ_RESULT_DESCRIPTION_NO_MATCH,
  FIT_QUIZ_RESULT_TITLE,
  FIT_QUIZ_RESULT_TITLE_NO_MATCH,
} from "app/utils/variables";
import { FilteredPackage } from "../hooks/useFilter";
import { motion } from "framer-motion";
import RecommendationPackageCard from "./RecommendationPackageCard";
import { useMemo } from "react";

interface FitQuizResultProps {
  result: {
    filteredPackages: FilteredPackage[];
    specialPackages: FilteredPackage[];
  };
}

const ResultHeader = ({ hasMatches }: { hasMatches: boolean }) => (
  <>
    <p className="mt-8 text-2xl font-semibold">
      {hasMatches ? FIT_QUIZ_RESULT_TITLE : FIT_QUIZ_RESULT_TITLE_NO_MATCH}
    </p>
    <p className="mt-1 mb-10 text-xl text-gray-400">
      {hasMatches
        ? FIT_QUIZ_RESULT_DESCRIPTION
        : FIT_QUIZ_RESULT_DESCRIPTION_NO_MATCH}
    </p>
  </>
);

export default function FitQuizResult({ result }: FitQuizResultProps) {
  const { filteredPackages, specialPackages } = result;

  const packagesToDisplay = useMemo(() => {
    if (filteredPackages.length === 0) {
      return specialPackages;
    }

    if (filteredPackages.length === 1) {
      return [
        ...specialPackages.slice(0, 1),
        ...filteredPackages,
        ...specialPackages.slice(1, 2),
      ];
    }

    const packageIds = new Set(filteredPackages.map((p) => p.package.id));
    const uniqueSpecials = specialPackages.filter(
      (p) => !packageIds.has(p.package.id)
    );

    return [...filteredPackages, ...uniqueSpecials].slice(0, 3);
  }, [filteredPackages, specialPackages]);

  return (
    <div className="flex flex-col items-center">
      <ResultHeader hasMatches={filteredPackages.length > 0} />
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="flex gap-8"
      >
        {packagesToDisplay.map((p) => (
          <RecommendationPackageCard key={p.package.id} p={p} />
        ))}
      </motion.div>
    </div>
  );
}

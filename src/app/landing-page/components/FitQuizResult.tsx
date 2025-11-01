import {
  FIT_QUIZ_RESULT_DESCRIPTION,
  FIT_QUIZ_RESULT_DESCRIPTION_NO_MATCH,
  FIT_QUIZ_RESULT_TITLE,
  FIT_QUIZ_RESULT_TITLE_NO_MATCH,
} from "app/utils/variables";
import { FilteredPackage } from "../hooks/useFitQuizManager";
import { motion } from "framer-motion";
import RecommendationPackageCard from "./RecommendationPackageCard";

interface FitQuizResultProps {
  hasMatchedPackages: boolean;
  displayedPackages: FilteredPackage[];
}

const ResultHeader = ({ hasMatches }: { hasMatches: boolean }) => (
  <>
    <p className="text-2xl">
      {hasMatches ? FIT_QUIZ_RESULT_TITLE : FIT_QUIZ_RESULT_TITLE_NO_MATCH}
    </p>
    <p className="mt-1 mb-4 text-xl text-gray-400 font-light">
      {hasMatches
        ? FIT_QUIZ_RESULT_DESCRIPTION
        : FIT_QUIZ_RESULT_DESCRIPTION_NO_MATCH}
    </p>
  </>
);

export default function FitQuizResult({
  hasMatchedPackages,
  displayedPackages,
}: FitQuizResultProps) {
  const colStyle =
    displayedPackages.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className="w-full mt-4 flex flex-col items-center text-center">
      <ResultHeader hasMatches={hasMatchedPackages} />
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full flex gap-8"
      >
        <div className={`grid grid-cols-1 ${colStyle} gap-6 items-start`}>
          {displayedPackages.map((p) => (
            <RecommendationPackageCard key={p.package.id} p={p} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

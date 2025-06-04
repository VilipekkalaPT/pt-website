import { UserIcon } from "@heroicons/react/24/outline";
import Card from "app/components/Card";

interface FitQuizProps {
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function FitQuiz({ ref }: FitQuizProps) {
  return (
    <div
      className="w-3/4 mx-auto h-screen flex flex-col justify-center items-center"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Who is training?</p>
      <p className="mt-1 mb-4 text-xl text-gray-400">
        Pick what fits your vibe first
      </p>
      <div className="flex justify-between gap-8">
        <Card className="items-center text-center border border-gray-200 py-6 px-8">
          <UserIcon className="size-10 mb-4" />
          <p className="text-xl font-semibold">Just me (Solo)</p>
          <p className="text-gray-700">
            You want 1-on-1 attention to focus fully on your personal fitness
            journey.
          </p>
        </Card>
        <Card className="items-center text-center border border-gray-200 py-6 px-8">
          <UserIcon className="size-10 mb-4" />
          <p className="text-xl font-semibold">Me + someone (Duo)</p>
          <p className="text-gray-700">
            You and a friend or partner want to train together and slay
            side-by-side
          </p>
        </Card>
      </div>
    </div>
  );
}

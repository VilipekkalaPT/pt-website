import { TypeKickOffProcessFields } from "app/lib/types/contentful";
import { SLAY_PROCESS } from "app/utils/variables";
import TimelineComponent from "./TimelineComponent";

type KickOffProcessProps = {
  process: TypeKickOffProcessFields[];
};

export default function KickOffProcess({ process }: KickOffProcessProps) {
  const sortedProcess = [...process].sort((a, b) => a.id - b.id);

  return (
    <div className="mt-40">
      <p className="text-2xl font-medium text-center">{SLAY_PROCESS}</p>
      <TimelineComponent process={sortedProcess} />
    </div>
  );
}

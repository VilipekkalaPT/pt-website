import Image from "next/image";

import { TypeKickOffProcessFields } from "app/lib/types/contentful";
import { SLAY_PROCESS } from "app/utils/variables";

type KickOffProcessProps = {
  process: TypeKickOffProcessFields[];
};

export default function KickOffProcess({ process }: KickOffProcessProps) {
  return (
    <div className="mt-30 pb-20">
      <p className="text-2xl font-medium text-center">{SLAY_PROCESS}</p>
      <Image
        src="/process.png"
        alt="Divider"
        width={1200}
        height={403}
        className="w-full mt-8 object-contain"
      />
    </div>
  );
}

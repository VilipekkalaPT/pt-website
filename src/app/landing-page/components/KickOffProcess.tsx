import Image from "next/image";

import { TypeKickOffProcessFields } from "app/lib/types/contentful";
import { SLAY_PROCESS } from "app/utils/variables";

type KickOffProcessProps = {
  process: TypeKickOffProcessFields[];
};

export default function KickOffProcess({}: KickOffProcessProps) {
  return (
    <div className="py-16">
      <p className="heading text-center">{SLAY_PROCESS}</p>
      <div className="w-full h-[9rem] md:h-[32rem] relative">
        <Image src="/process.png" alt="Divider" fill className="object-cover" />
      </div>
    </div>
  );
}

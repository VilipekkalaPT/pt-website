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

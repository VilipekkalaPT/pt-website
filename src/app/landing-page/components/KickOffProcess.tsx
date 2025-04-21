import { TypeKickOffProcessFields } from "app/lib/types/contentful";

type KickOffProcessProps = {
  process: TypeKickOffProcessFields[];
};

export default function KickOffProcess({ process }: KickOffProcessProps) {
  const sortedProcess = process.sort((a, b) => a.order - b.order);
  return (
    <div className="w-full p-6">
      <p className="text-2xl font-bold">The kick-off process</p>
      <div className="mt-6 grid grid-cols-3 gap-12">
        {sortedProcess.map((step) => (
          <ProcessStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ step }: { step: TypeKickOffProcessFields }) {
  return (
    <div>
      <div className="flex items-center">
        <StepNumber order={step.order} />
        <span className="text-xl font-bold ml-3">{step.title}</span>
      </div>
      <p className="ml-11 text-gray-500">{step.description}</p>
    </div>
  );
}

function StepNumber({ order }: { order: number }) {
  return (
    <div className="w-8 h-8 text-black rounded-full border-2 border-black flex items-center justify-center font-bold">
      {order}
    </div>
  );
}

interface IntroductionProps {
  name: string;
  shortDescription: string;
  vision: string;
}

export default function Introduction({
  name,
  shortDescription,
  vision,
}: IntroductionProps) {
  return (
    <div className="bg-gray-100 px-12 py-60">
      <p className="text-6xl font-bold">{name}</p>
      <p className="text-gray-600 pt-4 text-3xl">{shortDescription}</p>
      <p className="text-gray-400 pt-20 text-3xl">{vision}</p>
    </div>
  );
}

interface JourneyProps {
  title: string;
  subtitle: string;
}

export default function Journey({ title, subtitle }: JourneyProps) {
  return (
    <div className="my-15 ml-12">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-gray-500 mt-1 mb-4">{subtitle}</p>
    </div>
  );
}

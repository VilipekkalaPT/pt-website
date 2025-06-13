import Chip from "app/components/Chip";
import { TypeLandingPageServicesFields } from "app/lib/types/contentful";

interface ServiceSectionProps {
  title: string;
  subtitle: string;
  services: TypeLandingPageServicesFields[];
}

export default function ServiceSection({
  title,
  subtitle,
  services,
}: ServiceSectionProps) {
  return (
    <div className="mt-16 px-12 text-center">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-xl text-gray-400">{subtitle}</p>
      <div className="grid grid-cols-4 gap-6 mt-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg flex flex-col items-center"
          >
            <Chip label={service.tag} color="gray" className="my-4" />
            <p className="text-2xl font-semibold mb-2">{service.title}</p>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

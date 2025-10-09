import { Asset, AssetFields } from "contentful";

import { HeadingSectionType } from "app/lib/types/type";
import Card from "app/components/Card";
import { TypeImageCardFields } from "app/lib/types/contentful";
import HeroSection from "app/components/HeroSection";
import Button from "app/components/Button";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";

interface PricingPageHeadingProps {
  title: string;
  subtitle: string;
  image: Asset;
  packageCards: TypeImageCardFields[];
}

export default function PricingPageHeading({
  title,
  subtitle,
  image,
  packageCards,
}: PricingPageHeadingProps) {
  const imageField: AssetFields = image.fields as AssetFields;
  const headingSections: HeadingSectionType[] = [
    {
      heading: title,
      subheading: subtitle,
    },
  ];

  return (
    <div className="relative">
      <HeroSection
        image={imageField}
        headingSections={headingSections}
        fillImage={false}
      />
      <div className="w-4/5 mx-auto absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex gap-8">
        {packageCards.map((card, index) => (
          <div
            key={index}
            className="relative flex-1 flex flex-col items-center"
          >
            <div className="absolute top-0 left-0 transform translate-y-1/2 p-4 rounded-full bg-white/25 z-5 glass-effect flex justify-center items-center">
              {getIcon(card.title)}
            </div>
            <Card
              key={index}
              glassmorphism
              className="flex-1 w-full px-8 py-12 text-center justify-center items-center bg-primary/50 border-none"
            >
              <p className="text-2xl font-medium">{card.title}</p>
              <p className="text-xl font-light mb-4">{card.subtitle}</p>
              <Button variant="primary" label={card.actionButtonText} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

const getIcon = (cardTitle: string) => {
  const title = cardTitle.toLowerCase();
  if (title.includes("solo")) return <UserIcon className="size-6" />;
  return <UsersIcon className="size-6" />;
};

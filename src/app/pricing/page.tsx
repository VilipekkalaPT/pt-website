"use client";

import Divider from "app/components/Divider";
import ImageCard from "app/components/ImageCard";
import { TypeLandingPageCardFieldsWithImage } from "app/lib/types/contentful/TypeLandingPageCard";
import { ROUTES } from "app/utils/routes";
import { AssetFields } from "contentful";
import { useRouter } from "next/navigation";

const imageCards: TypeLandingPageCardFieldsWithImage[] = [
  {
    title: "Solo Slay Packages",
    subtitle: "One-on-one coaching tailored just for you.",
    actionButtonText: "Explore",
    image: {
      file: {
        url: "/images/solo-packages.jpg",
        details: { image: { width: 600, height: 400 } },
      },
    } as AssetFields,
    slug: "solo-packages",
  },
  {
    title: "Duo Slay Packages",
    subtitle: "Train with a friend or partner. Shared goals, individual plans.",
    actionButtonText: "Explore",
    image: {
      file: {
        url: "/images/duo-packages.jpg",
        details: { image: { width: 600, height: 400 } },
      },
    } as AssetFields,
    slug: "duo-packages",
  },
];

export default function PricingPage() {
  const router = useRouter();

  return (
    <>
      <div className="w-1/2 mx-auto py-32 text-center">
        <p className="text-5xl font-bold">Slay Pricing</p>
        <p className="text-2xl mt-2">
          Explore your options & see how Vili’s personalized service stacks up
        </p>
      </div>
      <div className="w-2/3 mx-auto mt-10 flex items-center">
        <div className="flex-2 flex flex-col pr-20">
          <p className="text-2xl font-semibold text-gray-800 w-full">
            Tired of trying everything and getting nowhere?
          </p>
          <p className="mt-1 mb-6 text-xl text-gray-400">
            WERK it out till you GLOW it out!
          </p>
          <p className="text-sm text-gray-600">
            Your journey is unique—and so is the way we train. Whether you’re
            just starting out or stuck in a rut, SlayFitVili helps cut through
            the fitness noise. With real support, smart plans, and a style that
            fits your life—not someone else’s.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This page is your roadmap. Find what you need, skip what you don’t,
            and start building strength that actually sticks.
          </p>
        </div>
        <p className="flex-1 justify-end text-5xl font-bold text-gray-500">
          “Finding the right personal trainer shouldn’t feel like another
          workout”
        </p>
      </div>

      <div className="mt-35 w-full px-12 flex flex-col items-center">
        <p className="text-2xl font-semibold">Choose your fit</p>
        <p className="text-gray-600">
          There’s a package that matches your vibe, goals, and schedule
        </p>
        <div className="mt-10 w-full grid grid-cols-2 gap-10">
          {imageCards.map((card, index) => (
            <ImageCard
              key={index}
              imageCard={card}
              handleClick={() => router.push(`${ROUTES.PRICING}/${card.slug}`)}
            />
          ))}
        </div>
      </div>
      <Divider />
    </>
  );
}

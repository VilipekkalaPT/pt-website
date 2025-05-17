import { getAssets, getEntries } from "app/lib/contentfulDataService";
import {
  TypeAboutPageDataFields,
  TypeAboutPageDataSkeleton,
} from "app/lib/types/contentful/TypeAboutPageData";
import Divider from "app/components/Divider";
import AwardsAndAchievements from "./components/AwardsAndAchievements";
import Philosophy from "./components/Philosophy";
import Journey from "./components/Journey";
import Introduction from "./components/Introduction";

export default async function About() {
  const [images, aboutPageData] = await Promise.all([
    getAssets(),
    getEntries<TypeAboutPageDataSkeleton>("aboutPageData"),
  ]);

  const aboutPageContent: TypeAboutPageDataFields = aboutPageData[0];

  return (
    <div className="mt-22">
      <Introduction
        name={aboutPageContent.name}
        shortDescription={aboutPageContent.shortDescription}
        vision={aboutPageContent.vision}
      />
      <Philosophy
        title={aboutPageContent.philosophyTitle}
        subtitle={aboutPageContent.philosophySubtitle}
        content={aboutPageContent.philosophyContent}
        images={images}
      />
      <div className="bg-gray-100 py-40 flex flex-col items-center justify-center">
        {aboutPageContent.slogans.map((slogan) => (
          <p key={slogan} className="text-5xl font-bold mb-1">
            {slogan}
          </p>
        ))}
      </div>
      <Journey
        title={aboutPageContent.journeyTitle}
        subtitle={aboutPageContent.journeySubtitle ?? ""}
      />
      <AwardsAndAchievements
        title={aboutPageContent.awardsAndAchievementsTitle}
        subtitle={aboutPageContent.awardsAndAchievementsSubtitle ?? ""}
      />
      <Divider />
    </div>
  );
}

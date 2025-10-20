import { getEntries } from "app/lib/contentfulDataService";
import {
  TypeAboutPageDataFields,
  TypeAboutPageDataSkeleton,
} from "app/lib/types/contentful/TypeAboutPageData";
import Philosophy from "./components/Philosophy";
import Journey from "./components/Journey";
import HeadingSection from "./components/HeadingSection";
import { AssetFields } from "contentful";
import { TypeTimelinePeriodFields } from "app/lib/types/contentful/TypeTimelinePeriod";
import InfoSection from "../components/InfoSection";
import Button from "app/components/Button";

export default async function About() {
  const aboutPageData = await getEntries<TypeAboutPageDataSkeleton>(
    "aboutPageData"
  );

  const aboutPageContent: TypeAboutPageDataFields = aboutPageData[0];
  const headingSectionImage = aboutPageContent.headingSectionImage
    .fields as AssetFields;
  const philosophyImage = aboutPageContent.philosophyImage
    .fields as AssetFields;
  const timelinePeriods = aboutPageContent.journeyTimelinePeriods.map(
    (el) => el.fields
  ) as TypeTimelinePeriodFields[];

  return (
    <>
      <HeadingSection
        name={aboutPageContent.name}
        shortDescription={aboutPageContent.shortDescription}
        image={headingSectionImage}
      />
      <Philosophy
        title={aboutPageContent.philosophyTitle}
        subtitle={aboutPageContent.philosophySubtitle}
        content={aboutPageContent.philosophyContent}
        image={philosophyImage}
      />
      <Journey
        title={aboutPageContent.journeyTitle}
        subtitle={aboutPageContent.journeySubtitle ?? ""}
        timelinePeriods={timelinePeriods}
      />
      <InfoSection
        title={aboutPageContent.infoSectionTitle}
        subtitle={aboutPageContent.infoSectionSubtitle}
        className="mt-4"
      />
      <div className="mt-6 flex w-4/5 mx-auto justify-center gap-4">
        <Button
          label={aboutPageContent.infoButtonText1}
          variant="primary"
          glassmorphism
          hasShadow
        />
        <Button
          label={aboutPageContent.infoButtonText2}
          variant="primary"
          glassmorphism
          hasShadow
        />
      </div>
    </>
  );
}

import { getEntries } from "app/lib/contentfulDataService";
import {
  TypeFaQsPageDataFields,
  TypeFaQsPageDataSkeleton,
} from "app/lib/types/contentful/TypeFaQsPageData";
import HeadingSection from "app/components/HeadingSection";
import QASection, { MobileQASection } from "./components/QASection";
import { TypeFaqFields } from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import InfoSection from "../components/InfoSection";
import ButtonGroup from "../components/ButtonGroup";

export default async function FAQs() {
  const faqsPageData = await getEntries<TypeFaQsPageDataSkeleton>(
    "faQsPageData"
  );

  const {
    title,
    subtitle,
    image,
    questions,
    infoSectionTitle,
    infoSectionSubtitle,
    infoButtonText1,
    infoButtonText2,
    button1Url,
    button2Url,
  } = faqsPageData[0] as TypeFaQsPageDataFields;

  const imageField = image.fields as AssetFields;
  const allQuestions = questions.map((q) => q.fields) as TypeFaqFields[];

  return (
    <>
      <HeadingSection title={title} subtitle={subtitle} image={imageField} />
      <QASection questions={allQuestions} />
      <InfoSection
        title={infoSectionTitle}
        subtitle={infoSectionSubtitle}
        className="mt-4"
      />
      <ButtonGroup
        infoButtonText1={infoButtonText1}
        infoButtonText2={infoButtonText2}
        button1Url={button1Url}
        button2Url={button2Url}
        className="mt-6 mx-16 pb-16"
      />
    </>
  );
}

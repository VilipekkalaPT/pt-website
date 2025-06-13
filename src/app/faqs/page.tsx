import { getEntries } from "app/lib/contentfulDataService";
import {
  TypeFaQsPageDataFields,
  TypeFaQsPageDataSkeleton,
} from "app/lib/types/contentful/TypeFaQsPageData";
import HeadingSection from "./components/HeadingSection";
import Divider from "app/components/Divider";
import QASection from "./components/QASection";
import { TypeFaqFields } from "app/lib/types/contentful";
import { AssetFields } from "contentful";

export default async function FAQs() {
  const faqsPageData = await getEntries<TypeFaQsPageDataSkeleton>(
    "faQsPageData"
  );

  const { title, image, description, questions } =
    faqsPageData[0] as TypeFaQsPageDataFields;

  const imageField = image.fields as AssetFields;
  const allQuestions = questions.map((q) => q.fields) as TypeFaqFields[];

  return (
    <div className="">
      <HeadingSection
        title={title}
        description={description}
        image={imageField}
      />
      <QASection questions={allQuestions} />
      <Divider />
    </div>
  );
}

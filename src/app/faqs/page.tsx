import { getAssets, getEntries } from "app/lib/contentfulDataService";
import { TypeFaQsPageDataSkeleton } from "app/lib/types/contentful/TypeFaQsPageData";
import HeadingSection from "./components/HeadingSection";
import Divider from "app/components/Divider";
import QASection from "./components/QASection";

export default async function FAQs() {
  const [images, faqsPageData] = await Promise.all([
    getAssets(),
    getEntries<TypeFaQsPageDataSkeleton>("faQsPageData"),
  ]);

  const { title, description, questions } = faqsPageData[0];

  return (
    <div className="mt-22">
      <HeadingSection title={title} description={description} images={images} />
      <QASection questions={questions} />
      <Divider />
    </div>
  );
}

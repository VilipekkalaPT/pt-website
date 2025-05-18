import Divider from "app/components/Divider";
import RichTextRenderer from "app/components/RichTextRenderer";
import { getEntries } from "app/lib/contentfulDataService";
import { TypeTermsAndConditionsSkeleton } from "app/lib/types/contentful/TypeTermsAndConditions";

export default async function TermsConditions() {
  const termsConditionsPageData =
    await getEntries<TypeTermsAndConditionsSkeleton>("termsAndConditions");

  const { title, content } = termsConditionsPageData[0];

  return (
    <>
      <div className="mt-26 px-12 mb-10">
        <p className="text-3xl font-bold text-center mb-6">{title}</p>
        <RichTextRenderer text={content} listClassName="list-disc ml-5" />
      </div>
      <Divider />
    </>
  );
}

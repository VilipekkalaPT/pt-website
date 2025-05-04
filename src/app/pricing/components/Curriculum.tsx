import Accordion from "app/components/Accordion";
import RichTextRenderer from "app/components/RichTextRenderer";
import {
  TypeCurriculumFields,
  TypeCurriculumPeriodFields,
} from "app/lib/types/contentful";

interface CurriculumProps {
  curriculum: TypeCurriculumFields;
}

export default function Curriculum({ curriculum }: CurriculumProps) {
  const curriculumPeriods = curriculum.curriculumPeriods.map(
    (period) => period.fields
  ) as TypeCurriculumPeriodFields[];

  return (
    <div className="my-10 px-6 grid grid-cols-2 gap-5">
      <p className="text-2xl font-bold mb-6">{curriculum.title}</p>
      <p className="text-sm text-gray-500 mb-4">{curriculum.subtitle}</p>
      {curriculumPeriods.map((period) => (
        <Accordion
          key={period.title}
          buttonText={period.title}
          accordionContent={<RichTextRenderer text={period.description} />}
          className="mb-4 h-fit"
        />
      ))}
    </div>
  );
}

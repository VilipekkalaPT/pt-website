"use client";
import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import RichTextRenderer from "app/components/RichTextRenderer";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Button from "app/components/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "app/utils/routes";

interface FAQSectionProps {
  title: string;
  content: Document;
  buttonText: string;
  image: AssetFields;
}

export default function FAQSection({
  title,
  content,
  buttonText,
  image,
}: FAQSectionProps) {
  const router = useRouter();
  const imageUrl = getAssetUrl(image);

  return (
    <div className="mt-8 w-4/5 mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="w-full h-full md:h-[22rem] overflow-hidden">
        <Image
          src={imageUrl}
          alt="FAQ Section Image"
          width={image.file?.details.image?.width}
          height={image.file?.details.image?.height}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="heading mb-4">{title}</p>
        <RichTextRenderer text={content} paragraphClassName="leading-[1.4]" />
        <Button
          label={buttonText}
          variant="ghost"
          glassmorphism
          className="mt-4 p-2"
          onClick={() => router.push(ROUTES.FAQs)}
        />
      </div>
    </div>
  );
}

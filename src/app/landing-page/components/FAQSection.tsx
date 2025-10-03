"use client";
import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import RichTextRenderer from "app/components/RichTextRenderer";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Button from "app/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
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
    <div className="mt-40 w-4/5 mx-auto grid grid-cols-2 gap-10">
      <div className="w-full h-[400px] overflow-hidden">
        <Image
          src={imageUrl}
          alt="FAQ Section Image"
          width={image.file?.details.image?.width}
          height={image.file?.details.image?.height}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-2xl font-medium mb-4">{title}</p>
        <RichTextRenderer text={content} paragraphClassName="font-light" />
        <Button
          label={buttonText}
          variant="ghost"
          className="mt-4"
          iconRight={<ArrowRightIcon className="size-4" />}
          onClick={() => router.push(ROUTES.FAQs)}
        />
      </div>
    </div>
  );
}

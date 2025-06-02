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
  subtitle: string;
  content: Document;
  buttonText: string;
  image: AssetFields;
}

export default function FAQSection({
  title,
  subtitle,
  content,
  buttonText,
  image,
}: FAQSectionProps) {
  const router = useRouter();
  const imageUrl = getAssetUrl(image);

  return (
    <div className="mt-40 px-12 grid grid-cols-2 gap-10">
      <Image
        src={imageUrl}
        alt="FAQ Section Image"
        width={image.file?.details.image?.width}
        height={image.file?.details.image?.height}
      />
      <div>
        <p className="text-2xl font-semibold mb-1">{title}</p>
        <p className="text-xl text-gray-400 mb-4">{subtitle}</p>
        <RichTextRenderer text={content} />
        <Button
          label={buttonText}
          variant="primary"
          iconRight={<ArrowRightIcon className="size-4" />}
          className="mt-6"
          onClick={() => router.push(ROUTES.FAQ)}
        />
      </div>
    </div>
  );
}

import Image from "next/image";
import { JSX } from "react";
import Divider from "./Divider";

interface CardProps {
  headerTitle: string;
  headerSubtitle: string;
  bodyTitle: string;
  bodyDescription: string | JSX.Element;
  imageUrl?: string;
  showDivider?: boolean;
}

export default function Card({
  headerTitle,
  headerSubtitle,
  bodyTitle,
  bodyDescription,
  imageUrl,
  showDivider = false,
}: CardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg p-6">
      <CardHeader title={headerTitle} subTitle={headerSubtitle} />
      {showDivider && <Divider />}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={"Card image"}
          width={100}
          height={100}
          className="block w-full h-auto"
        />
      )}
      <CardBody title={bodyTitle} description={bodyDescription} />
    </div>
  );
}

function CardHeader({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-gray-600">{title}</p>
      <p className="text-sm font-medium text-gray-400">{subTitle}</p>
    </div>
  );
}

function CardBody({
  title,
  description,
}: {
  title: string;
  description: string | JSX.Element;
}) {
  if (typeof description === "string") {
    return (
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    );
  }
  return description;
}

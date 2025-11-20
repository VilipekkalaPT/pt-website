import Image from "next/image";
import RichTextRenderer from "app/components/RichTextRenderer";
import { Document } from "@contentful/rich-text-types";
import { StarIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

interface PhilosophyProps {
  title: string;
  subtitle: string;
  content: Document;
}

export default function Philosophy({
  title,
  subtitle,
  content,
}: PhilosophyProps) {
  const desktopStyle = "md:grid-cols-2 md:gap-4 md:items-center";
  const mobileStyle = "grid-cols-1 gap-8";

  return (
    <div className="relative">
      <Image
        src="/background-2.png"
        alt="Philosophy Banner Background"
        fill
        className="object-cover object-top"
      />
      <div
        className={cn(
          "w-[90%] md:w-4/5 mx-auto grid relative py-8 md:py-16",
          desktopStyle,
          mobileStyle
        )}
      >
        <div>
          <p className="heading mb-2">{title}</p>
          <p className="subheading text-white/70">{subtitle}</p>
          <RichTextRenderer
            text={content}
            listClassName="text-white/70 leading-[1.4]"
            listIcon={<StarIcon className="size-4" />}
            paragraphClassName="mt-4 text-white/70 leading-[1.4]"
          />
        </div>
        <div className="relative w-full h-64 md:h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/uYlDp6dqYH8"
            title="Philosophy video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

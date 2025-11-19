"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import IconButton from "./IconButton";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { getAssetUrl } from "app/utils/utils";
import { CarouselImage } from "app/lib/types/type";
import cn from "classnames";
import Card, { CardContent, CardHeader } from "./Card";

interface CarouselProps {
  carouselImages: CarouselImage[];
  sliderPerView?: number;
  hasText?: boolean;
}

export default function Carousel({
  carouselImages,
  sliderPerView,
  hasText = false,
}: CarouselProps) {
  const [ref, instance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    ...(sliderPerView && {
      slides: { perView: sliderPerView, spacing: 20 },
    }),
  });

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instance.current?.prev();
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instance.current?.next();
  };

  return (
    <div className="relative w-full mx-auto h-full">
      <div
        ref={ref}
        className={cn("keen-slider overflow-hidden rounded-lg", "md:h-120", {
          "h-90": hasText,
          "h-60": !hasText,
        })}
      >
        <CarouselCard carouselImages={carouselImages} hasText={hasText} />
      </div>

      <>
        <IconButton
          variant="secondary"
          icon={<ArrowLongLeftIcon className="size-4 md:size-6" />}
          className={cn("prev-btn absolute left-4", {
            "bottom-4": !hasText,
            "bottom-32": hasText,
          })}
          onClick={handlePrevClick}
          aria-label="Previous slide"
        />
        <IconButton
          variant="secondary"
          icon={<ArrowLongRightIcon className="size-4 md:size-6" />}
          className={cn("next-btn absolute right-4", {
            "bottom-4": !hasText,
            "bottom-32": hasText,
          })}
          onClick={handleNextClick}
          aria-label="Next slide"
        />
      </>
    </div>
  );
}

const CarouselCard = ({
  carouselImages,
  hasText,
}: {
  carouselImages: CarouselImage[];
  hasText: boolean;
}) => {
  return (
    <>
      {carouselImages.map((image, index) => {
        const imageUrl = getAssetUrl(image.image);

        return hasText ? (
          <Card
            key={index}
            className="keen-slider__slide border border-border-default-primary"
          >
            <CardHeader className="relative h-60">
              <Image
                src={imageUrl}
                alt={image.title ?? "Image"}
                fill
                className="object-cover object-center"
              />
            </CardHeader>
            <CardContent className="flex-1 p-4 bg-black/50 z-15">
              <p>{image.title}</p>
              <p className="body-small mt-2">{image.description}</p>
            </CardContent>
          </Card>
        ) : (
          <div key={index} className="keen-slider__slide">
            <Image
              src={imageUrl}
              alt={image.title ?? "Image"}
              fill
              className="object-cover object-center"
            />
          </div>
        );
      })}
    </>
  );
};

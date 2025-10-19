"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { AssetFields } from "contentful";
import IconButton from "../../components/IconButton";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

interface CarouselProps {
  images: AssetFields[];
  sliderPerView?: number;
}

export default function Carousel({ images, sliderPerView }: CarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    ...(sliderPerView && {
      slides: {
        perView: sliderPerView,
        spacing: 20,
      },
    }),
  });

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  return (
    <div className="relative w-full mx-auto h-full">
      <div
        ref={sliderRef}
        className="keen-slider h-full overflow-hidden rounded-lg"
      >
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <Image
              src={`https:${image.file?.url ?? ""}`}
              alt={image.title ?? "Image"}
              width={image.file?.details.image?.width}
              height={image.file?.details.image?.height}
            />
          </div>
        ))}
      </div>
      <>
        <IconButton
          variant="secondary"
          icon={<ArrowLongLeftIcon className="size-6" />}
          className="prev-btn absolute bottom-4 left-4"
          onClick={handlePrevClick}
          aria-label="Previous slide"
        />
        <IconButton
          variant="secondary"
          icon={<ArrowLongRightIcon className="size-6" />}
          className="next-btn absolute bottom-4 right-4"
          onClick={handleNextClick}
          aria-label="Next slide"
        />
      </>
    </div>
  );
}

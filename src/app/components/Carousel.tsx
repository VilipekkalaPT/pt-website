"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { AssetFields } from "contentful";
import IconButton from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  images: AssetFields[];
  sliderPerView?: number;
  fillImage?: boolean;
}

export default function Carousel({
  images,
  sliderPerView,
  fillImage = true,
}: CarouselProps) {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // slideChanged(slider) {
    //   setCurrentSlide(slider.track.details.rel);
    // },
    ...(sliderPerView && {
      slides: {
        perView: sliderPerView,
        spacing: 20,
      },
    }),
  });

  // const goToSlide = (i: number) => {
  //   instanceRef.current?.moveToIdx(i);
  // };

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
      <div ref={sliderRef} className="keen-slider h-full overflow-hidden">
        {images &&
          images.map((image, index) => (
            <div key={index} className="keen-slider__slide">
              {fillImage ? (
                <Image
                  src={`https:${image.file?.url ?? ""}`}
                  alt={image.title ?? "Image"}
                  width={image.file?.details.image?.width}
                  height={image.file?.details.image?.height}
                />
              ) : (
                <Image
                  src={`https:${image.file?.url ?? ""}`}
                  alt={image.title ?? "Image"}
                  fill
                  className="block w-full h-auto object-cover"
                />
              )}
            </div>
          ))}
      </div>
      {images && (
        <>
          <IconButton
            variant="primary"
            icon={<ChevronLeftIcon className="size-6" />}
            className="prev-btn absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={handlePrevClick}
            aria-label="Previous slide"
          />
          <IconButton
            variant="primary"
            icon={<ChevronRightIcon className="size-6" />}
            className="next-btn absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={handleNextClick}
            aria-label="Next slide"
          />
        </>
      )}
      {/* <div className="flex justify-center mt-4 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-black" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
}

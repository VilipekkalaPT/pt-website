"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { AssetFields } from "contentful";
import IconButton from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  images: AssetFields[];
}

export default function Carousel({ images }: CarouselProps) {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // slideChanged(slider) {
    //   setCurrentSlide(slider.track.details.rel);
    // },
    slides: {
      perView: 2,
    },
  });

  // const goToSlide = (i: number) => {
  //   instanceRef.current?.moveToIdx(i);
  // };

  return (
    <div className="relative w-full mx-auto">
      <div ref={sliderRef} className="keen-slider overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <Image
              src={`https:${image.file?.url ?? ""}`}
              alt={""}
              width={image.file?.details.image?.width}
              height={image.file?.details.image?.height}
            />
          </div>
        ))}
      </div>
      <IconButton
        variant="primary"
        icon={<ChevronLeftIcon className="size-6" />}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        onClick={() => instanceRef.current?.prev()}
        aria-label="Previous slide"
      />
      <IconButton
        variant="primary"
        icon={<ChevronRightIcon className="size-6" />}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        onClick={() => instanceRef.current?.next()}
        aria-label="Next slide"
      />

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

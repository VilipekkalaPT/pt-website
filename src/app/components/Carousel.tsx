"use client";

import { useState, useEffect } from "react";
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
}

export default function Carousel({
  carouselImages,
  sliderPerView,
}: CarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [desktopRef, desktopInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    ...(sliderPerView && {
      slides: { perView: sliderPerView, spacing: 20 },
    }),
  });

  const [mobileRef, mobileInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    desktopInstance.current?.prev();
    mobileInstance.current?.prev();
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    desktopInstance.current?.next();
    mobileInstance.current?.next();
  };

  const commonStyle = "keen-slider overflow-hidden rounded-lg";

  return (
    <div className="relative w-full mx-auto h-full">
      {isMobile ? (
        <div ref={mobileRef} className={cn(commonStyle, "h-90")}>
          <MobileCarousel carouselImages={carouselImages} />
        </div>
      ) : (
        <div ref={desktopRef} className={cn(commonStyle, "h-120")}>
          <DesktopCarousel carouselImages={carouselImages} />
        </div>
      )}
      <>
        <IconButton
          variant="secondary"
          icon={<ArrowLongLeftIcon className="size-4 md:size-6" />}
          className={cn("prev-btn absolute left-4", {
            "bottom-32": isMobile,
            "bottom-4": !isMobile,
          })}
          onClick={handlePrevClick}
          aria-label="Previous slide"
        />
        <IconButton
          variant="secondary"
          icon={<ArrowLongRightIcon className="size-4 md:size-6" />}
          className={cn("next-btn absolute right-4", {
            "bottom-32": isMobile,
            "bottom-4": !isMobile,
          })}
          onClick={handleNextClick}
          aria-label="Next slide"
        />
      </>
    </div>
  );
}

const DesktopCarousel = ({
  carouselImages,
}: {
  carouselImages: CarouselImage[];
}) => {
  return (
    <>
      {carouselImages.map((image, index) => {
        const imageUrl = getAssetUrl(image.image);

        return (
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

const MobileCarousel = ({
  carouselImages,
}: {
  carouselImages: CarouselImage[];
}) => {
  return (
    <>
      {carouselImages.map((image, index) => {
        const imageUrl = getAssetUrl(image.image);

        return (
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
        );
      })}
    </>
  );
};

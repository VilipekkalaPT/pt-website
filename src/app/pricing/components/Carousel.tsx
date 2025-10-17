"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import cn from "classnames";

import { SESSION_IMAGE } from "app/utils/variables";
import Card, { CardContent, CardHeader } from "app/components/Card";
import { TrainingSessionData } from "app/lib/types/type";

interface CarouselProps {
  trainingSessionData: TrainingSessionData[];
}

export default function Carousel({ trainingSessionData }: CarouselProps) {
  const [mainRef, mainSlider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: { perView: 1 },
  });
  const [thumbRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 5,
      spacing: 16,
    },
    vertical: false,
  });

  const onThumbClick = (idx: number) => {
    mainSlider?.current?.moveToIdx(idx + 1);
  };

  return (
    <div className="flex gap-4 h-[30rem]">
      <div ref={mainRef} className="keen-slider rounded-lg flex-1">
        {trainingSessionData.map((session, index) => (
          <Card
            key={index}
            className={cn(
              "flex flex-col h-full justify-start",
              `keen-slider__slide number-slide${index + 1}`
            )}
            glassmorphism
            aria-label={session.title ?? `Slide ${index + 1}`}
          >
            <CardHeader className="w-full relative h-[22rem]">
              <Image
                src={session.imageUrl}
                alt={session.title ?? `$${SESSION_IMAGE}-${index + 1}`}
                fill
                className="object-cover object-center"
              />
            </CardHeader>
            <CardContent className="h-[8rem] flex flex-col justify-center gap-2 px-6 py-4">
              <p className="leading-[1.4]">{session.title}</p>
              <p className="body-small text-white/70">{session.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div ref={thumbRef} className="keen-slider flex-1">
        {trainingSessionData.slice(1).map((session, index) => (
          <button
            key={session.imageUrl}
            className={cn(
              "h-full cursor-pointer",
              `keen-slider__slide number-slide${index + 1}`
            )}
            onClick={() => onThumbClick(index)}
            tabIndex={0}
            aria-label={session.title ?? `Thumbnail ${index + 1}`}
          >
            <Card
              className="h-full flex flex-col justify-start rounded-full"
              glassmorphism
            >
              <CardHeader className="w-full relative h-[22rem]">
                <Image
                  src={session.imageUrl}
                  alt={session.title ?? `$${SESSION_IMAGE}-${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </CardHeader>
              <div className="text-left leading-[1.4] px-6 py-4 break-words whitespace-normal">
                {session.title}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

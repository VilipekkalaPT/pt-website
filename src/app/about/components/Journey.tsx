"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Lightbox from "yet-another-react-lightbox";
import { Asset, AssetFields } from "contentful";
import {
  ArrowPathRoundedSquareIcon,
  BackwardIcon,
  ForwardIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Button from "app/components/Button";
import { getAssetUrl } from "app/utils/utils";

import "react-vertical-timeline-component/style.min.css";
import "yet-another-react-lightbox/styles.css";
import "./Journey.css";

interface JourneyProps {
  title: string;
  subtitle: string;
  images: Asset[];
}

export default function Journey({ title, subtitle, images }: JourneyProps) {
  const router = useRouter();
  const [openLightbox, setOpenLightbox] = useState(false);

  const journeyImages = images.map((image) => image.fields) as AssetFields[];
  const image = journeyImages[0];
  const imageUrl = getAssetUrl(image);

  const displayImagesCount = journeyImages.slice(0, 3);
  const remainingImagesCount = journeyImages.slice(3).length;

  return (
    <div className="my-15 mx-12">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-gray-500 mt-1 mb-4">{subtitle}</p>
      <VerticalTimeline lineColor="#e6e6e6">
        <VerticalTimelineElement
          contentStyle={{ background: "#2c2c2c", color: "#fff" }}
          date="2025 and beyond"
          dateClassName="date-style"
          iconStyle={{ background: "#2c2c2c", color: "#fff" }}
          icon={<ForwardIcon />}
        >
          <button onClick={() => setOpenLightbox(true)} className="button">
            <div className="image-wrapper">
              {displayImagesCount.map((image, index) => (
                <Image
                  key={index}
                  src={getAssetUrl(image)}
                  alt={`Journey Image ${index + 1}`}
                  width={image.file?.details.image?.width}
                  height={image.file?.details.image?.height}
                  style={{
                    gridArea: `image${index}`,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ))}
              {remainingImagesCount > 0 && (
                <div className="text-wrapper">
                  <span className="text-1">{remainingImagesCount}</span>
                  <span className="text-2"> more photos</span>
                </div>
              )}
            </div>
          </button>
          <p className="title">Coaching & Build SlayFitVili</p>
          <p className="content">
            Building SlayFitVili — coaching with heart + strategy. Coaching
            office men and women alike across the world to slay with strength
            and softness. If this strokes a string in you...
          </p>
          <Button
            label="Book a free consultation"
            variant="ghost"
            className="mt-6 text-black"
            onClick={() => router.push("/contact-and-booking")}
          />
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="TBD"
          dateClassName="date-style"
          iconStyle={{ background: "#2c2c2c", color: "#fff" }}
          icon={<StarIcon />}
        >
          <div className="card">
            <button onClick={() => setOpenLightbox(true)} className="button">
              <Image
                src={imageUrl}
                alt="Philosophy Banner"
                width={image.file?.details.image?.width}
                height={image.file?.details.image?.height}
              />
            </button>
            <p className="title">TBD</p>
            <p className="content">TBD</p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="2023 - 2024"
          dateClassName="date-style"
          iconStyle={{ background: "#2c2c2c", color: "#fff" }}
          icon={<ArrowPathRoundedSquareIcon />}
        >
          <div className="card">
            <button onClick={() => setOpenLightbox(true)} className="button">
              <Image
                src={imageUrl}
                alt="Philosophy Banner"
                width={image.file?.details.image?.width}
                height={image.file?.details.image?.height}
              />
            </button>
            <p className="title">Transformation</p>
            <p className="content">
              Fell in love with real progress. Helped my first clients.
              Certified. Grounded. Coaching with purpose.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="2020-2022"
          dateClassName="date-style"
          iconStyle={{ background: "#2c2c2c", color: "#fff" }}
          icon={<BackwardIcon />}
        >
          <div className="card">
            <button onClick={() => setOpenLightbox(true)} className="button">
              <Image
                src={imageUrl}
                alt="Philosophy Banner"
                width={image.file?.details.image?.width}
                height={image.file?.details.image?.height}
              />
            </button>
            <p className="title">Before transformation</p>
            <p className="content">
              Lost. Overweight. Restarting every Monday. Decided to flip life
              around - Got reborn in many ways
            </p>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={journeyImages.map((img) => ({ src: getAssetUrl(img) }))}
      />
    </div>
  );
}

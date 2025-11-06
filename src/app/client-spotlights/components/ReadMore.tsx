"use client";

import { useState, useRef, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Button from "app/components/Button";
import { READ_LESS, READ_MORE } from "app/utils/variables";

interface ReadMoreProps {
  document: Document;
}

export default function ReadMore({ document }: ReadMoreProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const fullContent = documentToReactComponents(document);

  const toggle = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const truncated = el.scrollHeight > el.clientHeight;
    if (!isExpanded) {
      setIsTruncated(truncated);
    }
  }, [fullContent, isExpanded]);

  return (
    <div className="mt-2 flex flex-col leading-[1.4] min-h-[8rem]">
      <div ref={textRef} className={isExpanded ? "" : "line-clamp-3"}>
        {fullContent}
      </div>
      {isTruncated && (
        <Button
          label={isExpanded ? READ_LESS : READ_MORE}
          variant="ghost"
          glassmorphism
          onClick={toggle}
          className="mt-6 flex justify-center"
        />
      )}
    </div>
  );
}

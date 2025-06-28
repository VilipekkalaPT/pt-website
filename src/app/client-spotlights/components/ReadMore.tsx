"use client";

import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { READ_LESS, READ_MORE } from "app/utils/variables";

interface ReadMoreProps {
  document: Document;
}

export default function ReadMore({ document }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullContent = documentToReactComponents(document);

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex flex-col text-sm text-gray-700">
      <div className={isExpanded ? "" : "line-clamp-3"}>{fullContent}</div>
      <button onClick={toggle} className="mt-2 font-semibold cursor-pointer">
        {isExpanded ? READ_LESS : READ_MORE}
      </button>
    </div>
  );
}

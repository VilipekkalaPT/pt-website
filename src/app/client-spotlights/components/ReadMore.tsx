"use client";

import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, Document, Inline, Text } from "@contentful/rich-text-types";
import { READ_LESS, READ_MORE } from "app/utils/variables";

interface ReadMoreRichTextProps {
  document: Document;
  maxChars?: number;
}

export default function ReadMoreRichText({
  document,
  maxChars = 200,
}: ReadMoreRichTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullContent = documentToReactComponents(document);
  const plainText = extractTextFromDocument(document);
  const isLong = plainText.length > maxChars;

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex flex-col text-sm text-gray-700">
      {isExpanded || !isLong ? (
        fullContent
      ) : (
        <p>{plainText.slice(0, maxChars)}...</p>
      )}
      {isLong && (
        <button onClick={toggle} className="mt-2 font-semibold">
          {isExpanded ? READ_LESS : READ_MORE}
        </button>
      )}
    </div>
  );
}

function extractTextFromDocument(document: Document): string {
  let text = "";

  function walk(nodes: (Block | Inline | Text)[]) {
    for (const node of nodes) {
      if (node.nodeType === "text") {
        text += (node as Text).value;
      } else if ("content" in node && Array.isArray(node.content)) {
        walk(node.content as (Block | Inline | Text)[]);
      }
    }
  }

  walk(document.content);
  return text;
}

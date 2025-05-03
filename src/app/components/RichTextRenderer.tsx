import React from "react";
import { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, Block, Inline } from "@contentful/rich-text-types";

interface RichTextRendererProps {
  text: Document;
  listClassName?: string;
  listLimit?: number;
}

export default function RichTextRenderer({
  text,
  listClassName,
  listLimit,
}: RichTextRendererProps) {
  const renderList = (children: ReactNode) => (
    <ul className={`list-disc ml-5 ${listClassName}`}>
      {React.Children.toArray(children).slice(0, listLimit)}
    </ul>
  );

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) =>
        renderList(children),
      [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) =>
        renderList(children),
      [BLOCKS.LIST_ITEM]: (node: Block | Inline) => {
        const transformedChildren = documentToReactComponents(
          node as Document,
          {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_node, children) => children,
            },
          }
        );
        return transformedChildren;
      },
    },
  };

  return <div className="mb-4">{documentToReactComponents(text, options)}</div>;
}

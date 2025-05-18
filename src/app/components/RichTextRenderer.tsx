import React from "react";
import { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, Block, Inline } from "@contentful/rich-text-types";

interface RichTextRendererProps {
  text: Document;
  listClassName?: string;
  paragraphClassName?: string;
  listLimit?: number;
  listIcon?: ReactNode;
}

export default function RichTextRenderer({
  text,
  listClassName,
  paragraphClassName,
  listLimit,
  listIcon,
}: RichTextRendererProps) {
  const renderList = (children: ReactNode) => (
    <ul className={`${listClassName}`}>
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
              [BLOCKS.PARAGRAPH]: (
                _node: Block | Inline,
                children: ReactNode
              ) =>
                listIcon ? (
                  <span className="flex items-center gap-2 ml-2">
                    {listIcon && listIcon}
                    {children}
                  </span>
                ) : (
                  <span>{children}</span>
                ),
            },
          }
        );
        return transformedChildren;
      },
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => (
        <p className={paragraphClassName}>{children}</p>
      ),
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => (
        <p className="mt-6">{children}</p>
      ),
    },
  };

  return <div>{documentToReactComponents(text, options)}</div>;
}

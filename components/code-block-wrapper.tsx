import { CopyButton } from "@/components/copy-button";
import React, { type ReactNode } from "react";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (node == null) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");

  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return "";
}

export function CodeBlockWrapper({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);

  type ElementWithChildren = React.ReactElement<{ children: ReactNode }>;

  const titleElement = childrenArray[0] as ElementWithChildren;
  const preElement = childrenArray[1] as ElementWithChildren;

  const codeText = extractText(preElement.props.children);

  return (
    <figure data-rehype-pretty-code-figure="">
      <div className="relative flex items-center justify-between">
        {titleElement}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <CopyButton text={codeText} />
        </div>
      </div>
      {preElement}
    </figure>
  );
}

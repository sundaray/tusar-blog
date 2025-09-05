import React, { type ReactNode } from "react";
import { CopyButton } from "./copy-button";

// Helper function to extract text content from React nodes
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (node == null) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText(node.props.children);
  }
  return "";
}

export function CodeBlockWrapper({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);

  // The first child is the <figcaption> (title), the second is the <pre> (code)
  const titleElement = childrenArray[0] as React.ReactElement;
  const preElement = childrenArray[1] as React.ReactElement;

  const codeText = extractText(preElement.props.children);

  return (
    // We render the original figure, but we will modify its children
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

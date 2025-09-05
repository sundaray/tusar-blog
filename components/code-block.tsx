import { CopyButton } from "@/components/copy-button";
import { type HTMLAttributes, type ReactNode } from "react";

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

export function CodeBlock({
  children,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  const preElement = children as React.ReactElement;
  const codeText = extractText(preElement.props.children);

  return (
    <div className="relative">
      <CopyButton text={codeText} />
      {children}
    </div>
  );
}

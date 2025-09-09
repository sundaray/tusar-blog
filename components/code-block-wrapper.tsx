import { CopyButton } from "@/components/copy-button";
import { filenameIconMap } from "@/lib/icon-map";
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

  const hasTitle = childrenArray.length > 1;
  const titleElement = hasTitle
    ? (childrenArray[0] as ElementWithChildren)
    : null;

  const preElement = (
    hasTitle ? childrenArray[1] : childrenArray[0]
  ) as ElementWithChildren;

  if (!preElement) {
    return null;
  }

  const codeText = extractText(preElement.props.children);

  const filename =
    titleElement?.props.children &&
    typeof titleElement.props.children === "string"
      ? titleElement.props.children
      : null;

  const IconComponent =
    filename &&
    Object.entries(filenameIconMap).find(([pattern]) =>
      new RegExp(
        `^${pattern.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`,
      ).test(filename),
    )?.[1];

  return (
    <figure data-rehype-pretty-code-figure="">
      <div className="border-border flex items-center justify-between rounded-t-lg border-b bg-transparent py-2 text-sm">
        <span className="text-tertiary-foreground flex flex-1 items-center gap-2 pl-5">
          {IconComponent && <IconComponent className="size-4 shrink-0" />}
          {filename}
        </span>

        <div className="px-2">
          <CopyButton text={codeText} />
        </div>
      </div>

      {preElement}
    </figure>
  );
}

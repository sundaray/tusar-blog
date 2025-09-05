import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import type { MDXComponents } from "mdx/types";
import React from "react";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const contentString = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") {
          return child;
        }
        return "";
      })
      .join("");

    const slug = slugify(contentString);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

// 3. Create a components object with all the new heading overrides
const headingComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...headingComponents,
    figure: CodeBlockWrapper,
  };
}

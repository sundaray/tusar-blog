import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { Icons } from "@/components/icons";
import { slugify } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Link, { LinkProps } from "next/link";
import React from "react";

type CustomLinkProps = React.HTMLAttributes<HTMLAnchorElement> &
  Partial<LinkProps>;

function CustomLink(props: CustomLinkProps) {
  const { href, children, ...rest } = props;

  if (typeof href === "string") {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...rest}>
          {props.children}
        </Link>
      );
    }

    if (href.startsWith("#")) {
      return <a href={href} {...rest} />;
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1"
        {...rest}
      >
        <span>{children}</span>
        <Icons.arrowUpRight className="text-muted-foreground size-3" />
      </a>
    );
  }

  return null;
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

    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": `Link to section: ${contentString}`,
        },
        React.createElement(Icons.link, {
          className: "size-4",
        }),
      ),
      children,
    ]);
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

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
    a: CustomLink,
  };
}

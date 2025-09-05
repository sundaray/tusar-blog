import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    figure: CodeBlockWrapper,
  };
}

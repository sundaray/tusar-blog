import { type HTMLAttributes } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {}

export async function CodeBlock({ children, ...props }: CodeBlockProps) {
  const codeElement = children as React.ReactElement<{
    children: string;
    className?: string;
  }>;

  const code = codeElement.props.children.trim();
  const language =
    codeElement.props.className?.replace("language-", "") || "plaintext";

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div
      className="[&>pre]:rounded-md [&>pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

import { Frontmatter } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type BlogPostLayoutProps = {
  frontmatter: Frontmatter;
  children: React.ReactNode;
};

export function BlogPostLayout({ children, frontmatter }: BlogPostLayoutProps) {
  const { title, publishedAt, author } = frontmatter;

  return (
    <article className="mx-auto max-w-3xl px-4">
      <header className="flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <div className="mt-10 flex items-center space-x-4">
          <Image
            src="/tusar.jpeg"
            alt={`Avatar of ${author}`}
            width={42}
            height={42}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm">{author}</p>
            <p className="text-sm text-neutral-500">
              Published{" "}
              <time dateTime={publishedAt}>
                {format(new Date(publishedAt), "LLL d, yyyy")}
              </time>
            </p>
          </div>
        </div>
      </header>
      <div className="prose dark:prose-invert mt-10">{children}</div>
    </article>
  );
}

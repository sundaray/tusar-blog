import { AnimatedLink } from "@/components/animated-link";
import { Frontmatter } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { BlogPostTags } from "./blog-post-tags";

type BlogPostLayoutProps = {
  frontmatter: Frontmatter;
  children: React.ReactNode;
};

export function BlogPostLayout({ children, frontmatter }: BlogPostLayoutProps) {
  const { title, publishedAt, author, tags } = frontmatter;

  return (
    <article className="mx-auto max-w-3xl px-4 py-36">
      <header className="flex flex-col items-center">
        <AnimatedLink href="/blog" className="mb-6">
          Back to blog
        </AnimatedLink>
        <h1 className="text-balance text-4xl font-bold">{title}</h1>
        <div className="mt-12 flex items-center space-x-4">
          <Image
            src="/tusar.jpeg"
            alt={`Avatar of ${author}`}
            width={48}
            height={48}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm">{author}</p>
            <p className="text-muted-foreground text-sm">
              Published{" "}
              <time dateTime={publishedAt}>
                {format(new Date(publishedAt), "LLL d, yyyy")}
              </time>
            </p>
          </div>
        </div>
      </header>
      <div className="blog-post mt-12">{children}</div>
      {tags && tags.length > 0 && (
        <footer className="mt-12 border-t pt-6">
          <BlogPostTags tags={tags} />
        </footer>
      )}
    </article>
  );
}

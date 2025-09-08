import { BlogPostTags } from "@/components/blog-post-tags";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/toc";
import { type TableOfContents as TOCType } from "@/lib/toc";
import { Frontmatter } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type BlogPostLayoutProps = {
  frontmatter: Frontmatter;
  children: React.ReactNode;
  toc: TOCType;
};

export function BlogPostLayout({
  children,
  frontmatter,
  toc,
}: BlogPostLayoutProps) {
  const { title, publishedAt, author, tags } = frontmatter;

  return (
    <div className="lg:grid-cols-16 mx-auto max-w-5xl px-4 py-36 lg:grid">
      <article className="col-end-17 col-start-1 lg:col-start-1 lg:col-end-13">
        <header className="flex flex-col items-center">
          <Breadcrumbs />
          <h1 className="mt-6 text-balance text-4xl font-bold">{title}</h1>
          <div className="mt-12 flex items-center space-x-4">
            <Image
              src="/images/blog/tusar.jpeg"
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

      <aside className="lg:col-end-17 lg:col-start-14 hidden lg:block">
        <div className="sticky top-24">
          <TableOfContents toc={toc} />
        </div>
      </aside>
    </div>
  );
}

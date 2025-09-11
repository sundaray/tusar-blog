"use client";

import { ArrowLink } from "@/components/arrow-link";
import { cn } from "@/lib/utils";
import { Frontmatter } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

type Post = { slug: string } & Frontmatter;

export function FilteredPostList({
  filteredPosts,
  className,
}: {
  filteredPosts: Post[];
  className?: string;
}) {
  if (filteredPosts.length === 0) {
    return (
      <p className="text-tertiary-foreground mt-12 text-center">
        No blog posts found.
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "divide-border divide-y-1 flex flex-col divide-dashed",
        className,
      )}
    >
      {filteredPosts.map((post) => (
        <li key={post.slug} className="py-6">
          <article key={post.slug}>
            <header>
              <time
                dateTime={post.publishedAt}
                className="text-muted-foreground font-mono text-sm"
              >
                {format(new Date(post.publishedAt), "LLL d, yyyy")}
              </time>

              <h2 className="mt-2 text-2xl font-bold hover:text-sky-700 dark:hover:text-sky-400">
                <Link
                  href={`/blog/${post.slug}`}
                  className="link-focus inline-block"
                >
                  {post.title}
                </Link>
              </h2>
            </header>

            <p className="text-tertiary-foreground mt-4 line-clamp-2">
              {post.description}
            </p>

            <footer className="mt-4">
              <ArrowLink
                href={`/blog/${post.slug}`}
                aria-label={`Read more about ${post.title}`}
                className="text-sky-700 dark:text-sky-400"
              >
                Read More
              </ArrowLink>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}

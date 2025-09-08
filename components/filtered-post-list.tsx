"use client";

import { ReadMoreLink } from "@/components/read-more-link";
import { blogSearchParams } from "@/lib/blog-search-params";
import { slugify } from "@/lib/utils";
import { Frontmatter } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import { useQueryState } from "nuqs";
import React from "react";

type Post = { slug: string } & Frontmatter;

export function FilteredPostList({ allPosts }: { allPosts: Post[] }) {
  const [tag] = useQueryState("tag", blogSearchParams.tag);
  const [search] = useQueryState("search", blogSearchParams.search);

  const filteredPosts = React.useMemo(() => {
    let posts = allPosts;

    if (tag) {
      posts = posts.filter((post) =>
        post.tags?.some((postTag) => slugify(postTag) === tag),
      );
    }

    if (search) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return posts;
  }, [allPosts, tag, search]);

  return (
    <div className="mt-12 flex flex-col space-y-12">
      {filteredPosts.map((post) => (
        <article
          key={post.slug}
          className="group relative rounded-lg p-4 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          <Link href={`/blog/${post.slug}`} className="absolute inset-0">
            <span className="sr-only">Read {post.title}</span>
          </Link>

          <time
            dateTime={post.publishedAt}
            className="text-muted-foreground font-mono text-sm"
          >
            {format(new Date(post.publishedAt), "LLL d, yyyy")}
          </time>

          <h2 className="mt-2 text-2xl font-bold group-hover:text-sky-600 dark:group-hover:text-sky-400">
            {post.title}
          </h2>

          <p className="text-tertiary-foreground mt-4 line-clamp-2">
            {post.description}
          </p>

          <div className="mt-4">
            <ReadMoreLink>Read more</ReadMoreLink>
          </div>
        </article>
      ))}
    </div>
  );
}

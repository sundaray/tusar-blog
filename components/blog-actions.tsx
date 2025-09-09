"use client";

import { blogSearchParams } from "@/lib/blog-search-params";
import { slugify } from "@/lib/utils";
import { Frontmatter } from "@/types";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useQueryStates } from "nuqs";
import React from "react";
import { ActiveBlogFilters } from "./active-blog-filters";
import { BlogFilterSummary } from "./blog-filter-summary";
import { BlogPagination } from "./blog-pagination";
import { BlogSearch } from "./blog-search";
import { FilteredPostList } from "./filtered-post-list";

type Post = { slug: string } & Frontmatter;

const POSTS_PER_PAGE = 10;

export function BlogActions({
  allPosts,
  className,
}: {
  allPosts: Post[];
  className?: string;
}) {
  const [filters] = useQueryStates(blogSearchParams);
  const hasActiveFilters = !!filters.tag || !!filters.search;

  const filteredPosts = React.useMemo(() => {
    let posts = allPosts;
    if (filters.tag) {
      posts = posts.filter((post) =>
        post.tags?.some((postTag) => slugify(postTag) === filters.tag),
      );
    }
    if (filters.search) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.description.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    return posts;
  }, [allPosts, filters]);

  // Calculate total pages based on the filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Get the current page from filters, ensuring it's within valid bounds
  const currentPage = Math.max(1, Math.min(filters.page, totalPages));

  // Slice the posts to get only the items for the current page
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className={className}>
      <LayoutGroup>
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {hasActiveFilters && (
              <motion.div
                key="filters"
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <ActiveBlogFilters />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div key="search" layout>
            <BlogSearch />
          </motion.div>
          {hasActiveFilters && filteredPosts.length > 0 && (
            <BlogFilterSummary
              filteredCount={filteredPosts.length}
              totalCount={allPosts.length}
            />
          )}
        </div>
      </LayoutGroup>

      <FilteredPostList filteredPosts={paginatedPosts} className="mt-12" />

      {paginatedPosts.length > 0 && (
        <BlogPagination totalPages={totalPages} className="mt-12" />
      )}
    </div>
  );
}

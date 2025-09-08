"use client";

import { blogSearchParams } from "@/lib/blog-search-params";
import { cn } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { ActiveBlogFilters } from "./active-blog-filters";
import { BlogSearch } from "./blog-search";

export function BlogActions() {
  const [filters] = useQueryStates(blogSearchParams);
  const hasActiveFilters = !!filters.tag || !!filters.search;

  return (
    <div className="mt-12 flex flex-col">
      <ActiveBlogFilters />
      <BlogSearch className={cn(hasActiveFilters ? "mt-4" : "")} />
    </div>
  );
}

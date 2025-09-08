"use client";

import { BlogTag, BlogTagGroup } from "@/components/blog-tag";
import { blogSearchParams } from "@/lib/blog-search-params";
import { useQueryStates } from "nuqs";
import React from "react";

export function ActiveBlogFilters() {
  const [filters, setFilters] = useQueryStates(blogSearchParams);

  const activeFilters = React.useMemo(() => {
    const active = [];
    if (filters.tag) {
      active.push({ type: "tag", value: filters.tag });
    }
    if (filters.search) {
      active.push({ type: "search", value: `"${filters.search}"` });
    }
    return active;
  }, [filters]);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <BlogTagGroup
      label="Active filters:"
      className="flex items-center gap-2"
      onRemove={(keys) => {
        const filtersToClear = Object.fromEntries(
          Array.from(keys).map((key) => [key, null]),
        );
        setFilters(filtersToClear);
      }}
    >
      {activeFilters.map((filter) => (
        <BlogTag key={filter.type} id={filter.type} allowsRemoving>
          {filter.value}
        </BlogTag>
      ))}
    </BlogTagGroup>
  );
}

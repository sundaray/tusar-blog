"use client";

import { BlogTag, BlogTagGroup } from "@/components/blog-tag"; // 1. Import the components
import { slugify } from "@/lib/utils";
import { useQueryState } from "nuqs";
import * as React from "react";
type Tag = {
  name: string;
  count: number;
};

type TagsListProps = {
  allTags: Tag[];
};

export function TagsList({ allTags }: TagsListProps) {
  const [search] = useQueryState("search", { defaultValue: "" });

  const groupedTags = React.useMemo(() => {
    const filtered =
      search.length > 0
        ? allTags.filter((tag) =>
            tag.name.toLowerCase().includes(search.toLowerCase()),
          )
        : allTags;

    return filtered.reduce(
      (acc, tag) => {
        const firstLetter = tag.name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(tag);
        return acc;
      },
      {} as Record<string, Tag[]>,
    );
  }, [allTags, search]);

  return (
    <div className="mt-12 flex flex-col space-y-8">
      {Object.keys(groupedTags).map((letter) => (
        <div key={letter}>
          <h2 className="text-2xl font-bold">{letter}</h2>
          <hr className="my-4" />

          <BlogTagGroup
            aria-label={`Tags starting with ${letter}`}
            items={groupedTags[letter]}
            className="flex flex-wrap gap-2"
          >
            {(tag) => (
              <BlogTag
                id={tag.name}
                href={`/blog?tag=${slugify(tag.name)}`}
                className="cursor-pointer"
              >
                <span className="mr-2">{tag.name}</span>
                <span className="text-muted-foreground text-xs">
                  {tag.count}
                </span>
              </BlogTag>
            )}
          </BlogTagGroup>
        </div>
      ))}
    </div>
  );
}

"use client";

import { BlogTag, BlogTagGroup } from "@/components/blog-tag";
import { slugify } from "@/lib/utils";

export function BlogPostTags({ tags }: { tags: string[] }) {
  return (
    <BlogTagGroup
      label="Tags:"
      items={tags.map((tag) => ({ id: tag, name: tag }))}
      className="flex items-center gap-3"
    >
      {(item) => (
        <BlogTag
          id={item.id}
          href={`/?tag=${slugify(item.id)}`}
          className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-foreground dark:hover:text-background cursor-pointer transition-colors"
        >
          {item.name}
        </BlogTag>
      )}
    </BlogTagGroup>
  );
}

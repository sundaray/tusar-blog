"use client";
import { BlogTag, BlogTagGroup } from "@/components/blog-tag";
import { cn, slugify } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import * as React from "react";

const listVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
    y: 4,
  },
} as const;

type Tag = {
  name: string;
  count: number;
};

type TagsListProps = {
  allTags: Tag[];
  className?: string;
};

export function TagsList({ allTags, className }: TagsListProps) {
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

  const hasResults = Object.keys(groupedTags).length > 0;

  return (
    <div className={cn("flex flex-col", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {hasResults ? (
          <motion.div
            key="tags-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col space-y-8"
          >
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
                      className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-foreground dark:hover:text-background cursor-pointer transition-colors"
                    >
                      <span className="mr-2">{tag.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {tag.count}
                      </span>
                    </BlogTag>
                  )}
                </BlogTagGroup>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="no-tags-found"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-tertiary-foreground mt-12 text-center"
          >
            No tags found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

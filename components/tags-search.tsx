"use client";

import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";

export function TagsSearch({ className }: { className?: string }) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });

  const [isPending, startTransition] = React.useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    startTransition(() => {
      setSearch(term);
    });
  }, 300);

  return (
    <div className={cn("relative", className)}>
      <div className="grid w-full grid-cols-1 items-center">
        <Input
          type="search"
          placeholder="Search tags..."
          className="col-start-1 row-start-1 h-10 rounded-full pl-10"
          defaultValue={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          aria-label="Search tags"
        />
        <div className="pointer-events-none col-start-1 row-start-1 pl-3">
          <Icons.search className="text-muted-foreground size-4" />
        </div>
      </div>
    </div>
  );
}

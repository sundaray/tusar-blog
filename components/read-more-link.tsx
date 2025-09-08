import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import React from "react";

export function ReadMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-1 text-sm font-medium",
      )}
    >
      <span>{children}</span>
      <div className="relative size-4">
        <Icons.chevronRight
          className={cn(
            "absolute left-0 top-0 size-4 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:scale-95 group-hover:opacity-0",
            "text-muted-foreground",
          )}
        />
        <Icons.chevronRight
          className={cn(
            "absolute left-0 top-0 size-4 -translate-x-2 scale-95 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100",
            "text-muted-foreground",
          )}
        />
      </div>
    </div>
  );
}

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function AnimatedLink({ href, children, className }: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-neutral-200/60",
        className,
      )}
    >
      <div className="relative size-4">
        <Icons.chevronLeft
          className={cn(
            "absolute left-0 top-0 size-4 transition-all duration-200 ease-out group-hover:-translate-x-2 group-hover:scale-95 group-hover:opacity-0",
            "text-muted-foreground",
          )}
        />

        <Icons.chevronLeft
          className={cn(
            "absolute left-0 top-0 size-4 translate-x-2 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100",
            "text-muted-foreground",
          )}
        />
      </div>

      <span className="text-tertiary-foreground group-hover:text-foreground">
        {children}
      </span>
    </Link>
  );
}

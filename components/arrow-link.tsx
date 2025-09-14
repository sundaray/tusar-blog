"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import React from "react";

interface ArrowLinkProps extends Omit<LinkProps<string>, "children"> {
  children: React.ReactNode;
  className?: string;
}

export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  const classes = cn(
    "group relative inline-flex items-center gap-2 rounded-md py-2 text-sm font-medium",
    "link-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
    className,
  );

  return (
    <Link className={classes} {...(props as LinkProps<string>)}>
      <span>{children}</span>

      <div className="relative size-4">
        <Icons.chevronRight
          className={cn(
            "absolute left-0 top-0 size-4 transition-all duration-200 ease-out group-hover:translate-x-2 group-hover:scale-95 group-hover:opacity-0",
            "text-sky-700 dark:text-sky-400",
          )}
        />
        <Icons.chevronRight
          className={cn(
            "absolute left-0 top-0 size-4 -translate-x-2 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100",
            "text-sky-700 dark:text-sky-400",
          )}
        />
      </div>
    </Link>
  );
}

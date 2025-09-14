"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const linkSegments = segments.slice(0, -1);

  return (
    <Breadcrumb className={cn("font-mono text-sm", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="text-muted-foreground hover:text-foreground transition-colors hover:underline hover:underline-offset-2"
          >
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {linkSegments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-muted-foreground hover:text-foreground capitalize transition-colors hover:underline hover:underline-offset-2"
                >
                  <Link href={href as Route}>{segment}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}

        {segments.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

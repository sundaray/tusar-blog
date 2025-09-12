"use client";

import { cn } from "@/lib/utils";
import type { NavItem as NavItemType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, title }: NavItemType) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      className={cn(
        // Base styles for the link
        "text-tertiary-foreground dark:text-muted-foreground dark:hover:text-muted-foreground hover:text-tertiary-foreground link-focus relative py-2 text-sm transition-colors",

        // Pseudo-element for the underline
        "after:bg-foreground dark:after:bg-muted-foreground after:absolute after:bottom-1 after:left-0 after:h-[1.3px] after:w-0 after:transition-all after:duration-200 after:ease-out after:content-['']",

        // Hover state for the pseudo-element
        !isActive && "hover:after:w-full",

        // Active state styles
        isActive && "text-foreground after:w-full",
      )}
      href={href}
    >
      {title}
    </Link>
  );
}

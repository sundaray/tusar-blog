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
        "text-tertiary-foreground hover:text-tertiary-foreground relative py-2 text-sm transition-colors",

        // Pseudo-element for the underline
        "after:absolute after:bottom-1.5 after:left-0 after:h-[1px] after:w-0 after:bg-neutral-900 after:transition-all after:duration-200 after:ease-out after:content-['']",

        // Hover state for the pseudo-element
        "hover:after:w-full",

        // Active state styles
        isActive && "underline-offset-3 font-medium text-neutral-900 underline",
      )}
      href={href}
    >
      {title}
    </Link>
  );
}

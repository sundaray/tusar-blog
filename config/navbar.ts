import type { NavItem } from "@/types";

type NavbarConfig = {
  main: NavItem[];
};

export const navbarLinks: NavbarConfig = {
  main: [
    { title: "Blog", href: "/blog" },
    { title: "Tags", href: "/tags" },
  ],
};

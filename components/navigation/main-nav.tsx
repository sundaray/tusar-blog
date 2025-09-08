import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavItem } from "@/components/navigation/nav-item";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import type { NavItem as NavItemType } from "@/types";
import Link from "next/link";

type MainNavProps = {
  items: NavItemType[];
};

export async function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center space-x-3">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="hidden items-center font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 md:inline-flex"
        >
          Tusarkanta Palauri
        </Link>

        <Link
          href="/"
          aria-label="Go to homepage"
          className="inline-flex items-center font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 md:hidden"
        >
          TP
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>

      <nav className="hidden md:ml-6 md:flex">
        <ul className="flex space-x-4">
          {items.map((item) => (
            <li key={item.title}>
              <NavItem title={item.title} href={item.href} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

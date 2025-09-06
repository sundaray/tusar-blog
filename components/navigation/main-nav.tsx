import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavItem } from "@/components/navigation/nav-item";
import { UserAccountNav } from "@/components/navigation/user-account-nav";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import type { NavItem as NavItemType } from "@/types";
import Link from "next/link";

type MainNavProps = {
  items: NavItemType[];
};

export async function MainNav({ items }: MainNavProps) {
  const user = { email: "rawgrittt@gmail.com", role: "admin" };
  return (
    <div className="fixed inset-x-0 top-0 z-50 mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
      <Link
        href="/"
        aria-label="Go to homepage"
        className="mr-10 flex items-center font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
      >
        Tusarkanta Palauri
      </Link>
      <nav className="mr-auto hidden md:block">
        <ul className="flex space-x-4">
          {items.map((item) => (
            <li key={item.title}>
              <NavItem title={item.title} href={item.href} />
            </li>
          ))}
        </ul>
      </nav>
      <ThemeSwitcher />
      <MobileNav user={user} />
      <UserAccountNav />
    </div>
  );
}

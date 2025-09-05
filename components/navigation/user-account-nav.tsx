import { UserAccountNavClient } from "@/components/navigation/user-account-nav-client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";

export async function UserAccountNav() {
  const requestHeaders = await headers();
  const user = { email: "rawgrittt@gmail.com", role: "admin" };

  return (
    <div className="hidden md:block">
      {user ? (
        <UserAccountNavClient user={user} />
      ) : (
        <Link
          href="/signin"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Sign In
        </Link>
      )}
    </div>
  );
}

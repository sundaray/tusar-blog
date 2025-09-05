"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function UserAccountNavClient({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // Prevent dropdown from closing during sign out
  function handleOpenChange(open: boolean) {
    if (isPending) return;
    setIsOpen(open);
    if (!open) {
      setError(null);
    }
  }

  // Handle the sign out process
  function handleSignOut() {
    // startTransition(async () => {
    //   setError(null);
    //   try {
    //     await signOut({
    //       fetchOptions: {
    //         onSuccess: () => {
    //           setIsOpen(false);
    //           router.push("/");
    //           router.refresh();
    //         },
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Sign out error:", error);
    //     setError("Sign out failed. Try again.");
    //   }
    // });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        className={cn("flex items-center space-x-1 rounded-full px-4 py-2")}
      >
        <span className="text-sm text-neutral-700">My Account</span>
        <Icons.chevronDown className="inline-block size-4 text-neutral-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.email && (
              <>
                <p className="text-xs text-neutral-500">signed in as</p>
                <p className="w-[200px] truncate text-sm font-medium text-neutral-600">
                  {user.email}
                </p>
              </>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <Icons.dashboard
              className="size-3 text-neutral-500"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Icons.lock
                className="size-3 text-neutral-500"
                aria-hidden="true"
              />
              <span>Admin</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <div className="px-2 py-1">
          <div className="flex w-full flex-col items-center">
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              onClick={handleSignOut}
              className={cn("w-full", {
                "mt-2": error,
              })}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Icons.spinner className="inline-block size-4 animate-spin" />
                  <p className="text-sm">Signing out...</p>
                </>
              ) : (
                <>
                  <Icons.logOut className="mr-2 size-3" />
                  <p className="text-sm">Sign out</p>
                </>
              )}
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

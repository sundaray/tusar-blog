"use client";

import { navbarLinks } from "@/config/navbar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// ============================================================================
// MobileNav
// ============================================================================
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <MenuIcon isOpen={isOpen} onToggle={toggleMenu} />
      <AnimatePresence>
        {isOpen && (
          <>
            <Backdrop onToggle={toggleMenu} />
            <MenuDrawer onLinkClick={() => setIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// MenuIcon
// ============================================================================
function MenuIcon({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <MotionConfig transition={{ duration: 0.15, ease: "easeOut" }}>
      <motion.button
        initial={false}
        animate={isOpen ? "open" : "closed"}
        onClick={onToggle}
        className="relative z-50 flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="size-4.5 relative flex items-center justify-center rounded-full">
          <span className="absolute -inset-2 [@media(pointer:fine)]:hidden" />

          <div className="relative size-full">
            <motion.div
              variants={{
                closed: { y: "-50%", top: "25%", rotate: 0 },
                open: { y: "-50%", top: "50%", rotate: 45 },
              }}
              className="absolute h-[1.5px] w-full rounded-full bg-neutral-700"
            />
            <motion.div
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="absolute top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-neutral-700"
            />
            <motion.div
              variants={{
                closed: { y: "50%", bottom: "25%", rotate: 0 },
                open: { y: "50%", bottom: "50%", rotate: -45 },
              }}
              className="absolute h-[1.5px] w-full rounded-full bg-neutral-700"
            />
          </div>
        </div>
      </motion.button>
    </MotionConfig>
  );
}

// ============================================================================
// Backdrop
// ============================================================================
function Backdrop({ onToggle }: { onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onToggle}
      className="fixed inset-x-0 bottom-0 top-20 z-30 bg-black/20 backdrop-blur-sm"
      aria-hidden="true"
    />
  );
}

// ============================================================================
// MenuDrawer
// ============================================================================
function MenuDrawer({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] min-w-72 max-w-md bg-neutral-50 p-6 shadow-xl"
    >
      <nav>
        <ul className="flex flex-col space-y-2">
          {navbarLinks.main.map((item) => (
            <li key={item.href}>
              <MobileNavLink href={item.href} onClick={onLinkClick}>
                {item.title}
              </MobileNavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}

// ============================================================================
// MobileNavLink
// ============================================================================
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block rounded-md px-4 py-2 text-base font-medium transition-colors",
        isActive
          ? "font-semibold text-neutral-900"
          : "text-neutral-700 hover:text-neutral-900",
      )}
    >
      {children}
    </Link>
  );
}

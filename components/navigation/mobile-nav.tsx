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
        {isOpen && <MenuDrawer onLinkClick={() => setIsOpen(false)} />}
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
        className="hover:bg-accent relative z-50 flex size-8 items-center justify-center rounded-full transition-colors"
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
              className="bg-tertiary-foreground absolute h-[1.5px] w-full rounded-full"
            />
            <motion.div
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="bg-tertiary-foreground absolute top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full"
            />
            <motion.div
              variants={{
                closed: { y: "50%", bottom: "25%", rotate: 0 },
                open: { y: "50%", bottom: "50%", rotate: -45 },
              }}
              className="bg-tertiary-foreground absolute h-[1.5px] w-full rounded-full"
            />
          </div>
        </div>
      </motion.button>
    </MotionConfig>
  );
}

// ============================================================================
// MenuDrawer
// ============================================================================
function MenuDrawer({ onLinkClick }: { onLinkClick: () => void }) {
  const items = navbarLinks.main;

  const drawerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
      },
    },
  } as const;

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={drawerVariants}
      className="bg-background fixed left-0 right-0 top-20 z-40 h-[calc(100vh-5rem)] w-full border-t p-6"
      role="dialog"
      aria-modal="true"
    >
      <nav className="h-full">
        {/* center items both vertically and horizontally */}
        <motion.ul className="flex h-full flex-col items-center justify-center space-y-4">
          {items.map((item) => (
            <motion.li key={item.href} variants={itemVariants}>
              <MobileNavLink href={item.href} onClick={onLinkClick}>
                {item.title}
              </MobileNavLink>
            </motion.li>
          ))}
        </motion.ul>
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
        "block w-full rounded-md py-2 text-lg font-medium transition-colors",
        isActive
          ? "text-foreground font-semibold"
          : "text-tertiary-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

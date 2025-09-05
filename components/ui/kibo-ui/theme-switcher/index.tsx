"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  // 2. Get the actual theme and setTheme function from next-themes
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme],
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null on the server to avoid mismatch
    return <div className="h-8 w-[72px]" />;
  }

  return (
    <div
      className={cn(
        "bg-background ring-border relative isolate flex h-8 rounded-full p-1 ring-1",
        className,
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        // 4. Use the actual theme for the active state
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && (
              <motion.div
                className="bg-secondary absolute inset-0 rounded-full"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

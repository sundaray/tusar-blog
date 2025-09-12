"use client";

import { Icons } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";
import { type TableOfContents as TOCType } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { AnimatePresence, easeOut, motion } from "motion/react";
import * as React from "react";

interface TocProps {
  toc: TOCType;
}

const submenuVariants = {
  hidden: {
    height: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
  visible: {
    height: "auto",
    transition: { duration: 0.2, ease: easeOut },
  },
};
export function TableOfContents({ toc }: TocProps) {
  const { itemIds, parentMap, topLevel } = React.useMemo(() => {
    const ids: string[] = [];
    const map: Record<string, string> = {};
    const top: { title: string; url: string; items?: any[] }[] = [];

    if (!toc?.items) return { itemIds: ids, parentMap: map, topLevel: top };

    toc.items.forEach((h2) => {
      top.push(h2);
      const h2Id = h2.url?.split("#")[1];
      if (h2Id) ids.push(h2Id);

      if (h2.items && Array.isArray(h2.items)) {
        h2.items.forEach((h3) => {
          const h3Id = h3.url?.split("#")[1];
          if (h3Id) {
            ids.push(h3Id);
            if (h2Id) map[h3Id] = h2Id;
          }
        });
      }
    });

    return { itemIds: ids, parentMap: map, topLevel: top };
  }, [toc]);

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = React.useState({
    top: 0,
    height: 0,
    borderWidth: 1,
    visible: false,
  });

  // --- Measure and update the border-left width of the container ---
  // Needed so the active indicator line can be aligned precisely
  // with the left border, even if border width changes
  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) return;

    const borderWidth = parseFloat(
      getComputedStyle(containerElement).borderLeftWidth || "1",
    );
    setIndicator((prev) => ({
      ...prev,
      borderWidth: isNaN(borderWidth) ? 1 : borderWidth,
    }));
  }, []);

  // --- Track and update the active indicator line position ---
  // Observes the currently active link (via IntersectionObserver).
  // Recalculates its top/height whenever layout changes (resize,
  // DOM mutations, or the active heading changes).
  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement || !activeHeading) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const escapeCssSelector = (
      str: string, // ✨ Renamed 'esc'
    ) => ((window as any).CSS?.escape ? (window as any).CSS.escape(str) : str);

    const selector = `a[href="#${escapeCssSelector(activeHeading)}"]`;

    const linkElement =
      containerElement.querySelector<HTMLAnchorElement>(selector);

    if (!linkElement) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    let animationFrameId: number | null = null;

    const scheduleUpdate = () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        updatePosition();
      });
    };
    const updatePosition = () => {
      if (!containerElement || !linkElement) return;
      const containerRect = containerElement.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();
      const top = linkRect.top - containerRect.top;
      const height = linkRect.height;

      setIndicator((prev) => ({
        ...prev,
        top,
        height,
        visible: height > 0,
      }));
    };

    updatePosition();

    const linkResizeObserver = new ResizeObserver(scheduleUpdate);
    linkResizeObserver.observe(linkElement);

    const containerResizeObserver = new ResizeObserver(scheduleUpdate);
    containerResizeObserver.observe(containerElement);

    const mutationObserver = new MutationObserver(scheduleUpdate);

    mutationObserver.observe(containerElement, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
      containerResizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeHeading, toc]);

  const [manualOpen, setManualOpen] = React.useState<Record<string, boolean>>(
    {},
  );

  const toggleManual = (h2Id: string) =>
    setManualOpen((prev) => ({ ...prev, [h2Id]: !prev[h2Id] }));

  const activeParent = React.useMemo(() => {
    if (!activeHeading) return null;
    if (topLevel.find((t) => t.url?.split("#")[1] === activeHeading)) {
      return activeHeading;
    }
    return parentMap[activeHeading] ?? null;
  }, [activeHeading, parentMap, topLevel]);

  if (!mounted || !toc?.items) return null;

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2">
        <Icons.toc className="text-muted-foreground size-4" />
        <span className="text-foreground font-medium">On this page</span>
      </p>

      <div ref={containerRef} className="relative border-l pl-4">
        {indicator.visible && (
          <span
            aria-hidden
            className="bg-foreground pointer-events-none absolute transition-all duration-200"
            style={{
              left: `-${indicator.borderWidth}px`,
              top: `${indicator.top}px`,
              width: `${indicator.borderWidth}px`,
              height: `${indicator.height}px`,
            }}
          />
        )}

        <ul className="list-none space-y-2">
          {topLevel.map((h2, idx) => {
            const h2Id = h2.url?.split("#")[1];

            const isActiveGroup = Boolean(h2Id && activeParent === h2Id);

            const isChildActive = Boolean(
              h2.items?.some((h3) => h3.url?.split("#")[1] === activeHeading),
            );

            const isManuallyOpen = Boolean(h2Id && manualOpen[h2Id]);

            const expanded = isActiveGroup || isManuallyOpen;

            return (
              <li key={idx} className="group">
                <div className="flex items-center justify-between">
                  <a
                    href={h2.url}
                    className={cn(
                      "link-focus inline-block text-sm transition-colors",
                      isActiveGroup
                        ? "text-foreground"
                        : "text-muted-foreground",
                      isChildActive ? "font-medium" : "font-normal",
                    )}
                  >
                    {h2.title}
                  </a>

                  {h2.items?.length ? (
                    <button
                      aria-expanded={expanded}
                      aria-controls={`toc-${h2Id}`}
                      onClick={() => toggleManual(h2Id!)}
                      className={cn(
                        "text-muted-foreground hover:text-foreground link-focus -mr-2 ml-3 inline-flex items-center justify-center rounded p-1",
                      )}
                    >
                      <Icons.chevronRight
                        className={cn(
                          "text-muted-foreground size-4 transition-transform duration-200",
                          expanded ? "rotate-90" : "rotate-0",
                        )}
                        aria-hidden
                      />
                    </button>
                  ) : null}
                </div>

                <AnimatePresence initial={false} mode="popLayout">
                  {expanded && h2.items?.length ? (
                    <motion.ul
                      key={`submenu-${h2Id}`}
                      id={`toc-${h2Id}`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={submenuVariants}
                      className="mt-2 space-y-2"
                    >
                      {h2.items.map((h3, i) => {
                        return (
                          <li key={i} className="pl-4">
                            <a
                              href={h3.url}
                              className={cn(
                                "link-focus inline-block text-sm transition-colors",
                                activeHeading === h3.url?.split("#")[1]
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                            >
                              {h3.title}
                            </a>
                          </li>
                        );
                      })}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**********************************************************************
 * useActiveItem():
 *   Tracks which heading is currently active in the viewport.
 *   Observes all elements with the given IDs using IntersectionObserver.
 *   Updates state when a heading scrolls into the top 20% of the viewport.
 *   Returns the ID of the active heading, or null if none are active.
 *********************************************************************/

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );
    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

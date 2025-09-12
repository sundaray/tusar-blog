"use client";

import { Icons } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";
import { type TableOfContents as TOCType } from "@/lib/toc";
import { cn } from "@/lib/utils";
import * as React from "react";

interface TocProps {
  toc: TOCType;
}

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

  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;
    const updateBorderWidth = () => {
      const borderWidth = parseFloat(
        getComputedStyle(containerElement).borderLeftWidth || "1",
      );
      setIndicator((prev) => ({
        ...prev,
        borderWidth: isNaN(borderWidth) ? 1 : borderWidth,
      }));
    };
    updateBorderWidth();
    const resizeObserver = new ResizeObserver(updateBorderWidth);
    resizeObserver.observe(containerElement);
    return () => resizeObserver.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement || !activeHeading) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const esc = (str: string) =>
      (window as any).CSS?.escape ? (window as any).CSS.escape(str) : str;
    const selector = `a[href="#${esc(activeHeading)}"]`;
    const linkElement =
      containerElement.querySelector<HTMLAnchorElement>(selector);
    if (!linkElement) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    let rafId: number | null = null;
    const scheduleUpdate = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
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

    // run once now
    updatePosition();

    // resize observer for the link (already had in your original) — keeps size-driven changes in sync
    const linkResizeObserver = new ResizeObserver(scheduleUpdate);
    linkResizeObserver.observe(linkElement);

    // resize observer for the container — catches layout changes that affect positions
    const containerResizeObserver = new ResizeObserver(scheduleUpdate);
    containerResizeObserver.observe(containerElement);

    // mutation observer on the container subtree — will fire when expand/collapse moves items
    const mo = new MutationObserver(() => {
      // schedule update on next animation frame
      scheduleUpdate();
    });
    mo.observe(containerElement, {
      childList: true,
      subtree: true,
      attributes: true, // if classes change that affect layout
    });

    // window resize
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      linkResizeObserver.disconnect();
      containerResizeObserver.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [
    activeHeading,
    toc /* you might add manualOpen or expanded state here if you prefer */,
  ]);

  // Manual open state (click to open). Auto-open based on scroll (activeParent) will also expand.
  const [manualOpen, setManualOpen] = React.useState<Record<string, boolean>>(
    {},
  );

  const toggleManual = (h2Id: string) =>
    setManualOpen((prev) => ({ ...prev, [h2Id]: !prev[h2Id] }));

  // derive the active parent h2 id from activeHeading
  const activeParent = React.useMemo(() => {
    if (!activeHeading) return null;
    // if activeHeading is a top-level id (h2)
    if (topLevel.find((t) => t.url?.split("#")[1] === activeHeading)) {
      return activeHeading;
    }
    // otherwise look up parent for h3
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

        <ul className="list-none space-y-1">
          {topLevel.map((h2, idx) => {
            const h2Id = h2.url?.split("#")[1];
            const isActiveGroup = Boolean(h2Id && activeParent === h2Id);
            const isManuallyOpen = Boolean(h2Id && manualOpen[h2Id]);
            // auto-open (activeParent) OR manual open should show children; auto behavior takes precedence for render
            const expanded = isActiveGroup || isManuallyOpen;

            return (
              <li key={idx} className="group">
                <div className="flex items-center justify-between">
                  <a
                    href={h2.url}
                    className={cn(
                      "link-focus inline-block py-2 text-sm transition-colors",
                      isActiveGroup
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {h2.title}
                  </a>

                  {/* Chevron button (click toggles manual open), hidden if no children */}
                  {h2.items?.length ? (
                    <button
                      aria-expanded={expanded}
                      aria-controls={`toc-${h2Id}`}
                      onClick={() => toggleManual(h2Id!)}
                      className={cn(
                        "text-muted-foreground hover:text-foreground -mr-2 ml-3 inline-flex items-center justify-center rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600",
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

                {/* nested h3s: render only when expanded */}
                {h2.items?.length ? (
                  <ul
                    id={`toc-${h2Id}`}
                    className={cn(
                      "mt-1 overflow-hidden transition-all duration-200",
                      expanded ? "max-h-96" : "max-h-0",
                    )}
                  >
                    {h2.items.map((h3, i) => {
                      return (
                        <li key={i} className="pl-4">
                          <a
                            href={h3.url}
                            className={cn(
                              "link-focus inline-block py-1 text-sm transition-colors",
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
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------- useActiveItem hook (unchanged logic) ---------- */
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

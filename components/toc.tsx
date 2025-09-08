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
  const itemIds = React.useMemo(
    () =>
      toc?.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc],
  ) as string[];

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();
  const containerRef = React.useRef<HTMLDivElement>(null);
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
      const bw = parseFloat(
        getComputedStyle(containerElement).borderLeftWidth || "1",
      );
      setIndicator((prev) => ({ ...prev, borderWidth: isNaN(bw) ? 1 : bw }));
    };
    updateBorderWidth();
    const ro = new ResizeObserver(updateBorderWidth);
    ro.observe(containerElement);
    return () => ro.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement || !activeHeading) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const esc = (s: string) =>
      (window as any).CSS?.escape ? (window as any).CSS.escape(s) : s;
    const selector = `a[href="#${esc(activeHeading)}"]`;
    const linkElement =
      containerElement.querySelector<HTMLAnchorElement>(selector);
    if (!linkElement) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const updatePosition = () => {
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
    const ro = new ResizeObserver(updatePosition);
    ro.observe(linkElement);
    window.addEventListener("resize", updatePosition);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [activeHeading, toc]);

  if (!mounted || !toc?.items) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2">
        <Icons.toc className="text-muted-foreground size-4" />
        <span>On this page</span>
      </p>
      <div ref={containerRef} className="border-border relative border-l pl-4">
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
        <Tree tree={toc} activeItem={activeHeading} />
      </div>
    </div>
  );
}

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

function Tree({
  tree,
  level = 1,
  activeItem,
}: {
  tree: TOCType;
  level?: number;
  activeItem?: string | null;
}) {
  return tree?.items?.length && level < 3 ? (
    <ul
      className={cn("list-none space-y-2", {
        "pl-4 pt-2": level !== 1,
      })}
    >
      {tree.items.map((item, index) => {
        return (
          <li key={index}>
            <a
              href={item.url}
              className={cn(
                "hover:text-foreground inline-block text-sm transition-colors",
                item.url === `#${activeItem}`
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}

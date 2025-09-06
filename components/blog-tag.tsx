"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type {
  TagGroupProps,
  TagListProps,
  TagProps,
} from "react-aria-components";
import { Button, Label, Tag, TagGroup, TagList } from "react-aria-components";

type BlogTagProps = Omit<TagProps, "children"> & {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

function BlogTag({ children, className, ref, ...props }: BlogTagProps) {
  const textValue = typeof children === "string" ? children : undefined;

  return (
    <Tag
      ref={ref}
      textValue={textValue}
      {...props}
      className={cn(
        "text-foreground flex items-center gap-x-2 rounded-full bg-neutral-200/60 px-3 py-1.5 text-sm font-medium outline-none dark:bg-neutral-800",
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-sky-600 data-[focus-visible]:ring-offset-2",
        "transition-all group-has-[[data-pending]]:pointer-events-none group-has-[[data-pending]]:opacity-50",
        className,
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              slot="remove"
              className="text-muted-foreground group h-auto cursor-pointer rounded-full p-1 transition-colors data-[hovered]:bg-neutral-300/50 data-[hovered]:text-neutral-700"
            >
              <Icons.x className="size-4" />
            </Button>
          )}
        </>
      )}
    </Tag>
  );
}

interface BlogTagGroupProps<T>
  extends Omit<TagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  label?: string;
  labelClassName?: string;
  listClassName?: string;
}

function BlogTagGroup<T extends object>({
  label,
  items,
  children,
  renderEmptyState,
  labelClassName,
  listClassName,
  ...props
}: BlogTagGroupProps<T>) {
  return (
    <TagGroup {...props}>
      {label && (
        <Label className={cn("text-foreground font-medium", labelClassName)}>
          {label}
        </Label>
      )}
      <TagList
        items={items}
        renderEmptyState={renderEmptyState}
        className={cn("flex flex-wrap gap-2", listClassName)}
      >
        {children}
      </TagList>
    </TagGroup>
  );
}

export { BlogTag, BlogTagGroup };

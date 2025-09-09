"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { blogSearchParams } from "@/lib/blog-search-params";
import { calculatePaginationRange } from "@/lib/pagination";
import { cn } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";

const SIBLING_COUNT = 2;

type BlogPaginationProps = {
  totalPages: number;
  className?: string;
};

export function BlogPagination({ totalPages, className }: BlogPaginationProps) {
  const [filters, setFilters] = useQueryStates(blogSearchParams);
  const currentPage = filters.page;

  const paginationRange = useMemo(
    () => calculatePaginationRange(currentPage, totalPages, SIBLING_COUNT),
    [currentPage, totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilters({ page });
    }
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem className="mr-auto">
          <PaginationPrevious
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {paginationRange.map((pageNumberOrEllipsis, index) => {
          if (typeof pageNumberOrEllipsis === "string") {
            return (
              <PaginationItem key={`${pageNumberOrEllipsis}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = pageNumberOrEllipsis;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem className="ml-auto">
          <PaginationNext
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={cn(isLastPage && "pointer-events-none opacity-50")}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

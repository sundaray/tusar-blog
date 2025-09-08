type BlogFilterSummaryProps = {
  filteredCount: number;
  totalCount: number;
};

export function BlogFilterSummary({
  filteredCount,
  totalCount,
}: BlogFilterSummaryProps) {
  return (
    <p className="text-tertiary-foreground text-sm">
      Showing {filteredCount} of {totalCount} posts:
    </p>
  );
}

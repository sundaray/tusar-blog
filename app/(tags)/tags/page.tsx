import { Breadcrumbs } from "@/components/breadcrumbs";
import { TagsList } from "@/components/tags-list";
import { TagsSearch } from "@/components/tags-search";
import { getAllTags } from "@/lib/blog";
import { Suspense } from "react";

export default async function TagsPage() {
  const allTags = getAllTags();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <Breadcrumbs />
      <h1 className="mt-6 text-4xl font-bold">Tags</h1>
      <p className="mt-6 text-lg">
        Select a tag to view all related blog posts.
      </p>

      <Suspense>
        <TagsSearch className="mt-12" />

        <TagsList allTags={allTags} className="mt-12" />
      </Suspense>
    </section>
  );
}

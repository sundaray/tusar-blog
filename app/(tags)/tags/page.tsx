import { TagsList } from "@/components/tags-list";
import { TagsSearch } from "@/components/tags-search";
import { getAllTags } from "@/lib/blog";

export default async function TagsPage() {
  const allTags = getAllTags();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <h1 className="text-4xl font-bold">Tags</h1>
      <p className="mt-6 text-lg">
        Select a tag to view all related blog posts.
      </p>

      <TagsSearch className="mt-12" />

      <TagsList allTags={allTags} className="mt-12" />
    </section>
  );
}

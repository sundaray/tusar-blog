import { TagsList } from "@/components/tags-list";
import { TagsSearch } from "@/components/tags-search";
import { getAllTags } from "@/lib/blog";

export default async function TagsPage() {
  const allTags = getAllTags();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <h1 className="mb-8 text-4xl font-bold">Tags</h1>

      <TagsSearch />

      <TagsList allTags={allTags} />
    </section>
  );
}

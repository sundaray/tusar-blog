import { ActiveBlogFilters } from "@/components/active-blog-filters";
import { BlogSearch } from "@/components/blog-search";
import { FilteredPostList } from "@/components/filtered-post-list";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <div className="flex flex-col space-y-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <BlogSearch />
        <ActiveBlogFilters />
      </div>
      <FilteredPostList allPosts={allPosts} />
    </section>
  );
}

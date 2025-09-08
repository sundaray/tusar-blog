import { BlogActions } from "@/components/blog-actions";
import { FilteredPostList } from "@/components/filtered-post-list";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <h1 className="mb-4 text-4xl font-bold">Blog</h1>
      <p className="mb-8 text-lg">
        Posts on AUTOSAR, Embedded Systsems & C/C++
      </p>

      <BlogActions />

      <FilteredPostList allPosts={allPosts} className="mt-12" />
    </section>
  );
}

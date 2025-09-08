import { BlogActions } from "@/components/blog-actions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <div>
        <Breadcrumbs />
        <h1 className="mt-6 text-4xl font-bold">Blog</h1>
        <p className="mt-4 text-lg">
          Posts on AUTOSAR, Embedded Systsems & C/C++
        </p>
      </div>

      <BlogActions allPosts={allPosts} className="mt-12" />
    </section>
  );
}

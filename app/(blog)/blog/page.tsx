import { ReadMoreLink } from "@/components/read-more-link";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <h1 className="mb-12 text-4xl font-bold">Blog</h1>
      <div className="flex flex-col space-y-12">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative rounded-lg p-4 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            <Link href={`/blog/${post.slug}`} className="absolute inset-0">
              <span className="sr-only">Read {post.title}</span>
            </Link>

            <time
              dateTime={post.publishedAt}
              className="text-muted-foreground font-mono text-sm"
            >
              {format(new Date(post.publishedAt), "LLL d, yyyy")}
            </time>

            <h2 className="mt-2 text-2xl font-bold group-hover:text-sky-600 dark:group-hover:text-sky-400">
              {post.title}
            </h2>

            <p className="text-tertiary-foreground mt-4 line-clamp-2">
              {post.description}
            </p>

            <div className="mt-4">
              <ReadMoreLink>Read more</ReadMoreLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

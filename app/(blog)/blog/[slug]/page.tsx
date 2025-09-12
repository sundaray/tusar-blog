import { BlogPostLayout } from "@/components/blog-post-layout";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  try {
    const { slug } = await props.params;
    const { frontmatter } = await getPostBySlug(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    };
  } catch (error) {
    console.error("Failed to render blog post:", error);
    return {
      title: "Post Not Found",
    };
  }
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  try {
    const { slug } = await props.params;
    const { frontmatter, toc, ContentComponent } = await getPostBySlug(slug);

    return (
      <BlogPostLayout frontmatter={frontmatter} toc={toc}>
        <ContentComponent />
      </BlogPostLayout>
    );
  } catch (error) {
    notFound();
  }
}

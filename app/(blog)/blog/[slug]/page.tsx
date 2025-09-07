import { BlogPostLayout } from "@/components/blog-post-layout";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";

// Updated to use the props pattern
export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const { frontmatter } = await getPostBySlug(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

// Updated to use the props pattern
export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const { frontmatter, toc, ContentComponent } = await getPostBySlug(slug);

  return (
    <BlogPostLayout frontmatter={frontmatter} toc={toc}>
      <ContentComponent />
    </BlogPostLayout>
  );
}

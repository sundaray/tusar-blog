import { Frontmatter } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getTableOfContents } from "./toc";

const postsDirectory = path.join(process.cwd(), "app/(posts)");

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);

  const allPosts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug, "content.mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      ...(data as Frontmatter),
    };
  });

  return allPosts.sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
  );
}

export function getAllPostSlugs() {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, slug, "content.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const toc = await getTableOfContents(content);

  const { default: ContentComponent } = await import(
    `@/app/(posts)/${slug}/content.mdx`
  );

  return {
    frontmatter: data as Frontmatter,
    toc,
    ContentComponent,
  };
}

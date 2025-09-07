import { Frontmatter } from "@/types"; // 1. Import your Frontmatter type
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getTableOfContents } from "./toc";

const postsDirectory = path.join(process.cwd(), "app/(blog)/blog/(posts)");

// 2. New function to get all post slugs for static generation
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
    `@/app/(blog)/blog/(posts)/${slug}/content.mdx`
  );

  return {
    // 3. Cast the returned data to your Frontmatter type
    frontmatter: data as Frontmatter,
    toc,
    ContentComponent,
  };
}

export interface Frontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  author: string;
  isPublished: boolean;
}

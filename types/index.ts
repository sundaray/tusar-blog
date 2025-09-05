export interface Frontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  author: string;
  isPublished: boolean;
}

export type NavItem = {
  title: string;
  href: string;
};

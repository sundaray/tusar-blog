import React from "react";

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto max-w-4xl px-4">{children}</article>;
}

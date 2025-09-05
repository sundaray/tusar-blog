import React from "react";

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto max-w-3xl px-4">{children}</article>;
}

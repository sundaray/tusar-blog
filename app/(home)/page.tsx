import { BlogImage } from "@/components/blog-image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tusarkanta Palauri",
};

export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <div className="relative mt-12 w-36 flex-shrink-0">
        <div className="text-muted-foreground absolute -bottom-4 -right-4 -z-10 h-48 w-36 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] opacity-40 [background-size:6px_6px]" />

        <BlogImage
          src="/images/blog/tusar.jpeg"
          alt="A photo of Tusarkanta Palauri"
          width={400}
          height={400}
        />
      </div>

      <p className="text-tertiary-foreground mt-12 text-lg">
        Hello world! I am Tusarkanta Palauri.
      </p>
    </section>
  );
}

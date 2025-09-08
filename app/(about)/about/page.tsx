import { BlogImage } from "@/components/blog-image";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <Breadcrumbs />
      <h1 className="mt-6 text-4xl font-bold">About</h1>
      <div className="mt-12 w-48 flex-shrink-0">
        <BlogImage
          src="/tusar.jpeg"
          alt="A photo of Tusarkanta Palauri"
          width={400}
          height={400}
        />
      </div>
      <p className="text-tertiary-foreground mt-4 text-lg">
        Hello world! I am Tusarkanta Palauri.
      </p>
    </section>
  );
}

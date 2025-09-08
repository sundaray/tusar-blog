import { BlogImage } from "@/components/blog-image";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-36">
      <div className="mt-12 w-36 flex-shrink-0">
        <BlogImage
          src="/images/blog/tusar.jpeg"
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

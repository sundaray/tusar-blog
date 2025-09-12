import { ArrowLink } from "@/components/arrow-link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-36 text-center">
      <h1 className="mt-6 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-tertiary-foreground mt-4 text-lg">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <div className="mt-8 flex justify-center">
        <ArrowLink href="/" className="text-sky-700 dark:text-sky-400">
          Return Home
        </ArrowLink>
      </div>
    </section>
  );
}

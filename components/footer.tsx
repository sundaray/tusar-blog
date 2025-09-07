export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto flex h-20 max-w-6xl items-center justify-center">
      <p className="text-tertiary-foreground text-sm">
        © {currentYear} Tusarkanta Palauri
      </p>
    </footer>
  );
}

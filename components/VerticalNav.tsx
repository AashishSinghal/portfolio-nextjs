import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function VerticalNav() {
  return (
    <nav
      className="fixed left-[4px] top-0 z-20 flex h-full w-20 flex-col items-center justify-center gap-8 py-12"
      aria-label="Main"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)] transition-colors hover:text-[var(--primary)]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

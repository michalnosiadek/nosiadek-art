import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-void-line/60">
      <div className="container-art flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg text-ink">M. Nosiadek</p>
          <p className="mt-1 text-sm text-ink-faint">
            Original paintings &amp; fine art prints.
          </p>
        </div>

        <nav className="flex gap-8">
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            Gallery
          </Link>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            Shop
          </Link>
          <a
            href="mailto:nosiadek.michal@gmail.com"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            Contact
          </a>
        </nav>

        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Michał Nosiadek. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/gallery", label: "Gallery", external: false },
  // the 3D first-person gallery is a static app served from /public/experience
  { href: "/experience/index.html", label: "Experience", external: true },
  { href: "/about", label: "About", external: false },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-void-line/60 bg-void/70 backdrop-blur-md">
      <div className="container-art flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="wordmark-fire font-serif text-sm tracking-wide text-ink sm:text-lg sm:tracking-widest2 md:text-xl"
        >
          MICHAŁ NOSIADEK
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-void-line/60 bg-void px-6 pb-6 pt-2 md:hidden">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}

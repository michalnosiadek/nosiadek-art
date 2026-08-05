"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "@/i18n/LocaleProvider";
import LanguageSwitch from "@/components/LanguageSwitch";

const links = [
  { href: "/gallery", labelKey: "site.nav.gallery", external: false },
  // the 3D first-person gallery is a static app served from /public/experience
  { href: "/experience/index.html", labelKey: "site.nav.experience", external: true },
  { href: "/about", labelKey: "site.nav.about", external: false },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-void-line/60 bg-void/70 backdrop-blur-md">
      <div className="container-art flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="wordmark-fire font-serif text-sm tracking-wide text-ink sm:text-lg sm:tracking-widest2 md:text-xl"
        >
          {t("site.nav.wordmark")}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {t(link.labelKey)}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {t(link.labelKey)}
              </Link>
            )
          )}
          <LanguageSwitch />
        </nav>

        <div className="flex items-center gap-5 md:hidden">
          <LanguageSwitch />
          <button
            className="flex flex-col gap-1.5"
            aria-label={t("site.nav.toggleMenu")}
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
                {t(link.labelKey)}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-widest2 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {t(link.labelKey)}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}

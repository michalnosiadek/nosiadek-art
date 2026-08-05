"use client";

import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { useT } from "@/i18n/LocaleProvider";

export default function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-void-line/60">
      <div className="container-art flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg text-ink">{t("site.footer.name")}</p>
          <p className="mt-1 text-sm text-ink-faint">
            {t("site.footer.tagline")}
          </p>
        </div>

        <nav className="flex gap-8">
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            {t("site.footer.gallery")}
          </Link>
          <Link
            href="/about"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            {t("site.footer.about")}
          </Link>
          <a
            href="mailto:nosiadek.michal@gmail.com"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            {t("site.footer.contact")}
          </a>
        </nav>

        <SocialLinks />

        <p className="text-xs text-ink-faint">
          {t("site.footer.rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

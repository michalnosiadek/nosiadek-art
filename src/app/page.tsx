"use client";

import Hero from "@/components/Hero";
import PaintingJourney from "@/components/PaintingJourney";
import Link from "next/link";
import { useT } from "@/i18n/LocaleProvider";
import LocalizedTitle from "@/components/LocalizedTitle";

export default function Home() {
  const t = useT();

  return (
    <>
      <LocalizedTitle titleKey="site.meta.homeTitle" />
      <Hero />
      <PaintingJourney />

      <section className="relative overflow-hidden border-t border-void-line/60 bg-void-raised">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_0%,rgba(150,44,32,.18),transparent_42%)]" />
        <div className="container-art relative py-24 md:py-32">
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs uppercase tracking-widest2 text-ember">
              {t("site.home.destinationsEyebrow")}
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl">
              {t("site.home.destinationsHeading")}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
              {t("site.home.destinationsBody")}
            </p>
          </div>
          <nav
            className="grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-5"
            aria-label={t("site.nav.toggleMenu")}
          >
            {[
              ["/gallery", "site.nav.gallery"],
              ["/journal", "site.nav.journal"],
              ["/software", "site.nav.software"],
              ["/experience", "site.nav.experience"],
              ["/about", "site.nav.about"],
            ].map(([href, labelKey], index) => (
              <Link
                key={href}
                href={href}
                className="group flex min-h-32 min-w-0 flex-col justify-between border-b border-ink/15 px-5 py-5 transition-colors duration-500 hover:bg-ink/[.04] lg:min-h-40 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="text-[10px] uppercase tracking-widest2 text-ink-faint">
                  {"0" + (index + 1)}
                </span>
                <span className="flex items-center justify-between gap-3 whitespace-nowrap text-xs uppercase tracking-widest2 text-ink-muted transition-colors group-hover:text-ink">
                  {t(labelKey)}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-ember transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 7h9M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section id="software" className="border-t border-void-line/60 bg-void">
        <div className="container-art py-20 md:py-24">
          <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
            {t("site.home.softwareEyebrow")}
          </p>
          <h2 className="max-w-2xl font-serif text-3xl font-light leading-snug text-ink md:text-4xl">
            {t("site.home.softwareHeading")}
          </h2>
          <Link
            href="/software"
            className="mt-8 inline-block text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            {t("site.software.visit")}
          </Link>
        </div>
      </section>

      <section className="border-t border-void-line/60 bg-void-raised">
        <div className="container-art py-20 md:py-24">
          <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
            {t("site.home.journalEyebrow")}
          </p>
          <h2 className="max-w-2xl font-serif text-3xl font-light leading-snug text-ink md:text-4xl">
            {t("site.home.journalHeading")}
          </h2>
          <Link
            href="/journal"
            className="mt-8 inline-block text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            {t("site.home.journalCta")}
          </Link>
        </div>
      </section>

      <section className="border-t border-void-line/60 bg-void-raised">
        <div className="container-art flex flex-col items-center gap-6 py-24 text-center md:py-32">
          <p className="text-xs uppercase tracking-widest2 text-ink-faint">
            {t("site.home.printsEyebrow")}
          </p>
          <h2 className="max-w-xl font-serif text-3xl font-light leading-snug text-ink md:text-4xl">
            {t("site.home.printsHeading")}
          </h2>
          <Link
            href="/gallery"
            className="mt-4 border border-ink/30 px-8 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            {t("site.home.shopCta")}
          </Link>
        </div>
      </section>
    </>
  );
}

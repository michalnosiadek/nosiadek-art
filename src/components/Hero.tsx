"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LocaleProvider";

export default function Hero() {
  const t = useT();

  return (
    // min-h, not h: on a short phone the card grows the section instead of
    // overflowing upward behind the fixed header
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden">
      <Image
        src="/images/the-last-dawn.jpg"
        alt={t("site.hero.imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* light edge gradients only: the painting stays sharp, the title card below carries the contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/10" />

      <div className="container-art relative z-10 pb-16 pt-28 md:pb-28 md:pt-40">
        {/* museum-plaque style title card, like a label mounted on the painting's frame */}
        {/* no max-width: the card sizes to its widest line, so a longer
            translation widens the plaque instead of spilling out of it */}
        <div className="inline-block border-l-2 border-dawn bg-void/55 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-10">
          <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-muted">
            {t("site.hero.eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            {t("site.hero.title")}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted md:mt-6 md:text-lg">
            {t("site.hero.tagline")}
          </p>

          <div className="mt-8 md:mt-10">
            <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">
              {t("site.hero.enterEyebrow")}
            </p>
            {/* stacked on phones, one row from md up. The labels never wrap and
                the tracking is eased to 0.14em so the longer Polish ones
                ("Wystawa w pierwszej osobie") still sit side by side. */}
            <div className="flex flex-col gap-3 md:flex-row md:flex-nowrap md:gap-4">
              {/* the 3D gallery is a static app served from /public/experience */}
              <a
                href="/experience/index.html"
                className="whitespace-nowrap bg-dawn px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-dawn-bright md:text-sm"
              >
                {t("site.hero.ctaExperience")}
              </a>
              <Link
                href="/#collection"
                className="whitespace-nowrap border border-ink/30 px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void md:text-sm"
              >
                {t("site.hero.ctaScroll")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden text-right text-xs uppercase tracking-widest2 text-ink-faint md:block">
        {t("site.hero.credit")}
      </div>
    </section>
  );
}

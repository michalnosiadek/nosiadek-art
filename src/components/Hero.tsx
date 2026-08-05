"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LocaleProvider";

export default function Hero() {
  const t = useT();

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
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

      <div className="container-art relative z-10 pb-20 pt-40 md:pb-28">
        {/* museum-plaque style title card, like a label mounted on the painting's frame */}
        <div className="inline-block max-w-3xl border-l-2 border-dawn bg-void/55 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-10">
          <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-muted">
            {t("site.hero.eyebrow")}
          </p>
          <h1 className="font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            {t("site.hero.title")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            {t("site.hero.tagline")}
          </p>

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">
              {t("site.hero.enterEyebrow")}
            </p>
            <div className="flex flex-wrap gap-4">
              {/* the 3D gallery is a static app served from /public/experience */}
              <a
                href="/experience/index.html"
                className="bg-dawn px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
              >
                {t("site.hero.ctaExperience")}
              </a>
              <Link
                href="/#collection"
                className="border border-ink/30 px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { artworks } from "@/lib/artworks";
import { useI18n } from "@/i18n/LocaleProvider";

const slides = ["the-last-dawn", "the-end", "the-second-moon", "coming-of-the-second-sun"] as const;

export default function Hero() {
  const { t, tArt } = useI18n();
  const [active, setActive] = useState(0);
  const artwork = artworks.find((item) => item.slug === slides[active]) ?? artworks[0];
  const slide = slides[active];

  const move = (delta: number) => setActive((current) => (current + delta + slides.length) % slides.length);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-void text-ink">
      <Image src={artwork.image} alt={tArt(slide, "title", artwork.title)} fill priority={active === 0} sizes="100vw" className="object-cover object-center transition-opacity duration-700" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.82),rgba(8,7,6,.2)_58%,rgba(8,7,6,.3)),linear-gradient(0deg,rgba(8,7,6,.82),transparent_48%)]" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <span className="text-[0.65rem] uppercase tracking-[0.32em] text-ink">{t("site.hero.productions")}</span>
        <span className="text-[0.65rem] uppercase tracking-[0.28em] text-ink-faint">{String(active + 1).padStart(2, "0")} / 04</span>
      </div>

      <div className="container-art relative z-10 flex min-h-[100svh] items-end pb-24 pt-32 md:items-end md:pb-28 md:pt-40">
        <div className="max-w-xl">
          <p className="hero-mobile-hide mb-5 text-xs uppercase tracking-widest2 text-ink-faint">{t(`site.hero.slide.${slide}.eyebrow`)}</p>
          <h1 className="font-serif text-5xl font-light leading-[.95] sm:text-7xl md:text-8xl">{tArt(slide, "title", artwork.title)}</h1>
          <p className="hero-mobile-hide mt-5 max-w-lg text-base leading-relaxed text-ink-muted md:text-xl">{t(`site.hero.slide.${slide}.tagline`)}</p>
          {artwork.poem || slide === "the-last-dawn" ? (
            <blockquote className="hero-mobile-hide mt-8 max-w-xl whitespace-pre-line border-l border-dawn/80 pl-5 font-serif text-lg italic leading-relaxed text-ink/90 md:text-xl">
              {tArt(slide, "poem.body", artwork.poem?.body ?? "Ride, while the mountains still hold the light.\nThe kingdom is a held breath.\nWhatever the sun is about to say,\nit will only say it once.")}
            </blockquote>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/experience/index.html" className="bg-dawn px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-ink transition hover:bg-dawn-bright">{t("site.hero.ctaExperience")}</a>
            <Link href="#collection" className="border border-ink/35 px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-ink transition hover:border-ink hover:bg-ink hover:text-void">{t("site.hero.ctaScroll")}</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-6 z-20 flex items-center gap-3 md:right-12">
        <button aria-label={t("site.hero.previous")} onClick={() => move(-1)} className="border border-ink/30 px-3 py-2 text-ink transition hover:border-ink">‹</button>
        <button aria-label={t("site.hero.next")} onClick={() => move(1)} className="border border-ink/30 px-3 py-2 text-ink transition hover:border-ink">›</button>
        <div className="ml-2 flex gap-2">{slides.map((item, index) => <button key={item} aria-label={tArt(item, "title", item)} onClick={() => setActive(index)} className={`h-1 w-10 transition ${index === active ? "bg-ink" : "bg-ink/35"}`} />)}</div>
      </div>
    </section>
  );
}

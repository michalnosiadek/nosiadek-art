"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { artworks } from "@/lib/artworks";
import { useI18n } from "@/i18n/LocaleProvider";

const opening = ["the-last-dawn", "the-end", "the-second-moon"];
const branches = [
  ["coming-of-the-second-sun", "city-of-mages", "celtic"],
  ["moon", "witches", "edephious"],
  ["edge-of-the-night", "isle-of-the-dead", "pandemonium"],
];

export default function PaintingJourney() {
  const { t, tArt } = useI18n();
  const [active, setActive] = useState(0);
  const [branch, setBranch] = useState(0);
  const all = [...opening, ...branches[branch]];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
    }, { threshold: [0.3, 0.7] });
    document.querySelectorAll<HTMLElement>("[data-journey-frame]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [branch]);

  const artwork = artworks.find((item) => item.slug === all[active]) ?? artworks[0];

  return (
    <section id="collection" className="border-y border-void-line/60 bg-void-raised">
      <div className="container-art py-20 md:py-28">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">{t("site.home.selectedWorkEyebrow")}</p>
          <h2 className="font-serif text-4xl font-light text-ink md:text-6xl">{t("site.home.collectionHeading")}</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{t("site.hero.mystery")}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:h-[calc(100svh-4rem)] lg:self-start">
            <div className="relative h-[58svh] min-h-[25rem] overflow-hidden bg-void lg:h-full">
              <Image src={artwork.image} alt={tArt(artwork.slug, "title", artwork.title)} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain transition-opacity duration-500" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-xs uppercase tracking-widest2 text-ink-faint">{String(active + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}</div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div><p className="text-xs uppercase tracking-widest2 text-ink-faint">{tArt(artwork.slug, "medium", artwork.medium)}</p><h3 className="mt-1 font-serif text-2xl text-ink">{tArt(artwork.slug, "title", artwork.title)}</h3></div>
              <a href="/gallery" className="text-xs uppercase tracking-widest2 text-ink-muted hover:text-ink">{t("site.home.viewAll")}</a>
            </div>
          </div>

          <div className="space-y-8">
            {all.map((slug, index) => {
              const item = artworks.find((entry) => entry.slug === slug);
              if (!item) return null;
              return <article key={`${branch}-${slug}`} data-journey-frame data-index={index} className="flex min-h-[72svh] flex-col justify-center border-b border-void-line/70 py-12 first:pt-0">
                <p className="text-xs uppercase tracking-widest2 text-ink-faint">{index < 3 ? `0${index + 1} / ${tArt(slug, "title", item.title)}` : `Path ${branch + 1} / ${index - 2}`}</p>
                <h3 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">{tArt(slug, "title", item.title)}</h3>
                <p className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">{tArt(slug, "description", item.description)}</p>
                {item.poem ? <p className="mt-8 whitespace-pre-line border-l border-dawn/70 pl-5 font-serif text-lg italic leading-relaxed text-ink/85">{tArt(slug, "poem.body", item.poem.body)}</p> : null}
                {index === 2 ? <div className="mt-9"><p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">Choose what waits beyond the moon</p><div className="flex flex-wrap gap-2">{branches.map((_, value) => <button key={value} onClick={() => { setBranch(value); setActive(3); }} className={`border px-4 py-3 text-xs uppercase tracking-widest2 transition ${branch === value ? "border-dawn bg-dawn text-ink" : "border-ink/25 text-ink-muted hover:border-ink"}`}>Path {value + 1}</button>)}</div></div> : null}
              </article>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

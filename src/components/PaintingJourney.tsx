"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { artworks } from "@/lib/artworks";
import { useI18n } from "@/i18n/LocaleProvider";
import ArtworkViewer from "@/components/ArtworkViewer";

const frames = ["the-last-dawn", "the-end", "blackout-dark", "the-second-moon", "blackout-light", "coming-of-the-second-sun"];

export default function PaintingJourney() {
  const { t, tArt } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index ?? 0));
    }, { threshold: [0.45, 0.7] });
    document.querySelectorAll<HTMLElement>("[data-journey-frame]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="collection" className="relative bg-void">
      <header className="container-art relative z-20 py-20 md:py-28">
        <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">{t("site.home.selectedWorkEyebrow")}</p>
        <h2 className="font-serif text-4xl font-light text-ink md:text-6xl">{t("site.home.collectionHeading")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">{t("site.hero.mystery")}</p>
      </header>

      <div className="relative">
        <div className="pointer-events-none sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-void">
          {frames.filter((slug) => !slug.startsWith("blackout")).map((slug) => {
            const index = frames.indexOf(slug);
            const item = artworks.find((entry) => entry.slug === slug);
            if (!item) return null;
            const distance = index - active;
            return <Image key={slug} src={item.image} alt={tArt(slug, "title", item.title)} fill priority={index === 0} sizes="100vw" className="object-contain object-center transition-[transform,opacity] duration-700 ease-out md:object-cover" style={{ opacity: index === active ? 1 : 0, transform: "scale(" + (index === active ? 1 : 0.88) + ") translateX(" + (distance * 2) + "%)" }} />;
          })}
          <div className="absolute inset-0 bg-gradient-to-r from-void/75 via-transparent to-void/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/20" />
          <div className="absolute bottom-8 left-6 text-xs uppercase tracking-widest2 text-ink-faint md:left-12">{String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</div>
        </div>

        <div className="pointer-events-none relative z-10 -mt-[100svh]">
          {frames.map((slug, index) => {
            if (slug === "blackout-dark" || slug === "blackout-light") {
              const text = slug === "blackout-dark" ? t("site.journey.darkness") : t("site.journey.return");
              return <article key={slug} data-journey-frame data-index={index} className="flex min-h-[100svh] items-center justify-center bg-black px-6 text-center"><p className="max-w-3xl break-words font-serif text-[clamp(1.45rem,5vw,4rem)] italic leading-relaxed text-ink">{text}</p></article>;
            }
            const item = artworks.find((entry) => entry.slug === slug);
            if (!item) return null;
            if (slug === "the-second-moon") return <article key={slug} data-journey-frame data-index={index} className="min-h-[100svh]" aria-label={tArt(slug, "title", item.title)} />;
            const isFinal = slug === "coming-of-the-second-sun";
            return (
              <article key={slug} data-journey-frame data-index={index} className="flex min-h-[100svh] items-end px-6 pb-20 pt-[55svh] md:items-center md:px-12 md:pb-0 md:pt-0">
                <div className="pointer-events-auto max-w-xl border-l border-dawn/80 bg-void/60 px-6 py-7 backdrop-blur-[2px] md:ml-auto md:mr-[8vw] md:max-w-lg md:px-9 md:py-10">
                  <p className="text-xs uppercase tracking-widest2 text-ink-faint">{"0" + (index + 1)} / {tArt(slug, "title", item.title)}</p>
                  <h3 className="mt-4 font-serif text-4xl font-light leading-tight text-ink md:text-6xl">{tArt(slug, "title", item.title)}</h3>
                  <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">{tArt(slug, "description", item.description)}</p>
                  {item.poem ? <p className="mt-7 whitespace-pre-line font-serif text-lg italic leading-relaxed text-ink/90">{tArt(slug, "poem.body", item.poem.body)}</p> : null}
                  {isFinal ? <p className="mt-7 text-xs uppercase tracking-widest2 text-ember">{t("site.journey.returnedCaption")}</p> : null}
                  <div className="mt-8">
                    <ArtworkViewer
                      compact
                      src={item.image}
                      alt={tArt(item.slug, "title", item.title)}
                      width={item.imageWidth}
                      height={item.imageHeight}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

    </section>
  );
}

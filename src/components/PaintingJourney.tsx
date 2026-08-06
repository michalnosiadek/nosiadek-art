"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { artworks } from "@/lib/artworks";
import { useI18n } from "@/i18n/LocaleProvider";

const frames = ["the-last-dawn", "the-end", "blackout-dark", "the-second-moon", "blackout-light", "coming-of-the-second-sun"];

export default function PaintingJourney() {
  const { t, tArt } = useI18n();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const currentSlug = frames[active];
  const current = artworks.find((item) => item.slug === currentSlug) ?? null;

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
          {current ? <button type="button" onClick={() => setZoom(true)} className="pointer-events-auto absolute bottom-8 right-6 border border-ink/35 px-4 py-3 text-xs uppercase tracking-widest2 text-ink transition hover:border-ink md:right-12">View painting</button> : null}
        </div>

        <div className="relative z-10 -mt-[100svh]">
          {frames.map((slug, index) => {
            if (slug === "blackout-dark" || slug === "blackout-light") {
              const text = slug === "blackout-dark" ? "And the light vanished from the face of the world..." : "And after ages of darkness... the Light Returned";
              return <article key={slug} data-journey-frame data-index={index} className="flex min-h-[100svh] items-center justify-center bg-black px-6 text-center"><p className="max-w-3xl break-words font-serif text-[clamp(1.45rem,5vw,4rem)] italic leading-relaxed text-ink">{text}</p></article>;
            }
            const item = artworks.find((entry) => entry.slug === slug);
            if (!item) return null;
            const isFinal = slug === "coming-of-the-second-sun";
            return (
              <article key={slug} data-journey-frame data-index={index} className="flex min-h-[100svh] items-end px-6 pb-20 pt-[55svh] md:items-center md:px-12 md:pb-0 md:pt-0">
                <div className="max-w-xl border-l border-dawn/80 bg-void/60 px-6 py-7 backdrop-blur-[2px] md:ml-auto md:mr-[8vw] md:max-w-lg md:px-9 md:py-10">
                  <p className="text-xs uppercase tracking-widest2 text-ink-faint">{"0" + (index + 1)} / {tArt(slug, "title", item.title)}</p>
                  <h3 className="mt-4 font-serif text-4xl font-light leading-tight text-ink md:text-6xl">{tArt(slug, "title", item.title)}</h3>
                  <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">{tArt(slug, "description", item.description)}</p>
                  {item.poem ? <p className="mt-7 whitespace-pre-line font-serif text-lg italic leading-relaxed text-ink/90">{tArt(slug, "poem.body", item.poem.body)}</p> : null}
                  {isFinal ? <p className="mt-7 text-xs uppercase tracking-widest2 text-ember">The light returned after eons.</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {zoom && current ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-void/95 p-4" role="dialog" aria-modal="true" onClick={() => setZoom(false)}>
          <Image src={current.image} alt={tArt(current.slug, "title", current.title)} width={current.imageWidth} height={current.imageHeight} sizes="100vw" className="max-h-[95svh] w-auto max-w-full object-contain" />
          <button type="button" className="absolute right-6 top-6 border border-ink/40 px-4 py-3 text-xs uppercase tracking-widest2 text-ink" onClick={() => setZoom(false)}>Close</button>
        </div>
      ) : null}
    </section>
  );
}

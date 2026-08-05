"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { getJournalEntry } from "@/lib/journal";
import { useI18n } from "@/i18n/LocaleProvider";

export default function JournalEntryView({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const lang = locale === "pl" ? "pl" : "en";
  const entry = getJournalEntry(slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!entry) return null;

  const imagePlacement: Record<string, number> = {
    "the-last-dawn-menu.png": 0, "the-last-dawn-jester.png": 12,
    "architect-quan.png": 0, "children-of-the-sun.png": 1, "sand-shrine.png": 6, "the-first-eclipse.jpg": 13,
    "the-second-moon-detail.png": 0, "forest-of-the-fallen-stars-map.png": 2, "the-first-stone.png": 7,
    "circle-of-the-moon.jpg": 12, "ribbiton.png": 14, "akira.png": 16, "the-moon.jpg": 16,
    "fall-of-mankind.png": 8, "cordia.png": 11,
  };
  const imagesAfter = (index: number) => entry.images?.filter((image) => (image.afterParagraph ?? imagePlacement[image.src.split("/").pop() ?? ""]) === index) ?? [];

  return (
    <article className="container-art py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        <Link href="/journal" className="text-xs uppercase tracking-widest2 text-ink-faint transition-colors hover:text-ink">← {t("site.journal.back")}</Link>
        <header className="mt-16 border-b border-void-line pb-12">
          <p className="text-xs uppercase tracking-widest2 text-ink-faint">{entry.date} · {entry.readingTime} {t("site.journal.readTime")}</p>
          <h1 className="mt-6 font-serif text-5xl font-light leading-[.95] text-ink md:text-7xl">{entry.title[lang]}</h1>
          <p className="mt-5 font-serif text-2xl italic text-moon-soft">{entry.subtitle[lang]}</p>
          <p className="mt-8 text-xl leading-relaxed text-ink-muted">{entry.excerpt[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {entry.tags.map((tag) => <span key={tag} className="border border-void-line px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink-faint">{tag}</span>)}
          </div>
        </header>

        <div className="journal-prose mt-14">
          {entry.paragraphs[lang].map((paragraph, index) => (
            <Fragment key={`${entry.slug}-${index}`}>
              <p className={index === 0 ? "journal-prose-dropcap" : undefined}>{paragraph}</p>
              {imagesAfter(index).map((image) => (
                <figure key={image.src} className="journal-inline-figure">
                  <button type="button" onClick={() => setLightbox({ src: image.src, alt: image.alt[lang] })} aria-label={`${t("site.journal.zoom")}: ${image.alt[lang]}`}>
                    <img src={image.src} alt={image.alt[lang]} loading="lazy" />
                  </button>
                  <figcaption>{image.alt[lang]}</figcaption>
                </figure>
              ))}
            </Fragment>
          ))}
        </div>

        <footer className="mt-20 border-t border-void-line pt-8">
          <Link href="/gallery" className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink">{t("site.journal.galleryLink")} →</Link>
        </footer>
      </div>
      {lightbox ? (
        <div className="journal-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <button type="button" className="journal-lightbox-close" onClick={() => setLightbox(null)} aria-label={t("site.journal.close")}>×</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </article>
  );
}

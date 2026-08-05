"use client";

import ArtworkCard from "@/components/ArtworkCard";
import LocalizedTitle from "@/components/LocalizedTitle";
import { artworks } from "@/lib/artworks";
import { useT } from "@/i18n/LocaleProvider";

export default function GalleryView() {
  const t = useT();

  return (
    <section className="container-art pb-24 pt-36 md:pt-44">
      <LocalizedTitle titleKey="site.meta.galleryTitle" />
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest2 text-ink-faint">
        <a href="/" className="transition-colors hover:text-ink">{t("site.nav.wordmark")}</a>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">{t("site.galleryPage.heading")}</span>
      </nav>
      <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
        {t("site.galleryPage.eyebrow")}
      </p>
      <h1 className="mb-16 font-serif text-4xl font-light text-ink md:text-5xl">
        {t("site.galleryPage.heading")}
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.slug} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

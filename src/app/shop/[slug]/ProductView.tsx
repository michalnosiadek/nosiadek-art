"use client";

import Link from "next/link";
import type { Artwork } from "@/lib/artworks";
import BuyPanel from "@/components/BuyPanel";
import PoemBlock from "@/components/PoemBlock";
import MusicPlayer from "@/components/MusicPlayer";
import ArtworkViewer from "@/components/ArtworkViewer";
import SecretDoor from "@/components/SecretDoor";
import LocalizedTitle from "@/components/LocalizedTitle";
import { useI18n } from "@/i18n/LocaleProvider";

export default function ProductView({
  artwork,
  checkout,
}: {
  artwork: Artwork;
  checkout?: string;
}) {
  const { t, tArt } = useI18n();

  const title = tArt(artwork.slug, "title", artwork.title);
  const medium = tArt(artwork.slug, "medium", artwork.medium);
  const dimensions = tArt(artwork.slug, "dimensions", artwork.dimensions);
  const year = tArt(artwork.slug, "year", artwork.year);
  const description = tArt(artwork.slug, "description", artwork.description);

  return (
    <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-32 md:grid-cols-2 md:gap-16 md:pt-40">
      <LocalizedTitle titleKey="site.meta.artworkTitle" vars={{ title }} />

      <nav className="col-span-full flex items-center gap-2 text-xs uppercase tracking-widest2 text-ink-faint" aria-label="Breadcrumb">
        <Link href="/gallery" className="transition-colors hover:text-ink">
          {t("site.galleryPage.heading")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">{title}</span>
      </nav>

      <div className="flex items-center">
        <ArtworkViewer
          src={artwork.image}
          alt={title}
          width={artwork.imageWidth}
          height={artwork.imageHeight}
        />
      </div>

      <div className="flex flex-col justify-center">
        {checkout === "success" && (
          <div className="mb-8 border-l-2 border-dawn bg-dawn/10 px-5 py-4 text-sm text-ink">
            {t("site.product.checkoutSuccess")}
          </div>
        )}
        {checkout === "cancelled" && (
          <div className="mb-8 border-l-2 border-ink-faint/50 bg-void-raised px-5 py-4 text-sm text-ink-muted">
            {t("site.product.checkoutCancelled")}
          </div>
        )}

        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest2 text-ink-faint">
          {t("site.product.metaLine", { medium, dimensions, year })}
        </p>
        <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
          {description}
        </p>

        {artwork.poem && (
          <div className="mt-10 max-w-md">
            <PoemBlock poem={artwork.poem} slug={artwork.slug} />
          </div>
        )}

        <div className="mt-8 max-w-md">
          <MusicPlayer track={artwork.track} title={title} />
        </div>

        <div className="mt-10">
          <BuyPanel artwork={artwork} />
        </div>

        <SecretDoor slug={artwork.slug} />
      </div>
    </section>
  );
}

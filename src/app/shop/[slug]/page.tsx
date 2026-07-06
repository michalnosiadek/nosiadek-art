import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworks, getArtwork } from "@/lib/artworks";
import BuyPanel from "@/components/BuyPanel";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artwork = getArtwork(params.slug);
  return { title: artwork ? `${artwork.title} — Michał Nosiadek` : "Not found" };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const artwork = getArtwork(params.slug);
  if (!artwork) notFound();

  return (
    <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-32 md:grid-cols-2 md:gap-16 md:pt-40">
      <div className="relative aspect-[4/5] overflow-hidden bg-void-raised">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <Link
          href="/shop"
          className="mb-8 text-xs uppercase tracking-widest2 text-ink-faint transition-colors hover:text-ink"
        >
          ← Back to shop
        </Link>

        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          {artwork.title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest2 text-ink-faint">
          {artwork.medium} · {artwork.dimensions} · {artwork.year}
        </p>
        <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
          {artwork.description}
        </p>

        <div className="mt-10">
          <BuyPanel artwork={artwork} />
        </div>
      </div>
    </section>
  );
}

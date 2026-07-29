import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworks, getArtwork } from "@/lib/artworks";
import BuyPanel from "@/components/BuyPanel";
import PoemBlock from "@/components/PoemBlock";
import MusicPlayer from "@/components/MusicPlayer";
import ArtworkViewer from "@/components/ArtworkViewer";
import SecretDoor from "@/components/SecretDoor";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artwork = getArtwork(params.slug);
  return { title: artwork ? `${artwork.title} · Michał Nosiadek` : "Not found" };
}

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { checkout?: string };
}) {
  const artwork = getArtwork(params.slug);
  if (!artwork) notFound();

  return (
    <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-32 md:grid-cols-2 md:gap-16 md:pt-40">
      <div className="flex items-center">
        <ArtworkViewer
          src={artwork.image}
          alt={artwork.title}
          width={artwork.imageWidth}
          height={artwork.imageHeight}
        />
      </div>

      <div className="flex flex-col justify-center">
        <Link
          href="/gallery"
          className="mb-8 text-xs uppercase tracking-widest2 text-ink-faint transition-colors hover:text-ink"
        >
          ← Back to gallery
        </Link>

        {searchParams.checkout === "success" && (
          <div className="mb-8 border-l-2 border-dawn bg-dawn/10 px-5 py-4 text-sm text-ink">
            Thank you, your order went through. A confirmation has been sent
            to your email, and I&apos;ll be in touch about shipping.
          </div>
        )}
        {searchParams.checkout === "cancelled" && (
          <div className="mb-8 border-l-2 border-ink-faint/50 bg-void-raised px-5 py-4 text-sm text-ink-muted">
            Checkout was cancelled, nothing was charged. Pick up whenever
            you&apos;re ready.
          </div>
        )}

        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          {artwork.title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest2 text-ink-faint">
          {artwork.medium} · {artwork.dimensions} · {artwork.year}
        </p>
        <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
          {artwork.description}
        </p>

        {artwork.poem && (
          <div className="mt-10 max-w-md">
            <PoemBlock poem={artwork.poem} />
          </div>
        )}

        <div className="mt-8 max-w-md">
          <MusicPlayer track={artwork.track} title={artwork.title} />
        </div>

        <div className="mt-10">
          <BuyPanel artwork={artwork} />
        </div>

        <SecretDoor slug={artwork.slug} />
      </div>
    </section>
  );
}

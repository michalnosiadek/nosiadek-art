import Hero from "@/components/Hero";
import ArtworkCard from "@/components/ArtworkCard";
import Link from "next/link";
import { artworks } from "@/lib/artworks";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="container-art py-24 md:py-32">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
              Selected work
            </p>
            <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
              The Collection
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest2 text-ink-muted transition-colors hover:text-ink"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.slug} artwork={artwork} />
          ))}
        </div>
      </section>

      <section className="border-t border-void-line/60 bg-void-raised">
        <div className="container-art flex flex-col items-center gap-6 py-24 text-center md:py-32">
          <p className="text-xs uppercase tracking-widest2 text-ink-faint">
            Prints &amp; originals
          </p>
          <h2 className="max-w-xl font-serif text-3xl font-light leading-snug text-ink md:text-4xl">
            Each piece is available as a museum-quality print or as the
            original painting.
          </h2>
          <Link
            href="/shop"
            className="mt-4 border border-ink/30 px-8 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </>
  );
}

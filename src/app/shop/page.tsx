import type { Metadata } from "next";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Shop — Michał Nosiadek",
};

export default function ShopPage() {
  return (
    <section className="container-art pb-24 pt-36 md:pt-44">
      <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
        Prints &amp; originals
      </p>
      <h1 className="mb-4 font-serif text-4xl font-light text-ink md:text-5xl">
        Shop
      </h1>
      <p className="mb-16 max-w-lg text-ink-muted">
        Museum-quality giclée prints, and a small number of original
        paintings. Every print is signed and numbered.
      </p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.slug} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

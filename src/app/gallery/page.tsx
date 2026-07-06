import type { Metadata } from "next";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Gallery · Michał Nosiadek",
};

export default function GalleryPage() {
  return (
    <section className="container-art pb-24 pt-36 md:pt-44">
      <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
        Full collection
      </p>
      <h1 className="mb-16 font-serif text-4xl font-light text-ink md:text-5xl">
        Gallery
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.slug} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

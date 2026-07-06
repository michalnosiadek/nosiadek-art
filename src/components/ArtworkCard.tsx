import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/artworks";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link
      href={`/shop/${artwork.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-void-raised">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-void/0 transition-colors duration-500 group-hover:bg-void/20" />
        {!artwork.original.available && (
          <span
            className="absolute bottom-3 right-3 h-3 w-3 rounded-full bg-dawn-bright ring-2 ring-void"
            title="Original sold"
            aria-label="Original sold"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-xl text-ink">{artwork.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-ink-faint">
          {artwork.medium} · {artwork.year}
        </p>
      </div>
    </Link>
  );
}

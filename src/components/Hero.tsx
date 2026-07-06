import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <Image
        src="/images/the-last-dawn.jpg"
        alt="The Last Dawn — original painting by M. Nosiadek"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* dark gradient for legibility, tinted with the painting's dawn-red */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/40" />

      <div className="container-art relative z-10 pb-20 pt-40 md:pb-28">
        <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-muted">
          Original paintings &amp; prints
        </p>
        <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
          M. Nosiadek
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
          Paintings built from myth, dusk, and the moment right before
          something ends.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/gallery"
            className="border border-ink/30 px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            View Gallery
          </Link>
          <Link
            href="/gallery"
            className="bg-dawn px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
          >
            Shop Prints
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden text-right text-xs uppercase tracking-widest2 text-ink-faint md:block">
        The Last Dawn, 2026
      </div>
    </section>
  );
}

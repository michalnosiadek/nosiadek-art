import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <Image
        src="/images/the-last-dawn.jpg"
        alt="The Last Dawn, original painting by Michał Nosiadek"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* light edge gradients only: the painting stays sharp, the title card below carries the contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/10" />

      <div className="container-art relative z-10 pb-20 pt-40 md:pb-28">
        {/* museum-plaque style title card, like a label mounted on the painting's frame */}
        <div className="inline-block max-w-3xl border-l-2 border-dawn bg-void/55 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-10">
          <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-muted">
            Original paintings &amp; prints
          </p>
          <h1 className="font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Michał Nosiadek
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            Paintings built from myth, dusk, and the moment right before
            something ends.
          </p>

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">
              Enter the gallery
            </p>
            <div className="flex flex-wrap gap-4">
              {/* the 3D gallery is a static app served from /public/experience */}
              <a
                href="/experience/index.html"
                className="bg-dawn px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
              >
                First-Person Experience
              </a>
              <Link
                href="/#collection"
                className="border border-ink/30 px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
              >
                Classic Web Scroll
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden text-right text-xs uppercase tracking-widest2 text-ink-faint md:block">
        The Last Dawn, 2026
      </div>
    </section>
  );
}

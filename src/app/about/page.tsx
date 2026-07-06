import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Michał Nosiadek",
};

export default function AboutPage() {
  return (
    <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-36 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20 md:pt-44">
      <div className="relative aspect-[3/4] overflow-hidden bg-void-raised">
        <Image
          src="/images/artboard-1.png"
          alt="Michał Nosiadek"
          fill
          sizes="(min-width: 768px) 380px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
          The artist
        </p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          Michał Nosiadek
        </h1>

        <div className="mt-8 max-w-lg space-y-5 leading-relaxed text-ink-muted">
          <p>
            I paint the moments right before something changes — a last
            sunrise, a closing door, an eye that&apos;s seen too much. Most of
            the work starts with a single image and gets built outward from
            there, one layer at a time.
          </p>
          <p>
            Every painting on this site is made by hand, then offered as a
            signed print or, in a few cases, as the original piece itself.
          </p>
        </div>

        <a
          href="mailto:nosiadek.michal@gmail.com"
          className="mt-10 inline-block w-fit border border-ink/30 px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}

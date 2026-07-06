import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — M. Nosiadek",
};

export default function AboutPage() {
  return (
    <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-36 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20 md:pt-44">
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <Image
          src="/images/michal-portrait.png"
          alt="M. Nosiadek"
          fill
          sizes="(min-width: 768px) 380px, 100vw"
          className="object-contain object-top"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
          The artist
        </p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          M. Nosiadek
        </h1>

        <div className="mt-8 max-w-lg space-y-5 leading-relaxed text-ink-muted">
          <p>
            My work sits where Dark Romanticism meets Surrealism and
            dystopian foresight — classical rigor turned toward hubris,
            decay, and the ruined landscapes of tomorrow. Three ideas keep
            returning: the collapse that follows human greed, a subversion of
            purity and corruption, and the pull between desire and
            destruction.
          </p>
          <p>
            Every piece leans on chiaroscuro and a deliberate hand — physical
            pigment and, sometimes, digital tools, always in pursuit of
            something closer to the sublime than the comfortable.
          </p>
          <p>
            Painting isn&apos;t the only instrument. I write and record music
            as a companion to the work — piano and guitar built into the same
            atmosphere as the canvas, part of a wider dark-dystopian world
            I&apos;m building through lore, sound, and image together.
          </p>
          <p>
            Based in Poland, trained as an engineer before I trained as a
            painter — that structure still shows up in how I build a piece.
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

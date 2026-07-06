import type { Poem } from "@/lib/artworks";

export default function PoemBlock({ poem }: { poem: Poem }) {
  return (
    <blockquote className="border-l border-dawn/60 pl-6">
      <p className="whitespace-pre-line font-serif text-lg italic leading-relaxed text-ink/90 md:text-xl">
        {poem.body}
      </p>
      <footer className="mt-4 text-xs uppercase tracking-widest2 text-ink-faint">
        {poem.title}
        {poem.medium || poem.year ? (
          <>
            {" "}
            — {[poem.medium, poem.year].filter(Boolean).join(", ")}
          </>
        ) : null}
      </footer>
    </blockquote>
  );
}

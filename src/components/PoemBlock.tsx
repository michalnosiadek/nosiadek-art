"use client";

import type { Poem } from "@/lib/artworks";
import { useI18n } from "@/i18n/LocaleProvider";

/**
 * `slug` lets the poem pick up its translation from
 * site.artworks.<slug>.poem.*; without one it renders the data-file copy.
 */
export default function PoemBlock({
  poem,
  slug,
}: {
  poem: Poem;
  slug?: string;
}) {
  const { tArt } = useI18n();
  const at = (field: string, fallback: string) =>
    slug ? tArt(slug, `poem.${field}`, fallback) : fallback;

  const body = at("body", poem.body);
  const title = at("title", poem.title);
  const medium = poem.medium ? at("medium", poem.medium) : "";
  const year = poem.year ? at("year", poem.year) : "";

  return (
    <blockquote className="border-l border-dawn/60 pl-6">
      <p className="whitespace-pre-line font-serif text-lg italic leading-relaxed text-ink/90 md:text-xl">
        {body}
      </p>
      <footer className="mt-4 text-xs uppercase tracking-widest2 text-ink-faint">
        {title}
        {medium || year ? (
          <> · {[medium, year].filter(Boolean).join(", ")}</>
        ) : null}
      </footer>
    </blockquote>
  );
}

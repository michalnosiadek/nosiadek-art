"use client";

import Link from "next/link";
import { journalEntries } from "@/lib/journal";
import { useI18n } from "@/i18n/LocaleProvider";

export default function JournalView() {
  const { locale, t } = useI18n();
  const lang = locale === "pl" ? "pl" : "en";

  return (
    <div className="container-art py-28 md:py-40">
      <header className="max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">{t("site.journal.eyebrow")}</p>
        <h1 className="font-serif text-5xl font-light leading-none text-ink md:text-7xl">{t("site.journal.heading")}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">{t("site.journal.intro")}</p>
      </header>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {journalEntries.map((entry) => (
          <Link key={entry.slug} href={`/journal/${entry.slug}`} className="group block border border-void-line bg-void-raised p-7 transition-colors hover:border-dawn md:p-10">
            <p className="text-xs uppercase tracking-widest2 text-ink-faint">{entry.date} · {entry.readingTime}</p>
            <h2 className="mt-5 font-serif text-3xl font-light text-ink transition-colors group-hover:text-moon-soft">{entry.title[lang]}</h2>
            <p className="mt-2 font-serif text-lg italic text-moon-soft">{entry.subtitle[lang]}</p>
            <p className="mt-6 leading-relaxed text-ink-muted">{entry.excerpt[lang]}</p>
            <span className="mt-8 inline-block text-xs uppercase tracking-widest2 text-ink-faint transition-colors group-hover:text-ink">{t("site.journal.read")} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

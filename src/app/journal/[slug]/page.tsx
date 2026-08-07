import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalEntry, journalEntries } from "@/lib/journal";
import JournalEntryView from "./JournalEntryView";

export function generateStaticParams() {
  return journalEntries.filter((entry) => entry.published !== false).map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getJournalEntry(params.slug);
  if (!entry || entry.published === false) return { title: "Journal entry not found" };
  return {
    title: `${entry.title.en} · Michał Nosiadek`,
    description: entry.excerpt.en,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: { type: "article", title: `${entry.title.en} · Michał Nosiadek`, description: entry.excerpt.en },
  };
}

export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = getJournalEntry(params.slug);
  if (!entry || entry.published === false) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://michalnosiadek.art";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title.en,
    description: entry.excerpt.en,
    datePublished: entry.date,
    author: { "@type": "Person", name: "Michał Nosiadek", url: siteUrl },
    publisher: { "@type": "Person", name: "Michał Nosiadek" },
    mainEntityOfPage: `${siteUrl}/journal/${entry.slug}`,
    keywords: entry.tags.join(", "),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <JournalEntryView slug={params.slug} />
    </>
  );
}

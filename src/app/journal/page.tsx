import type { Metadata } from "next";
import JournalView from "./JournalView";

export const metadata: Metadata = {
  title: "Journal / Chronicles · Michał Nosiadek",
  description: "Dark fantasy fiction, worldbuilding, painting, music, and interactive experiences by Michał Nosiadek.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal / Chronicles · Michał Nosiadek",
    description: "Dark fantasy fiction, worldbuilding, painting, music, and interactive experiences by Michał Nosiadek.",
    type: "website",
  },
};

export default function JournalPage() {
  return <JournalView />;
}

import type { Metadata } from "next";
import { defaultLocale, translate } from "@/i18n";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  title: translate(defaultLocale, "site.meta.aboutTitle"),
  description: translate(defaultLocale, "site.meta.aboutDescription"),
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}

import type { Metadata } from "next";
import { defaultLocale, translate } from "@/i18n";
import SoftwareView from "./SoftwareView";

export const metadata: Metadata = {
  title: translate(defaultLocale, "site.software.heading"),
  description: translate(defaultLocale, "site.meta.softwareDescription"),
  alternates: { canonical: "/software" },
};

export default function SoftwarePage() {
  return <SoftwareView />;
}

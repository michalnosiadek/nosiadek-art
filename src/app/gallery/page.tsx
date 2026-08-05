import type { Metadata } from "next";
import { defaultLocale, translate } from "@/i18n";
import GalleryView from "./GalleryView";

export const metadata: Metadata = {
  title: translate(defaultLocale, "site.meta.galleryTitle"),
  description: translate(defaultLocale, "site.meta.galleryDescription"),
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryView />;
}

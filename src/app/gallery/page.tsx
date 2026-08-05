import type { Metadata } from "next";
import { defaultLocale, translate } from "@/i18n";
import GalleryView from "./GalleryView";

export const metadata: Metadata = {
  title: translate(defaultLocale, "site.meta.galleryTitle"),
};

export default function GalleryPage() {
  return <GalleryView />;
}

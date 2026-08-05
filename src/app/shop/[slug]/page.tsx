import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworks, getArtwork } from "@/lib/artworks";
import { defaultLocale, translate } from "@/i18n";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artwork = getArtwork(params.slug);
  return {
    title: artwork
      ? translate(defaultLocale, "site.meta.artworkTitle", { title: artwork.title })
      : translate(defaultLocale, "site.meta.notFound"),
  };
}

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { checkout?: string };
}) {
  const artwork = getArtwork(params.slug);
  if (!artwork) notFound();

  return <ProductView artwork={artwork} checkout={searchParams.checkout} />;
}

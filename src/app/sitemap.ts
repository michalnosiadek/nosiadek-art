import type { MetadataRoute } from "next";
import { artworks } from "@/lib/artworks";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://michalnosiadek.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/software`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...artworks.map((artwork) => ({
      url: `${siteUrl}/shop/${artwork.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

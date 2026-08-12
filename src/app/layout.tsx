import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LocaleProvider from "@/i18n/LocaleProvider";
import { defaultLocale, translate } from "@/i18n";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://michalnosiadek.art";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: translate(defaultLocale, "site.meta.homeTitle"),
  description: translate(defaultLocale, "site.meta.homeDescription"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Michał Nosiadek",
    title: translate(defaultLocale, "site.meta.homeTitle"),
    description: translate(defaultLocale, "site.meta.homeDescription"),
    url: siteUrl,
    images: [
      {
        url: "/images/the-last-dawn.jpg",
        width: 2000,
        height: 1599,
        alt: "The Last Dawn by Michał Nosiadek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: translate(defaultLocale, "site.meta.homeTitle"),
    description: translate(defaultLocale, "site.meta.homeDescription"),
    images: ["/images/the-last-dawn.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLocale}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Michał Nosiadek",
                url: siteUrl,
                jobTitle: "Painter and creative developer",
                description: translate(
                  defaultLocale,
                  "site.meta.homeDescription",
                ),
                image: `${siteUrl}/images/michal-portrait.png`,
              }),
            }}
          />
          <div className="grain" aria-hidden="true" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}

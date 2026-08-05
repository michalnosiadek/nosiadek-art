import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LocaleProvider from "@/i18n/LocaleProvider";
import { defaultLocale, translate } from "@/i18n";

export const metadata: Metadata = {
  title: translate(defaultLocale, "site.meta.homeTitle"),
  description: translate(defaultLocale, "site.meta.homeDescription"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale}
    >
      <body className="font-sans antialiased">
        <LocaleProvider>
          <div className="grain" aria-hidden="true" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}

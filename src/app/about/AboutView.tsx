"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import SocialLinks from "@/components/SocialLinks";
import LocalizedTitle from "@/components/LocalizedTitle";
import { useT } from "@/i18n/LocaleProvider";

export default function AboutView() {
  const t = useT();

  return (
    <>
      <LocalizedTitle titleKey="site.meta.aboutTitle" />

      <section className="container-art grid grid-cols-1 gap-12 pb-24 pt-36 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20 md:pt-44">
        <div className="relative aspect-[3/4] overflow-hidden bg-black">
          <Image
            src="/images/portrait.png"
            alt={t("site.about.portraitAlt")}
            fill
            sizes="(min-width: 768px) 380px, 100vw"
            className="object-contain object-top"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
            {t("site.about.eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
            {t("site.about.name")}
          </h1>

          <div className="mt-8 max-w-lg space-y-5 leading-relaxed text-ink-muted">
            <p>{t("site.about.bio1")}</p>
            <p>{t("site.about.bio2")}</p>
            <p>{t("site.about.bio3")}</p>
            <p>{t("site.about.bio4")}</p>
          </div>

          <a
            href="mailto:nosiadek.michal@gmail.com"
            className="mt-10 inline-block w-fit border border-ink/30 px-7 py-3 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            {t("site.about.getInTouchCta")}
          </a>

          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </section>

      <section className="border-t border-void-line/60 bg-void-raised">
        <div className="container-art grid grid-cols-1 gap-16 py-24 md:grid-cols-2 md:py-28">
          <div id="contact" className="scroll-mt-28">
            <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
              {t("site.about.contactEyebrow")}
            </p>
            <h2 className="mb-8 font-serif text-3xl font-light text-ink">
              {t("site.about.contactHeading")}
            </h2>
            <ContactForm />
          </div>

          <div id="newsletter" className="scroll-mt-28">
            <p className="mb-3 text-xs uppercase tracking-widest2 text-ink-faint">
              {t("site.about.newsletterEyebrow")}
            </p>
            <h2 className="mb-8 font-serif text-3xl font-light text-ink">
              {t("site.about.newsletterHeading")}
            </h2>
            <p className="mb-6 max-w-md leading-relaxed text-ink-muted">
              {t("site.about.newsletterBlurb")}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}

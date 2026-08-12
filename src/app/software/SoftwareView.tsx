"use client";

import LocalizedTitle from "@/components/LocalizedTitle";
import { useI18n } from "@/i18n/LocaleProvider";

const projects = [
  {
    key: "reviclades",
    url: "https://reviclades.com",
    number: "01",
    accent: "from-[#70251d] via-[#1b1111] to-[#090909]",
  },
  {
    key: "nosiadekProductions",
    url: "https://nosiadekproductions.com",
    number: "02",
    accent: "from-[#283d45] via-[#101719] to-[#090909]",
  },
  {
    key: "spokojnaGlowa",
    url: "https://spokojna-glowa.com",
    number: "03",
    accent: "from-[#a06b4d] via-[#3b2822] to-[#0b0a09]",
  },
  {
    key: "wavesmith",
    url: "https://wavesmith.vercel.app/",
    number: "04",
    accent: "from-[#6d2b24] via-[#211316] to-[#090909]",
  },
] as const;

export default function SoftwareView() {
  const { t } = useI18n();

  return (
    <>
      <LocalizedTitle titleKey="site.software.heading" />

      <section className="container-art pb-20 pt-36 md:pb-28 md:pt-44">
        <p className="mb-4 text-xs uppercase tracking-widest2 text-ink-faint">
          {t("site.software.eyebrow")}
        </p>
        <h1 className="max-w-3xl font-serif text-5xl font-light leading-[0.95] text-ink md:text-7xl">
          {t("site.software.heading")}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          {t("site.software.intro")}
        </p>
      </section>

      <section className="border-t border-void-line/60 bg-void-raised">
        <div className="container-art grid grid-cols-1 gap-8 py-16 md:grid-cols-2 md:gap-6 md:py-24 xl:grid-cols-4">
          {projects.map((project) => (
            <a
              key={project.key}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="relative min-h-[28rem] overflow-hidden border border-ink/10 bg-void transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-ink/30">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90 transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,235,201,0.18),transparent_32%),linear-gradient(to_top,rgba(0,0,0,0.9),transparent_65%)]" />
                <div className="relative flex min-h-[28rem] flex-col justify-between p-6 md:p-7">
                  <div className="flex items-start justify-between text-xs uppercase tracking-widest2 text-ink/60">
                    <span>{project.number}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-widest2 text-ink/60">
                      {t(`site.software.projects.${project.key}.kind`)}
                    </p>
                    <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
                      {t(`site.software.projects.${project.key}.title`)}
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
                      {t(`site.software.projects.${project.key}.description`)}
                    </p>
                    <p className="mt-8 text-xs uppercase tracking-widest2 text-ink transition-colors group-hover:text-dawn-bright">
                      {t("site.software.visit")} <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Some paintings can be entered.
 * Generic pattern: add a slug → route here to hide a game behind a painting.
 * The routes live in /public/experience/games/.
 */
const SECRET_DOORS: Record<string, string> = {
  "the-last-dawn": "/experience/games/the-last-dawn/index.html",
};

export default function SecretDoor({ slug }: { slug: string }) {
  const t = useT();
  const route = SECRET_DOORS[slug];
  const [asking, setAsking] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [veilOn, setVeilOn] = useState(false);

  useEffect(() => {
    if (!asking) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAsking(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asking]);

  useEffect(() => {
    if (!leaving) return;
    const raf = requestAnimationFrame(() => setVeilOn(true));
    const t = setTimeout(() => {
      window.location.href = route;
    }, 1450);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [leaving, route]);

  if (!route) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="secret-door-hint mt-10 block font-serif text-lg font-light italic text-ink-faint transition-colors duration-700 ease-smooth hover:text-dawn-bright"
      >
        {t("site.secret.hint")}
      </button>

      {asking && !leaving && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-void/95"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAsking(false);
          }}
        >
          <div className="mx-6 max-w-md border border-void-line bg-void-raised px-10 py-11 text-center">
            <p className="font-serif text-2xl font-light italic leading-relaxed text-ink">
              {t("site.secret.question")}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setLeaving(true)}
                className="bg-dawn px-7 py-3 text-xs uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
              >
                {t("site.secret.yes")}
              </button>
              <button
                type="button"
                onClick={() => setAsking(false)}
                className="border border-ink/30 px-7 py-3 text-xs uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink"
              >
                {t("site.secret.no")}
              </button>
            </div>
          </div>
        </div>
      )}

      {leaving && (
        <div
          className={`pointer-events-auto fixed inset-0 z-[200] bg-void transition-opacity duration-[1400ms] ease-smooth ${
            veilOn ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}

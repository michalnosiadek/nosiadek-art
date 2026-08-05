"use client";

import { useI18n } from "@/i18n/LocaleProvider";

/**
 * Cycles through the locales listed in i18n/translations.json.
 * The label shows the language you'd get by pressing it, matching the
 * behaviour of the switch inside the 3D gallery.
 */
export default function LanguageSwitch({
  className = "",
}: {
  className?: string;
}) {
  const { t, cycleLocale } = useI18n();

  return (
    <button
      type="button"
      onClick={cycleLocale}
      aria-label={t("site.nav.languageSwitchLabel")}
      className={
        "text-sm uppercase tracking-widest2 text-ink-faint transition-colors duration-300 hover:text-ink " +
        className
      }
    >
      {t("site.nav.languageSwitch")}
    </button>
  );
}

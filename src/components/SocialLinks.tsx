"use client";

import { socials } from "@/lib/socials";
import { useI18n } from "@/i18n/LocaleProvider";
import { hasKey } from "@/i18n";

function Icon({ label }: { label: string }) {
  switch (label.toLowerCase()) {
    case "instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9c0-.55.45-1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3s2.1.8 2.1 2.3V17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pinterest":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M9.5 18c.6-1.8 1.6-5.6 1.6-5.6M12 12c-.5-1.6.3-3.4 2.2-3.4 1.4 0 2.3 1 2.3 2.6 0 2.3-1.3 4.2-3 4.2-.9 0-1.6-.6-1.5-1.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8.5 12h7M12 8.5v7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function SocialLinks() {
  const { t } = useI18n();

  // Platform names are proper nouns, but they still get a key so they can be
  // transliterated for a future locale that needs it.
  const label = (name: string) => {
    const key = `site.socials.${name.toLowerCase()}`;
    return hasKey(key) ? t(key) : name;
  };

  return (
    <div className="flex items-center gap-4">
      {socials.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label(s.label)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-void-line text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
        >
          <Icon label={s.label} />
        </a>
      ))}
    </div>
  );
}

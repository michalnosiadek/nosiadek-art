"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/LocaleProvider";

/**
 * Server-rendered <metadata> stays in the default locale so crawlers get
 * stable titles; this keeps the tab title in step with the reader's choice.
 */
export default function LocalizedTitle({
  titleKey,
  vars,
}: {
  titleKey: string;
  vars?: Record<string, string | number>;
}) {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = t(titleKey, vars);
    // vars is a fresh object each render, so compare its contents instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleKey, locale, JSON.stringify(vars ?? {})]);

  return null;
}

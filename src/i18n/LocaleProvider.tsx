"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  artworkText,
  defaultLocale,
  isLocale,
  locales,
  STORAGE_KEY,
  translate,
  translateList,
  type Locale,
} from "./index";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  cycleLocale: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tList: (key: string) => string[];
  tArt: (slug: string, field: string, fallback: string) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start on the default locale so the server and the first client
  // render agree; the stored preference is applied in the effect below.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    let next: Locale | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) next = stored;
    } catch {
      /* private mode, storage disabled — fall through to the browser hint */
    }
    if (!next) {
      const nav = navigator.language?.slice(0, 2).toLowerCase();
      if (isLocale(nav)) next = nav;
    }
    if (next && next !== locale) setLocaleState(next);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* nothing to persist to, the choice just won't survive a reload */
    }
  }, []);

  const cycleLocale = useCallback(() => {
    setLocale(locales[(locales.indexOf(locale) + 1) % locales.length]);
  }, [locale, setLocale]);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      cycleLocale,
      t: (key, vars) => translate(locale, key, vars),
      tList: (key) => translateList(locale, key),
      tArt: (slug, field, fallback) => artworkText(locale, slug, field, fallback),
    }),
    [locale, setLocale, cycleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used inside <LocaleProvider>");
  return ctx;
}

/** Shorthand for the common case. */
export function useT() {
  return useI18n().t;
}

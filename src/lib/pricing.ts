import type { Locale } from "@/i18n";

/**
 * Money, in one place.
 *
 * The numbers in artworks.ts are EUR — that is the base, and the only figure
 * you edit when you reprice something. Everything else is derived:
 *
 *   English → euro, shown as written.
 *   Polish  → złoty, converted at PLN_PER_EUR and rounded up to a tidy number.
 *
 * The rate is a fixed constant on purpose. A gallery quotes a price and holds
 * it; it does not re-rate itself hourly against the market. Check it now and
 * again and edit the one line.
 */
export const BASE_CURRENCY = "EUR";

/** Checked 5 Aug 2026 — the mid-market rate was 4.31. Rounded down so the
 *  złoty price never quietly overshoots the euro one. */
export const PLN_PER_EUR = 4.3;

/** Prices land on a round number rather than 1 234,50 zł. */
const PLN_STEP = 10;

export type Currency = "EUR" | "PLN";

export function currencyFor(locale: Locale): Currency {
  return locale === "pl" ? "PLN" : "EUR";
}

/** A euro amount from artworks.ts, in the currency this visitor is reading. */
export function convert(eur: number, currency: Currency): number {
  if (currency === "EUR") return eur;
  return Math.round((eur * PLN_PER_EUR) / PLN_STEP) * PLN_STEP;
}

const FORMATTERS: Record<Currency, Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  PLN: new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }),
};

/** "€1,400" / "6 020 zł" */
export function formatPrice(eur: number, locale: Locale): string {
  const currency = currencyFor(locale);
  return FORMATTERS[currency].format(convert(eur, currency));
}

/** "+€60" / "+260 zł" — for the framing add-on. */
export function formatAddon(eur: number, locale: Locale): string {
  return "+" + formatPrice(eur, locale);
}

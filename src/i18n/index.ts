import dictionary from "./translations.json";

export const locales = dictionary.locales as readonly string[];
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const STORAGE_KEY = "mn-lang";

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && locales.includes(v);
}

type Leaf = Record<string, string | string[]>;
type Node = { [k: string]: Node | Leaf };

function isLeaf(v: unknown): v is Leaf {
  return !!v && typeof v === "object" && !Array.isArray(v) && "en" in (v as object);
}

/** Substitutes {placeholders} with values from `vars`. */
function fill(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m
  );
}

/**
 * Look a dotted key up in the master dictionary.
 * Falls back to the default locale, then to the key itself, so a missing
 * translation degrades to visible English rather than a blank page.
 */
export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  let node: unknown = dictionary as unknown as Node;
  for (const part of key.split(".")) {
    if (!node || typeof node !== "object") return key;
    node = (node as Record<string, unknown>)[part];
  }
  if (!isLeaf(node)) return key;
  const raw = node[locale] ?? node[defaultLocale];
  if (Array.isArray(raw)) return fill(raw.join("\n"), vars);
  return typeof raw === "string" ? fill(raw, vars) : key;
}

/** Same lookup, but returns the array form intact (used for lists of lines). */
export function translateList(locale: Locale, key: string): string[] {
  let node: unknown = dictionary as unknown as Node;
  for (const part of key.split(".")) {
    if (!node || typeof node !== "object") return [];
    node = (node as Record<string, unknown>)[part];
  }
  if (!isLeaf(node)) return [];
  const raw = node[locale] ?? node[defaultLocale];
  return Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : [];
}

/** True when the dictionary actually has this key. */
export function hasKey(key: string): boolean {
  let node: unknown = dictionary as unknown as Node;
  for (const part of key.split(".")) {
    if (!node || typeof node !== "object") return false;
    node = (node as Record<string, unknown>)[part];
  }
  return isLeaf(node);
}

/**
 * Artwork copy lives under site.artworks.<slug>.<field>.
 * `fallback` is the value already hardcoded in artworks.ts, so a painting
 * added to the data file before it's been translated still renders.
 */
export function artworkText(
  locale: Locale,
  slug: string,
  field: string,
  fallback: string
): string {
  const key = `site.artworks.${slug}.${field}`;
  return hasKey(key) ? translate(locale, key) : fallback;
}

export { dictionary };

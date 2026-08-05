/**
 * SE-1 · App-level enums for the Artwork model.
 * SQLite/Prisma has no native enums, so these unions are the single source of
 * truth; the DB stores plain strings validated through these guards.
 */

export const VISIBILITIES = [
  "public",
  "blog-only",
  "social-only",
  "hidden",
] as const;
export type Visibility = (typeof VISIBILITIES)[number];

export const STATUSES = ["draft", "queued", "published"] as const;
export type Status = (typeof STATUSES)[number];

export const FILE_KINDS = ["image", "wip"] as const;
export type FileKind = (typeof FILE_KINDS)[number];

export function isVisibility(v: string): v is Visibility {
  return (VISIBILITIES as readonly string[]).includes(v);
}

export function isStatus(v: string): v is Status {
  return (STATUSES as readonly string[]).includes(v);
}

export function assertVisibility(v: string): asserts v is Visibility {
  if (!isVisibility(v))
    throw new Error(
      `Invalid visibility "${v}"  -  expected one of: ${VISIBILITIES.join(", ")}`
    );
}

export function assertStatus(v: string): asserts v is Status {
  if (!isStatus(v))
    throw new Error(
      `Invalid status "${v}"  -  expected one of: ${STATUSES.join(", ")}`
    );
}

/** kebab-case slug, matches existing site slugs like "the-last-dawn". */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function assertSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug))
    throw new Error(
      `Invalid slug "${slug}"  -  use lowercase letters, digits and hyphens (e.g. "the-last-dawn").`
    );
}

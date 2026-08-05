import path from "path";
import { prisma } from "./db";
import { getStorage } from "./storage";
import {
  Visibility,
  Status,
  FileKind,
  assertVisibility,
  assertStatus,
  assertSlug,
} from "./artwork-types";

/**
 * SE-1 · Artwork repository: the one place that combines the DB record with
 * the storage layer. SE-2 (admin upload) and SE-3 (media processor) call
 * these functions; nothing else should write artwork files directly.
 *
 * Note: src/lib/artworks.ts (the static array powering the current site) is
 * untouched  -  migrating the site to read from the DB is a later ticket.
 */

export interface FileInput {
  /** Raw file bytes (originals preserved as-is; renditions are SE-3). */
  data: Buffer;
  originalName: string;
  mimeType: string;
}

export interface CreateArtworkInput {
  title: string;
  slug: string;
  poem?: string;
  musicRef?: string;
  visibility?: Visibility;
  status?: Status;
  /** Finished-painting photos, in display order. At least one required. */
  images: FileInput[];
  /** Work-in-progress shots. Default visibility of the artwork itself governs use. */
  wipImages?: FileInput[];
}

function storageKeyFor(slug: string, kind: FileKind, index: number, originalName: string): string {
  // Normalize the filename so keys stay portable across drivers/OSes.
  const base = path.basename(originalName).replace(/[^a-zA-Z0-9._-]+/g, "_");
  return `artworks/${slug}/${kind}/${String(index).padStart(2, "0")}-${base}`;
}

export async function createArtwork(input: CreateArtworkInput) {
  const visibility = input.visibility ?? "hidden";
  const status = input.status ?? "draft";
  assertSlug(input.slug);
  assertVisibility(visibility);
  assertStatus(status);
  if (!input.title.trim()) throw new Error("Artwork title is required.");
  if (input.images.length === 0)
    throw new Error("At least one image is required.");

  const existing = await prisma.artwork.findUnique({
    where: { slug: input.slug },
  });
  if (existing) throw new Error(`Artwork slug "${input.slug}" already exists.`);

  const storage = getStorage();

  // 1) Write files to storage first (cheap to clean up if the DB write fails).
  const stored: {
    kind: FileKind;
    storageKey: string;
    originalName: string;
    mimeType: string;
    sizeBytes: number;
    sortOrder: number;
  }[] = [];

  const putAll = async (files: FileInput[], kind: FileKind) => {
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const key = storageKeyFor(input.slug, kind, i, f.originalName);
      const info = await storage.put(key, f.data, { contentType: f.mimeType });
      stored.push({
        kind,
        storageKey: info.key,
        originalName: f.originalName,
        mimeType: f.mimeType,
        sizeBytes: info.sizeBytes,
        sortOrder: i,
      });
    }
  };

  try {
    await putAll(input.images, "image");
    await putAll(input.wipImages ?? [], "wip");

    // 2) Create the DB record with nested file rows.
    return await prisma.artwork.create({
      data: {
        title: input.title.trim(),
        slug: input.slug,
        poem: input.poem ?? null,
        musicRef: input.musicRef ?? null,
        visibility,
        status,
        files: { create: stored },
      },
      include: { files: { orderBy: [{ kind: "asc" }, { sortOrder: "asc" }] } },
    });
  } catch (err) {
    // Roll back orphaned files so a failed create leaves no litter.
    await Promise.allSettled(stored.map((s) => storage.delete(s.storageKey)));
    throw err;
  }
}

export async function getArtworkBySlug(slug: string) {
  return prisma.artwork.findUnique({
    where: { slug },
    include: { files: { orderBy: [{ kind: "asc" }, { sortOrder: "asc" }] } },
  });
}

export async function listArtworks(filter?: {
  visibility?: Visibility;
  status?: Status;
}) {
  return prisma.artwork.findMany({
    where: { ...filter },
    orderBy: { createdAt: "desc" },
    include: { files: { orderBy: [{ kind: "asc" }, { sortOrder: "asc" }] } },
  });
}

/** Read one stored file's bytes for an artwork file row. */
export async function readArtworkFile(storageKey: string): Promise<Buffer> {
  return getStorage().get(storageKey);
}

/** Delete the artwork record AND its stored files. */
export async function deleteArtwork(slug: string): Promise<void> {
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) return;
  const storage = getStorage();
  for (const file of artwork.files) {
    await storage.delete(file.storageKey);
  }
  await prisma.artwork.delete({ where: { id: artwork.id } });
}

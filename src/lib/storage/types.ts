/**
 * SE-1 · Storage driver interface.
 *
 * All file I/O in Studio Engine goes through this interface so hosting can be
 * decided later (VPS local disk ↔ Vercel + Cloudflare R2) without touching
 * callers. Keys are POSIX-style relative paths, e.g.
 * `artworks/the-last-dawn/image/00-the-last-dawn.jpg`.
 */

export interface PutOptions {
  /** MIME type, stored/served as Content-Type where the driver supports it. */
  contentType?: string;
}

export interface StorageObjectInfo {
  key: string;
  sizeBytes: number;
}

export interface StorageDriver {
  /** Human-readable driver name, e.g. "local-disk". */
  readonly name: string;

  /** Write a file. Overwrites if the key exists. Returns the stored key. */
  put(key: string, data: Buffer, options?: PutOptions): Promise<StorageObjectInfo>;

  /** Read a file fully into memory. Throws if the key does not exist. */
  get(key: string): Promise<Buffer>;

  /** True if an object exists at the key. */
  exists(key: string): Promise<boolean>;

  /** Delete an object. No-op if it does not exist. */
  delete(key: string): Promise<void>;

  /** List keys under a prefix (e.g. everything belonging to one artwork). */
  list(prefix: string): Promise<StorageObjectInfo[]>;

  /**
   * URL at which the object can be fetched by the app/site, or null if the
   * driver has no URL scheme yet (local driver returns an internal route
   * placeholder; serving originals publicly is NOT SE-1 scope).
   */
  publicUrl(key: string): string | null;
}

/** Reject absolute paths, traversal, backslashes and empty segments. */
export function assertSafeKey(key: string): void {
  if (
    key.length === 0 ||
    key.startsWith("/") ||
    key.includes("\\") ||
    key.includes("..") ||
    key.split("/").some((seg) => seg.trim() === "")
  ) {
    throw new Error(`Unsafe storage key: "${key}"`);
  }
}

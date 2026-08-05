import { StorageDriver } from "./types";
import { LocalDiskStorage } from "./local-disk";
import { S3Storage } from "./s3";

export type { StorageDriver, PutOptions, StorageObjectInfo } from "./types";
export { LocalDiskStorage } from "./local-disk";
export { S3Storage } from "./s3";

let cached: StorageDriver | null = null;

/**
 * SE-1 · Storage factory. Driver chosen by STORAGE_DRIVER env var:
 *   "local" (default) → LocalDiskStorage (STORAGE_LOCAL_ROOT, default ./storage)
 *   "s3"              → S3Storage (Cloudflare R2  -  currently a stub)
 */
export function getStorage(): StorageDriver {
  if (cached) return cached;
  const driver = (process.env.STORAGE_DRIVER ?? "local").toLowerCase();
  switch (driver) {
    case "local":
      cached = new LocalDiskStorage();
      break;
    case "s3":
      cached = new S3Storage();
      break;
    default:
      throw new Error(
        `Unknown STORAGE_DRIVER "${driver}"  -  expected "local" or "s3".`
      );
  }
  return cached;
}

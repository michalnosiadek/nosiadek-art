import { promises as fs } from "fs";
import path from "path";
import {
  StorageDriver,
  PutOptions,
  StorageObjectInfo,
  assertSafeKey,
} from "./types";

/**
 * SE-1 · Local-disk driver (dev + VPS hosting path).
 * Files live under STORAGE_LOCAL_ROOT (default ./storage), git-ignored.
 * Originals are preserved byte-for-byte; SE-3 renditions get their own keys.
 */
export class LocalDiskStorage implements StorageDriver {
  readonly name = "local-disk";
  private readonly root: string;

  constructor(root?: string) {
    this.root = path.resolve(
      root ?? process.env.STORAGE_LOCAL_ROOT ?? "./storage"
    );
  }

  private absolute(key: string): string {
    assertSafeKey(key);
    const abs = path.resolve(this.root, key);
    // Belt and braces on top of assertSafeKey:
    if (!abs.startsWith(this.root + path.sep) && abs !== this.root) {
      throw new Error(`Storage key escapes root: "${key}"`);
    }
    return abs;
  }

  async put(
    key: string,
    data: Buffer,
    _options?: PutOptions
  ): Promise<StorageObjectInfo> {
    const abs = this.absolute(key);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, data);
    return { key, sizeBytes: data.byteLength };
  }

  async get(key: string): Promise<Buffer> {
    return fs.readFile(this.absolute(key));
  }

  async exists(key: string): Promise<boolean> {
    try {
      await fs.access(this.absolute(key));
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await fs.unlink(this.absolute(key));
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }
  }

  async list(prefix: string): Promise<StorageObjectInfo[]> {
    assertSafeKey(prefix);
    const dir = this.absolute(prefix);
    const results: StorageObjectInfo[] = [];
    const walk = async (d: string): Promise<void> => {
      let entries;
      try {
        entries = await fs.readdir(d, { withFileTypes: true });
      } catch (err: unknown) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
        throw err;
      }
      for (const entry of entries) {
        const abs = path.join(d, entry.name);
        if (entry.isDirectory()) {
          await walk(abs);
        } else {
          const stat = await fs.stat(abs);
          results.push({
            key: path.relative(this.root, abs).split(path.sep).join("/"),
            sizeBytes: stat.size,
          });
        }
      }
    };
    await walk(dir);
    return results.sort((a, b) => a.key.localeCompare(b.key));
  }

  publicUrl(key: string): string | null {
    assertSafeKey(key);
    // Placeholder internal route; a file-serving route handler is SE-2 scope.
    return `/api/media/${key}`;
  }
}

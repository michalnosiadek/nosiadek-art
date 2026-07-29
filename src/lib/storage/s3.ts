import {
  StorageDriver,
  PutOptions,
  StorageObjectInfo,
  assertSafeKey,
} from "./types";

/**
 * SE-1 · S3-compatible driver (Cloudflare R2) — **STUB**.
 *
 * Deliberately not implemented: hosting is undecided (DECISIONS.md 2026-07-15)
 * and we avoid pulling in @aws-sdk/client-s3 (~3 MB) until it's needed.
 * The class validates its config and defines the exact env contract so the
 * real implementation is a drop-in.
 *
 * To implement later:
 *   npm i @aws-sdk/client-s3
 *   S3Client({ region: "auto", endpoint: S3_ENDPOINT,
 *              credentials: { accessKeyId, secretAccessKey } })
 *   put    → PutObjectCommand  ({ Bucket, Key, Body, ContentType })
 *   get    → GetObjectCommand  → Body.transformToByteArray()
 *   exists → HeadObjectCommand (404 ⇒ false)
 *   delete → DeleteObjectCommand
 *   list   → ListObjectsV2Command ({ Prefix })
 *   publicUrl → `${S3_PUBLIC_BASE_URL}/${key}`
 */
export class S3Storage implements StorageDriver {
  readonly name = "s3";

  readonly endpoint: string;
  readonly bucket: string;
  readonly publicBaseUrl: string | null;

  constructor() {
    const endpoint = process.env.S3_ENDPOINT;
    const bucket = process.env.S3_BUCKET;
    const accessKeyId = process.env.S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
    if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
      throw new Error(
        "STORAGE_DRIVER=s3 requires S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY (see .env.example)."
      );
    }
    this.endpoint = endpoint;
    this.bucket = bucket;
    this.publicBaseUrl = process.env.S3_PUBLIC_BASE_URL ?? null;
  }

  private notImplemented(): never {
    throw new Error(
      "S3/R2 storage driver is stubbed (SE-1). Use STORAGE_DRIVER=local, or implement src/lib/storage/s3.ts once hosting is decided."
    );
  }

  async put(
    key: string,
    _data: Buffer,
    _options?: PutOptions
  ): Promise<StorageObjectInfo> {
    assertSafeKey(key);
    this.notImplemented();
  }

  async get(key: string): Promise<Buffer> {
    assertSafeKey(key);
    this.notImplemented();
  }

  async exists(key: string): Promise<boolean> {
    assertSafeKey(key);
    this.notImplemented();
  }

  async delete(key: string): Promise<void> {
    assertSafeKey(key);
    this.notImplemented();
  }

  async list(prefix: string): Promise<StorageObjectInfo[]> {
    assertSafeKey(prefix);
    this.notImplemented();
  }

  publicUrl(key: string): string | null {
    assertSafeKey(key);
    return this.publicBaseUrl ? `${this.publicBaseUrl}/${key}` : null;
  }
}

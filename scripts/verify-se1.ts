/**
 * SE-1 acceptance check: create + read one artwork record with files.
 * Run:  npm run verify:se1   (after `npm install` and `npm run db:migrate`)
 *
 * Creates a throwaway artwork from a real site image, reads it back through
 * the store + storage layer, verifies byte-for-byte integrity, then cleans up.
 */
import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";
import {
  createArtwork,
  getArtworkBySlug,
  readArtworkFile,
  deleteArtwork,
} from "../src/lib/artwork-store";
import { getStorage } from "../src/lib/storage";
import { prisma } from "../src/lib/db";

const SLUG = "se1-verification";

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

function ok(label: string, pass: boolean, detail?: string): boolean {
  console.log(`${pass ? "  ✓" : "  ✗ FAIL"} ${label}${detail ? `  -  ${detail}` : ""}`);
  return pass;
}

async function main() {
  console.log(`SE-1 verification · storage driver: ${getStorage().name}\n`);

  // Use a real painting photo as the test payload.
  const imagePath = path.resolve(
    __dirname,
    "../public/images/the-last-dawn.jpg"
  );
  const imageData = await fs.readFile(imagePath);
  const originalHash = sha256(imageData);

  // Clean slate in case a previous run crashed mid-way.
  await deleteArtwork(SLUG);

  let allPass = true;

  // 1 · CREATE
  const created = await createArtwork({
    title: "SE-1 Verification Artwork",
    slug: SLUG,
    poem: "At the summit of men's hatred\n(verbatim test poem)",
    musicRef: "https://example.com/track-placeholder",
    visibility: "hidden",
    status: "draft",
    images: [
      {
        data: imageData,
        originalName: "the-last-dawn.jpg",
        mimeType: "image/jpeg",
      },
    ],
    wipImages: [
      {
        data: Buffer.from("fake wip shot bytes"),
        originalName: "wip-01.jpg",
        mimeType: "image/jpeg",
      },
    ],
  });
  allPass = ok("create: record persisted with id", Boolean(created.id)) && allPass;
  allPass = ok("create: 2 file rows (1 image + 1 wip)", created.files.length === 2) && allPass;

  // 2 · READ back through the store
  const fetched = await getArtworkBySlug(SLUG);
  if (!fetched) throw new Error("read-back returned null");
  allPass = ok("read: fields round-trip", fetched.title === "SE-1 Verification Artwork" && fetched.poem?.includes("verbatim") === true && fetched.musicRef !== null) && allPass;
  allPass = ok("read: visibility/status defaults honored", fetched.visibility === "hidden" && fetched.status === "draft") && allPass;

  type FileRow = { kind: string; storageKey: string; sizeBytes: number };
  const imageRow = fetched.files.find((f: FileRow) => f.kind === "image");
  const wipRow = fetched.files.find((f: FileRow) => f.kind === "wip");
  allPass = ok("read: image + wip rows present", Boolean(imageRow && wipRow)) && allPass;

  // 3 · FILE integrity through the storage driver
  if (imageRow) {
    const roundTrip = await readArtworkFile(imageRow.storageKey);
    allPass = ok(
      "storage: original preserved byte-for-byte",
      sha256(roundTrip) === originalHash,
      `${imageRow.storageKey} (${imageRow.sizeBytes} bytes)`
    ) && allPass;
  }

  // 4 · Validation guards actually reject bad input
  let rejected = false;
  try {
    await createArtwork({
      title: "Bad",
      slug: "Bad Slug!",
      images: [{ data: Buffer.from("x"), originalName: "x.jpg", mimeType: "image/jpeg" }],
    });
  } catch {
    rejected = true;
  }
  allPass = ok("validation: invalid slug rejected", rejected) && allPass;

  // 5 · CLEANUP (record + files)
  await deleteArtwork(SLUG);
  const gone = await getArtworkBySlug(SLUG);
  const filesGone = imageRow ? !(await getStorage().exists(imageRow.storageKey)) : false;
  allPass = ok("cleanup: record and files removed", gone === null && filesGone) && allPass;

  console.log(`\n${allPass ? "SE-1 PASS  -  data model + storage layer verified." : "SE-1 FAIL  -  see ✗ lines above."}`);
  process.exitCode = allPass ? 0 : 1;
}

main()
  .catch((err) => {
    console.error("\nSE-1 verification crashed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// EOF

# DECISIONS.md — append-only log

## 2026-07-15 — Studio Engine lives inside nosiadek-art repo
**Decision:** The existing Next.js site (nosiadek-art/) is the single source of truth; Studio Engine (media processor, content engine, publisher) is built into it rather than as a separate service.
**Why:** Site already exists in this project folder with App Router + /api; one deploy, one data model. Phase 0 blocker "import website design" is resolved — it was already here.
**Rejected:** separate microservice (overkill for solo maintenance).

## 2026-07-15 — Context files pre-filled from prior sessions
**Decision:** BRAND_BOOK.md and BACKSTORY.md created directly (not blank templates), pre-filled from the existing brand-guide.html palette and prior-session bio; gaps marked ✏️ for Michał.
**Why:** Faster to correct than to write from scratch.

## 2026-07-15 — Phase 0 answers from Michał
- Hosting: undecided → storage/DB behind interfaces (local-disk/SQLite ↔ R2/Postgres), decide before deploy.
- IG: already Professional + linked FB Page ✅ (Meta API path open for Phase 2).
- Captions: English only.
- CTA: route traffic to michalnosiadek.com gallery/shop (inquire-to-buy).

## 2026-07-15 — SE-1 implementation choices
**Decision 1:** `images[]` / `wip_images[]` are rows in a related `ArtworkFile` table (`kind: image|wip`), not array columns; `visibility`/`status` are String columns validated by TS unions in `src/lib/artwork-types.ts`.
**Why:** Prisma+SQLite supports neither scalar lists nor enums. A file table also gives SE-3 a natural home for renditions (new `kind` values) and keeps the schema Postgres-swappable with zero changes.
**Rejected:** JSON-string columns (unqueryable, easy to corrupt); jumping straight to Postgres (hosting undecided).

**Decision 2:** Storage behind `StorageDriver` interface (`src/lib/storage/`): `local-disk` implemented (root `./storage`, git-ignored, originals byte-preserved), `s3` (R2) is a validated stub — env contract defined, methods throw, no aws-sdk dependency yet.
**Why:** Hosting decision stays open per Phase 0; stub costs nothing and locks the contract.

**Decision 3:** All artwork writes go through `src/lib/artwork-store.ts` (files written to storage first, DB row second, storage rolled back on DB failure). Existing static `src/lib/artworks.ts` and site pages untouched — migrating the gallery to read from the DB is a separate future ticket, after SE-2/SE-3 prove the pipeline.

**Verification:** `npm run verify:se1` (scripts/verify-se1.ts) creates an artwork from `public/images/the-last-dawn.jpg` + a WIP file, reads it back, checks byte-for-byte integrity + validation guards, then cleans up. Sandbox can't run npm, so Michał runs: `npm install` → `npx prisma migrate dev --name init_artwork` → `npm run verify:se1`.

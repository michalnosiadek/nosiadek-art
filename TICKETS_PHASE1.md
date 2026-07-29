# Phase 1 Tickets — MVP Pipeline
*Status: approved. One ticket = one PR-sized change. Order matters.*
*SE-1: ✅ code delivered 2026-07-15 — acceptance pending Michał running `npm install && npx prisma migrate dev --name init_artwork && npm run verify:se1`.*

Locked inputs: IG is Professional + FB Page linked ✅ · captions EN only · CTA → michalnosiadek.com · hosting TBD (storage behind an interface so VPS or Vercel+R2 both work).

---

**SE-1 · Data model + storage layer**
Artwork model: `title, slug, images[], poem?, music_ref?, wip_images[], visibility (public|blog-only|social-only|hidden), status (draft|queued|published), created_at`. Storage interface with two drivers: local-disk (VPS) and S3-compatible (R2). DB: Prisma with SQLite locally, swappable to Postgres.
*Accept:* can create/read artwork records with files from a script.

**SE-2 · Admin upload form**
`/admin` (password-protected via env var, no user system). Form: painting file(s) 4K, poem text, music ref, WIP shots, visibility flags. Writes via SE-1.
*Accept:* upload TheLastDawn + poem end-to-end from browser.

**SE-3 · Media processor**
`sharp` job on upload: IG feed 1080×1350 (pad, blurred-edge or solid `#0a0908`), story 1080×1920, OG 1200×630, web sizes. sRGB, q≈85, mild sharpen. Originals untouched.
*Accept:* all renditions generated for one upload, visually checked.

**SE-4 · Content engine (caption drafts)**
Claude API + `context/BRAND_BOOK.md` + `context/BACKSTORY.md` + artwork metadata → per-platform drafts (IG, Bluesky, FB) + alt text + ≤5 hashtags, EN, CTA to site. Drafts only — nothing publishes without approval.
*Accept:* drafts for 3 real paintings that Michał would post with ≤1 edit.

**SE-5 · Bluesky publisher**
`@atproto/api`, app-password in env. Publishes approved queue items (image + caption + mandatory alt text).
*Accept:* one real post live on Bluesky from the admin queue.

**SE-6 · Approval queue UI**
Admin list: draft → approve/edit/skip → queued → published. Mobile-friendly (this is the ≤1 hr/week surface).
*Accept:* full cycle on phone browser.

**SE-7 · Buffer bridge (interim IG/FB)**
Batch export of approved items (renditions + captions) as a zip + CSV for Buffer free tier, until Meta review completes in Phase 2.
*Accept:* one week's posts exported and scheduled in Buffer in <10 min.

---
Out of scope (parked): Meta native publishing (Ph2), comments (Ph3), Pinterest/Cara/analytics (Ph4), payments in shop.

# STUDIO ENGINE — Project Plan
### Michał Nosiadek · Art Publishing Pipeline
*Upload a painting once → website, Instagram, Facebook, Bluesky (and later more) handle themselves.*

---

## 1. Vision

Michał paints, writes poems, and records timelapses. He has a full-time office job and does not want to be a social media manager. The system's job: **turn one upload into a complete publishing cascade**, with human approval only where authenticity matters (captions on first runs, comment replies).

Core principle: **the art stays human, the logistics become machines.**

## 2. What exists today

| Asset | Status |
|---|---|
| michalnosiadek.com | Live, static portfolio (links to reviclades.com, nosiadekproductions.com, spokojna-glowa.com) |
| Website app design | Built in another Claude project — **must be imported into this project (Phase 0 blocker)** |
| Content backlog | "Tons" of finished paintings (4K photos), poems, some timelapses & reveal reels |
| IG @michalnosiadek.art + FB | Active, low static-post traction; best reel ~2k views / 80 likes |
| Brand book | **Pending — Michał will provide** (colors, styles, writing voice, painting references) |
| Backstory / CV / portfolio | **Pending — Michał will provide** |

## 3. Architecture (target state)

```
                    ┌─────────────────────────────┐
                    │   WEBSITE APP (CMS + site)   │
                    │  Upload: painting (4K),      │
                    │  poem, music ref, WIP shots, │
                    │  visibility flags            │
                    └──────────────┬──────────────┘
                                   │ webhook / job queue
                    ┌──────────────▼──────────────┐
                    │       MEDIA PROCESSOR        │
                    │  sharp/ImageMagick:          │
                    │  · web sizes (site)          │
                    │  · IG feed 1080×1350 (4:5)   │
                    │  · Story/Reel 1080×1920      │
                    │  · FB link image 1200×630    │
                    └──────────────┬──────────────┘
                    ┌──────────────▼──────────────┐
                    │       CONTENT ENGINE         │
                    │  Claude API + BRAND_BOOK.md  │
                    │  + BACKSTORY.md:             │
                    │  captions per platform,      │
                    │  alt text, 3-5 hashtags,     │
                    │  keyword-rich (IG SEO)       │
                    └──────────────┬──────────────┘
                    ┌──────────────▼──────────────┐
                    │     SCHEDULER + PUBLISHER    │
                    │  Queue w/ optimal time slots │
                    │  · Meta Graph API (IG + FB)  │
                    │  · Bluesky AT Protocol       │
                    │  · later: Pinterest, Cara    │
                    └──────────────┬──────────────┘
                    ┌──────────────▼──────────────┐
                    │   ENGAGEMENT MODULE (semi-   │
                    │   auto): ingest comments,    │
                    │   draft replies → Michał     │
                    │   approves from phone        │
                    └─────────────────────────────┘
```

### Stack recommendations (Architect may revise once website design is imported)
- **Site/CMS:** whatever the existing design uses; if greenfield → Next.js + SQLite/Postgres + simple admin panel. Originals stored full-res (S3/R2 or VPS disk).
- **Media:** `sharp` (Node) — resize, pad to aspect, sRGB convert, mild sharpen, quality ~85 to dodge IG recompression artifacts.
- **Content:** Anthropic API; prompts assembled from BRAND_BOOK.md + BACKSTORY.md + artwork metadata.
- **Publishing:** Meta Graph API (requires IG Professional account linked to a FB Page + Meta app review for `instagram_content_publish`); Bluesky via `@atproto/api` (trivial, no review process).
- **Queue/cron:** BullMQ or plain cron on the VPS; IG API has no native "schedule," so publisher fires at slot time.

## 4. Content strategy baked into the system (from research, July 2026)

- Default mix the scheduler aims for: **~60% reels/timelapses, ~30% carousels (WIP → detail → final; poem slides), ≤10% static.**
- Reels: finished painting shown in first 3 seconds, <90s, loopable. Raw timelapse > polished edit.
- Captions: keyword-rich sentences (IG search is SEO now), max 3-5 hashtags, always alt text (also boosts Bluesky).
- Cadence target: 3-5 feed posts/week — sustainable forever because the backlog feeds the queue.
- Optimize for **sends/shares and saves**, not likes.
- Engagement stays human-approved. No fully robotic replies.

## 5. Phases & milestones

**Phase 0 — Consolidation (blockers, ~1 evening)**
- Import website design/code from the other Claude project.
- Michał delivers BRAND_BOOK.md + BACKSTORY.md (templates provided by Architect).
- Decide hosting (VPS vs Vercel+R2) and confirm IG account is Professional + linked to FB Page.

**Phase 1 — MVP pipeline (weekend project)**
- Artwork upload form + storage + metadata model (incl. visibility flags: public / blog-only / social-only / hidden).
- Media processor producing all output sizes.
- Content engine drafting captions (Michał approves in admin UI).
- **Bluesky auto-posting live** (easiest win, no app review).
- Interim IG/FB path: export batch → Buffer free tier, while Meta review pends.

**Phase 2 — Native Meta publishing (1-2 weekends + review wait)**
- Meta app, OAuth, `instagram_content_publish` review, FB Page posting.
- Scheduler with weekly mix targets and optimal time slots; queue view in admin.
- Reels upload support (timelapse files posted as reels via API).

**Phase 3 — Engagement (1 weekend)**
- Webhooks for IG/FB comments → reply drafts in Michał's voice → one-tap approve/edit/skip (mobile-friendly admin or Telegram bot).
- Optional comment-trigger DM ("comment PRINT for the shop link") via official API.

**Phase 4 — Expansion & analytics**
- Pinterest (long-tail traffic for static art), Cara profile.
- Per-post metrics pulled back into CMS: learn which paintings/formats earn sends & saves; feed insights to Content Engine.
- Blog posts auto-generated from WIP series (hidden WIP shots become "making of" articles).

## 6. Agent team (execution model)

| Agent | Role | Owns |
|---|---|---|
| **ARCHITECT** (master) | Project owner, planner, reviewer | Backlog, decisions, integration, this document. Spec in `AGENT_ARCHITECT.md` |
| BUILDER-BACKEND | CMS, data model, queue, admin | Phase 1-2 server code |
| BUILDER-MEDIA | Image/video pipeline | Processor, format specs, quality checks |
| WRITER | Caption/alt-text prompts & voice | Content engine prompts; consumes brand book + backstory |
| INTEGRATOR | External APIs | Meta app review, Graph API, Bluesky, Buffer export |
| REVIEWER | QA | Tests, output spot-checks, "would Michał post this?" gate |

Workflow: ARCHITECT breaks a phase into tickets → assigns to builder agents → REVIEWER gates → ARCHITECT merges and updates the decision log. One phase in flight at a time.

## 7. Risks & guardrails

- **Meta app review** is the main external dependency — start it early in Phase 2; Buffer bridge covers the gap.
- **Account safety:** official APIs only, respect rate limits, never store passwords, no engagement-faking of any kind.
- **Voice drift:** every caption template is derived from BRAND_BOOK.md; WRITER may not invent biographical facts — only BACKSTORY.md is canon.
- **Scope creep:** virality is a byproduct; the success metric is *Michał paints more and posts consistently with <1 hr/week of admin*.

## 8. Open questions for Michał

1. Hosting preference / budget (existing VPS from reviclades?)
2. Is IG already a Professional (Creator) account linked to a FB Page?
3. Shop/monetization link to route traffic to (prints? commissions?)
4. Languages for captions — PL + EN?

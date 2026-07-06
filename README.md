# Michał Nosiadek — Art Portfolio & Shop (MVP)

Next.js 14 (App Router) + TypeScript + Tailwind.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's here

- `/` — hero (The Last Dawn) + featured collection
- `/gallery` — all paintings
- `/shop` — shop listing
- `/shop/[slug]` — product page with print size / original selector (checkout is UI-only — no payment processor wired up yet)
- `/about` — artist bio using your portrait (Artboard 1)

Artwork data (titles, prices, descriptions) lives in `src/lib/artworks.ts` — edit that file to change copy or pricing.

## Next steps to go from MVP to launch

- Wire up real checkout (Stripe is the standard choice for prints/original sales)
- Swap in your own artist bio copy in `src/app/about/page.tsx`
- Add real print pricing/sizes per painting
- Deploy: this repo works out of the box on Vercel

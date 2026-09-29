# Noor & Oud — Attars & Artisan Perfume

A mobile-first e-commerce storefront for a perfume and attar house. Visitors can browse and search the full
collection, filter by fragrance type, scent family and price, explore rich product pages with image galleries,
size variants and scent notes, and check out a multi-item bag through Stripe.

## Features

- **Landing page** — cinematic hero, scent-note marquee, bestsellers, scent-family explorer, "art of attar" story, and a discovery-set feature.
- **Shop** (`/shop`) — instant search across names, notes and families; filter chips for type, scent family and starting price; sorting; results synced to the URL so filtered views are shareable. Filters open in a bottom sheet on mobile.
- **Product pages** (`/products/:slug`) — swipeable gallery with thumbnails and hover zoom, size variants with per-variant pricing, quantity, add-to-bag, notes pyramid, intensity and longevity, care accordions, reviews and related fragrances. Sticky add-to-bag bar on mobile.
- **Bag** — slide-over cart saved in the browser, quantity controls, free-shipping progress bar, and Stripe Checkout for all items in one session.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server functions)
- Tailwind CSS 4 with a custom theme (`src/styles.css`)
- Stripe Checkout (server-side pricing)
- Netlify Image CDN for responsive, WebP-optimized imagery
- Product imagery generated with Gemini via Netlify AI Gateway and stored in `public/img`

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

### Enabling checkout

Set `STRIPE_SECRET_KEY` in your Netlify site environment variables (or a local `.env`). Without it, the bag works
normally and the checkout button shows "Checkout coming soon".

## Editing the catalog

All products live in `src/data/products.ts` — names, notes, variants (sizes and prices), galleries and badges.
Add a product by appending an entry and dropping its images into `public/img`.

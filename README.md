# Sevyn8 — marketing website

Production-ready static marketing site for **Sevyn8** and the **Sevyn8 Ring**, built from *Sevyn8 Website Brief v3*, the *Pre-Seed Investor Deck* and `docs/SEVYN8_BUILD_SPEC.md`.

**Stack:** Next.js 16 (App Router, fully static export) · React 19 · TypeScript · Tailwind CSS v4 · three.js · Lenis

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # claims lint + static export to ./out
pnpm start        # serve ./out locally
```

Other checks: `pnpm lint`, `pnpm typecheck`, `pnpm lint:claims`.

## Pages

| Route | What it is |
|---|---|
| `/` | Full-bleed photo hero with an example morning-note card → What it does → 3D ring story (5 scroll steps + buy panel) → Companion app → Ecosystem constellation → Device family → Story → Waitlist |
| `/ring/` | Product page: interactive 3D render, sensors, specs, sizing guide, pricing model, FAQ |
| `/devices/` | Ring, Mastoid and Chest Patch with honest status labels, plus the shared personal-baseline platform |
| `/partners/` | All 13 ecosystem categories in 4 groups, each marked *Direction* until a partner is signed |
| `/about/` | Why Sevyn8 exists, what's different, principles, privacy |
| `/waitlist/`, `/contact/` | Sign-up and contact |
| `/legal/privacy/`, `/legal/terms/`, `/legal/wellness/` | Draft legal pages (need counsel review) |

SEO: per-page metadata and canonicals, `sitemap.xml`, `robots.txt`, web manifest, generated Open Graph image, Organization + FAQ JSON-LD (Product JSON-LD switches on automatically when a price is set and sale mode is not `waitlist`).

## Going live: what to change, and where

Everything the site is allowed to claim lives in **`src/config/site-status.ts`**:

| When this becomes true… | Change |
|---|---|
| Ring goes on pre-order / sale | `ring.saleMode` → `"preorder"` / `"buy"`, set `ring.checkoutUrl` (Shopify or Stripe hosted checkout). Every CTA updates. |
| Final price agreed | `ring.priceUsd` (shows in nav, ring section, ring page, Product JSON-LD) |
| Sizes final | `ring.sizes` (size picker appears) |
| Real photos | Put files in `public/ring/`, list them in `ring.photos` |
| Battery / material / water resistance validated | `ring.validatedClaims.*` |
| Companion app has real screens | `companion.ready`, store URLs (add real screenshots; do not mock) |
| A partner is signed | Set that category to `status: "live"` with `partner: { name, logo, bookingUrl, regions }` |
| Hide future devices | `futureDevices.show = false` |

Site-wide settings (`src/config/site.ts` and env vars, see `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: production domain (canonicals, sitemap, OG)
- `NEXT_PUBLIC_WAITLIST_ENDPOINT`: any JSON POST endpoint (Formspree, Basin, a serverless function). **Until it's set, the form falls back to opening a pre-filled email**, so set it before launch.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: optional cookieless analytics (no ad pixels, by design)
- `site.contactEmail`, `site.socials`: confirm the address; add social links only when real

All page copy is in `src/content/*.ts`. Edit there; `*word*` becomes the accent italic.

## 3D ring model

`src/three/ringScene.ts` is a procedural three.js model of the Sevyn8 Ring built from Sevyn8's own design render: champagne-gold shell with the "sevyn8" engraving and accent lines, black satin inner liner, and the inner sensor layout (gold contact pads, dark modules with green LEDs). It is labelled "3D design model" / "Illustrative render" on the page.

- **Ring page:** floating model, drag (mouse or sideways swipe) or arrow keys to rotate 360°, slow turntable when idle.
- **Homepage:** the feature list turns the ring to each sensor; visitors can also drag it, and it eases back to the feature pose.
- Sharp on Retina (pixel ratio up to 2), lazy-loaded only when the ring is near the viewport, static fallback without WebGL.
- When Sensio's production CAD exists, export a GLB and swap it in for the procedural geometry.

## Product images (Sevyn8 design renders)

`public/products/` holds crops from Sevyn8's own product boards (ring and behind-the-ear patch): product shots, on-hand / on-ear views, the ring's exploded view and the patch's front/side/back views. They are cropped to the visuals only. The boards' text is deliberately left out because it includes claims the site can't make yet (EEG/ECG, "medical-grade", IPX8, weights). Every render on the site carries a small **"Design render"** label until production photos exist. Listed in `src/content/photos.ts` (`products`).

The crops come from 1536×1024 collages and were **AI-upscaled 4× with Real-ESRGAN** (free, open-source, run locally) to HD (up to 2928px wide), each with a half-size `-sm` version for phones. Original full-resolution renders will always be sharper still: drop them in with the same filenames.

The exploded view, the ring product shot and the patch front/side/back views have **transparent backgrounds** (AI cut-out with rembg, then hand-tuned: the clear protective ring keeps a glass look, the battery face and the ring's centre hole were corrected), so they float on the dark theme instead of sitting on cream panels. Replacement files for these should also be transparent PNG/WebP.

## Photography

All photos are free Unsplash images (Unsplash License: commercial use allowed, no attribution required). They show **people and moments, never a product** (stock smart-ring photos show competitors' rings). Sevyn8 products appear only in Sevyn8's own design renders (above) and the labelled 3D ring on the homepage.

| File | Used on | Photographer |
|---|---|---|
| `hero/*` | Homepage banner, share image | Venti Views |
| `photos/life-morning.webp` | Homepage companion, Ring page | Husam El Haq |
| `photos/life-sleep.webp` | Ring page | Greg Pappas |
| `photos/life-recovery-*.webp` | What it does, Ring page, Contact | lucas Favre |
| `photos/life-swim-*.webp` | Ring page (on-hand gallery) | Todd Quackenbush |
| `photos/life-hike-*.webp` | Ring page (on-hand gallery) | lucas Favre |
| `photos/wear-chest.webp` | Chest Patch card (home, Devices) | Markus Gjengaar |
| `photos/partner-everyday.webp` | Ecosystem, Partners | Alef Morais |
| `photos/partner-medical.webp` | Ecosystem, Partners | Vitaly Gariev |
| `photos/partner-critical.webp` | Ecosystem, Partners | Alex Sheldon |
| `photos/partner-covered.webp` | Ecosystem, Partners | Stephen Mease |
| `photos/about.webp` | About | Mathis Mauprivez |
| `photos/waitlist.webp` | Waitlist | Sahil Pandita |

**Swapping in your own shoot:** replace a file with one of the same name and update its `alt` text in `src/content/photos.ts` (hero alt text: `hero.imageAlt` in `src/content/home.ts`). Stock photos come in three widths (`name-1280.webp`, `name-1920.webp`, `name-2560.webp`) and the browser picks the right one for each screen. Hero files: `hero-1280/1920/2560/3200.webp` + `hero-1920.jpg` (landscape, about 3:2) and `hero-mobile-1290.webp/.jpg` (portrait 1290×2150), with the subject in the upper half. Real **ring product photos** go in `public/ring/` and are listed in `ring.photos` in `src/config/site-status.ts`; they appear on the ring page automatically.

**Share image (`public/og.png`):** generated from `public/hero/hero-1920.jpg`. To regenerate after changing the hero, temporarily add an `opengraph-image.tsx` route, build, copy `out/opengraph-image` to `public/og.png`, and remove the route.

## Deploy

The build is plain static files in `out/`.

- **Vercel:** import the repo with the **Next.js** framework preset (leave Output Directory empty/default, Vercel handles the static export); `vercel.json` sets the build command and security headers.
- **Netlify / Cloudflare Pages:** build `pnpm build`, publish `out`; `public/_headers` sets security headers.
- **Anything else (S3, nginx…):** upload `out/`.

## Guardrails built in

- `pnpm lint:claims` (runs before every build) fails on medical/diagnostic wording, gated sensor claims (ECG/EEG/bioimpedance), the internal platform name, and competitor names.
- Nothing unready is dressed up: no price, sizes, photos, app screens or partner logos render until the config says they're real.
- The 3D ring is labelled "Illustrative render". It's procedural; swap in the real model from Sensio's CAD before showing it as the product.
- Accessibility: semantic headings, skip link, keyboard-operable step navigation, visible focus, `prefers-reduced-motion` respected (no smooth scroll, no idle motion), content fully readable without JavaScript or WebGL.
- Performance: the 3D chunk (~140 KB gz) loads only when the ring section approaches; the hero is a 2D canvas over an SSR SVG poster, so the headline paints immediately.

## Open items before launch (from the brief)

Ring photos · final price and sizes · logo files (current mark is a placeholder) · founders' story · counsel review of legal pages, the Emergency / Elder care wording and the "no subscription at launch" line · confirm contact email · waitlist endpoint · trademark clearance for Sevyn8 / Mastoid / Chest Patch.

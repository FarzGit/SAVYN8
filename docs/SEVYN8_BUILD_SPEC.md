
# Sevyn8 Marketing Website: Build Specification

> **How to use this file with Claude Code**
> 1. Put this file in the repo at `docs/SEVYN8_BUILD_SPEC.md`.
> 2. Create `CLAUDE.md` in the repo root from **Section 0** below.
> 3. Build one phase at a time (Section 14). For each phase, prompt:
>    `Read docs/SEVYN8_BUILD_SPEC.md. Implement Phase N only. Meet every acceptance criterion for Phase N, then stop and list what is done and what is open.`
> 4. Do not ask Claude Code to build everything in one prompt. The phases are ordered so the site works at every step.

Sources: *Sevyn8 Website Brief v3* (5 Oct 2026) and *Sevyn8 Pre-Seed Investor Deck* (Sep 2026). Where the two disagree, the **website brief wins** for anything on the site. Open conflicts are listed in Section 15.

---

## 0. CLAUDE.md (copy into repo root)

```md
# Sevyn8 marketing site: rules for Claude

Spec: docs/SEVYN8_BUILD_SPEC.md. Read the relevant section before changing anything.

## Hard rules (never break)
1. Nothing on the site claims more than is true on launch day. If something is not ready, it gets ONE plain sentence, not a styled section.
2. Wellness language only. No disease names, no "diagnose/detect/treat/prevent/cure", no "medical-grade", no "abnormal". Run `pnpm lint:claims` before every commit.
3. Never name the AI platform or any framework on the page (no "Mote", no "Sense / Understand / Act" steps).
4. No comparison table against Oura, Whoop, Ultrahuman, Gabit or anyone else.
5. Partners/features are driven by `src/config/site-status.ts`. A partner category with status "direction" never shows a logo, booking button or city.
6. The 3D layer is progressive enhancement. Every word of content must exist in the DOM and work with WebGL off.
7. Colour rules (Section 3) are enforced. Domain colours only inside their domain. Gold max one highlight per section. Brand green for CTAs/accents only, never as body text.
8. Do not invent hardware parts. Exploded-view parts must match `src/config/devices/*.ts`, which must match the real Sensio BOM before launch.

## Stack
Next.js (App Router) + TypeScript (strict) + Tailwind + React Three Fiber + drei + GSAP ScrollTrigger + Lenis + Zustand. pnpm.

## Conventions
- Server Components by default; `"use client"` only where needed (3D, scroll, forms).
- All 3D code under src/three/. All copy under src/content/. All flags under src/config/.
- No allocations inside useFrame. Scroll progress is read from a mutable store, not React state.
```

---

## 1. What we are building (summary)

**Sevyn8** is a wellness wearable company. The first product is the **Sevyn8 Ring** (pulse, skin temperature, motion). Two later devices are planned: **Mastoid** (behind-the-ear clip: sleep and brain signals, Phase 2) and **Chest Patch** (a bandage-like patch: heart timing and respiration, Phase 3, concept only today).

The pitch, in the brief's words: *"this thing actually tells me what to do, not just what my numbers are."* Other rings give you a score and stop. Sevyn8 learns **your** normal, explains what changed in plain words, and points you to a real next step (fitness, food, doctors, labs, pharmacy, sleep, mental health, insurance and more as partners sign).

**Website goal:** a premium, dark, 3D scroll experience where the device is taken apart layer by layer as you scroll, while staying fast on phones, honest about what exists today, and inside wellness-claim limits.

**Primary device for the 3D exploded view: the Ring.** It is the product being sold first. The engine is device-agnostic (config-driven), so the **Chest Patch** ("bandage chip") and **Mastoid** can use the same exploded-view system later, behind a feature flag and labelled "Concept" until they are real.

Audience: US adults 25–55 who already track sleep and recovery. Most visitors arrive on phones.

Brand voice: calm, precise, human. No fear marketing, no disease language, no hype.

---

## 2. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js (latest stable, App Router), React 19, TypeScript strict | SSR/SSG for SEO and fast first paint; 3D loads after |
| Styling | Tailwind CSS (v4) with CSS variables for tokens | Tokens in one place, easy to enforce |
| 3D | `three`, `@react-three/fiber` (v9, React 19), `@react-three/drei` | Standard React 3D stack |
| Post-processing | `@react-three/postprocessing` (desktop high tier only) | Bloom on sensor glow |
| Scroll | `gsap` + `ScrollTrigger` + `@gsap/react` (`useGSAP`), `lenis` | Scrubbed, pinned scroll timelines; GSAP is free incl. plugins |
| State | `zustand` (step index), plain mutable object (progress) | Avoid React re-renders every frame |
| Easing/damping | `maath` | `easing.damp3` for smooth camera/part motion |
| GPU tiering | `detect-gpu` + drei `PerformanceMonitor` | Pick quality tier, fall back on weak devices |
| Asset pipeline | Blender → GLB → `@gltf-transform/cli` (Meshopt or Draco, KTX2/WebP textures) | Small model files |
| Forms/validation | `zod`, React Hook Form | Waitlist + contact |
| Commerce | **Shopify headless (Storefront API)** recommended; Stripe Checkout as alternative | Hardware needs sizes, inventory, US sales tax, fulfilment, returns. Shopify gives this out of the box. Stripe means building inventory/tax/fulfilment yourself. |
| Waitlist store | Postgres + Prisma, email via Resend (double opt-in) | Matches the team's stack |
| Bot protection | Cloudflare Turnstile + rate limit (Upstash Redis or edge KV) | Public form |
| Analytics | Plausible (or another cookieless tool) | Health-adjacent site: no ad pixels (see 12.4) |
| Hosting | Vercel (recommended) or Docker behind existing Traefik | Image/asset CDN and edge caching |
| Tests | Playwright, `@axe-core/playwright`, Lighthouse CI | Smoke, a11y and performance budgets in CI |

Pin exact versions at install time and commit the lockfile. Do not add other animation libraries (no Framer Motion alongside GSAP, no Locomotive Scroll).

---

## 3. Design system

### 3.1 Colour tokens

```css
/* src/styles/tokens.css */
:root {
  --bg:        #0A1A14; /* deep forest near-black: page background */
  --surface:   #0F2218; /* cards, panels, nav on scroll */
  --brand:     #115C48; /* CTAs + accents ONLY, sparingly */
  --gold:      #CB9738; /* ONE highlight per section max */
  --ivory:     #FBFAF6; /* primary text */
  --muted:     #7A9A8A; /* secondary text */
  --cardio:    #DB4F55; /* Cardiac domain ONLY */
  --neuro:     #5F5CD1; /* Brain domain ONLY */
  --mind:      #159AAE; /* Mind domain ONLY */

  --line:      rgb(251 250 246 / 0.08);  /* hairlines */
  --line-strong: rgb(251 250 246 / 0.16);
}
```

Mirror these in `src/config/theme.ts` as typed constants so the 3D code uses the same values (`new THREE.Color(theme.gold)`).

### 3.2 Contrast (measured, WCAG 2.1)

| Colour on `--bg` | Ratio | Allowed use |
|---|---|---|
| Ivory | 17.2:1 | All text |
| Muted | 5.8:1 | Body/secondary text (also passes on `--surface`, 5.4:1) |
| Gold | 6.9:1 | Text highlight, small accents |
| Mind teal | 5.4:1 | Text OK |
| Cardio red | 4.5:1 | Text ≥ 18px only (fails slightly on `--surface`: 4.2:1) |
| Neuro purple | 3.4:1 | **Large text (≥ 24px) or graphics only** |
| Brand green | 2.3:1 | **Never as text.** Button fill only |
| Ivory on brand-green button | 7.6:1 | Primary CTA |

### 3.3 Colour usage rules (enforced)

- **Brand green**: primary CTA fill, focus ring, one accent stroke per view. Never text, never large backgrounds.
- **Gold**: one highlight per section. Implement `<Gold>` component; it registers with a `SectionContext`. In development, log a console error if a section renders more than one `<Gold>`.
- **Domain colours**: only via `<Domain kind="cardio|neuro|mind">`. Mapping:
  - `cardio` → heart-related content (heart timing, Chest Patch).
  - `neuro` → brain/sleep architecture (Mastoid).
  - `mind` → stress, recovery, mental wellbeing, habit coaching.
  - The Ring's own sensor visuals use **ivory light**, not domain colours, so the Ring is not presented as a heart or brain device.
- Hero is the one place all three domain colours appear together (as abstract signal traces).

### 3.4 Typography

- **Display/UI:** Geist Sans (via `next/font`, self-hosted). Weights 400/500/600.
- **Data labels / small caps / numbers:** Geist Mono, uppercase, tracking `0.12em`, size 11–12px, colour `--muted`.
- **Accent serif:** Instrument Serif italic, used for **one word per headline at most** (e.g. "what to do *next*").
- Scale (fluid with `clamp`):
  - H1: `clamp(2.5rem, 6vw, 5.5rem)`, line-height 1.02, tracking -0.02em
  - H2: `clamp(2rem, 4vw, 3.5rem)`, line-height 1.05
  - H3: `clamp(1.25rem, 2vw, 1.75rem)`
  - Body: 17px/1.6 mobile, 18px/1.6 desktop, max width 62ch
- Text is always real DOM text over or beside the canvas, never baked into textures.

### 3.5 Layout

- 12-col grid desktop (max 1280px content, 32px gutters), 4-col mobile (16px side gutters).
- Section rhythm: generous whitespace, `py-[clamp(6rem,14vh,10rem)]`.
- Hairline borders `--line`, radius 20px panels, 999px buttons.
- No drop shadows. Depth comes from the 3D scene and a subtle surface lift.

### 3.6 Motion principles

- Calm and precise: ease `power3.out` / cubic-bezier(0.22, 1, 0.36, 1). No bounce, no elastic.
- Scroll-scrubbed 3D uses `scrub: 1` (1 s catch-up) plus `easing.damp` in the render loop for smoothness.
- DOM text reveals: 24px rise + fade, 0.8 s, stagger 0.06 s. Each reveal plays once.
- Nothing loops forever except a slow idle rotation (≤ 6°/s) and signal flow in the hero.
- `prefers-reduced-motion: reduce` → no smooth scroll, no scrub, no pinning; 3D shows static key frames with cross-fades (Section 9.5).

### 3.7 Core components

`Button` (primary green fill / secondary hairline / text), `Nav` (transparent → `--surface`/80 + blur after 40px scroll; persistent price + CTA pill), `SectionHeader` (mono eyebrow + H2), `Gold`, `Domain`, `Eyebrow`, `Panel`, `StatusNote` (the "one plain sentence" component for anything not ready), `SizePicker`, `PriceTag`, `Footer`, `Reveal` (DOM reveal wrapper), `CanvasSlot` (marks where 3D should frame within a section).

---

## 4. Truth config (single source of what is real)

The brief's main rule is *nothing claims more than is true on launch day*. Make that a config, not a memory.

```ts
// src/config/site-status.ts
export type SaleMode = 'waitlist' | 'preorder' | 'buy';
export type PartnerStatus = 'live' | 'direction';

export const siteStatus = {
  ring: {
    saleMode: 'waitlist' as SaleMode,      // deck: pre-product, launch planned 2028
    priceUsd: null as number | null,        // set only when final (brief: one bundled price, intro price at launch)
    priceLabel: 'Introductory price',       // shown only if priceUsd != null
    sizes: [] as string[],                  // fill when sizing is final
    photosReady: false,                     // real photos required for /ring
    validatedClaims: {                      // copy for these appears ONLY when true
      batteryDays: null as string | null,   // e.g. "5–7 days" once validated, not before
      waterResistance: null as string | null,
      material: null as string | null,
    },
  },
  companion: {
    ready: false,            // brief: build the page only with real working screens
    appStoreUrl: null as string | null,
    playStoreUrl: null as string | null,
  },
  futureDevices: {
    show: false,             // Mastoid + Chest Patch teaser; off for launch
  },
  partners: [
    { group: 'everyday',  key: 'fitness',      status: 'direction' },
    { group: 'everyday',  key: 'food',         status: 'direction' },
    { group: 'everyday',  key: 'sleep',        status: 'direction' },
    { group: 'everyday',  key: 'mentalHealth', status: 'direction' },
    { group: 'everyday',  key: 'habits',       status: 'direction' },
    { group: 'medical',   key: 'doctors',      status: 'direction' },
    { group: 'medical',   key: 'labs',         status: 'direction' },
    { group: 'medical',   key: 'pharmacy',     status: 'direction' },
    { group: 'medical',   key: 'womensHealth', status: 'direction' },
    { group: 'critical',  key: 'emergency',    status: 'direction' },
    { group: 'critical',  key: 'elderCare',    status: 'direction' },
    { group: 'covered',   key: 'insurance',    status: 'direction' },
    { group: 'covered',   key: 'travelHealth', status: 'direction' },
  ] as const,
  // A partner only becomes 'live' with: partner name, logo file, booking URL, and region list.
};
```

Rules wired to this config:
- `saleMode` drives every CTA label and action: `waitlist` → "Join the waitlist"; `preorder` → "Reserve yours"; `buy` → "Buy the ring".
- `priceUsd === null` → no price is rendered anywhere (and no Product JSON-LD offer).
- `companion.ready === false` → homepage shows one `StatusNote`: *"The Sevyn8 companion app is in testing. We'll show it here when it's ready."* `/companion` returns `notFound()`.
- `status: 'direction'` → category text only, outlined/dim node in 3D, no logo, no button, no city.
- `validatedClaims.*` null → that spec line is not rendered.

---

## 5. Information architecture

| Route | Content | Notes |
|---|---|---|
| `/` | Home (Section 6) | The 3D story |
| `/ring` | Product page: photos, specs, sizing guide, price, buy/waitlist | Wellness language only. No comparison table. Real photos only (`photosReady`) |
| `/companion` | What it tracks, how it coaches, how it connects to the ring | **Only when `companion.ready`**. Real screens only |
| `/partners` | Ecosystem grouped in 4 categories | Direction vs live per config |
| `/about` | Why this exists, what's different | Scope still open (Section 15) |
| `/waitlist/confirm`, `/waitlist/thanks` | Double opt-in pages | |
| `/legal/privacy`, `/legal/terms`, `/legal/wellness` | Legal | Counsel-reviewed text |
| `/contact` | Simple form or email | |
| `not-found` | Branded 404 | |

Nav: logo · Ring · Partners · About · [price pill + CTA]. Mobile: logo + CTA + menu sheet.

---

## 6. Homepage: section-by-section scroll storyboard

One fixed full-screen `<Canvas>` sits behind the page. DOM sections scroll over it. Each section tells the 3D scene which "act" to show and passes its scroll progress (0→1).

```
Scroll  ──────────────────────────────────────────────────────────────────────►
| HERO 100svh | WHAT IT DOES 60svh | THE RING (pinned, 6 steps) | COMPANION | ECOSYSTEM (pinned, 4 groups) | STORY | FOOTER |
  Act 1: signals   Act 1→2: signals      Act 2: exploded ring         Act 3: ring    Act 4: constellation        Act 5: calm
                   wrap into ring                                     idle → phone   around the ring             fade out
```

### 6.1 Hero (Act 1: "Signals")

**Brief:** abstract or motion visual, not a ring photo, not an app screenshot. Headline says what it does for a person. Ring named in copy. Loads fast.

**3D:** three luminous signal traces float across a dark field of slow drifting particles:
- Heart-rhythm-like trace, `--cardio`
- Brain-activity-like trace (noisy, layered sines), `--neuro`
- Calm pulse-like trace, `--mind`
Each trace has a soft travelling highlight (dash offset animation). Faint depth parallax with pointer (desktop only, max 3°).

**DOM copy (draft, needs client sign-off):**
- Eyebrow (mono): `THE SEVYN8 RING`
- H1: **A ring that tells you what to do *next*.**
- Sub: *Not just what your numbers are. The Sevyn8 Ring learns what's normal for you, tells you in plain words what changed, and points you to a real next step.*
- CTA primary: label from `saleMode`. Secondary text link: "See the ring ↓" (anchors to `#ring`).

**Fast-load rules:** H1 is the LCP element (HTML text, not canvas). Behind it, render an inline SVG of the three traces immediately (≤ 6 KB) as the poster. The WebGL canvas fades in over it once ready. Never block first paint on JS or the GLB.

### 6.2 What it does (Act 1→2: signals wrap into the ring)

**Brief:** a few lines, no diagram, no flowchart, not a 3-step framework.

**3D:** as you scroll, the three traces bend from horizontal lines into circles, shrink and braid into one band, then hand off to the ring model, which fades/scales in at the same radius. Traces dissolve into the ring's inner surface. This is the visual "signal becomes ring" moment.

**DOM copy (draft):** three short sentences, plain prose, not numbered:
> It notices when your sleep, recovery or stress drift from *your* normal.
> It tells you what that means in one sentence, not a chart.
> Then it helps you do something about it, tonight or tomorrow.

### 6.3 The Ring (Act 2: exploded view, pinned)

**Brief:** photos, price, sizes, working buy button; every visitor reaches it within one scroll.

**Within-one-scroll requirement:** Hero = 100svh, "What it does" = 60svh, so after exactly one viewport of scroll the ring section's header, price and CTA are visible. The nav price pill + CTA is also visible from the first frame. (Acceptance test in Phase 4.)

**Layout:** section pins for N steps. Desktop: 3D ring left/centre (60%), **sticky buy panel** right (40%). Mobile: 3D top 55svh, panel as a bottom card with the step text above the CTA.

**Buy panel (always visible during the whole pin):** product name, price (if set), size picker (if sizes set), CTA (by `saleMode`), link "Sizing guide", link "Full details → /ring". Step text swaps inside the panel as you scroll.

**Exploded storyboard (Ring). PART LIST IS A PLACEHOLDER: replace with the real Sensio BOM. Remove any step whose part or claim is not in the shipping unit. Do not show ECG electrodes or bioimpedance (deck: gated on validation).**

| Step | Scroll % | 3D action | Camera | Panel copy (draft, wellness-only) |
|---|---|---|---|---|
| 0 Assembled | 0–12 | Ring rotates slowly, studio lighting, settles at 3/4 view | Front 3/4, ring fills 55% of frame | **The Sevyn8 Ring.** Worn day and night. Nothing to look at, everything to learn. |
| 1 Shell | 12–28 | Outer shell lifts up +Y and becomes semi-transparent | Rises 15°, pulls back slightly | **Made to disappear on your hand.** *(material line only if `validatedClaims.material`)* |
| 2 Sensor window + optical sensor | 28–44 | Inner window drops −Y; optical sensor LEDs pulse ivory light inward (toward finger) | Moves inside the ring's inner side | **Reads your pulse from the inside of your finger.** |
| 3 Temperature sensor | 44–58 | Temperature sensor slides out radially; soft heat-shimmer ring around it | Close-up | **Follows your skin temperature through the night.** |
| 4 Motion sensor | 58–70 | Motion sensor slides out; tiny ivory particles trace a motion path | Close-up, slight orbit | **Knows when you're moving and when you're resting.** |
| 5 Board, battery, charging coil | 70–86 | Flex board unrolls slightly; battery and coil separate along ring axis | Wide, side view | **Charges on its dock.** *(battery line only if `validatedClaims.batteryDays`)* |
| 6 Reassemble | 86–100 | All parts snap back (damped), a single ivory signal line travels out of the ring toward the next section | Return to 3/4, push in | **Then it tells you what to do today.** CTA emphasised |

Each step: the focused part stays full opacity with a subtle ivory rim light; other parts drop to 25% opacity. One `<Gold>` highlight in this section: the price (or the word "today" in step 6 if no price).

Pin length: desktop `+=600%`, mobile `+=420%`. Steps snap softly (`snap: { snapTo: 1/(steps-1), duration: {min:0.2,max:0.6}, ease:'power1.inOut' }`) on desktop only.

### 6.4 Companion (Act 3)

- If `companion.ready`: ring idles; a phone frame slides in with **real** screenshots (static images, not 3D). Copy: what it tracks, how it coaches, how it connects to the ring. App store badges if URLs set.
- If not ready (launch default): ring idles small to one side; one `StatusNote` sentence. No styled section, no mock screens.

### 6.5 Ecosystem preview (Act 4: constellation)

**Brief:** short preview, grouped into a handful of categories, links to `/partners`.

**3D:** the ring sits at centre; four soft orbits around it, one per group. Each category is a small node on its group's orbit. As you scroll (pinned, 4 steps), each group's orbit brightens in turn and its nodes drift closer to the ring.
- `live` node: solid fill (`--brand`), subtle glow.
- `direction` node: hairline outline in `--muted`, no glow.
- The Mental-health / habits nodes may use `--mind`; nothing else uses domain colours here.

**DOM (one line per group, draft):**
- **Everyday health**: Training, food, sleep and stress support that fits what your body is telling you.
- **Medical**: A route to doctors, lab tests and pharmacy when you want a professional to take a closer look.
- **When it matters most**: Getting help to you, and to the people who look out for you. *(legal review required: must not imply detection or alerts; deck lists clinical-action alerts as out of scope)*
- **Keeping it covered**: Insurance and travel health that recognise how you look after yourself.
- Legend (mono, small): `● Live today   ○ Coming as partners join`
- Link: "See where this is going → /partners"

### 6.6 Our story (Act 5: calm)

Canvas dims to 30% and particles slow. DOM: 2–3 lines, draft:
> Every wearable today gives you a number and leaves you there. We started Sevyn8 to close that gap.

Link: "Read our story → /about".

### 6.7 Footer

Canvas paused (frameloop off). CTA (by `saleMode`), contact email, social links, legal links, wellness disclaimer line: *"Sevyn8 products are for general wellness. They are not medical devices and do not diagnose, treat or prevent any condition."* (counsel to confirm wording).

---

## 7. Other pages

### 7.1 `/ring`
- Gallery of **real photos** (if `photosReady` false: one `StatusNote`, no renders passed off as photos). A small interactive 3D viewer (orbit only, no exploded story) is allowed if clearly a model.
- Specs list from config: what it reads (optical pulse sensor, skin temperature, motion), connectivity, plus only validated lines.
- Sizing guide: size chart + how-to-measure steps; link to sizing kit if offered.
- Price + size picker + CTA (by `saleMode`).
- FAQ (shipping, returns, privacy, "is this a medical device?" → no).
- **Not allowed:** comparison tables, medical claims, competitor names.

### 7.2 `/partners`
Four groups (Everyday health, Medical, When it matters most, Keeping it covered). Each group: heading + one line on what it means in practice + its categories. Each category card: name, one sentence, status chip. Live partners only: logo, region, booking link. A static 2D version of the constellation at the top (SVG, not WebGL; this page should be light).

### 7.3 `/about`
Why this exists (number-and-leave-you-there gap), what's different (acting is harder to copy than reporting; needs real relationships with doctor, lab, pharmacy). Founder story in founders' own words (asset needed). Scope decision open (Section 15).

### 7.4 `/companion`
Only when `companion.ready`. Real screens; what it tracks, how it coaches, how it connects to the ring.

---

## 8. Project structure

```
src/
  app/
    layout.tsx               # fonts, tokens, <SmoothScroll>, <SceneRoot>
    page.tsx                 # home sections (server components + client islands)
    ring/page.tsx
    partners/page.tsx
    about/page.tsx
    companion/page.tsx       # notFound() unless companion.ready
    legal/[slug]/page.tsx
    waitlist/{confirm,thanks}/page.tsx
    api/waitlist/route.ts
    api/waitlist/confirm/route.ts
    opengraph-image.tsx
    sitemap.ts  robots.ts
  components/                # DOM UI (Button, Nav, Panel, Gold, Domain, StatusNote...)
  sections/home/             # Hero, WhatItDoes, RingSection, Companion, Ecosystem, Story
  content/                   # copy as typed TS objects (home.ts, ring.ts, partners.ts, about.ts)
  config/
    site-status.ts           # truth config (Section 4)
    theme.ts                 # colour constants for 3D
    devices/ring.ts          # parts, explode vectors, camera keyframes, step copy keys
    devices/chest-patch.ts   # same shape, flagged off
    devices/mastoid.ts       # same shape, flagged off
  three/
    SceneRoot.tsx            # the one fixed <Canvas>, lazy loaded
    quality.ts               # GPU tier detection + settings
    store.ts                 # scroll store (mutable) + zustand step store
    acts/HeroSignals.tsx
    acts/ExplodedDevice.tsx  # generic, driven by devices/*.ts
    acts/Constellation.tsx
    parts/Part.tsx
    parts/PlaceholderRing.tsx      # procedural stand-in until real GLB arrives
    parts/PlaceholderPatch.tsx
    materials/*.ts
    CameraRig.tsx
    Lighting.tsx
  scroll/
    SmoothScroll.tsx         # Lenis + ScrollTrigger sync
    useSectionProgress.ts    # binds a DOM section to a store key
  lib/ (shopify.ts, waitlist.ts, rate-limit.ts, analytics.ts)
public/
  models/ring.glb  models/chest-patch.glb
  env/studio-1k.hdr
  posters/ring-step-0.avif ... ring-step-6.avif   # static fallbacks
scripts/
  lint-claims.ts             # banned-words check (Section 12.3)
  capture-posters.ts         # Playwright screenshots of each 3D step
prisma/schema.prisma
```

---

## 9. 3D architecture

### 9.1 One canvas, many acts

- Exactly **one** `<Canvas>` for the whole site, `position: fixed; inset: 0; z-index: 0; pointer-events: none`, `aria-hidden="true"`.
- Loaded with `next/dynamic(() => import('@/three/SceneRoot'), { ssr: false })` and mounted after first paint (`requestIdleCallback` or after `load`), so it never delays LCP.
- `SceneRoot` renders all acts; each act reads its own progress and fades/scales itself in and out. Acts that are fully hidden set `visible = false` (skip draw calls).
- Canvas settings: `dpr={[1, tier.maxDpr]}`, `gl={{ antialias: tier.level > 1, powerPreference: 'high-performance', alpha: true }}`, `flat` off, ACES tone mapping, `outputColorSpace = SRGBColorSpace`.
- When the footer is in view or the tab is hidden, set `frameloop="never"` (or `demand`).

### 9.2 Scroll engine

```tsx
// src/scroll/SmoothScroll.tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

```ts
// src/three/store.ts
import { create } from 'zustand';
export type ActId = 'hero' | 'wrap' | 'ring' | 'companion' | 'ecosystem' | 'story';

// Mutable: written by ScrollTrigger, read in useFrame. Never triggers React renders.
export const progress: Record<ActId, number> = {
  hero: 0, wrap: 0, ring: 0, companion: 0, ecosystem: 0, story: 0,
};

// Reactive: changes rarely (step index), drives DOM panel copy.
export const useStory = create<{ ringStep: number; ecoStep: number; active: ActId }>(() => ({
  ringStep: 0, ecoStep: 0, active: 'hero',
}));
```

```tsx
// pinned ring section (client component)
useGSAP(() => {
  const steps = ring.steps.length;
  const mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 768px)', reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
    const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
    if (reduce) return; // reduced motion: no pin, see 9.5
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: desktop ? '+=600%' : '+=420%',
      pin: true,
      scrub: 1,
      snap: desktop ? { snapTo: 1 / (steps - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut' } : undefined,
      onUpdate: (self) => {
        progress.ring = self.progress;
        const s = Math.min(steps - 1, Math.floor(self.progress * steps));
        if (s !== useStory.getState().ringStep) useStory.setState({ ringStep: s });
      },
      onToggle: (self) => self.isActive && useStory.setState({ active: 'ring' }),
    });
  });
  return () => mm.revert();
}, { scope: sectionRef });
```

Call `ScrollTrigger.refresh()` after fonts load and after the canvas mounts. Pinned sections on mobile use `svh` units and `ScrollTrigger.config({ ignoreMobileResize: true })` to avoid jumps when the URL bar hides.

### 9.3 Device config (data-driven exploded view)

```ts
// src/config/devices/types.ts
export type Vec3 = [number, number, number];
export interface PartConfig {
  id: string;               // 'shell'
  node: string;             // GLB node name, e.g. 'L01_shell'
  dir: Vec3;                // explode direction (normalised in code)
  distance: number;         // world units at full explode
  explodeAt: [number, number]; // progress window where it moves out (0..1)
  returnAt: [number, number];  // window where it moves back
  focusStep?: number;       // step where this part is the hero
  emissive?: 'ivory' | 'cardio' | 'neuro' | 'mind' | null;
}
export interface CameraKey { step: number; position: Vec3; target: Vec3; fov: number; }
export interface StepConfig { id: string; copyKey: string; claimFlag?: string; } // claimFlag → hide if not validated
export interface DeviceConfig {
  id: 'ring' | 'chest-patch' | 'mastoid';
  model: string;            // '/models/ring.glb' or 'placeholder'
  scale: number;
  parts: PartConfig[];
  steps: StepConfig[];
  camera: CameraKey[];
  mobileCamera: CameraKey[];
}
```

```ts
// src/config/devices/ring.ts (PLACEHOLDER VALUES: tune after real GLB arrives)
export const ringDevice: DeviceConfig = {
  id: 'ring',
  model: 'placeholder', // switch to '/models/ring.glb'
  scale: 1,             // 1 unit = 1 cm; ring outer diameter ≈ 2.2
  parts: [
    { id: 'shell',   node: 'L01_shell',   dir: [0, 1, 0],  distance: 1.4, explodeAt: [0.12, 0.26], returnAt: [0.86, 0.96], focusStep: 1 },
    { id: 'window',  node: 'L02_window',  dir: [0, -1, 0], distance: 1.0, explodeAt: [0.28, 0.40], returnAt: [0.86, 0.96], focusStep: 2 },
    { id: 'optical', node: 'L03_optical', dir: [0, 0, -1], distance: 0.8, explodeAt: [0.30, 0.42], returnAt: [0.86, 0.96], focusStep: 2, emissive: 'ivory' },
    { id: 'temp',    node: 'L04_temp',    dir: [1, 0, 0],  distance: 0.9, explodeAt: [0.44, 0.54], returnAt: [0.86, 0.96], focusStep: 3, emissive: 'ivory' },
    { id: 'imu',     node: 'L05_imu',     dir: [-1, 0, 0], distance: 0.9, explodeAt: [0.58, 0.66], returnAt: [0.86, 0.96], focusStep: 4 },
    { id: 'board',   node: 'L06_board',   dir: [0, 0, 1],  distance: 0.6, explodeAt: [0.70, 0.80], returnAt: [0.86, 0.96], focusStep: 5 },
    { id: 'battery', node: 'L07_battery', dir: [0, 0, 1],  distance: 1.2, explodeAt: [0.70, 0.82], returnAt: [0.86, 0.96], focusStep: 5 },
    { id: 'coil',    node: 'L08_coil',    dir: [0, -1, 1], distance: 1.0, explodeAt: [0.72, 0.84], returnAt: [0.86, 0.96], focusStep: 5 },
  ],
  steps: [
    { id: 'assembled', copyKey: 'ring.step0' },
    { id: 'shell',     copyKey: 'ring.step1', claimFlag: 'material' },
    { id: 'optical',   copyKey: 'ring.step2' },
    { id: 'temp',      copyKey: 'ring.step3' },
    { id: 'motion',    copyKey: 'ring.step4' },
    { id: 'power',     copyKey: 'ring.step5', claimFlag: 'batteryDays' },
    { id: 'together',  copyKey: 'ring.step6' },
  ],
  camera: [ /* one CameraKey per step, tuned visually */ ],
  mobileCamera: [ /* pulled back ~30%, target shifted up so ring sits in top 55svh */ ],
};
```

**Chest Patch ("bandage chip") config**, same shape, `futureDevices.show` gated, labelled "Concept" in the UI. Placeholder layers exploding along the patch normal (+Z), top to skin:
`P01_cover` (fabric top) → `P02_foam` → `P03_battery` → `P04_board` (flex PCB) → `P05_electrodes` (emissive `cardio`) → `P06_adhesive` (skin layer). Again: replace with Sensio's real stack-up before showing publicly.

### 9.4 Exploded part logic

```tsx
// src/three/parts/Part.tsx (sketch)
const tmp = new THREE.Vector3(); // module scope, reused: no allocation in useFrame

function windowT(p: number, [a, b]: [number, number]) {
  return THREE.MathUtils.clamp((p - a) / (b - a), 0, 1);
}
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Part({ object, cfg }: { object: THREE.Object3D; cfg: PartConfig }) {
  const base = useMemo(() => object.position.clone(), [object]);
  const dir = useMemo(() => new THREE.Vector3(...cfg.dir).normalize(), [cfg.dir]);
  useFrame((_, dt) => {
    const p = progress.ring;
    const out = easeInOutCubic(windowT(p, cfg.explodeAt));
    const back = easeInOutCubic(windowT(p, cfg.returnAt));
    const amount = out * (1 - back);
    tmp.copy(base).addScaledVector(dir, cfg.distance * amount);
    easing.damp3(object.position, tmp, 0.12, dt);
    // focus: fade non-focused parts (see notes below)
  });
  return <primitive object={object} />;
}
```

Notes:
- Clone materials per part once at load so opacity changes don't leak between parts.
- Fading: set `transparent = true` and `depthWrite = false` only while opacity < 1; restore when fully opaque (avoids sorting artefacts).
- Focus highlight: rim light via `onBeforeCompile` fresnel term or a duplicated back-face shell with an additive ivory material; keep it subtle.
- `CameraRig` interpolates between the current and next `CameraKey` with sub-step progress, then `easing.damp3` camera position and look-at target (λ 0.25). Switch to `mobileCamera` under 768px.
- Idle: when progress hasn't changed for 1.5 s, add a slow rotation (≤ 6°/s) to the device group; stop instantly when scroll resumes.

### 9.5 Quality tiers and fallbacks

```ts
// src/three/quality.ts
export interface Quality {
  level: 0 | 1 | 2 | 3;      // 0 = no WebGL (static posters)
  maxDpr: number;
  particles: number;
  tracePoints: number;
  postprocessing: boolean;   // bloom
  transmission: boolean;     // physical glass on sensor window
  shadows: boolean;
}
export const QUALITY: Record<Quality['level'], Quality> = {
  0: { level: 0, maxDpr: 1,    particles: 0,    tracePoints: 0,   postprocessing: false, transmission: false, shadows: false },
  1: { level: 1, maxDpr: 1,    particles: 1200, tracePoints: 192, postprocessing: false, transmission: false, shadows: false },
  2: { level: 2, maxDpr: 1.5,  particles: 3000, tracePoints: 384, postprocessing: false, transmission: false, shadows: true  },
  3: { level: 3, maxDpr: 1.75, particles: 6000, tracePoints: 512, postprocessing: true,  transmission: true,  shadows: true  },
};
```

- Start from `detect-gpu` tier (mobile capped at level 2). Wrap the scene in drei `<PerformanceMonitor onDecline={() => stepDown()} />` to drop a tier if FPS stays low.
- **Level 0 / WebGL unavailable / Save-Data header / context lost:** no canvas. Each section shows its static poster (`public/posters/*.avif`, captured from the real scene by `scripts/capture-posters.ts`). Ring section cross-fades posters per step.
- **`prefers-reduced-motion`:** no Lenis, no pinning, no scrub. Ring section becomes a normal vertical list: one poster + copy per step. Hero traces static.
- Handle `webglcontextlost`: unmount canvas, switch to level 0.

### 9.6 Hero signals implementation

- Each trace: drei `<Line>` (Line2, real width, `lineWidth` 1.5–2.5 px, `transparent`, additive blending), `tracePoints` vertices.
- Waveform generators (pure functions, x ∈ [-1, 1]):
  - cardio: repeating spike-and-recovery shape built from Gaussian bumps.
  - neuro: sum of 4–5 sines at different frequencies plus low-amplitude simplex noise.
  - mind: smooth slow sine with a gentle secondary harmonic.
- Travelling highlight: animate `dashOffset` with long dashes, or a custom shader uniform. No geometry rebuild per frame in Act 1.
- **Wrap transition (Act 1→2):** precompute two Float32Arrays per trace: `linePos` (waveform along X) and `circlePos` (same waveform as small radial modulation around a circle of the ring's radius, each trace on a slightly different tilt). On scroll, `lerp(linePos, circlePos, easeInOutCubic(progress.wrap))` into a reused array and call `setPositions` **only when progress changed** (dirty flag).
- Particles: `THREE.Points` with a small ShaderMaterial (size attenuation, soft round sprite, drift in vertex shader via `uTime`). No per-frame CPU updates.

### 9.7 Lighting and materials

- Environment: self-hosted 1K studio HDR in `public/env/` via drei `<Environment files=... />`. Do **not** rely on drei presets in production (they fetch from an external CDN).
- Key light warm-neutral, rim light cool, faint `--brand` tinted fill from below (≤ 10% intensity).
- Ring shell: `MeshPhysicalMaterial`, metalness 1, roughness 0.22–0.3, clearcoat 0.6 (final values depend on real material; dark titanium look as default).
- Sensor window: tier 3 `transmission` 1, thickness 0.2; lower tiers a tinted transparent standard material.
- Electronics: baked AO texture + low metalness; LEDs emissive ivory; bloom (tier 3) only on emissive with `luminanceThreshold` 0.9.
- Background stays `--bg`; canvas `alpha: true` and the page background shows through, so colours match exactly.

### 9.8 3D asset pipeline

1. Get CAD (STEP) from Sensio. Import into Blender.
2. Retopologise/decimate: **≤ 80k triangles total** for the ring (desktop), ≤ 35k LOD for mobile.
3. One object per explodable part, named exactly as in `devices/ring.ts` (`L01_shell` …). Apply transforms. Origin at each part's centre. Ring centred at world origin, 1 unit = 1 cm.
4. Bake AO (1K) for electronics; PBR textures ≤ 1K, shared atlas where possible.
5. Export GLB, then optimise:
   `npx @gltf-transform/cli optimize ring.glb public/models/ring.glb --compress meshopt --texture-compress ktx2` (check `--help` for the installed version's flags).
6. **Budget: ring.glb ≤ 1.2 MB, chest-patch.glb ≤ 0.8 MB.** Load with `useGLTF` + the matching decoder (MeshoptDecoder / KTX2Loader with self-hosted transcoder files).
7. Preload the GLB only after the hero is interactive: `useGLTF.preload` inside `requestIdleCallback`.
8. Serve `/models/*` and `/env/*` with `Cache-Control: public, max-age=31536000, immutable` and hashed file names.

**Until the real CAD arrives,** build `PlaceholderRing.tsx` from primitives (torus shell, thin inner band, small rounded boxes for sensors, curved box for battery, torus for coil) using **the same node names**, so swapping in the GLB changes one config line. Show a dev-only "PLACEHOLDER GEOMETRY" badge. Placeholder geometry must never ship to production (CI check: `model !== 'placeholder'` when `NODE_ENV=production` and `saleMode !== 'waitlist'`, or simply a release checklist item).

---

## 10. Commerce and forms

### 10.1 Waitlist (launch default)

- `POST /api/waitlist`: body `{ email, ringSize?, source, utm? , turnstileToken, website /* honeypot */ }`, validated with zod.
- Rate limit: 5 requests / 10 min / IP. Reject when honeypot is filled. Verify Turnstile server-side.
- Double opt-in: store unconfirmed, email a signed, expiring token (Resend), confirm via `/api/waitlist/confirm?token=`.
- Store **no health data**. Only email, optional ring size, source/UTM, consent version, timestamps.

```prisma
model WaitlistSignup {
  id             String    @id @default(cuid())
  email          String    @unique
  ringSize       String?
  source         String
  utm            Json?
  consentVersion String
  confirmedAt    DateTime?
  createdAt      DateTime  @default(now())
  @@index([createdAt])
}
```

### 10.2 Buy flow (when `saleMode` = `preorder` or `buy`)

- Shopify headless: Storefront API `cartCreate` with the variant for the chosen size → redirect to `cart.checkoutUrl`. Hosted checkout handles payment, US tax, shipping.
- Variants = ring sizes (+ colour if any). Inventory and price come from Shopify; `site-status.ts` price must match (add a build-time check that fetches the product and fails the build on mismatch).
- Pricing per brief: **one bundled price** for ring + companion, introductory price at launch, **no subscription at launch**. (Deck says $399 + paid membership; see Section 15.)
- Product JSON-LD with `offers` only in `buy`/`preorder` mode.

---

## 11. Performance budgets (mobile first)

Measured on a mid-range Android over throttled 4G (Lighthouse mobile preset):

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5 s (H1 text is the LCP element) |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| Initial JS (excluding the lazy 3D chunk) | ≤ 170 KB gzipped |
| 3D chunk (three + r3f + drei used parts + gsap) | ≤ 350 KB gzipped, loaded after first paint |
| Ring GLB | ≤ 1.2 MB |
| Steady FPS during scroll | ≥ 50 desktop, ≥ 40 mid-tier mobile (else tier drops) |
| Lighthouse Performance (mobile) | ≥ 85 home, ≥ 95 other pages |

Techniques: import drei components individually; tree-shake three; `next/font`; AVIF images via `next/image`; no canvas on `/partners`, `/about`, `/legal/*` (static SVG instead); pause render loop off-screen; `frameloop="demand"` during idle where possible.

---

## 12. Accessibility, compliance, SEO, analytics

### 12.1 Accessibility (WCAG 2.1 AA)
- Canvas `aria-hidden`; all meaning in DOM text. Each exploded step's copy is a real heading + paragraph.
- Keyboard: skip link, visible focus ring (`--brand` 2px + ivory 1px offset), size picker is a radio group.
- Pinned sections must not trap focus; tabbing into the ring panel scrolls the pin to the matching step.
- Contrast rules from 3.2. `axe` run in CI with zero serious/critical issues.

### 12.2 Claims and copy rules
- Wellness only. Allowed: *notices, follows, learns your normal, suggests, helps you, wind-down, recovery, sleep, stress, energy.*
- Not allowed anywhere: disease names, *diagnose, detect (a condition), screen, treat, cure, prevent, medical-grade, clinical-grade, FDA-approved/cleared, abnormal, arrhythmia, AFib, seizure, apnea, ECG* (until validated and approved by counsel), competitor names on product pages.
- No framework names ("Mote", "Sense / Understand / Act").
- Every number on the site needs a source or is removed.

### 12.3 `pnpm lint:claims`
`scripts/lint-claims.ts` scans `src/content/**`, `src/config/**` and `src/app/**/*.tsx` text for the banned list (case-insensitive, word-boundary), prints file:line, exits 1. Allowlist file for legal pages (the disclaimer must say "does not diagnose"). Run in pre-commit and CI.

### 12.4 Privacy and analytics
- Cookieless analytics only. **No Meta/Google ad pixels** on any page: health-interest data sent to ad platforms is a known FTC/state-law risk for health-adjacent brands.
- Privacy policy and wellness disclaimer reviewed by counsel (FTC Health Breach Notification Rule, state consumer-health-data laws).
- Security headers: CSP (allow self, Shopify checkout domain, Turnstile, Plausible), HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (deny camera/mic/geolocation).

### 12.5 SEO
- Metadata per page, canonical URLs, `sitemap.ts`, `robots.ts`.
- OG image generated with `opengraph-image.tsx` (signals visual + headline).
- `Organization` JSON-LD site-wide; `Product` only when sale is live.
- All story copy server-rendered so crawlers see it without WebGL.

---

## 13. Testing

- **Playwright smoke:** every route renders; CTA label matches `saleMode`; no price rendered when `priceUsd` null; `/companion` 404s when not ready; direction partners have no `<img>`/`<a>` booking.
- **"Within one scroll" test:** on 390×844 and 1440×900, scroll by exactly one viewport height; assert ring name + CTA are within the viewport.
- **Reduced motion:** emulate `prefers-reduced-motion`; assert no pinned elements (`.pin-spacer` absent) and all step copy visible.
- **No-WebGL:** launch Chromium with `--disable-webgl`; assert posters shown and no console errors.
- **Accessibility:** axe on every route.
- **Lighthouse CI:** budgets from Section 11 as assertions.
- **Claims lint** in CI.

---

## 14. Build phases (give these to Claude Code one at a time)

### Phase 0: Scaffold and tokens
Create the Next.js app (TS strict, App Router, Tailwind, ESLint, Prettier, pnpm). Add tokens (3.1), fonts (3.4), `theme.ts`, `site-status.ts`, folder structure (Section 8), `CLAUDE.md`, `lint:claims` script.
**Done when:** app runs; a `/dev/tokens` page (dev only) shows every colour with its allowed use; `pnpm lint:claims` runs and fails on a test fixture containing "diagnose".

### Phase 1: Static site, no 3D
All pages and homepage sections with real DOM copy from `src/content/`, Nav, Footer, `Gold`/`Domain`/`StatusNote` components, responsive layout, SVG hero poster, static posters as placeholders in 3D slots.
**Done when:** whole site is usable and readable with JS disabled; Lighthouse mobile ≥ 95 on all pages; config flags change what renders (CTA label, price, companion, partners).

### Phase 2: 3D foundation
`SceneRoot` (single fixed canvas, lazy), quality tiers + PerformanceMonitor, `SmoothScroll`, scroll store, `useSectionProgress`, `CameraRig`, lighting, self-hosted HDR, `PlaceholderRing` and `PlaceholderPatch` with correct node names, dev overlay showing tier/FPS/act/progress.
**Done when:** canvas loads after first paint (LCP unaffected vs Phase 1 by > 200 ms); reduced-motion and no-WebGL paths work; no console errors; context-loss fallback works.

### Phase 3: Hero signals and wrap transition
Section 9.6. Three domain-coloured traces, particles, pointer parallax (desktop), wrap into circle and hand-off to ring.
**Done when:** smooth on desktop (≥ 55 fps) and mid-tier mobile (≥ 40 fps); traces only use their domain colours; poster → canvas fade has no layout shift.

### Phase 4: Ring exploded sequence + buy panel
`ExplodedDevice` driven by `devices/ring.ts`, `Part` logic, focus fading, camera keyframes (desktop + mobile), pinned section with sticky buy panel, step copy from content, claim-flagged steps hidden when not validated, snap on desktop, reduced-motion list version.
**Done when:** all 7 steps play forward and backward without jitter; "within one scroll" test passes on both viewports; only one `<Gold>` in the section; changing `model` from placeholder to a GLB path needs no other code change.

### Phase 5: Companion + Ecosystem + Story
Companion act (both `ready` states), constellation act driven by `site-status.partners`, ecosystem pin (4 steps), story fade, footer pause; `/partners` page with static SVG constellation.
**Done when:** a partner flipped to `live` in config shows solid node + logo/booking on `/partners`; `direction` shows outline only, no logo/button/city.

### Phase 6: Waitlist and commerce
Waitlist API (zod, Turnstile, rate limit, honeypot, double opt-in, Prisma), thank-you/confirm pages; Shopify cart → checkout behind `saleMode`; price consistency build check.
**Done when:** waitlist works end-to-end with confirmation email; duplicate emails handled idempotently; switching `saleMode` to `buy` (with test store) reaches Shopify checkout with the selected size.

### Phase 7: Hardening
Security headers/CSP, SEO (metadata, sitemap, OG, JSON-LD rules), Plausible events (CTA clicks, waitlist submit, step reached), poster capture script, full test suite (Section 13), Lighthouse CI budgets.
**Done when:** CI is green with all budgets and tests enforced.

### Phase 8: Real assets and launch
Swap real ring GLB, real photos, final copy, final price/sizes, legal text; re-tune camera keys; recapture posters; run the launch checklist below.

### Launch checklist
- [ ] Every exploded-view part exists in the shipping ring (Sensio sign-off).
- [ ] No placeholder geometry, no mock app screens, no fake partner logos.
- [ ] Every number and spec on the site is validated or removed.
- [ ] `lint:claims` clean; counsel has reviewed home, /ring, /partners, legal pages.
- [ ] `saleMode`, price and sizes match Shopify.
- [ ] Partner categories marked `live` each have a signed partner.
- [ ] Lighthouse/axe budgets green on production URL.

---

## 15. Open decisions and conflicts (resolve before Phase 8)

1. **Which device is the hero of the 3D story?** The deck says the first product is the **Ring**; the bandage-like **Chest Patch** is Phase 3 and "concept only". This spec animates the Ring and keeps the Chest Patch config ready behind `futureDevices.show`. Showing the patch as the main product would claim more than is true.
2. **Buy now vs waitlist.** Brief asks for a working buy flow; deck says pre-product with a waitlist first and launch in 2028. Handled by `saleMode` (default `waitlist`).
3. **Pricing model.** Brief (newer): one bundled price, intro price, no subscription at launch. Deck: $399 list + $9.99/month membership. Site follows the brief; final number needed.
4. **"Mind" domain meaning.** Assumed = stress, recovery, mental wellbeing, habits. Confirm.
5. **Exploded-view parts.** Placeholder list until Sensio provides CAD/BOM. ECG and bioimpedance are excluded (gated on validation).
6. **Emergency and doctor categories** sit next to a wellness-only positioning (deck excludes clinical-action alerts). Kept as "direction" copy only; needs counsel review.
7. **About page scope:** ring + companion only, or also Sevyn8's broader work (brief leaves this open).
8. **Names:** "Sevyn8", "Mastoid", "Chest Patch" are working names; trademark clearance pending.

## 16. Assets needed from the client (from the brief)

Ring photos · final pricing · logo and brand files · page copy for every page (drafts in this spec need sign-off) · list of partner categories that are real today · founding story in the founders' own words · **ring CAD/STEP + BOM from Sensio** (for the 3D model) · legal copy (privacy, terms, wellness disclaimer) · social links and contact email · Shopify store access (when moving past waitlist).

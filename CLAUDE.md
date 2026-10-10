# Sevyn8 marketing site: rules for Claude

Spec: `docs/SEVYN8_BUILD_SPEC.md`. Brief: `docs/website-brief-v3.md`. Where they disagree, the brief wins for anything on the site.

## Hard rules (never break)
1. Nothing on the site claims more than is true on launch day. If something is not ready, it gets ONE plain sentence (`<StatusNote>`), not a styled section.
2. Wellness language only. No disease names, no "diagnose/detect/treat/prevent/cure", no "medical-grade", no "abnormal", no ECG/EEG/bioimpedance claims. `pnpm lint:claims` runs before every build and fails on violations.
3. Never name the AI platform or any framework on the page (no "Mote", no "Sense / Understand / Act" steps).
4. No comparison tables and no competitor names (Oura, Whoop, Ultrahuman, Gabit, RingConn…) anywhere on the site.
5. What's real is driven by `src/config/site-status.ts`: sale mode, price, sizes, photos, validated specs, companion app, future devices, partner status. A partner category with status `direction` never shows a logo, booking button or city.
6. Colour rules: domain colours (cardio / neuro / mind) only inside their domain. Gold at most one highlight per section. Brand green is for CTA fills and accents only, never body text.
7. The 3D ring is an illustration and is labelled as one. Do not invent hardware parts; swap in Sensio's real CAD when it exists.

## Stack
Next.js 16 (App Router, static export to `out/`) · React 19 · TypeScript strict · Tailwind CSS v4 · three.js (lazy-loaded, imperative) · Lenis. pnpm.

## Conventions
- Server Components by default; `"use client"` only for canvas, scroll, nav and forms.
- All copy in `src/content/`. All flags in `src/config/`. 3D in `src/three/`. Homepage sections in `src/sections/home/`.
- `*word*` in copy renders as the accent serif italic (one per headline at most).
- Add `data-reveal` to any element that should fade up on scroll. It's a pure-CSS scroll-driven animation (globals.css), so content can never get stuck hidden; stagger with `--reveal-i`.
- Checks before committing: `pnpm lint && pnpm typecheck && pnpm build`.

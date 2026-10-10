/**
 * Truth config: the single source of what is real today.
 *
 * Brief rule: nothing on the live site may claim more than is true on the day it goes live.
 * Flip values here as things become real. Every CTA, price, spec line, partner card and
 * device badge on the site reads from this file.
 */

export type SaleMode = "waitlist" | "preorder" | "buy";
export type PartnerStatus = "live" | "direction";
export type DeviceStatus = "first" | "soon" | "development" | "concept" | "available";

export type PartnerGroupKey = "everyday" | "medical" | "critical" | "covered";

export type PartnerKey =
  | "fitness"
  | "food"
  | "sleep"
  | "mentalHealth"
  | "habits"
  | "doctors"
  | "labs"
  | "pharmacy"
  | "womensHealth"
  | "emergency"
  | "elderCare"
  | "insurance"
  | "travelHealth";

export interface LivePartner {
  name: string;
  /** Path under /public, e.g. "/partners/acme.svg" */
  logo: string;
  bookingUrl: string;
  regions: string[];
}

export interface PartnerEntry {
  group: PartnerGroupKey;
  key: PartnerKey;
  status: PartnerStatus;
  /** Required when status is "live". A category only goes live with a signed partner. */
  partner?: LivePartner;
}

export const siteStatus = {
  ring: {
    /** Deck: pre-product, launch planned. Brief: buy flow when ready. */
    saleMode: "waitlist" as SaleMode,
    /** One bundled price (ring + companion). Set only when final. null = no price shown anywhere. */
    priceUsd: null as number | null,
    priceLabel: "Introductory price",
    /** Hosted checkout URL (Shopify / Stripe Payment Link) used when saleMode is "preorder" or "buy". */
    checkoutUrl: null as string | null,
    /** Fill when sizing is final, e.g. ["6","7","8","9","10","11","12","13"]. */
    sizes: [] as string[],
    /** Real photos of production rings in /public/ring/. */
    photos: [] as { src: string; alt: string }[],
    /** Spec lines appear only once validated on production units. */
    validatedClaims: {
      batteryDays: null as string | null,
      waterResistance: null as string | null,
      material: null as string | null,
      weight: null as string | null,
    },
  },
  companion: {
    /** Brief: show real, working screens only. false = one plain sentence, no mock UI. */
    ready: false,
    appStoreUrl: null as string | null,
    playStoreUrl: null as string | null,
  },
  futureDevices: {
    /** Show Mastoid + Chest Patch, clearly labelled with their real status. */
    show: true,
    mastoid: "soon" as DeviceStatus,
    chestPatch: "concept" as DeviceStatus,
  },
  partners: [
    { group: "everyday", key: "fitness", status: "direction" },
    { group: "everyday", key: "food", status: "direction" },
    { group: "everyday", key: "sleep", status: "direction" },
    { group: "everyday", key: "mentalHealth", status: "direction" },
    { group: "everyday", key: "habits", status: "direction" },
    { group: "medical", key: "doctors", status: "direction" },
    { group: "medical", key: "labs", status: "direction" },
    { group: "medical", key: "pharmacy", status: "direction" },
    { group: "medical", key: "womensHealth", status: "direction" },
    { group: "critical", key: "emergency", status: "direction" },
    { group: "critical", key: "elderCare", status: "direction" },
    { group: "covered", key: "insurance", status: "direction" },
    { group: "covered", key: "travelHealth", status: "direction" },
  ] satisfies PartnerEntry[] as PartnerEntry[],
};

export const cta = {
  label: (
    {
      waitlist: "Join the waitlist",
      preorder: "Reserve yours",
      buy: "Buy the ring",
    } as const
  )[siteStatus.ring.saleMode],
  href:
    siteStatus.ring.saleMode !== "waitlist" && siteStatus.ring.checkoutUrl
      ? siteStatus.ring.checkoutUrl
      : "/waitlist/",
  external: siteStatus.ring.saleMode !== "waitlist" && !!siteStatus.ring.checkoutUrl,
};

export const formatPrice = (usd: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);

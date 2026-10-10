import type { DomainKind } from "@/config/theme";
import type { DeviceStatus } from "@/config/site-status";
import { siteStatus } from "@/config/site-status";
import { photos, products, type PhotoAsset } from "./photos";

/**
 * The Sevyn8 device family (investor deck, Sep 2026). Product names are working names.
 * Only signals the deck lists as un-gated are described. ECG, EEG and bioimpedance (claims-allow: dev note)
 * are not claimed anywhere: they are gated on validation.
 */

export interface Device {
  id: "ring" | "mastoid" | "chest-patch";
  name: string;
  site: string;
  /** Short phrase for photo captions */
  worn: string;
  rhythm: string;
  status: DeviceStatus;
  /** Ring uses ivory; future devices use their domain colour only. */
  domain: DomainKind | null;
  summary: string;
  reads: string[];
  adds: string;
  why: string;
  /** On the body: design render for launching devices, a real moment otherwise. */
  photo: PhotoAsset;
  /** Optional product view (design render) shown with the details. */
  detail?: PhotoAsset;
}

export const statusLabel: Record<DeviceStatus, string> = {
  available: "Available now",
  first: "Coming first",
  soon: "Coming soon",
  development: "In development",
  concept: "Concept",
};

export const devices: Device[] = [
  {
    id: "ring",
    name: "Sevyn8 Ring",
    site: "Finger",
    worn: "On your finger",
    rhythm: "Day and night",
    status: siteStatus.ring.saleMode === "buy" ? "available" : "first",
    domain: null,
    summary: "The everyday base. Worn around the clock, it learns your normal for recovery, sleep and activity.",
    reads: ["Pulse, through an optical sensor", "Skin temperature", "Motion and rest"],
    adds: "Your baseline for recovery, cycle-related patterns and activity.",
    why: "It goes first because a ring is the easiest thing to wear every day, and it reaches the most people.",
    photo: products.ringFinger,
    detail: products.ringHero,
  },
  {
    id: "mastoid",
    name: "Sevyn8 Mastoid",
    site: "Behind the ear",
    worn: "Behind your ear",
    rhythm: "Day and night",
    status: siteStatus.futureDevices.mastoid,
    domain: "neuro",
    summary: "An ultra-thin, flexible patch worn just behind the ear. Peel, place, and forget it's there.",
    reads: ["Signals from the head that a finger can't reach", "Skin temperature", "Movement and posture"],
    adds: "How your sleep is built and how rested you wake, beyond what any ring can read.",
    why: "It comes next because sleep happens in the head, and a finger only sees part of it.",
    photo: products.patchEar,
    detail: products.patchViews,
  },
  {
    id: "chest-patch",
    name: "Sevyn8 Chest Patch",
    site: "Chest",
    worn: "On your chest",
    rhythm: "Continuous",
    status: siteStatus.futureDevices.chestPatch,
    domain: "cardio",
    summary: "A thin patch worn on the chest, for the most precise read of your heart's rhythm over the day.",
    reads: ["Heart timing", "Breathing rhythm"],
    adds: "More precision for your heart-rate and recovery baseline.",
    why: "It comes later, once the ring and Mastoid are in people's hands, to sharpen the picture.",
    photo: photos.wearChest,
  },
];

export const devicesPage = {
  eyebrow: "The Sevyn8 family",
  title: "Three places on the body. One picture of *you*.",
  intro:
    "Most wearables read one spot on the body and keep the data to themselves. Sevyn8 is building a small family of devices that all feed the same personal baseline, so each one makes the others smarter.",
  platformTitle: "One personal picture behind every device",
  platform: [
    {
      title: "Your baseline, not an average",
      body: "A rolling picture of your own normal, built over weeks. Every device is read against it.",
    },
    {
      title: "Works with what you already have",
      body: "Being built to read Apple Health and Health Connect data too, so the workouts and sleep already on your phone count from day one.",
    },
    {
      title: "Honest by design",
      body: "Every note passes a wellness check before it reaches you. It says what a signal suggests for your day, then stops.",
    },
    {
      title: "Private by default",
      body: "Designed so raw signal stays on your device by default. You decide what leaves it.",
    },
  ],
  orderTitle: "Why this order",
  order:
    "Ring first, because it reaches the most people. Mastoid next, because it adds signals no finger can read. Chest Patch after, for precision.",
  note: "Images are Sevyn8 design renders. Nothing is on sale yet: the ring and Mastoid are coming soon, and Chest Patch is a concept. Product names are working names.",
};

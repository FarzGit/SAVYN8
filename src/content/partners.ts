import type { PartnerGroupKey, PartnerKey } from "@/config/site-status";
import { photos, type PhotoAsset } from "./photos";

export const GROUP_ORDER: PartnerGroupKey[] = ["everyday", "medical", "critical", "covered"];

export const partnerGroupPhotos: Record<PartnerGroupKey, PhotoAsset> = {
  everyday: photos.partnerEveryday,
  medical: photos.partnerMedical,
  critical: photos.partnerCritical,
  covered: photos.partnerCovered,
};

/**
 * Ecosystem copy (brief v3). Categories without a signed partner read as direction,
 * never as a working connection: no logo, no booking button, no city.
 */

export const partnerGroups: Record<
  PartnerGroupKey,
  { title: string; short: string; line: string }
> = {
  everyday: {
    title: "Everyday health",
    short: "Everyday",
    line: "Training, food, sleep and stress support that fits what your body is telling you.",
  },
  medical: {
    title: "Medical",
    short: "Medical",
    line: "A route to doctors, lab tests and pharmacy when you want a professional to take a closer look.",
  },
  critical: {
    title: "When it matters most",
    short: "When it matters",
    line: "Getting help to you, and to the people who look out for you, when you ask for it.",
  },
  covered: {
    title: "Keeping it covered",
    short: "Covered",
    line: "Insurance and travel health that recognise how you look after yourself.",
  },
};

export const partnerCategories: Record<PartnerKey, { name: string; line: string }> = {
  fitness: {
    name: "Fitness",
    line: "Trainers, gyms, physiotherapy, recovery and home programs, matched to how recovered you actually are.",
  },
  food: {
    name: "Food",
    line: "Groceries, meal kits, health-focused restaurants and supplements that fit your week.",
  },
  sleep: {
    name: "Sleep",
    line: "Sleep coaching, sleep clinics and better sleep products when your nights keep coming up short.",
  },
  mentalHealth: {
    name: "Mental health",
    line: "Therapy, counselling and stress coaching for when stress stays high for longer than it should.",
  },
  habits: {
    name: "Habit coaching",
    line: "Help with smoking, drinking and stress habits, built on your real data instead of guesswork.",
  },
  doctors: {
    name: "Doctors",
    line: "Telehealth consultations, specialists and second opinions, with your data ready to share if you choose.",
  },
  labs: {
    name: "Lab tests",
    line: "Lab panels, home sample collection, imaging and full-body checkup packages.",
  },
  pharmacy: {
    name: "Pharmacy",
    line: "Medicine delivery, prescription refills and supplement reorders.",
  },
  womensHealth: {
    name: "Women's health",
    line: "Cycle-related care, fertility support and prenatal care.",
  },
  emergency: {
    name: "Emergency",
    line: "A faster way to reach emergency services, nearby ERs and your emergency contact, when you ask for it.",
  },
  elderCare: {
    name: "Elder care",
    line: "Caregiver connections and elder care services, so family can stay in the loop.",
  },
  insurance: {
    name: "Insurance",
    line: "Wellness-linked discounts tied to your own policy.",
  },
  travelHealth: {
    name: "Travel health",
    line: "Vaccinations and travel medicine before a trip.",
  },
};

export const partnersPage = {
  eyebrow: "Partners & ecosystem",
  title: "From knowing to *doing*.",
  intro:
    "Once something tells you what's happening and what it means, there's a real next step to connect you to. This is the full width of where Sevyn8 is going.",
  honesty:
    "Partnerships go live here as they are signed. Until then, each category shows the direction we're building in, not a service you can book today.",
  whyTitle: "Why this is hard to copy",
  why: "A better score is easy to copy. Acting on the data needs something that can tell what matters out of the noise, plus real, working relationships with the people on the other end: the doctor, the lab, the pharmacy. That takes real work to build.",
  partnerCta: "Interested in partnering with Sevyn8?",
};

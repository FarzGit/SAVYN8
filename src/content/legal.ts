/**
 * Legal copy. claims-lint: this file is allowlisted because the wellness disclaimer
 * must use regulated words ("does not diagnose").
 * TODO(counsel): review all text below before any product goes on sale.
 */
import { site } from "@/config/site";

export const disclaimer =
  "Sevyn8 products are for general wellness. They are not medical devices and do not diagnose, treat, cure or prevent any disease or condition.";

export const reviewNote = "This page will be reviewed by counsel before Sevyn8 products go on sale.";

export const lastUpdated = "10 October 2026";

export interface LegalDoc {
  slug: "privacy" | "terms" | "wellness";
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
}

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    description: "How Sevyn8 handles the information you share through this website.",
    sections: [
      {
        heading: "Who we are",
        body: [
          `${site.legalName} ("Sevyn8", "we") runs this website. This policy covers the website only. The Sevyn8 Ring and companion app will have their own privacy notice, published before launch.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "If you join the waitlist or contact us, we collect your email address and anything you choose to write to us. We also record which page you signed up from so we know what's working.",
          "We do not ask for, and this website does not collect, any health information.",
        ],
      },
      {
        heading: "Analytics and cookies",
        body: [
          "If we use analytics on this site, we use a cookieless, privacy-focused tool that counts visits without identifying you. We do not use advertising pixels or cross-site tracking, and we do not set marketing cookies.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To send you waitlist updates and launch news you asked for, and to reply to your messages. Every email includes a way to unsubscribe.",
          "We never sell your personal information and we don't share it with advertisers.",
        ],
      },
      {
        heading: "Who processes it",
        body: [
          "We use a small number of service providers (for example, email delivery and form handling) who process data only on our instructions.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `You can ask us to see, correct or delete your information at any time by writing to ${site.contactEmail}. We'll respond within 30 days.`,
        ],
      },
      {
        heading: "Changes",
        body: ["If this policy changes in a meaningful way, we'll update the date at the top and tell waitlist members by email."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    description: "The terms that apply when you use the Sevyn8 website.",
    sections: [
      {
        heading: "Using this site",
        body: [
          `This website is operated by ${site.legalName}. By using it you agree to these terms. If you don't agree, please don't use the site.`,
        ],
      },
      {
        heading: "Information on this site",
        body: [
          "Products, features and partner categories described here are under development unless clearly marked as available. Descriptions, images and timing may change before launch.",
          "Images of the ring are illustrative renders unless stated otherwise.",
        ],
      },
      {
        heading: "Not medical advice",
        body: [disclaimer, "Always talk to a qualified professional about any health concern."],
      },
      {
        heading: "Intellectual property",
        body: [
          "The content, design and names on this site belong to Sevyn8 or its licensors. Sevyn8, Mastoid and Chest Patch are working names.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The site is provided as is. To the extent the law allows, Sevyn8 isn't liable for losses arising from your use of it.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms: ${site.contactEmail}.`],
      },
    ],
  },
  {
    slug: "wellness",
    title: "Wellness disclaimer",
    description: "What Sevyn8 products are for, and what they are not for.",
    sections: [
      {
        heading: "General wellness only",
        body: [
          disclaimer,
          "Sevyn8 helps you understand patterns in your sleep, recovery, stress and activity, measured against your own normal, and suggests everyday wellness actions.",
        ],
      },
      {
        heading: "Talk to a professional",
        body: [
          "Sevyn8 is not a substitute for professional care. If you have a health concern, talk to a qualified healthcare professional. In an emergency, call your local emergency number.",
        ],
      },
      {
        heading: "Partner services",
        body: [
          "Where Sevyn8 connects you with a third-party service, that service is provided by the partner under its own terms. Partner categories shown on this site are a direction of travel unless marked as live.",
        ],
      },
    ],
  },
];

export const site = {
  name: "Sevyn8",
  legalName: "Sevyn8, Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sevyn8.com").replace(/\/$/, ""),
  title: "Sevyn8 Ring: a ring that tells you what to do next",
  description:
    "The Sevyn8 Ring learns what's normal for you, tells you in plain words what changed, and points you to a real next step. Not just what your numbers are.",
  /** TODO(client): confirm the public contact address. */
  contactEmail: "hello@sevyn8.com",
  /** Add only real, live profiles. Empty = no social icons rendered. */
  socials: [] as { label: string; href: string }[],
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  locale: "en_US",
};

export const nav = [
  { label: "Ring", href: "/ring/" },
  { label: "Devices", href: "/devices/" },
  { label: "Partners", href: "/partners/" },
  { label: "About", href: "/about/" },
];

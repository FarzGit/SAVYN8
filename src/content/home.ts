/**
 * Homepage copy. Drafts follow the website brief v3 and need client sign-off.
 * `*word*` renders as the accent serif italic (one word per headline at most).
 * Wellness language only: run `pnpm lint:claims` after editing.
 */

export const hero = {
  eyebrow: "The Sevyn8 Ring",
  title: "A ring that tells you what to do *next*.",
  sub: "Not just what your numbers are. The Sevyn8 Ring learns what's normal for you, tells you in plain words what changed, and points you to a real next step.",
  secondary: { label: "See the ring", href: "#ring" },
  /** Stock lifestyle photo (Unsplash, Venti Views). Swap for the brand shoot in /public/hero/. */
  imageAlt: "A woman running along a rocky ridge at sunrise, in silhouette against the sun",
  note: {
    label: "Morning note",
    time: "6:12",
    text: "Your recovery is back to your normal. A good morning for the long run.",
    source: "From your Sevyn8 Ring",
  },
};

/** Three moments of a day, not a numbered framework (brief: no steps, no flowchart). */
export const whatItDoes = {
  eyebrow: "What it does",
  title: "It reads your day. Then it *helps*.",
  tiles: [
    {
      when: "Overnight",
      line: "It notices when your sleep, recovery or stress drift from your normal.",
      photo: "lifeSleep",
    },
    {
      when: "Every morning",
      line: "It tells you what that means in one sentence, not a chart.",
      photo: "ringFinger",
    },
    {
      when: "Through the day",
      line: "Then it helps you do something about it, tonight or tomorrow.",
      photo: "lifeRecovery",
    },
  ] as const,
};

export const ringStory = {
  eyebrow: "The ring",
  name: "The Sevyn8 Ring",
  steps: [
    {
      id: "assembled",
      label: "Worn day and night",
      title: "Nothing to look at. Everything to learn.",
      body: "No screen to check and nothing buzzing for attention. It sits on your finger around the clock and quietly builds a picture of your normal.",
    },
    {
      id: "pulse",
      label: "Optical pulse sensor",
      title: "Reads your pulse from the inside of your finger.",
      body: "Light-based sensing follows your pulse through the day and night. It's the base for how recovered you are.",
    },
    {
      id: "temperature",
      label: "Skin temperature",
      title: "Follows your skin temperature through the night.",
      body: "Small overnight shifts against your own normal feed into how it reads your recovery and your cycle.",
    },
    {
      id: "motion",
      label: "Motion sensor",
      title: "Knows when you're moving and when you're resting.",
      body: "Activity, rest and sleep timing give every other signal its context.",
    },
    {
      id: "together",
      label: "Every morning",
      title: "Then it tells you what to do *today*.",
      body: "One plain sentence and one suggested next step, measured against you rather than an average.",
    },
  ],
  priceNote: "One price for the ring and its companion app. No subscription at launch. Pricing will be announced before launch.",
  detailsLink: { label: "Full details", href: "/ring/" },
};

export const companion = {
  eyebrow: "The companion app",
  title: "Your numbers, finally in *plain* words.",
  intro:
    "The ring collects the signals. The companion app makes sense of them and turns them into something you can act on.",
  points: [
    {
      title: "Learns your normal",
      body: "Weeks of your own data become your baseline, so every change is measured against you, not a population average.",
    },
    {
      title: "One sentence a day",
      body: "Instead of another dashboard, a short note on what changed and why it might matter.",
    },
    {
      title: "One real next step",
      body: "A wind-down time, a lighter training day, a calendar hold, or the right person to talk to.",
    },
    {
      title: "Your data, on your side",
      body: "Designed so raw signal stays on your phone by default. You choose what's shared, and with whom.",
    },
  ],
  statusNote: "The Sevyn8 app is in testing now and arrives with the ring, for iPhone and Android.",
};

export const ecosystem = {
  eyebrow: "Where this goes",
  title: "When it knows what you need, it can get you *there*.",
  intro:
    "A score can only inform you. Sevyn8 is built to connect you with the next step, wherever health takes you.",
  legendLive: "Live today",
  legendDirection: "Coming as partners join",
  link: { label: "See where this is going", href: "/partners/" },
};

export const family = {
  eyebrow: "The Sevyn8 family",
  title: "Starting at the finger. Then the head and the *chest*.",
  intro:
    "Every device feeds one personal picture of you. The ring comes first, with a behind-the-ear patch close behind to read what a finger can't.",
  link: { label: "Meet the devices", href: "/devices/" },
};

export const story = {
  eyebrow: "Why we exist",
  lines: [
    "Every wearable today gives you a number and leaves you there.",
    "We started Sevyn8 to close that *gap*.",
  ],
  link: { label: "Read our story", href: "/about/" },
};

export const waitlistBand = {
  eyebrow: "Early access",
  title: "Be among the first to wear *it*.",
  body: "Join the waitlist for early access and first word on the introductory price. We'll only email you when there's something worth saying.",
};

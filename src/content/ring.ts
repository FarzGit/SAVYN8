/** /ring product page copy. Wellness language only, no comparisons, no competitor names. */
import { disclaimer } from "./legal";

export const ringPage = {
  eyebrow: "Sevyn8 Ring",
  title: "Worn on your finger. Working on your *day*.",
  sub: "A ring that learns what's normal for you and tells you, in plain words, what to do next.",
  /** iPhone-style notifications beside the 3D ring. Illustrative, labelled as examples on the page. */
  notifications: [
    { title: "Morning note", short: "Recovery looks good. A solid day to train.", body: "You slept 22 minutes more than usual and recovery looks good. A solid day to train.", time: "7:12 AM" },
    { title: "Wind-down", short: "Start winding down at 10:15 tonight.", body: "Stress has run higher than usual today. Try starting your wind-down at 10:15 tonight.", time: "now" },
    { title: "Resting pulse", short: "Back in your normal range.", body: "Your resting pulse is back in your normal range after a busy week.", time: "now" },
    { title: "Skin temperature", short: "A little above your normal. Take it easy.", body: "Overnight temperature is a little above your normal. Maybe take it easy today.", time: "now" },
    { title: "Activity", short: "46 active minutes so far today.", body: "46 active minutes so far. A short walk after dinner would round the day off.", time: "now" },
    { title: "Sleep", short: "Bedtime in 30 minutes keeps your rhythm.", body: "Bedtime in 30 minutes keeps you on your rhythm for tomorrow.", time: "now" },
  ] as const,
  moments: [
    {
      photo: "lifeSleep",
      when: "Overnight",
      title: "Sleep",
      body: "Follows your pulse, temperature and stillness through the night, against your own normal.",
    },
    {
      photo: "lifeMorning",
      when: "Morning",
      title: "Your next step",
      body: "One plain sentence on what changed, and one thing to do about it today.",
    },
    {
      photo: "lifeRecovery",
      when: "Day",
      title: "Training and recovery",
      body: "Knows when you've pushed hard and when you're ready to go again.",
    },
  ] as const,
  readsTitle: "What it reads",
  insideParts: ["Outer shell", "Protective layer", "Sensor board", "Battery", "Sensor band", "Inner shell"],
  reads: [
    { title: "Pulse", body: "An optical sensor on the inside of the band follows your pulse day and night." },
    { title: "Skin temperature", short: "A little above your normal. Take it easy.", body: "Overnight temperature, measured against your own normal." },
    { title: "Motion", body: "Activity, rest and sleep timing, for context on everything else." },
  ],
  forTitle: "What it helps with",
  forItems: ["Sleep", "Recovery", "Stress", "Activity", "Cycle-related patterns", "Energy through the day"],
  specsTitle: "Specs",
  specLabels: {
    batteryDays: "Battery",
    waterResistance: "Water resistance",
    material: "Material",
    weight: "Weight",
  },
  specsNote:
    "Battery life, materials, weight and water resistance will be listed here once they're tested on production rings.",
  sizingTitle: "Sizing guide",
  sizingSteps: [
    "Pick the finger you want to wear it on. Most people choose the index or middle finger.",
    "Wrap a thin strip of paper around the base of that finger, snug but comfortable.",
    "Mark where it overlaps, lay it flat and measure the length in millimetres.",
    "Measure later in the day, when fingers are at their largest, and check twice.",
  ],
  sizingNote: "The full size chart will be published with final ring sizes.",
  pricingTitle: "One price. No subscription at launch.",
  pricingBody:
    "One price covers the ring and its companion app together. The introductory price will be announced to the waitlist first.",
};

export const faq = [
  {
    q: "Is the Sevyn8 Ring a medical device?",
    a: `No. The Sevyn8 Ring is a general wellness product that helps you understand your sleep, recovery, stress and activity. ${disclaimer}`,
  },
  {
    q: "When can I get one?",
    a: "The ring isn't on sale yet. Join the waitlist and you'll hear first when it is, along with the introductory price.",
  },
  {
    q: "Will I need a subscription?",
    a: "Not at launch. One price covers the ring and its companion app together.",
  },
  {
    q: "Which phones will it work with?",
    a: "We're building the companion app for iPhone and Android. We'll confirm supported versions before launch.",
  },
  {
    q: "What happens to my data?",
    a: "The system is designed so raw signal stays on your device by default, and you choose what's shared and with whom. We don't sell personal data and we don't use advertising pixels on this site.",
  },
  {
    q: "Where will it ship?",
    a: "We're starting in the United States, sold online only.",
  },
];

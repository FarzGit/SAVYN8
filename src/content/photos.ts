/**
 * Lifestyle photography (Unsplash License: free for commercial use, no attribution required;
 * credits kept here and in the README). These show people and moments, never a product:
 * no Sevyn8 device photos exist yet, and stock smart-ring photos show competitors' rings.
 * Replace with the brand shoot by swapping files in /public/photos/ (same names).
 */
export interface PhotoAsset {
  src: string;
  /** Responsive candidates, e.g. "/a-1280.webp 1280w, /a-1920.webp 1920w" */
  srcSet?: string;
  alt: string;
  credit: string;
  /** CSS object-position for crops */
  focus?: string;
  /** Sevyn8 design render (not a photo of a manufactured unit): pages show a small label */
  render?: boolean;
  /** Transparent background (AI cut-out): shown floating on the dark page */
  cutout?: boolean;
}

/** Stock photos ship in three widths: 1280 / 1920 / 2560 (HD and up). */
const stock = (name: string) => ({
  src: `/photos/${name}-1920.webp`,
  srcSet: [1280, 1920, 2560].map((w) => `/photos/${name}-${w}.webp ${w}w`).join(", "),
});

/** Product renders: AI-upscaled 4x (Real-ESRGAN) from the brand boards, plus a half-size version. */
const render = (name: string, width: number, small = true) => ({
  src: `/products/${name}.webp`,
  srcSet: small ? `/products/${name}-sm.webp ${Math.round(width / 2)}w, /products/${name}.webp ${width}w` : undefined,
});

/** Sevyn8's own product design renders (cropped from the brand boards, no claim text). */
export const products = {
  ringHero: {
    ...render("ring-product", 1076),
    alt: "The Sevyn8 Ring in champagne gold, showing the sensor windows on the inside of the band",
    credit: "Sevyn8 design render",
    render: true,
    cutout: true,
  },
  ringFinger: {
    ...render("ring-finger", 1632),
    alt: "The Sevyn8 Ring worn on a finger, close up",
    credit: "Sevyn8 design render",
    focus: "50% 45%",
    render: true,
  },
  ringInside: {
    ...render("ring-exploded", 2722),
    alt: "Exploded view of the Sevyn8 Ring: outer shell, clear protective layer, sensor board, battery, sensor band and inner shell",
    credit: "Sevyn8 design render",
    render: true,
    cutout: true,
  },
  patchEar: {
    ...render("ear-on", 1348),
    alt: "The Sevyn8 behind-the-ear patch worn just behind a person's ear",
    credit: "Sevyn8 design render",
    focus: "0% 50%",
    render: true,
  },
  patchViews: {
    ...render("ear-views", 1181),
    alt: "The Sevyn8 behind-the-ear patch from the front, side and back, showing its sensor pads",
    credit: "Sevyn8 design render",
    render: true,
    cutout: true,
  },
} satisfies Record<string, PhotoAsset>;

export const photos = {
  lifeSleep: {
    ...stock("life-sleep"),
    alt: "A woman asleep under a heavy blanket in soft evening light",
    credit: "Greg Pappas",
    focus: "35% 40%",
  },
  lifeRecovery: {
    ...stock("life-recovery"),
    alt: "A runner heading down a wet country road at dusk",
    credit: "lucas Favre",
    focus: "50% 45%",
  },
  lifeSwim: {
    ...stock("life-swim"),
    alt: "A swimmer mid-stroke in open water under a dark, cloudy sky",
    credit: "Todd Quackenbush",
    focus: "45% 40%",
  },
  lifeHike: {
    ...stock("life-hike"),
    alt: "A trekker with a backpack and poles looking out over mountains at golden hour",
    credit: "lucas Favre",
    focus: "45% 45%",
  },
  lifeMorning: {
    ...stock("life-morning"),
    alt: "A person stretching their arms up in front of a bright window in the morning",
    credit: "Husam El Haq",
    focus: "50% 40%",
  },
  wearChest: {
    ...stock("wear-chest"),
    alt: "A runner on a misty road at night under green-tinted street lights",
    credit: "Markus Gjengaar",
    focus: "50% 60%",
  },
  partnerEveryday: {
    ...stock("partner-everyday"),
    alt: "Bowls of strawberries, grapes and nuts on a table in warm light",
    credit: "Alef Morais",
  },
  partnerMedical: {
    ...stock("partner-medical"),
    alt: "A doctor talking with a patient across a desk",
    credit: "Vitaly Gariev",
    focus: "40% 50%",
  },
  partnerCritical: {
    ...stock("partner-critical"),
    alt: "Two people holding hands, one reassuring the other",
    credit: "Alex Sheldon",
  },
  partnerCovered: {
    ...stock("partner-covered"),
    alt: "A sunset seen through an aeroplane window",
    credit: "Stephen Mease",
    focus: "30% 50%",
  },
  about: {
    ...stock("about"),
    alt: "A woman watching the sun rise over snowy hills",
    credit: "Mathis Mauprivez",
    focus: "50% 45%",
  },
  waitlist: {
    ...stock("waitlist"),
    alt: "A person in a red hooded jacket watching the sunset from a snowy ridge",
    credit: "Sahil Pandita",
    focus: "40% 50%",
  },
} satisfies Record<string, PhotoAsset>;

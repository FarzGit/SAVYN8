/** Mirrors the CSS tokens in globals.css so canvas / WebGL code uses identical values. */
export const theme = {
  bg: "#0A1A14",
  surface: "#0F2218",
  brand: "#115C48",
  gold: "#CB9738",
  ivory: "#FBFAF6",
  muted: "#7A9A8A",
  cardio: "#DB4F55",
  neuro: "#5F5CD1",
  mind: "#159AAE",
} as const;

export type DomainKind = "cardio" | "neuro" | "mind";

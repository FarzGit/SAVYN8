"use client";

import { useEffect } from "react";

/** Slow parallax on the hero photo and note card. Transform-only, skipped for reduced motion. */
export function HeroParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const photo = document.querySelector<HTMLElement>(".hero-photo");
    const note = document.querySelector<HTMLElement>(".hero-note");
    if (!photo) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      photo.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1 + y / window.innerHeight / 12})`;
      if (note) note.style.translate = `0 ${y * -0.12}px`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}

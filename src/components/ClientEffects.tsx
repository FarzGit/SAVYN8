"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling (Lenis). Skipped for reduced motion; touch keeps native scrolling.
 * Scroll reveals are pure CSS (see [data-reveal] in globals.css).
 */
export function ClientEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -72 } });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

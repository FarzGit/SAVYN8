"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { RingMode, RingSceneApi } from "./ringScene";

/**
 * Lazy-loads the three.js ring only when its stage nears the viewport, so the 3D chunk
 * never competes with first paint. Without WebGL it shows the product render instead.
 */
export function RingCanvas({
  mode,
  progressRef,
  className = "",
  interactive = false,
}: {
  mode: RingMode;
  /** Story mode: a mutable 0..1 value written by the feature tabs. */
  progressRef?: { current: number };
  className?: string;
  /** Drag / arrow keys rotate the ring. */
  interactive?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<RingSceneApi | null>(null);
  const [state, setState] = useState<"idle" | "ready" | "fallback">("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let api: RingSceneApi | null = null;
    let disposed = false;
    let raf = 0;
    let visible = false;

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!hasWebGL || saveData) {
      const id = requestAnimationFrame(() => setState("fallback"));
      return () => cancelAnimationFrame(id);
    }

    const load = async () => {
      try {
        const { createRingScene } = await import("./ringScene");
        if (disposed) return;
        api = createRingScene(canvas, {
          mode,
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          interactive,
        });
        apiRef.current = api;
        api.setActive(visible);
        setState("ready");
        const tick = () => {
          raf = requestAnimationFrame(tick);
          if (progressRef) api?.setProgress(progressRef.current);
        };
        tick();
      } catch {
        setState("fallback");
      }
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      api?.dispose();
      api = null;
      setState("fallback");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    let loading = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !loading) {
          loading = true;
          load();
        }
        api?.setActive(visible);
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => api?.resize());
    ro.observe(wrap);

    const onVis = () => api?.setActive(!document.hidden && visible);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      api?.dispose();
      apiRef.current = null;
    };
  }, [mode, progressRef, interactive]);

  const onKey = (e: KeyboardEvent) => {
    const step = 0.25;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = map[e.key];
    if (!m || !apiRef.current) return;
    e.preventDefault();
    apiRef.current.nudge(m[0], m[1]);
  };

  const a11y = interactive
    ? {
        role: "img",
        "aria-roledescription": "3D model",
        "aria-label": "3D design model of the Sevyn8 Ring. Drag, or use the arrow keys, to rotate it.",
        tabIndex: 0,
        onKeyDown: onKey,
      }
    : { "aria-hidden": true as const };

  return (
    <div ref={wrapRef} className={`${className || "relative"} rounded-[24px] outline-offset-4`} {...a11y}>
      {/* No placeholder while loading (the 3D ring fades in). Only without WebGL: the product render. */}
      {state === "fallback" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/products/ring-product-sm.webp"
          srcSet="/products/ring-product-sm.webp 538w, /products/ring-product.webp 1076w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt="The Sevyn8 Ring"
          className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain"
        />
      )}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${state === "ready" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

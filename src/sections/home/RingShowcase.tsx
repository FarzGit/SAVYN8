"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, PrimaryCta } from "@/components/Button";
import { Rich } from "@/components/Rich";
import { ringStory } from "@/content/home";
import { formatPrice, siteStatus } from "@/config/site-status";
import { RingCanvas } from "@/three/RingCanvas";

const STEPS = ringStory.steps;
const N = STEPS.length;
const STEP_MS = 5200;

/**
 * The ring in one screen (no scroll-jacking). Feature tabs drive the 3D pose: the ring
 * turns to show each sensor. Tabs auto-advance while the section is in view, pause on
 * hover/focus, and never auto-advance for reduced-motion users.
 */
export function RingShowcase() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const el = ref.current;
    const io = el ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 }) : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    progress.current = step / (N - 1);
  }, [step]);

  const auto = inView && !paused && !reduce;
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % N), STEP_MS);
    return () => clearTimeout(id);
  }, [auto, step]);

  const price = siteStatus.ring.priceUsd;
  const current = STEPS[step];

  return (
    <section ref={ref} id="ring" aria-labelledby="ring-title" className="relative z-10 scroll-mt-16 overflow-hidden pb-[clamp(3.5rem,9vh,7rem)] pt-[clamp(2rem,6vh,7rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_30%_50%,rgb(17_92_72/0.28),transparent_70%)]"
      />
      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Heading (first on mobile) */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
          <p className="eyebrow mb-3">{ringStory.eyebrow}</p>
          <h2 id="ring-title" className="h2">
            {ringStory.name}
          </h2>
        </div>

        {/* 3D stage */}
        <div className="relative lg:col-span-7 lg:row-span-2 lg:row-start-1">
          <RingCanvas mode="story" interactive progressRef={progress} className="relative aspect-[6/5] w-full lg:aspect-[7/6]" />
        </div>

        {/* Feature tabs + buy box */}
        <div
          className="lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Phones: compact chip row. Desktop: vertical list with progress lines. */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-0 lg:overflow-visible lg:border-y lg:border-line lg:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Ring features">
            {STEPS.map((s, i) => {
              const active = i === step;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStep(i)}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-left text-[13.5px] transition-colors lg:block lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-4 lg:last:border-b-0 ${
                    active ? "border-ivory/40 text-ivory" : "border-line-strong text-ivory/55 hover:text-ivory/85"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4 lg:text-[17px] lg:font-medium lg:tracking-tight">
                    {s.label}
                    <span className={`hidden font-mono text-[11px] lg:inline ${active ? "text-ivory/70" : "text-muted"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  {/* desktop: expanded copy under the active tab */}
                  <span
                    className={`hidden overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-calm)] lg:grid ${
                      active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-2 block text-[20px] font-medium leading-snug tracking-[-0.015em] text-ivory">
                        <Rich text={s.title} />
                      </span>
                      <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-ivory/60">{s.body}</span>
                    </span>
                  </span>
                  {/* auto-advance progress line */}
                  {active && (
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] hidden h-px overflow-hidden lg:block">
                      <span
                        key={`${step}-${auto}`}
                        className="block h-full origin-left bg-ivory"
                        style={{
                          animation: auto ? `tab-progress ${STEP_MS}ms linear forwards` : "none",
                          transform: auto ? undefined : "scaleX(1)",
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* phones: active copy below the chips */}
          <div aria-live="polite" className="mt-5 min-h-[7.5rem] lg:hidden">
            <h3 className="text-[21px] font-medium leading-snug tracking-tight">
              <Rich text={current.title} />
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ivory/60">{current.body}</p>
          </div>

          <div className="mt-6 lg:mt-8">
            {price != null ? (
              <p className="mb-4 flex items-baseline gap-3">
                <span className="text-[28px] font-medium tracking-tight text-gold">{formatPrice(price)}</span>
                <span className="eyebrow">{siteStatus.ring.priceLabel}</span>
              </p>
            ) : (
              <p className="mb-5 max-w-[46ch] text-[14px] leading-relaxed text-ivory/55">{ringStory.priceNote}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <PrimaryCta />
              <Link
                href={ringStory.detailsLink.href}
                className="group -my-3 inline-flex items-center gap-2 py-3 text-[14.5px] font-medium text-ivory/80 hover:text-ivory"
              >
                {ringStory.detailsLink.label}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

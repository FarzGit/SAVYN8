"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Photo } from "@/components/Photo";
import { TextLink } from "@/components/Button";
import { SectionHeader } from "@/components/Section";
import { ecosystem } from "@/content/home";
import { GROUP_ORDER, partnerCategories, partnerGroupPhotos, partnerGroups } from "@/content/partners";
import { siteStatus, type PartnerGroupKey } from "@/config/site-status";

/** Ecosystem preview (brief: a handful of groups, not a long list; links to /partners). */
export function Ecosystem() {
  const [active, setActive] = useState<PartnerGroupKey>("everyday");
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((a) => GROUP_ORDER[(GROUP_ORDER.indexOf(a) + 1) % GROUP_ORDER.length]);
    }, 3800);
    return () => clearInterval(id);
  }, [inView, paused]);

  const anyLive = siteStatus.partners.some((p) => p.status === "live");

  return (
    <section ref={ref} id="ecosystem" aria-labelledby="eco-title" className="section-y relative z-10 overflow-hidden">
      <div className="container-site">
        <SectionHeader id="eco-title" eyebrow={ecosystem.eyebrow} title={ecosystem.title} intro={ecosystem.intro} />

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-12">
          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-line sm:aspect-[5/4] lg:col-span-6 lg:aspect-[4/5]"
            data-reveal
          >
            {GROUP_ORDER.map((g) => (
              <div
                key={g}
                className={`absolute inset-0 transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-calm)] ${
                  active === g ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              >
                <Photo photo={partnerGroupPhotos[g]} decorative={active !== g} sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
            ))}
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.9)_0%,rgb(10_26_20/0.2)_50%,transparent_75%)]" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4" aria-live="polite">
              <div>
                <p className="eyebrow text-ivory/60">Where this goes</p>
                <p className="mt-1.5 text-[22px] font-medium tracking-tight">{partnerGroups[active].title}</p>
              </div>
              <div className="flex gap-1.5 pb-2" aria-hidden="true">
                {GROUP_ORDER.map((g) => (
                  <span
                    key={g}
                    className={`h-[3px] rounded-full transition-all duration-500 ${active === g ? "w-6 bg-ivory" : "w-3 bg-ivory/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-5 lg:col-start-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <ul className="divide-y divide-line border-y border-line">
              {GROUP_ORDER.map((g, i) => {
                const isActive = active === g;
                const cats = siteStatus.partners.filter((p) => p.group === g);
                return (
                  <li key={g} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                    <button
                      type="button"
                      onClick={() => setActive(g)}
                      onMouseEnter={() => setActive(g)}
                      onFocus={() => setActive(g)}
                      aria-pressed={isActive}
                      className="w-full py-6 text-left"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className={`text-[20px] font-medium tracking-tight transition-colors ${isActive ? "text-ivory" : "text-ivory/55"}`}>
                          {partnerGroups[g].title}
                        </span>
                        <span className="font-mono text-[11px] text-muted">{String(cats.length).padStart(2, "0")}</span>
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-calm)] ${
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-3 block text-[15.5px] leading-relaxed text-ivory/65">{partnerGroups[g].line}</span>
                          <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                            {cats.map((c) => partnerCategories[c.key].name).join(" · ")}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {anyLive && (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand ring-1 ring-ivory" /> {ecosystem.legendLive}
                </span>
              )}
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full border border-muted" /> {ecosystem.legendDirection}
              </span>
            </div>

            <TextLink href={ecosystem.link.href} className="mt-10">
              {ecosystem.link.label}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

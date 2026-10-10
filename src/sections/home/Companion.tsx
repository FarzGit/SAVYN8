import type { CSSProperties } from "react";
import { SectionHeader, StatusNote } from "@/components/Section";
import { companion } from "@/content/home";
import { siteStatus } from "@/config/site-status";
import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";

/**
 * Brief: what the companion does and how it reads the ring's data. Real app screens only
 * once they exist; until then, one plain sentence and no mock UI.
 */
export function Companion() {
  const { ready, appStoreUrl, playStoreUrl } = siteStatus.companion;
  return (
    <section id="companion" aria-labelledby="companion-title" className="section-y relative z-10">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeader id="companion-title" eyebrow={companion.eyebrow} title={companion.title} intro={companion.intro} />
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {companion.points.map((p, i) => (
              <div key={p.title} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <dt className="flex items-center gap-3 font-medium">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </dt>
                <dd className="mt-2 text-[15.5px] leading-relaxed text-ivory/60">{p.body}</dd>
              </div>
            ))}
          </dl>
          {!ready && <StatusNote className="mt-12">{companion.statusNote}</StatusNote>}
          {ready && (appStoreUrl || playStoreUrl) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {appStoreUrl && (
                <a href={appStoreUrl} className="rounded-full border border-line-strong px-5 py-2.5 text-[14px]">
                  Download on the App Store
                </a>
              )}
              {playStoreUrl && (
                <a href={playStoreUrl} className="rounded-full border border-line-strong px-5 py-2.5 text-[14px]">
                  Get it on Google Play
                </a>
              )}
            </div>
          )}
        </div>

        {/* The morning note over a real morning moment. The card is an example, not an app design. */}
        <figure className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-line sm:aspect-[5/4] lg:aspect-[4/5]">
            <Photo photo={photos.lifeMorning} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.92)_0%,rgb(10_26_20/0.35)_45%,transparent_70%)]" />
            <div className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/15 bg-[rgb(10_26_20/0.5)] p-6 backdrop-blur-xl backdrop-saturate-150 sm:inset-x-6 sm:bottom-6 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ivory/70">{companion.example.label}</p>
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-ivory/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-mind" style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }} />
                  07:12
                </span>
              </div>
              <blockquote className="mt-4 text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.35] tracking-[-0.015em]">
                {companion.example.text}
              </blockquote>
              <span className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-white/20 px-4 text-[13.5px] text-ivory/90">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                {companion.example.action}
              </span>
            </div>
          </div>
          <figcaption className="mt-4 text-[12.5px] text-ivory/45">{companion.example.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

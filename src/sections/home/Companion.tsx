import type { CSSProperties } from "react";
import { SectionHeader, StatusNote } from "@/components/Section";
import { companion } from "@/content/home";
import { siteStatus } from "@/config/site-status";
import { AppShowcase } from "@/components/AppScreens";

/**
 * What the companion app does, with the app's key screens shown in iPhone frames.
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

        {/* The Sevyn8 app */}
        <div className="flex items-center lg:col-span-6 lg:col-start-7" data-reveal>
          <AppShowcase />
        </div>
      </div>
    </section>
  );
}

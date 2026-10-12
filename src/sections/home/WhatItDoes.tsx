import type { CSSProperties } from "react";
import { Photo } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { whatItDoes } from "@/content/home";
import { photos, products, type PhotoAsset } from "@/content/photos";

const PHOTOS: Record<(typeof whatItDoes.tiles)[number]["photo"], PhotoAsset> = {
  lifeSleep: photos.lifeSleep,
  ringFinger: products.ringFinger,
  lifeRecovery: photos.lifeRecovery,
};

/**
 * Brief: a few plain lines right under the hero, no diagram, no numbered steps.
 * Three image tiles read at a glance; on phones they become a swipe row so the
 * ring stays one scroll away.
 */
export function WhatItDoes() {
  return (
    <section aria-labelledby="what-title" className="relative z-10 pb-[clamp(3rem,7vh,5rem)] pt-[clamp(3.5rem,8vh,5.5rem)]">
      <div className="container-site">
        <div className="mb-8 flex flex-col justify-between gap-3 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4" data-reveal>
              {whatItDoes.eyebrow}
            </p>
            <h2 id="what-title" className="h2 max-w-2xl" data-reveal style={{ "--reveal-i": 1 } as CSSProperties}>
              <Rich text={whatItDoes.title} />
            </h2>
          </div>
          <p className="hidden max-w-xs text-[15px] text-ivory/55 md:block" data-reveal>
            Measured against you, not an average. Said in plain words.
          </p>
        </div>
      </div>

      {/* Phones: swipe row that bleeds to the edge. Tablet and up: three-up grid. */}
      <ul
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-8 md:mx-auto md:grid md:max-w-[1280px] md:grid-cols-3 md:overflow-visible md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {whatItDoes.tiles.map((t, i) => {
          const photo = PHOTOS[t.photo];
          return (
            <li
              key={t.when}
              className="group relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-[22px] border border-line sm:w-[46%] md:aspect-[4/5] md:w-auto lg:aspect-square"
              data-reveal
              style={{ "--reveal-i": i } as CSSProperties}
            >
              <Photo
                photo={photo}
                sizes="(min-width: 768px) 33vw, 80vw"
                className="transition-transform duration-[1.4s] ease-[var(--ease-calm)] group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.95)_0%,rgb(10_26_20/0.55)_38%,transparent_68%)]"
              />
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[rgb(10_26_20/0.45)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/80 backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-gold" : "bg-ivory/70"}`} />
                  {t.when}
                </p>
                <p className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-snug tracking-[-0.015em]">{t.line}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

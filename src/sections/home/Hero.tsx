import Link from "next/link";
import { PrimaryCta } from "@/components/Button";
import { Rich } from "@/components/Rich";
import { hero } from "@/content/home";
import { HeroParallax } from "./HeroParallax";

/**
 * Full-bleed photo banner. Lifestyle photo (no product shown), text set over the dark
 * foreground, and a glass card with an example of the one-sentence morning note:
 * the product promise, shown rather than described.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden md:min-h-[max(100svh,640px)]"
    >
      {/* Photo */}
      <div className="hero-photo absolute inset-0 -z-20">
        <picture className="block h-full w-full">
          <source media="(max-width: 767px)" type="image/webp" srcSet="/hero/hero-mobile-1290.webp" />
          <source media="(max-width: 767px)" srcSet="/hero/hero-mobile-1290.jpg" />
          <source
            type="image/webp"
            srcSet="/hero/hero-1280.webp 1280w, /hero/hero-1920.webp 1920w, /hero/hero-2560.webp 2560w, /hero/hero-3200.webp 3200w"
            sizes="100vw"
          />
          <img
            src="/hero/hero-1920.jpg"
            alt={hero.imageAlt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[52%_30%] md:object-[50%_45%]"
          />
        </picture>
      </div>

      {/* Tone + legibility: brand tint, left and bottom fades into the page */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/10 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-bg)_0%,rgb(10_26_20/0.92)_22%,rgb(10_26_20/0.35)_52%,transparent_75%)] md:bg-[linear-gradient(to_top,var(--color-bg)_0%,rgb(10_26_20/0.7)_24%,transparent_58%),linear-gradient(to_right,rgb(10_26_20/0.7)_0%,rgb(10_26_20/0.25)_36%,transparent_55%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg/70 to-transparent" />

      <HeroParallax />

      {/* Example note card (desktop) */}
      <figure className="hero-note absolute right-[6%] top-[24%] hidden w-[min(340px,26vw)] lg:block" aria-label={hero.note.caption}>
        <div className="rounded-[22px] border border-white/15 bg-[rgb(10_26_20/0.42)] p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ivory/70">
              <span className="h-1.5 w-1.5 rounded-full bg-mind" style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }} />
              {hero.note.label}
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ivory/55">{hero.note.time}</span>
          </div>
          <p className="mt-4 text-[17px] leading-snug tracking-[-0.01em] text-ivory">{hero.note.text}</p>
          <p className="mt-3 flex items-center gap-2 text-[13px] text-ivory/60">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <ellipse cx="8" cy="8" rx="6" ry="3.6" stroke="currentColor" strokeWidth="1.6" transform="rotate(-18 8 8)" />
            </svg>
            {hero.note.source}
          </p>
        </div>
        <figcaption className="mt-2.5 pl-1 text-[11.5px] text-ivory/45">{hero.note.caption}</figcaption>
      </figure>

      {/* Copy */}
      <div className="container-site relative flex flex-1 flex-col justify-end pb-14 pt-28 md:pb-[12vh]">
        <div className="hero-in max-w-[44rem]">
          <p className="eyebrow mb-5 text-ivory/75">{hero.eyebrow}</p>
          <h1 id="hero-title" className="h1">
            <Rich text={hero.title} />
          </h1>
          <p className="lede mt-6 max-w-[42ch] text-ivory/80">{hero.sub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <PrimaryCta size="lg" />
            <Link
              href={hero.secondary.href}
              className="group -my-3 inline-flex items-center gap-2 py-3 text-[15px] font-medium text-ivory/85 transition-colors hover:text-ivory"
            >
              {hero.secondary.label}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" fill="none" aria-hidden="true">
                <path d="M8 3v9.5M4 8.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

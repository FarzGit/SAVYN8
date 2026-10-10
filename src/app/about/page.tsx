import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { TextLink } from "@/components/Button";
import { plain } from "@/components/Rich";
import { SectionHeader, StatusNote } from "@/components/Section";
import { about } from "@/content/about";
import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";
import { WaitlistBand } from "@/sections/home/Story";

export const metadata: Metadata = {
  title: "About",
  description: plain(about.why[0]) + " Sevyn8 is built to close that gap.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/", title: "About Sevyn8", description: about.why[2] , images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 md:pt-40">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
        <div className="container-site pb-16">
          <SectionHeader as="h1" eyebrow={about.eyebrow} title={about.title} className="max-w-4xl" />
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            <div className="space-y-6 md:col-span-7 md:col-start-6">
              {about.why.map((p, i) => (
                <p
                  key={i}
                  className={i === 2 ? "text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug text-ivory" : "lede"}
                  data-reveal
                  style={{ "--reveal-i": i } as CSSProperties}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <figure className="relative h-[62svh] min-h-[380px] overflow-hidden md:h-[78svh]">
        <Photo photo={photos.about} />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,transparent_22%,transparent_60%,var(--color-bg)_100%)]" />
        <figcaption className="container-site absolute inset-x-0 bottom-[12%]">
          <p className="max-w-xl text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.025em]" data-reveal>
            Not another number. A <em className="accent">next</em> step.
          </p>
        </figcaption>
      </figure>

      <section aria-labelledby="different-title">
        <div className="container-site py-20 md:py-28">
          <h2 id="different-title" className="eyebrow mb-10">
            {about.differentTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {about.different.map((d, i) => (
              <article key={d.title} className="panel p-8 md:p-10" data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <h3 className="h3">{d.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-ivory/65">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="principles-title" className="h2" data-reveal>
              {about.principlesTitle}
            </h2>
            <p className="eyebrow" data-reveal>
              {about.voice}
            </p>
          </div>
          <ol className="mt-14 divide-y divide-line border-y border-line">
            {about.principles.map((p, i) => (
              <li key={p.title} className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline" data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <span className="font-mono text-[11px] text-muted md:col-span-1">0{i + 1}</span>
                <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-medium tracking-tight md:col-span-5">{p.title}</h3>
                <p className="text-[16px] text-ivory/65 md:col-span-6">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="privacy-title" className="pb-24">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <h2 id="privacy-title" className="h3 md:col-span-4">
            {about.privacyTitle}
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <p className="lede">{about.privacy}</p>
            <StatusNote className="mt-10">{about.founderNote}</StatusNote>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <TextLink href="/devices/">Meet the devices</TextLink>
              <TextLink href="/partners/">Where this is going</TextLink>
            </div>
          </div>
        </div>
      </section>

      <WaitlistBand source="about-page" />
    </>
  );
}

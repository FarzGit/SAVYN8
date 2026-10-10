import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { plain } from "@/components/Rich";
import { SectionHeader, StatusNote } from "@/components/Section";
import { site } from "@/config/site";
import { siteStatus } from "@/config/site-status";
import { theme } from "@/config/theme";
import { GROUP_ORDER, partnerCategories, partnerGroupPhotos, partnerGroups, partnersPage } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners & ecosystem",
  description: plain(partnersPage.intro),
  alternates: { canonical: "/partners/" },
  openGraph: { url: "/partners/", title: "Sevyn8 partners & ecosystem", description: partnersPage.intro , images: ["/og.png"] },
};

export default function PartnersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 md:pt-40">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
        <div className="container-site grid items-center gap-12 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader as="h1" eyebrow={partnersPage.eyebrow} title={partnersPage.title} intro={partnersPage.intro} />
            <StatusNote className="mt-8 max-w-[56ch]">{partnersPage.honesty}</StatusNote>
          </div>
          <ul className="grid w-full grid-cols-2 gap-3 lg:col-span-6" data-reveal>
            {GROUP_ORDER.map((g, i) => (
              <li key={g} className={i % 2 ? "translate-y-8" : ""}>
                <a href={`#${g}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] border border-line">
                  <Photo
                    photo={partnerGroupPhotos[g]}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    decorative
                    priority={i < 2}
                    className="transition-transform duration-[1.2s] ease-[var(--ease-calm)] group-hover:scale-[1.05]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.9),transparent_60%)]" />
                  <span className="absolute inset-x-4 bottom-4 text-[16px] font-medium leading-tight tracking-tight sm:text-[18px]">
                    {partnerGroups[g].title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Partner categories" className="container-site pb-10">
        {GROUP_ORDER.map((g, gi) => {
          const cats = siteStatus.partners.filter((p) => p.group === g);
          return (
            <div key={g} id={g} className="grid scroll-mt-24 gap-8 border-t border-line py-14 md:grid-cols-12 md:py-20">
              <header className="md:col-span-4" data-reveal>
                <span className="font-mono text-[11px] text-muted">0{gi + 1}</span>
                <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-tight tracking-tight">{partnerGroups[g].title}</h2>
                <p className="mt-4 max-w-[38ch] text-[15.5px] leading-relaxed text-ivory/60">{partnerGroups[g].line}</p>
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[18px] border border-line">
                  <Photo photo={partnerGroupPhotos[g]} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
              </header>
              <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
                {cats.map((c, i) => {
                  const cat = partnerCategories[c.key];
                  const live = c.status === "live" && c.partner;
                  const mind = c.key === "mentalHealth" || c.key === "habits";
                  return (
                    <li
                      key={c.key}
                      className="panel flex flex-col p-6"
                      data-reveal
                      style={{ "--reveal-i": i } as CSSProperties}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[19px] font-medium tracking-tight">{cat.name}</h3>
                        <span
                          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${
                            live ? "border-ivory/30 text-ivory" : "border-line-strong text-muted"
                          }`}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={
                              live
                                ? { background: theme.ivory }
                                : { border: `1px solid ${mind ? theme.mind : theme.muted}` }
                            }
                          />
                          {live ? "Live" : "Direction"}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ivory/60">{cat.line}</p>
                      {live && c.partner && (
                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.partner.logo} alt={c.partner.name} className="h-6 w-auto" />
                          <span className="text-[13px] text-ivory/55">{c.partner.regions.join(", ")}</span>
                          <a href={c.partner.bookingUrl} target="_blank" rel="noopener" className="text-[14px] font-medium underline underline-offset-4">
                            Book
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <section aria-labelledby="why-title" className="section-y border-t border-line">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <h2 id="why-title" className="h2 md:col-span-5" data-reveal>
            {partnersPage.whyTitle}
          </h2>
          <div className="md:col-span-6 md:col-start-7" data-reveal>
            <p className="lede">{partnersPage.why}</p>
            <div className="mt-10 panel flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">{partnersPage.partnerCta}</p>
              <ButtonLink
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Partnering with Sevyn8")}`}
                variant="secondary"
                size="sm"
              >
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

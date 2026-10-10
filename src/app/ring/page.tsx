import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PrimaryCta } from "@/components/Button";
import { Rich, plain } from "@/components/Rich";
import { SectionHeader, StatusNote } from "@/components/Section";
import { site } from "@/config/site";
import { formatPrice, siteStatus } from "@/config/site-status";
import { faq, ringPage } from "@/content/ring";
import { ringStory } from "@/content/home";
import { StatusChip } from "@/sections/home/Family";
import { WaitlistBand } from "@/sections/home/Story";
import { Photo, RenderTag } from "@/components/Photo";
import { RingCanvas } from "@/three/RingCanvas";
import { NotificationStack } from "@/components/NotificationStack";
import { photos, products, type PhotoAsset } from "@/content/photos";

export const metadata: Metadata = {
  title: "The Sevyn8 Ring",
  description: plain(ringPage.sub) + " Pulse, skin temperature and motion, measured against your own normal.",
  alternates: { canonical: "/ring/" },
  openGraph: { url: "/ring/", title: "The Sevyn8 Ring", description: ringPage.sub , images: ["/og.png"] },
};

const SPEC_KEYS = ["batteryDays", "waterResistance", "material", "weight"] as const;

export default function RingPage() {
  const { priceUsd, priceLabel, photos: photosOfRing, sizes, validatedClaims, saleMode } = siteStatus.ring;
  const specs = SPEC_KEYS.filter((k) => validatedClaims[k]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const productLd =
    priceUsd != null && saleMode !== "waitlist"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Sevyn8 Ring",
          brand: { "@type": "Brand", name: site.name },
          description: ringPage.sub,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: priceUsd,
            availability: saleMode === "buy" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            url: `${site.url}/ring/`,
          },
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {productLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />}

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 md:pt-32">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
        <div className="container-site grid items-center gap-10 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="hero-in lg:col-span-6">
            <div className="mb-6 flex items-center gap-3">
              <p className="eyebrow">{ringPage.eyebrow}</p>
              <StatusChip status={saleMode === "buy" ? "available" : "first"} />
            </div>
            <h1 className="h1 !text-[clamp(2.3rem,4.4vw,4.1rem)]">
              <Rich text={ringPage.title} />
            </h1>
            <p className="lede mt-6 max-w-[44ch] !text-[clamp(1rem,1.2vw,1.15rem)]">{ringPage.sub}</p>
            <div className="mt-10 border-t border-line pt-7">
              {priceUsd != null ? (
                <p className="mb-5 flex items-baseline gap-3">
                  <span className="text-[34px] font-medium tracking-tight text-gold">{formatPrice(priceUsd)}</span>
                  <span className="eyebrow">{priceLabel}</span>
                </p>
              ) : (
                <p className="mb-6 max-w-[46ch] text-[15px] text-ivory/60">{ringStory.priceNote}</p>
              )}
              {sizes.length > 0 && (
                <fieldset className="mb-6">
                  <legend className="eyebrow mb-3">Size (US)</legend>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                      <label key={s} className="cursor-pointer">
                        <input type="radio" name="size" value={s} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="inline-flex h-10 w-11 items-center justify-center rounded-full border border-line-strong text-[14px] peer-checked:border-ivory peer-checked:bg-ivory peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-ivory">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              <PrimaryCta size="lg" />
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(210_174_134/0.22),rgb(17_92_72/0.18)_55%,transparent)] blur-2xl"
            />
            <div className="relative">
              <RingCanvas mode="showcase" interactive className="relative aspect-square w-full" />
              <NotificationStack visible={2} compact className="!absolute right-0 top-0 z-10 hidden w-[min(270px,46%)] md:block" />
            </div>
            <div className="mt-1 flex items-center justify-between gap-4">
              <p className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] text-ivory/60">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M4 12a8 8 0 0 1 14.5-4.6M20 12a8 8 0 0 1-14.5 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M18.5 3.5v4h-4M5.5 20.5v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Drag to rotate
              </p>
              <span className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/40">
                3D design model · {ringPage.notificationsNote.toLowerCase()}
              </span>
            </div>
            <NotificationStack compact className="mt-5 md:hidden" />
          </div>
        </div>
      </section>

      {/* On the hand (design renders) */}
      <section aria-labelledby="onhand-title" className="container-site pb-20 md:pb-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="onhand-title" className="h2 max-w-xl" data-reveal>
            Made to <em className="accent">disappear</em> on your hand.
          </h2>
          <p className="max-w-sm text-[15.5px] text-ivory/60" data-reveal>
            A slim band with nothing to look at, so you can wear it day and night without thinking about it.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
          <figure className="relative aspect-square overflow-hidden rounded-[22px] border border-line md:col-span-7 md:row-span-2 md:aspect-auto" data-reveal>
            <Photo photo={products.ringFinger} sizes="(min-width: 768px) 58vw, 100vw" />
            <RenderTag className="absolute bottom-4 right-4" />
          </figure>
          {[
            { photo: photos.lifeSwim, label: "Swim days", line: "Every session, read against your own normal." },
            { photo: photos.lifeHike, label: "On the trail", line: "Long days out, and how well you bounce back." },
          ].map((t: { photo: PhotoAsset; label: string; line: string }, i) =>  (
            <figure
              key={t.label}
              className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-line md:col-span-5 md:aspect-auto md:min-h-[260px]"
              data-reveal
              style={{ "--reveal-i": i + 1 } as CSSProperties}
            >
              <Photo photo={t.photo} sizes="(min-width: 768px) 42vw, 100vw" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.85),transparent_55%)]" />
              <figcaption className="absolute bottom-5 left-5">
                <p className="eyebrow text-ivory/60">{t.label}</p>
                <p className="mt-1.5 text-[17px] font-medium tracking-tight">{t.line}</p>
              </figcaption>
              {t.photo.render && <RenderTag className="absolute right-4 top-4" />}
            </figure>
          ))}
        </div>
      </section>

      {/* Moments (lifestyle photography) + product photos once they exist */}
      <section aria-labelledby="moments-title" className="container-site">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="moments-title" className="h2 max-w-xl" data-reveal>
            Made for your <em className="accent">whole</em> day.
          </h2>
          <p className="max-w-sm text-[15.5px] text-ivory/60" data-reveal>
            Night and day, it keeps learning. Every morning, it turns what it noticed into one next step.
          </p>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {ringPage.moments.map((m, i) => (
            <li
              key={m.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line md:aspect-[3/4]"
              data-reveal
              style={{ "--reveal-i": i } as CSSProperties}
            >
              <Photo
                photo={photos[m.photo]}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="transition-transform duration-[1.2s] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.92),transparent_55%)]" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="eyebrow text-ivory/60">{m.when}</p>
                <h3 className="mt-2 text-[22px] font-medium tracking-tight">{m.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ivory/70">{m.body}</p>
              </div>
            </li>
          ))}
        </ul>
        {photosOfRing.length ? (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photosOfRing.map((p) => (
              <li key={p.src} className="overflow-hidden rounded-[20px] border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </li>
            ))}
          </ul>
        ) : (
          <StatusNote className="mt-6">{ringPage.photosNote}</StatusNote>
        )}
      </section>

      {/* What it reads */}
      <section aria-labelledby="reads-title" className="section-y">
        <div className="container-site">
          <SectionHeader id="reads-title" eyebrow="Sensors" title={ringPage.readsTitle} />
          <figure className="relative mt-10 md:mt-14" data-reveal>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[4%] bottom-[18%] top-[2%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(210_174_134/0.16),rgb(17_92_72/0.16)_55%,transparent)] blur-2xl"
            />
            <div className="relative aspect-[2722/799] w-full">
              <Photo photo={products.ringInside} className="!object-contain" sizes="(min-width: 1280px) 1216px, 100vw" />
            </div>
            {/* soft floor reflection: a mirrored, faded copy */}
            <div
              aria-hidden="true"
              className="relative aspect-[2722/220] w-full overflow-hidden opacity-[0.14] [mask-image:linear-gradient(to_bottom,black,transparent)]"
            >
              <div className="absolute inset-x-0 top-0 aspect-[2722/799] w-full -scale-y-100">
                <Photo photo={products.ringInside} decorative className="!object-contain" sizes="(min-width: 1280px) 1216px, 100vw" />
              </div>
            </div>
            <ol className="mt-2 hidden grid-cols-6 gap-4 border-t border-line pt-5 md:grid">
              {ringPage.insideParts.map((part, i) => (
                <li key={part} className="text-center">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-[14px] text-ivory/80">{part}</span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-ivory/50 md:mt-6">
              <span className="md:hidden">Inside the ring: {ringPage.insideParts.join(", ").toLowerCase()}.</span>
              <span className="hidden md:inline">Inside the ring, from the outside in.</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/40">Design render · final components to be confirmed</span>
            </figcaption>
          </figure>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {ringPage.reads.map((r, i) => (
              <li key={r.title} className="panel p-7" data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <h3 className="mt-8 text-[22px] font-medium tracking-tight">{r.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ivory/60">{r.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14" data-reveal>
            <h3 className="eyebrow mb-5">{ringPage.forTitle}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {ringPage.forItems.map((f) => (
                <li key={f} className="rounded-full border border-line-strong px-4 py-2 text-[14.5px] text-ivory/85">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specs + sizing */}
      <section aria-label="Specs and sizing" className="border-y border-line">
        <div className="container-site grid gap-16 py-20 md:grid-cols-2 md:py-28">
          <div data-reveal>
            <h2 className="h3 mb-8">{ringPage.specsTitle}</h2>
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex justify-between gap-6 py-4 text-[15.5px]">
                <dt className="text-ivory/55">Sensors</dt>
                <dd className="text-right">Optical pulse, skin temperature, motion</dd>
              </div>
              <div className="flex justify-between gap-6 py-4 text-[15.5px]">
                <dt className="text-ivory/55">Companion app</dt>
                <dd className="text-right">iPhone and Android (in development)</dd>
              </div>
              {specs.map((k) => (
                <div key={k} className="flex justify-between gap-6 py-4 text-[15.5px]">
                  <dt className="text-ivory/55">{ringPage.specLabels[k]}</dt>
                  <dd className="text-right">{validatedClaims[k]}</dd>
                </div>
              ))}
            </dl>
            {specs.length < SPEC_KEYS.length && <StatusNote className="mt-6">{ringPage.specsNote}</StatusNote>}
          </div>

          <div id="sizing" data-reveal style={{ "--reveal-i": 1 } as CSSProperties}>
            <h2 className="h3 mb-8">{ringPage.sizingTitle}</h2>
            <ol className="space-y-5">
              {ringPage.sizingSteps.map((s, i) => (
                <li key={i} className="flex gap-4 text-[15.5px] leading-relaxed text-ivory/75">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-ivory/70">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            {sizes.length === 0 && <StatusNote className="mt-8">{ringPage.sizingNote}</StatusNote>}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section aria-labelledby="pricing-title" className="section-y">
        <div className="container-site max-w-3xl text-center">
          <p className="eyebrow mb-5" data-reveal>
            Pricing
          </p>
          <h2 id="pricing-title" className="h2" data-reveal>
            {ringPage.pricingTitle}
          </h2>
          <p className="lede mx-auto mt-6 max-w-[52ch]" data-reveal>
            {ringPage.pricingBody}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-24 md:pb-32">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <h2 id="faq-title" className="h2 md:col-span-4">
            Questions
          </h2>
          <div className="md:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-line py-1 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-ivory after:absolute after:left-1/2 after:top-0 after:h-3 after:w-px after:bg-ivory after:transition-transform group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-[62ch] pb-6 text-[15.5px] leading-relaxed text-ivory/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <WaitlistBand source="ring-page" />
    </>
  );
}

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PrimaryCta, TextLink } from "@/components/Button";
import { DeviceGlyph } from "@/components/DeviceGlyph";
import { Photo } from "@/components/Photo";
import { plain } from "@/components/Rich";
import { SectionHeader } from "@/components/Section";
import { siteStatus } from "@/config/site-status";
import { theme } from "@/config/theme";
import { devices, devicesPage } from "@/content/devices";
import { StatusChip } from "@/sections/home/Family";

export const metadata: Metadata = {
  title: "The Sevyn8 family",
  description: plain(devicesPage.intro),
  alternates: { canonical: "/devices/" },
  openGraph: { url: "/devices/", title: "The Sevyn8 family", description: devicesPage.intro , images: ["/og.png"] },
};

export default function DevicesPage() {
  const list = siteStatus.futureDevices.show ? devices : devices.filter((d) => d.id === "ring");
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 md:pt-40">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
        <div className="container-site pb-10">
          <SectionHeader as="h1" eyebrow={devicesPage.eyebrow} title={devicesPage.title} intro={devicesPage.intro} />
        </div>
      </section>

      <section aria-label="Devices" className="container-site space-y-4 pb-10">
        {list.map((d, i) => {
          const accent = d.domain ? theme[d.domain] : theme.ivory;
          return (
            <article
              key={d.id}
              id={d.id}
              aria-labelledby={`${d.id}-title`}
              className="panel relative grid scroll-mt-24 overflow-hidden md:grid-cols-12"
              data-reveal
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line md:col-span-5 md:aspect-auto md:min-h-[460px] md:border-b-0 md:border-r">
                <Photo photo={d.photo} sizes="(min-width: 768px) 42vw, 100vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.85),transparent_55%)]" />
                <span className="absolute left-6 top-6 rounded-full bg-[rgb(10_26_20/0.55)] px-3 py-1 font-mono text-[11px] text-ivory/80 backdrop-blur-md">
                  Phase {i + 1}
                </span>
                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                  <span className="flex h-11 w-14 items-center justify-center rounded-xl border border-white/15 bg-[rgb(10_26_20/0.55)] backdrop-blur-md">
                    <DeviceGlyph id={d.id} className="h-8 w-auto" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/85">{d.worn}</span>
                </div>
              </div>
              <div className="relative p-7 md:col-span-7 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusChip status={d.status} domain={d.domain ? theme[d.domain] : null} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {d.site} · {d.rhythm}
                  </span>
                </div>
                <h2 id={`${d.id}-title`} className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight tracking-tight">
                  {d.name}
                </h2>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ivory/70">{d.summary}</p>
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow mb-3">Reads</dt>
                    <dd>
                      <ul className="space-y-2 text-[15.5px] text-ivory/80">
                        {d.reads.map((r) => (
                          <li key={r} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-3">Adds to your picture</dt>
                    <dd className="text-[15.5px] leading-relaxed text-ivory/80">{d.adds}</dd>
                  </div>
                </dl>
                {d.detail && (
                  <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-[radial-gradient(60%_70%_at_50%_45%,rgb(210_174_134/0.14),transparent_70%)]">
                    <Photo photo={d.detail} className="!object-contain p-4 sm:p-6" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                )}
                <p className="mt-8 border-t border-line pt-6 text-[14.5px] leading-relaxed text-ivory/55">{d.why}</p>
                {d.id === "ring" && (
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <PrimaryCta />
                    <TextLink href="/ring/">Ring details</TextLink>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section aria-labelledby="platform-title" className="section-y">
        <div className="container-site">
          <header className="max-w-3xl">
            <p className="eyebrow mb-5" data-reveal>
              Behind every device
            </p>
            <h2 id="platform-title" className="h2" data-reveal>
              {devicesPage.platformTitle}
            </h2>
          </header>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {devicesPage.platform.map((p, i) => (
              <li key={p.title} className="bg-bg p-8 md:p-10" data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <h3 className="mt-6 text-[20px] font-medium tracking-tight">{p.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ivory/60">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid gap-6 md:grid-cols-12">
            <h2 className="h3 md:col-span-4">{devicesPage.orderTitle}</h2>
            <p className="lede md:col-span-8">{devicesPage.order}</p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { CSSProperties } from "react";
import { TextLink } from "@/components/Button";
import { DeviceGlyph } from "@/components/DeviceGlyph";
import { Photo, RenderTag } from "@/components/Photo";
import { SectionHeader, StatusNote } from "@/components/Section";
import { family } from "@/content/home";
import { devices, statusLabel } from "@/content/devices";
import { siteStatus } from "@/config/site-status";
import { theme } from "@/config/theme";

export function StatusChip({ status, domain }: { status: keyof typeof statusLabel; domain?: string | null }) {
  const live = status === "available" || status === "first" || status === "soon";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${
        live ? "border-ivory/30 text-ivory" : "border-line-strong text-muted"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: live ? theme.ivory : "transparent", border: live ? "none" : `1px solid ${domain || theme.muted}` }}
      />
      {statusLabel[status]}
    </span>
  );
}

/** The full device family from the deck, honestly labelled. Toggle with siteStatus.futureDevices.show. */
export function Family() {
  const list = siteStatus.futureDevices.show ? devices : devices.filter((d) => d.id === "ring");
  if (list.length < 2) return null;
  return (
    <section aria-labelledby="family-title" className="section-y relative z-10">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader id="family-title" eyebrow={family.eyebrow} title={family.title} intro={family.intro} />
          <TextLink href={family.link.href} className="shrink-0">
            {family.link.label}
          </TextLink>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {list.map((d, i) => (
            <li
              key={d.id}
              data-reveal
              style={{ "--reveal-i": i } as CSSProperties}
              className="panel group relative flex flex-col overflow-hidden transition-colors duration-500 hover:border-line-strong"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  photo={d.photo}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="transition-transform duration-[1.2s] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.85),transparent_55%)]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-ivory/70">0{i + 1}</span>
                  <span className="rounded-full bg-[rgb(10_26_20/0.55)] backdrop-blur-md">
                    <StatusChip status={d.status} domain={d.domain ? theme[d.domain] : null} />
                  </span>
                </div>
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <span className="flex h-10 w-12 items-center justify-center rounded-xl border border-white/15 bg-[rgb(10_26_20/0.55)] backdrop-blur-md">
                    <DeviceGlyph id={d.id} className="h-7 w-auto" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/80">
                    {d.worn}
                  </span>
                </div>
                {d.photo.render && <RenderTag className="absolute bottom-[1.35rem] right-5" />}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-[22px] font-medium tracking-tight">{d.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{d.rhythm}</p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ivory/65">{d.summary}</p>
              </div>
            </li>
          ))}
        </ul>
        <StatusNote className="mt-8">{family.note}</StatusNote>
      </div>
    </section>
  );
}

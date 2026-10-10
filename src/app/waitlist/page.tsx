import type { Metadata } from "next";
import { Rich } from "@/components/Rich";
import { WaitlistForm } from "@/components/WaitlistForm";
import { waitlistBand } from "@/content/home";
import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: waitlistBand.body,
  alternates: { canonical: "/waitlist/" },
  openGraph: { url: "/waitlist/", title: "Join the Sevyn8 waitlist", description: waitlistBand.body , images: ["/og.png"] },
};

const perks = [
  "First access when the Sevyn8 Ring goes on sale",
  "First word on the introductory price",
  "A rare email when there's real news, nothing more",
];

export default function WaitlistPage() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div className="absolute inset-0 -z-20">
        <Photo photo={photos.waitlist} priority decorative />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_55%,rgb(10_26_20/0.78),rgb(10_26_20/0.4)_75%,rgb(10_26_20/0.6))]" />
      <div className="container-site">
        <div className="hero-in mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">{waitlistBand.eyebrow}</p>
          <h1 className="h1 text-[clamp(2.4rem,5.4vw,4.5rem)]">
            <Rich text={waitlistBand.title} />
          </h1>
          <p className="lede mx-auto mt-6 max-w-[46ch]">{waitlistBand.body}</p>
          <WaitlistForm source="waitlist-page" className="mx-auto mt-10 max-w-lg text-left" />
          <ul className="mx-auto mt-12 grid max-w-lg gap-3 text-left">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-ivory/70">
                <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-muted" fill="none" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

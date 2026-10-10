import type { Metadata } from "next";
import { Arrow } from "@/components/Button";
import { SectionHeader } from "@/components/Section";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sevyn8 about the ring, partnerships or press.",
  alternates: { canonical: "/contact/" },
};

const topics = [
  { title: "General questions", body: "About the ring, the waitlist or anything else.", subject: "Hello Sevyn8" },
  { title: "Partnerships", body: "Fitness, food, care, labs, pharmacy, insurance and more.", subject: "Partnering with Sevyn8" },
  { title: "Press", body: "Interviews, assets and announcements.", subject: "Press enquiry" },
  { title: "Investors", body: "Introductions and conversations.", subject: "Investor enquiry" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
      <div className="container-site">
        <SectionHeader as="h1" eyebrow="Contact" title="Let's *talk*." intro={`Write to us at ${site.contactEmail}. A real person reads every message.`} />
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <div className="relative hidden overflow-hidden rounded-[20px] border border-line lg:col-span-5 lg:block">
          <Photo photo={photos.lifeRecovery} decorative sizes="40vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_26_20/0.6),transparent_50%)]" />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {topics.map((t) => (
            <li key={t.title}>
              <a
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(t.subject)}`}
                className="panel group flex h-full flex-col p-7 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center justify-between text-[20px] font-medium tracking-tight">
                  {t.title}
                  <Arrow className="h-4 w-4 text-muted group-hover:text-ivory" />
                </span>
                <span className="mt-3 text-[15px] text-ivory/60">{t.body}</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

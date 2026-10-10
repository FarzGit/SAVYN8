import type { CSSProperties } from "react";
import { TextLink } from "@/components/Button";
import { Rich } from "@/components/Rich";
import { WaitlistForm } from "@/components/WaitlistForm";
import { story, waitlistBand } from "@/content/home";

export function Story() {
  return (
    <section aria-labelledby="story-title" className="section-y relative z-10">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-8" data-reveal>
            {story.eyebrow}
          </p>
          <h2 id="story-title" className="h2 text-ivory">
            {story.lines.map((l, i) => (
              <span key={i} className={`block ${i === 0 ? "text-ivory/55" : ""}`} data-reveal style={{ "--reveal-i": i + 1 } as CSSProperties}>
                <Rich text={l} />
              </span>
            ))}
          </h2>
          <div className="mt-10 flex justify-center" data-reveal style={{ "--reveal-i": 3 } as CSSProperties}>
            <TextLink href={story.link.href}>{story.link.label}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WaitlistBand({ source = "home-band" }: { source?: string }) {
  return (
    <section aria-labelledby="waitlist-title" className="relative z-10 pb-24 md:pb-32">
      <div className="container-site">
        <div className="panel glow-brand relative overflow-hidden px-6 py-14 text-center sm:px-12 md:py-20">
          <p className="eyebrow mb-5">{waitlistBand.eyebrow}</p>
          <h2 id="waitlist-title" className="h2 mx-auto max-w-2xl">
            <Rich text={waitlistBand.title} />
          </h2>
          <p className="lede mx-auto mt-5 max-w-[48ch]">{waitlistBand.body}</p>
          <WaitlistForm source={source} className="mx-auto mt-10 max-w-lg text-left" />
        </div>
      </div>
    </section>
  );
}

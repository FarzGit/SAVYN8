"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { site } from "@/config/site";

type State = "idle" | "sending" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist sign-up for a static site. Posts JSON to NEXT_PUBLIC_WAITLIST_ENDPOINT
 * (Formspree, Basin, a serverless function...). Without an endpoint it falls back
 * to a pre-filled email so no sign-up is ever silently lost.
 */
export function WaitlistForm({ source, className = "" }: { source: string; className?: string }) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (String(data.get("website") || "")) return; // honeypot: bots fill hidden fields
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      setState("error");
      return;
    }

    if (!site.waitlistEndpoint) {
      const subject = encodeURIComponent("Sevyn8 waitlist");
      const body = encodeURIComponent(`Please add me to the Sevyn8 waitlist.\n\nEmail: ${email}\nSource: ${source}`);
      window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
      setState("done");
      return;
    }

    setState("sending");
    setError("");
    try {
      const res = await fetch(site.waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source, website: "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("done");
      (window as unknown as { plausible?: (e: string, o?: object) => void }).plausible?.("Waitlist", {
        props: { source },
      });
    } catch {
      setError(`Something went wrong. Please try again, or email us at ${site.contactEmail}.`);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className={`panel flex items-start gap-4 p-5 text-left ${className}`}>
        <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="font-medium">You&apos;re on the list.</p>
          <p className="mt-1 text-[15px] text-ivory/65">
            {site.waitlistEndpoint
              ? "We'll be in touch when there's something worth saying."
              : "Your email app should open with your sign-up ready to send."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`relative ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-error ${id}-help` : `${id}-help`}
          className="h-12 min-w-0 flex-1 rounded-full border border-line-strong bg-ivory/[0.03] px-5 text-[16px] text-ivory transition-colors placeholder:text-ivory/35 focus:border-ivory/50 focus:outline-none"
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-12 items-center justify-center rounded-full border border-[rgb(251_250_246/0.14)] bg-brand px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-brand-hover disabled:opacity-60"
        >
          {state === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {state === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-3 text-[14px] text-ivory">
          {error}
        </p>
      )}
      <p id={`${id}-help`} className="mt-3 text-[13px] text-ivory/50">
        Only emails about Sevyn8. Unsubscribe anytime. See our{" "}
        <Link href="/legal/privacy/" className="underline underline-offset-2 hover:text-ivory">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

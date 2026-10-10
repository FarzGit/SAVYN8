"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { ringPage } from "@/content/ring";

const ITEMS = ringPage.notifications;
const N = ITEMS.length;
const INTERVAL = 3400;

/**
 * iPhone-style notification banners that cycle automatically: a new one slides in at
 * the top, the rest move down, the oldest fades out. Pauses on hover; static for
 * reduced motion. Decorative illustration of the kind of notes Sevyn8 sends.
 */
export function NotificationStack({
  className = "",
  visible: VISIBLE = 3,
  compact = false,
}: {
  className?: string;
  visible?: number;
  /** Small banners (beside the ring on desktop) */
  compact?: boolean;
}) {
  const SLOT = compact ? 66 : 92; // px between stacked banners
  const CARD_H = compact ? 58 : 84;
  const [seq, setSeq] = useState(VISIBLE - 1); // newest sequence number on top
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setSeq((s) => s + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [seq, paused, reduce]);

  // render the visible banners plus the one leaving (slot VISIBLE)
  const slots = Array.from({ length: VISIBLE + 1 }, (_, k) => seq - k).filter((s) => s >= 0);

  return (
    <div
      className={`relative ${className}`}
      style={{ height: SLOT * (VISIBLE - 1) + CARD_H }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      {slots.map((s, k) => {
        const n = ITEMS[s % N];
        const leaving = k >= VISIBLE;
        return (
          <div
            key={s}
            className="notif absolute inset-x-0 top-0 transition-[transform,opacity] duration-700 ease-[var(--ease-calm)]"
            style={{
              transform: `translateY(${k * SLOT}px) scale(${1 - k * 0.035})`,
              opacity: leaving ? 0 : 1 - k * 0.18,
              zIndex: VISIBLE + 1 - k,
            }}
          >
            <div
              className={`flex rounded-[18px] border border-white/12 bg-[rgb(28_36_33/0.62)] shadow-[0_16px_40px_-18px_rgb(0_0_0/0.85)] backdrop-blur-2xl backdrop-saturate-150 ${
                compact ? "items-center gap-2.5 p-2.5" : "gap-3 rounded-[22px] p-3.5"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center bg-[linear-gradient(145deg,#1c7a60,#0b3a2c)] text-ivory shadow-inner ${
                  compact ? "h-8 w-8 rounded-[9px]" : "h-9 w-9 rounded-[10px]"
                }`}
              >
                <LogoMark className={compact ? "h-4 w-4" : "h-5 w-5"} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`truncate font-semibold leading-tight text-ivory ${compact ? "text-[12.5px]" : "text-[14px]"}`}>{n.title}</span>
                  <span className="shrink-0 text-[11px] text-ivory/45">
                    {s === seq && n.time === "now" ? "now" : n.time === "now" ? `${(seq - s) * 3}m ago` : n.time}
                  </span>
                </div>
                <p className={`text-ivory/70 ${compact ? "mt-0.5 truncate text-[11.5px] leading-snug" : "line-clamp-2 text-[13px] leading-snug"}`}>
                  {compact ? n.short : n.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

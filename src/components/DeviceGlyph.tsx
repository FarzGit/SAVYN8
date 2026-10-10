import { theme } from "@/config/theme";
import type { Device } from "@/content/devices";

/** Abstract line illustrations of each device. Not product renders. */
export function DeviceGlyph({ id, className = "" }: { id: Device["id"]; className?: string }) {
  if (id === "ring") {
    return (
      <svg viewBox="0 0 160 120" className={className} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="dg-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={theme.ivory} stopOpacity="0.95" />
            <stop offset="0.55" stopColor={theme.ivory} stopOpacity="0.35" />
            <stop offset="1" stopColor={theme.ivory} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g transform="rotate(-18 80 60)">
          <ellipse cx="80" cy="60" rx="46" ry="27" stroke="url(#dg-ring)" strokeWidth="11" />
          <ellipse cx="80" cy="60" rx="40" ry="21.5" stroke={theme.bg} strokeWidth="1.2" strokeOpacity="0.7" />
        </g>
        <circle cx="80" cy="84" r="2.4" fill={theme.ivory} />
      </svg>
    );
  }
  if (id === "mastoid") {
    return (
      <svg viewBox="0 0 160 120" className={className} fill="none" aria-hidden="true">
        {/* ear outline */}
        <path
          d="M74 22c-17 0-28 13-28 29 0 10 4 15 9 21 4 5 4 11 4 16 0 8 6 13 13 13 6 0 10-4 11-9"
          stroke={theme.ivory}
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M66 50c0-8 5-13 12-13s11 6 11 12" stroke={theme.ivory} strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
        {/* clip behind the ear */}
        <path d="M98 26c14 6 20 20 18 38-1 13-7 24-15 30" stroke={theme.neuro} strokeWidth="9" strokeLinecap="round" />
        <circle cx="113" cy="56" r="2.6" fill={theme.ivory} />
        <path d="M122 40c5 5 7 11 7 17M126 32c8 8 11 17 11 26" stroke={theme.neuro} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" aria-hidden="true">
      <rect x="38" y="30" width="84" height="60" rx="22" stroke={theme.cardio} strokeWidth="2" />
      <rect x="48" y="40" width="64" height="40" rx="14" stroke={theme.cardio} strokeOpacity="0.35" strokeWidth="1.2" />
      <path
        d="M52 60h14l4-9 6 20 5-15 3 4h24"
        stroke={theme.ivory}
        strokeOpacity="0.9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

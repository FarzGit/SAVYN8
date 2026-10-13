import type { CSSProperties, ReactNode } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Sevyn8 app screens, designed in code (sharp at any size, easy to update) and shown in
 * iPhone frames. Screens: Today, Sleep trends, For you, Your ring.
 * Copy stays inside wellness language (claims lint runs on this file).
 */

type Tab = "today" | "trends" | "foryou" | "ring";

const MIND = "#159AAE";
const CARDIO = "#DB4F55";
const GOLD = "#CB9738";

/* ───────────────────────── chrome ───────────────────────── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-ivory">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M1.5 4.5a9.5 9.5 0 0 1 13 0M4 7.2a6 6 0 0 1 8 0M6.6 9.8a2.3 2.3 0 0 1 2.8 0" />
        </svg>
        <span className="relative flex h-[11px] w-[22px] items-center rounded-[3.5px] border border-ivory/50 p-[1.5px]">
          <span className="h-full w-[80%] rounded-[1.5px] bg-ivory" />
        </span>
      </span>
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "today", label: "Today", icon: <path d="M4 10.5 12 4l8 6.5V20H4z" /> },
  { id: "trends", label: "Trends", icon: <path d="M4 19V5M4 19h16M7 15l4-4 3 3 5-6" /> },
  { id: "foryou", label: "For you", icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /> },
  { id: "ring", label: "Ring", icon: <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-20 12 12)" /> },
];

function TabBar({ active }: { active: Tab }) {
  return (
    <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.06] bg-[rgb(8_18_14/0.9)] px-3 pb-5 pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4">
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <span key={t.id} className={`flex flex-col items-center gap-0.5 text-[8.5px] font-medium ${on ? "text-ivory" : "text-ivory/40"}`}>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {t.icon}
              </svg>
              {t.label}
            </span>
          );
        })}
      </div>
      <div className="mx-auto mt-2 h-[4px] w-[34%] rounded-full bg-ivory/80" />
    </div>
  );
}

/** iPhone frame. Width is set by the parent; the frame keeps the phone's proportions. */
export function Phone({ children, active, className = "", style }: { children: ReactNode; active: Tab; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative aspect-[9/19.4] w-[248px] shrink-0 rounded-[44px] border border-white/15 bg-[linear-gradient(145deg,#2a2f2c,#0d100f_40%,#1b1f1d)] p-[7px] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.04)] ${className}`}
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-[radial-gradient(120%_70%_at_50%_0%,#123a2b_0%,#0a1a14_55%,#08130f_100%)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[9px] z-20 h-[23px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar />
        <div className="px-4 pb-24 pt-4">{children}</div>
        <TabBar active={active} />
      </div>
    </div>
  );
}

/* ───────────────────────── screens ───────────────────────── */

function Header({ kicker, title, right }: { kicker: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <div className="min-w-0">
        <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ivory/45">{kicker}</p>
        <p className="mt-0.5 truncate text-[17px] font-semibold leading-tight tracking-tight text-ivory">{title}</p>
      </div>
      {right}
    </div>
  );
}

export function TodayScreen() {
  return (
    <>
      <Header
        kicker="Tue, 14 Oct"
        title="Good morning, Alex"
        right={
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#1c7a60,#0b3a2c)] text-ivory">
            <LogoMark className="h-4 w-4" />
          </span>
        }
      />
      <div className="mt-3 rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,rgb(28_122_96/0.35),rgb(10_26_20/0.6))] p-3">
        <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/60">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: MIND }} />
          Morning note
        </p>
        <p className="mt-1.5 text-[12.5px] font-medium leading-snug tracking-[-0.01em] text-ivory">
          You slept 22 minutes more than usual and recovery looks good. A solid day to train.
        </p>
      </div>
      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/45">Your next step</p>
      <div className="mt-1.5 flex items-center gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.04] p-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.06] text-ivory">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-medium text-ivory">Train hard today</span>
          <span className="block truncate text-[9.5px] text-ivory/50">You&apos;re well recovered</span>
        </span>
        <span className="rounded-full bg-[#1c7a60] px-2.5 py-1 text-[9.5px] font-semibold text-ivory">Add</span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {[
          { k: "Sleep", v: "7h 24m", s: "+22 min" },
          { k: "Recovery", v: "Ready", s: "Above usual", gold: true },
          { k: "Stress", v: "Calm", s: "Lower" },
        ].map((t) => (
          <div key={t.k} className="rounded-[12px] border border-white/10 bg-white/[0.035] p-2">
            <p className="text-[8.5px] text-ivory/50">{t.k}</p>
            <p className="mt-0.5 text-[13px] font-semibold tracking-tight" style={{ color: t.gold ? GOLD : undefined }}>
              {t.v}
            </p>
            <p className="text-[8px] text-ivory/45">{t.s}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-[12px] border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[9.5px] text-ivory/70">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          Sevyn8 Ring connected
        </span>
        <span className="text-ivory/45">82%</span>
      </div>
    </>
  );
}

/** Two weeks of sleep against a shaded "your normal" band. */
function SleepChart() {
  const pts = [6.9, 7.2, 6.6, 7.0, 7.4, 6.4, 6.8, 7.1, 7.3, 6.9, 7.0, 7.5, 7.2, 7.4];
  const W = 216;
  const H = 104;
  const y = (h: number) => H - ((h - 5.8) / 2) * H;
  const x = (i: number) => (i / (pts.length - 1)) * W;
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H}Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} className="mt-3 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="app-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={MIND} stopOpacity="0.35" />
          <stop offset="1" stopColor={MIND} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* your normal */}
      <rect x="0" y={y(7.3)} width={W} height={y(6.7) - y(7.3)} fill="#FBFAF6" fillOpacity="0.06" rx="4" />
      <line x1="0" x2={W} y1={y(7.0)} y2={y(7.0)} stroke="#FBFAF6" strokeOpacity="0.25" strokeDasharray="3 4" />
      <path d={area} fill="url(#app-area)" />
      <path d={line} fill="none" stroke={MIND} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(pts.length - 1)} cy={y(pts[pts.length - 1])} r="4" fill={GOLD} stroke="#0a1a14" strokeWidth="2" />
      {["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <text key={i} x={x(i)} y={H + 12} textAnchor="middle" fontSize="7" fill="#FBFAF6" fillOpacity="0.35">
          {d}
        </text>
      ))}
    </svg>
  );
}

export function TrendsScreen() {
  return (
    <>
      <Header
        kicker="Trends"
        title="Sleep"
        right={<span className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[9px] text-ivory/80">2 weeks</span>}
      />
      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-[30px] font-semibold leading-none tracking-tight text-ivory">7h 24m</p>
        <p className="text-[10px] text-ivory/50">last night</p>
      </div>
      <p className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-medium" style={{ background: `${MIND}26`, color: "#7fd3df" }}>
        ▲ 22 min above your normal
      </p>
      <SleepChart />
      <p className="flex items-center gap-1.5 text-[8.5px] text-ivory/45">
        <span className="inline-block h-2 w-3 rounded-[2px] bg-ivory/10" /> Your normal range
      </p>
      <div className="mt-3 space-y-2">
        {[
          { k: "Resting pulse", v: "58 bpm", s: "In your range", c: CARDIO },
          { k: "Skin temperature", v: "+0.2°", s: "vs your normal", c: "#FBFAF6" },
        ].map((r) => (
          <div key={r.k} className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/[0.035] px-2.5 py-2">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.c }} />
              <span>
                <span className="block text-[10.5px] text-ivory">{r.k}</span>
                <span className="block text-[8.5px] text-ivory/45">{r.s}</span>
              </span>
            </span>
            <span className="text-[13px] font-semibold text-ivory">{r.v}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function ForYouScreen() {
  const items = [
    { t: "Wind down at 10:15", s: "Stress ran higher than usual today", a: "Add to calendar", c: MIND, icon: <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" /> },
    { t: "Lighter training tomorrow", s: "Let your recovery catch up", a: "Adjust plan", c: GOLD, icon: <path d="M3 12h4l2.5-6 5 12 2.5-6H21" /> },
    { t: "A short walk after dinner", s: "46 active minutes so far", a: "Remind me", c: "#FBFAF6", icon: <path d="M13 4.5a1.5 1.5 0 1 1 0 .01M9 20l2-6 3 2v4M8 11l3-3 3 2 3 1" /> },
  ];
  return (
    <>
      <Header kicker="Based on your normal" title="For you today" />
      <div className="mt-4 space-y-2.5">
        {items.map((it) => (
          <div key={it.t} className="rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${it.c}22`, color: it.c }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {it.icon}
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-semibold leading-tight text-ivory">{it.t}</span>
                <span className="mt-0.5 block text-[9.5px] leading-snug text-ivory/50">{it.s}</span>
              </span>
            </div>
            <span className="mt-2.5 inline-flex rounded-full bg-[#1c7a60] px-3 py-1.5 text-[9.5px] font-semibold text-ivory">{it.a}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function RingScreen() {
  return (
    <>
      <Header kicker="Device" title="Your ring" />
      <div className="relative mx-auto mt-2 flex h-[150px] items-center justify-center">
        <div className="absolute h-[120px] w-[120px] rounded-full bg-[radial-gradient(closest-side,rgb(210_174_134/0.35),transparent)] blur-md" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/ring-product-sm.webp" alt="" className="relative h-[130px] w-auto object-contain" loading="lazy" decoding="async" />
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-[#4ade80]/15 px-2 py-0.5 text-[9.5px] font-medium text-[#86efac]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> Connected
        </span>
        <span className="text-[9px] text-ivory/45">Synced 2 min ago</span>
      </div>
      <div className="mt-3 rounded-[12px] border border-white/10 bg-white/[0.035] p-2.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-ivory/70">Battery</span>
          <span className="font-semibold text-ivory">82%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#1c7a60,#4ade80)]" />
        </div>
      </div>
      <div className="mt-2.5 divide-y divide-white/[0.06] rounded-[12px] border border-white/10 bg-white/[0.035]">
        {["Optical pulse", "Skin temperature", "Motion"].map((s) => (
          <div key={s} className="flex items-center justify-between px-2.5 py-2 text-[10.5px] text-ivory">
            {s}
            <span className="flex h-[16px] w-[28px] items-center justify-end rounded-full bg-[#1c7a60] p-[2px]">
              <span className="h-3 w-3 rounded-full bg-ivory" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────── showcase ───────────────────────── */

const SCREENS: { id: Tab; label: string; el: ReactNode }[] = [
  { id: "trends", label: "Sleep trends against your normal", el: <TrendsScreen /> },
  { id: "today", label: "Today: your morning note and next step", el: <TodayScreen /> },
  { id: "foryou", label: "For you: suggested actions for today", el: <ForYouScreen /> },
  { id: "ring", label: "Your ring: connection, battery and sensors", el: <RingScreen /> },
];

/**
 * Desktop: three phones fanned (Today in front). Phones: a swipe row of all four screens.
 */
export function AppShowcase() {
  const fan = SCREENS.slice(0, 3);
  return (
    <figure role="img" aria-label="The Sevyn8 app: Today, Sleep trends, For you and Your ring screens" className="relative w-full min-w-0">
      {/* desktop fan */}
      <div aria-hidden="true" className="relative mx-auto hidden h-[600px] w-full max-w-[600px] lg:block">
        <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(28_122_96/0.35),transparent)] blur-2xl" />
        {fan.map((s, i) => {
          const side = i - 1; // -1 left, 0 centre, 1 right
          return (
            <div
              key={s.id}
              className="app-phone absolute left-1/2 top-1/2"
              style={
                {
                  "--x": `${side * 62}%`,
                  "--r": `${side * 7}deg`,
                  "--s": side === 0 ? 1 : 0.88,
                  zIndex: side === 0 ? 3 : 1,
                  opacity: side === 0 ? 1 : 0.85,
                  animationDelay: `${i * -1.6}s`,
                } as CSSProperties
              }
            >
              <Phone active={s.id}>{s.el}</Phone>
            </div>
          );
        })}
      </div>
      {/* phones: swipe row */}
      <ul aria-hidden="true" className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden">
        {[SCREENS[1], SCREENS[0], SCREENS[2], SCREENS[3]].map((s) => (
          <li key={s.id} className="snap-center">
            <Phone active={s.id}>{s.el}</Phone>
            <p className="mt-3 text-center text-[12.5px] text-ivory/55">{s.label}</p>
          </li>
        ))}
      </ul>
    </figure>
  );
}

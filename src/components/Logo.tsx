/** Placeholder brand mark until final logo files arrive: two stacked rings forming an 8. */
export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="7.2" r="4.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="16.4" r="5.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="11.9" r="1.05" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ivory ${className}`}>
      <LogoMark />
      <span className="text-[15px] font-medium tracking-[0.2em] max-[360px]:text-[13px] max-[360px]:tracking-[0.14em]">SEVYN8</span>
    </span>
  );
}

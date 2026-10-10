import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Rich } from "./Rich";

export function Eyebrow({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLParagraphElement> & {
    "data-reveal"?: boolean;
  }) {
  return (
    <p className={`eyebrow ${className}`} {...rest}>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  as: Tag = "h2",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  /** Heading id, for sections that use aria-labelledby. */
  id?: string;
}) {
  const center = align === "center";
  return (
    <header className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Eyebrow className="mb-5" data-reveal>
        {eyebrow}
      </Eyebrow>
      <Tag id={id} className={Tag === "h1" ? "h1" : "h2"} data-reveal style={{ "--reveal-i": 1 } as CSSProperties}>
        <Rich text={title} />
      </Tag>
      {intro && (
        <p
          className={`lede mt-6 ${center ? "mx-auto" : ""} max-w-[60ch]`}
          data-reveal
          style={{ "--reveal-i": 2 } as CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

/**
 * The "one plain sentence" for anything that isn't ready yet (brief: no styled section
 * built around something that doesn't exist).
 */
export function StatusNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-start gap-3 text-[15px] leading-relaxed text-muted ${className}`}>
      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full border border-muted" />
      <span>{children}</span>
    </p>
  );
}

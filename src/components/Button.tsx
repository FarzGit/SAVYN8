import Link from "next/link";
import type { ReactNode } from "react";
import { cta } from "@/config/site-status";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-calm)] active:scale-[0.98] whitespace-nowrap";

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
};

const variants = {
  primary: "bg-brand text-ivory border border-[rgb(251_250_246/0.14)] hover:bg-brand-hover",
  secondary: "border border-line-strong text-ivory hover:border-ivory/40 hover:bg-ivory/[0.04]",
  light: "bg-ivory text-bg hover:bg-ivory/90",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", external }: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** The one primary call to action, label and target driven by `saleMode`. */
export function PrimaryCta({ size = "md", className = "" }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <ButtonLink href={cta.href} external={cta.external} size={size} className={className}>
      {cta.label}
      <Arrow />
    </ButtonLink>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group -my-2.5 inline-flex items-center gap-2 py-2.5 text-[15px] font-medium text-ivory underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-ivory ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

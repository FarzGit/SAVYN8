"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/config/site";
import { cta, siteStatus, formatPrice } from "@/config/site-status";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on navigation (adjust state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const price = siteStatus.ring.priceUsd;
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Sevyn8 home" className="rounded-md">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href.replace(/\/$/, ""));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[14px] transition-colors hover:text-ivory ${active ? "text-ivory" : "text-ivory/65"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {price != null && (
            <span className="hidden font-mono text-[12px] tracking-[0.08em] text-ivory/70 sm:inline">{formatPrice(price)}</span>
          )}
          <Link
            href={cta.href}
            className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-[rgb(251_250_246/0.14)] bg-brand px-4 text-[13.5px] font-medium text-ivory transition-colors hover:bg-brand-hover max-[360px]:px-3 max-[360px]:text-[12.5px]"
          >
            {cta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-ivory transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-ivory transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
      >
        <ul className="container-site flex flex-col pt-6">
          {[{ label: "Home", href: "/" }, ...nav].map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link href={item.href} className="flex items-center justify-between py-5 text-[26px] font-medium tracking-tight">
                {item.label}
                <span aria-hidden="true" className="text-muted">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

import Link from "next/link";
import { nav, site } from "@/config/site";
import { disclaimer } from "@/content/legal";
import { PrimaryCta } from "./Button";
import { Logo } from "./Logo";

const legal = [
  { label: "Privacy", href: "/legal/privacy/" },
  { label: "Terms", href: "/legal/terms/" },
  { label: "Wellness disclaimer", href: "/legal/wellness/" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-[15px] text-ivory/60">
            A ring that tells you what to do next. Not just what your numbers are.
          </p>
          <PrimaryCta className="mt-8" />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-1 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-1.5 text-ivory/70 transition-colors hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-1 text-[15px]">
              <li>
                <a href={`mailto:${site.contactEmail}`} className="inline-block break-all py-1.5 text-ivory/70 transition-colors hover:text-ivory">
                  {site.contactEmail}
                </a>
              </li>
              <li>
                <Link href="/contact/" className="inline-block py-1.5 text-ivory/70 transition-colors hover:text-ivory">
                  Contact us
                </Link>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener me" className="inline-block py-1.5 text-ivory/70 transition-colors hover:text-ivory">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-1 text-[15px]">
              {legal.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-1.5 text-ivory/70 transition-colors hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-site flex flex-col gap-4 border-t border-line py-8 text-[13px] text-ivory/45 md:flex-row md:items-start md:justify-between">
        <p className="max-w-2xl">{disclaimer}</p>
        <p className="shrink-0">© 2026 {site.legalName}</p>
      </div>
    </footer>
  );
}

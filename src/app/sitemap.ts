import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { siteStatus } from "@/config/site-status";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-10");
  const routes: [string, number][] = [
    ["/", 1],
    ["/ring/", 0.9],
    ["/devices/", 0.7],
    ["/partners/", 0.7],
    ["/about/", 0.6],
    ["/waitlist/", 0.6],
    ["/contact/", 0.4],
    ["/legal/privacy/", 0.2],
    ["/legal/terms/", 0.2],
    ["/legal/wellness/", 0.2],
  ];
  if (siteStatus.companion.ready) routes.push(["/companion/", 0.7]);
  return routes.map(([path, priority]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}

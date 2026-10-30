import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/academics",
    "/admission",
    "/activities",
    "/events",
    "/gallery",
    "/videos",
    "/disclosure",
    "/fee-structure",
    "/homework",
    "/tc/2026",
    "/tc/2025",
    "/tc/before-2025",
    "/contact",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}

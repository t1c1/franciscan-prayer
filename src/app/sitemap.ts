import type { MetadataRoute } from "next";
import { HOURS } from "@/lib/prayers";

export const dynamic = "force-static";

const BASE_URL = "https://franciscanprayer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const hourPages = HOURS.map((hour) => ({
    url: `${BASE_URL}/hours/${hour.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/hours`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...hourPages,
    { url: `${BASE_URL}/crown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/office`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/prayers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/stations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/reflections`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/rule`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/calendar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/community`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/intentions`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${BASE_URL}/dashboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.4 },
    { url: `${BASE_URL}/settings`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}

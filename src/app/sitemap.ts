import type { MetadataRoute } from "next";
import { LEAGUES } from "@/lib/leagues";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/legal`, changeFrequency: "yearly", priority: 0.3 },
    ...LEAGUES.map((league) => ({
      url: `${SITE_URL}/${league.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

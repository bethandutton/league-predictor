import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Shared predictions are personal and effectively infinite, so they stay out of the index.
      disallow: "/*/p/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

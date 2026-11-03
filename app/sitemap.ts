import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yogianyathra.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-11-03",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}


import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.yogiandyathra.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-11-03",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}


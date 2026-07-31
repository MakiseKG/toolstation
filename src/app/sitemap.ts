import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const BASE_URL = "https://toolstation-sooty.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...toolPages,
  ];
}

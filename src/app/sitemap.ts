import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { toolsEn } from "@/lib/tools-en";
import { cheatsheets } from "@/lib/cheatsheets";

const BASE_URL = "https://toolstation-sooty.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const zhToolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const enToolPages = toolsEn.map((tool) => ({
    url: `${BASE_URL}/en/tools/${tool.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const zhCheatSheetPages = cheatsheets.map((s) => ({
    url: `${BASE_URL}/cheatsheets/${s.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const enCheatSheetPages = cheatsheets.map((s) => ({
    url: `${BASE_URL}/en/cheatsheets/${s.slug}`,
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
    {
      url: `${BASE_URL}/en`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/cheatsheets`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en/cheatsheets`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...zhToolPages,
    ...enToolPages,
    ...zhCheatSheetPages,
    ...enCheatSheetPages,
  ];
}

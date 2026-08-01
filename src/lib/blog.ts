import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Locale = "zh" | "en";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  toolSlug: string;
  category: string;
  readingTime: number;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

// gray-matter (js-yaml) parses `date: 2026-08-01` into a Date object.
// Normalize to a "YYYY-MM-DD" string so metadata renders cleanly.
function toDateString(d: unknown): string {
  if (d instanceof Date) {
    return d.toISOString().slice(0, 10);
  }
  return String(d ?? "").slice(0, 10);
}

function readPost(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!data.slug || !data.title) return null;
    // Rough reading time: ~400 Chinese chars/min or ~200 English words/min
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(words / 200));
    return {
      slug: data.slug,
      title: data.title,
      description: data.description ?? "",
      keywords: data.keywords ?? [],
      date: toDateString(data.date),
      toolSlug: data.toolSlug ?? "",
      category: data.category ?? "",
      readingTime,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = path.join(CONTENT_DIR, locale);
  const posts = readDir(dir)
    .map((f) => readPost(path.join(dir, f)))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPost(slug: string, locale: Locale): BlogPost | undefined {
  const dir = path.join(CONTENT_DIR, locale);
  const file = readDir(dir).find((f) => f.endsWith(`${slug}.md`));
  if (!file) return undefined;
  return readPost(path.join(dir, file)) ?? undefined;
}

export function getAllPostSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  return readDir(dir)
    .map((f) => f.replace(/\.md$/, ""))
    .filter((s) => getPost(s, locale) !== undefined);
}

export function getRelatedPosts(post: BlogPost, locale: Locale, limit = 3): BlogPost[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}

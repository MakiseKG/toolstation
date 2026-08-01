import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getToolEn } from "@/lib/tools-en";

export const metadata: Metadata = {
  title: "Developer Blog — Programming Tutorials & Tool Guides",
  description:
    "ToolStation developer blog: JSON formatting, Base64 encoding, regex, UUID, JWT tutorials and free online tool guides.",
  keywords: ["programming tutorial", "JSON tutorial", "regex", "Base64", "UUID", "JWT"],
  alternates: {
    canonical: "https://toolstation-sooty.vercel.app/en/blog",
    languages: {
      "zh": "https://toolstation-sooty.vercel.app/blog",
      "en": "https://toolstation-sooty.vercel.app/en/blog",
    },
  },
};

export default function BlogIndexEN() {
  const posts = getAllPosts("en");

  return (
    <div className="min-h-screen">
      <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-[#00d4aa]/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 py-14">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Developer Blog
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-zinc-500 text-balance">
            Clear, practical programming tutorials and tool guides — every article pairs with a free online tool you can use right now.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-4">
          {posts.map((post) => {
            const tool = getToolEn(post.toolSlug);
            return (
              <Link
                key={post.slug}
                href={`/en/blog/${post.slug}`}
                className="group block rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition hover:border-[#00d4aa]/30 hover:bg-zinc-800/60"
              >
                <div className="flex items-start gap-4">
                  {tool && (
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-2xl sm:flex">
                      {tool.icon}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h2 className="mt-1.5 text-lg font-semibold text-zinc-200 text-balance transition group-hover:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 text-pretty">
                      {post.description}
                    </p>
                  </div>
                  <svg
                    className="mt-2 h-5 w-5 shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-[#00d4aa]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

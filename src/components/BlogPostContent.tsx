import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "@/lib/blog";
import { getTool } from "@/lib/tools";
import { getToolEn } from "@/lib/tools-en";
import { getRelatedPosts } from "@/lib/blog";

type Locale = "zh" | "en";

const i18n = {
  zh: {
    relatedTool: "相关工具",
    useTool: "立即使用",
    relatedPosts: "相关文章",
    readMore: "阅读全文",
    backToBlog: "返回博客",
    updated: "更新于",
  },
  en: {
    relatedTool: "Related Tool",
    useTool: "Use Tool",
    relatedPosts: "Related Articles",
    readMore: "Read More",
    backToBlog: "Back to Blog",
    updated: "Updated",
  },
};

export default function BlogPostContent({
  post,
  locale,
}: {
  post: BlogPost;
  locale: Locale;
}) {
  const s = i18n[locale];
  const tool = locale === "en" ? getToolEn(post.toolSlug) : getTool(post.toolSlug);
  const toolPrefix = locale === "en" ? "/en/tools" : "/tools";
  const blogPrefix = locale === "en" ? "/en/blog" : "/blog";
  const relatedPosts = getRelatedPosts(post, locale);

  return (
    <article className="space-y-8">
      {/* Title */}
      <header>
        <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full border border-zinc-800 px-2.5 py-1 text-zinc-400">
            {post.category}
          </span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-500 text-pretty">
          {post.description}
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-[#00d4aa] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Related tool CTA */}
      {tool && (
        <div className="rounded-2xl border border-[#00d4aa]/20 bg-gradient-to-r from-[#00d4aa]/10 to-[#3b82f6]/10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00d4aa]">
            {s.relatedTool}
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-2xl ring-1 ring-zinc-800">
                {tool.icon}
              </div>
              <div>
                <p className="font-semibold text-white">{tool.name}</p>
                <p className="text-sm text-zinc-500">{tool.description}</p>
              </div>
            </div>
            <Link
              href={`${toolPrefix}/${tool.slug}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00d4aa] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#00e0b3]"
            >
              {s.useTool}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-zinc-300">{s.relatedPosts}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                href={`${blogPrefix}/${p.slug}`}
                className="group rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 transition hover:border-[#00d4aa]/30 hover:bg-zinc-800/60"
              >
                <p className="text-xs text-zinc-600">{p.category}</p>
                <p className="mt-1.5 text-sm font-medium leading-snug text-zinc-300 text-balance transition group-hover:text-white">
                  {p.title}
                </p>
                <p className="mt-2 text-xs text-[#00d4aa] opacity-0 transition-opacity group-hover:opacity-100">
                  {s.readMore} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

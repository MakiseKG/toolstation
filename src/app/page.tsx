"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useEffect, useCallback } from "react";
import { tools, categoryOrder, getToolsByCategory } from "@/lib/tools";
import { matchIntent, getQuickSuggestions } from "@/lib/ai-router";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const [query, setQuery] = useState(initialQuery);
  const [aiMatch, setAiMatch] = useState<ReturnType<typeof matchIntent>>(null);
  const [isTyping, setIsTyping] = useState(false);

  const filteredTools = useMemo(() => {
    if (!query.trim()) return getToolsByCategory();
    const q = query.toLowerCase();
    const filtered = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q))
    );
    const map = new Map<string, typeof tools>();
    for (const cat of categoryOrder) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length > 0) map.set(cat, items);
    }
    return map;
  }, [query]);

  const categories = Array.from(filteredTools.keys());
  const suggestions = getQuickSuggestions();

  // AI intent detection
  useEffect(() => {
    if (!query.trim()) {
      setAiMatch(null);
      return;
    }
    const timer = setTimeout(() => {
      const match = matchIntent(query);
      setAiMatch(match);
      setIsTyping(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setIsTyping(true);
    const url = new URL(window.location.href);
    if (value.trim()) {
      url.searchParams.set("s", value.trim());
    } else {
      url.searchParams.delete("s");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const navigateToTool = useCallback((slug: string) => {
    window.location.href = `/tools/${slug}`;
  }, []);

  return (
    <div>
      {/* Hero - AI Assistant Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-4 py-16 text-center sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] h-2 w-2 rounded-full bg-white/20 animate-pulse" />
          <div className="absolute top-20 right-[15%] h-3 w-3 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-16 left-[20%] h-2 w-2 rounded-full bg-white/15 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-100 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            🤖 AI 智能助手已就绪 — 描述你的需求，我帮你找到工具
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            你需要做什么？
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            {tools.length} 个免费在线工具 · 自然语言搜索 · 数据本地处理
          </p>

          {/* AI Input */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                {isTyping ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : aiMatch ? (
                  "🤖"
                ) : (
                  "🔍"
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && aiMatch) {
                    navigateToTool(aiMatch.tool.slug);
                  }
                }}
                placeholder="试试说：格式化这段 JSON / 生成一个 16 位密码 / 把 CSV 转成 JSON..."
                className="w-full rounded-2xl border-0 bg-white/95 py-5 pl-12 pr-4 text-base text-zinc-800 shadow-xl outline-none ring-2 ring-white/30 backdrop-blur transition placeholder:text-zinc-400 focus:ring-white/60 dark:bg-zinc-900/95 dark:text-white dark:placeholder:text-zinc-500"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                >
                  ✕
                </button>
              )}
            </div>

            {/* AI Match Result */}
            {aiMatch && (
              <button
                onClick={() => navigateToTool(aiMatch.tool.slug)}
                className="mt-3 flex w-full items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-left shadow-lg transition hover:bg-white hover:shadow-xl dark:bg-zinc-900/95 dark:hover:bg-zinc-900"
              >
                <span className="text-2xl">{aiMatch.tool.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {aiMatch.action ? `${aiMatch.tool.name} — ${aiMatch.action === "format" ? "格式化" : aiMatch.action === "minify" ? "压缩" : ""}` : aiMatch.tool.name}
                  </p>
                  <p className="text-sm text-zinc-500">{aiMatch.tool.description}</p>
                </div>
                <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  回车打开
                </span>
              </button>
            )}

            {/* Quick Suggestions */}
            {!query && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => navigateToTool(s.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/25"
                  >
                    <span>{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {categories.length === 0 ? (
          <div className="py-20 text-center text-zinc-400">
            <p className="mb-4 text-5xl">🔍</p>
            <p className="text-lg">没有找到匹配的工具</p>
            <p className="mt-1 text-sm">换个说法试试？比如"格式化 JSON"或"生成密码"</p>
          </div>
        ) : (
          categories.map((cat) => {
            const items = filteredTools.get(cat) || [];
            return (
              <section key={cat} className="mb-12">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    {cat}工具
                  </h2>
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-xl transition group-hover:scale-110 dark:from-blue-950/40 dark:to-indigo-950/40">
                        {tool.icon}
                      </div>
                      <h3 className="font-semibold text-zinc-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {tool.description}
                      </p>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

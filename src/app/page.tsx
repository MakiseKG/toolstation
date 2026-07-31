"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { tools, categoryOrder, getToolsByCategory, type Tool } from "@/lib/tools";
import { matchIntent, getQuickSuggestions } from "@/lib/ai-router";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#030305]" />

      {/* Orb 1 - teal */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#00d4aa] opacity-[0.07] blur-[120px] animate-gradient"
        style={{ animationDelay: "0s" }}
      />

      {/* Orb 2 - purple */}
      <div
        className="absolute top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#8b5cf6] opacity-[0.06] blur-[100px] animate-gradient"
        style={{ animationDelay: "4s" }}
      />

      {/* Orb 3 - blue */}
      <div
        className="absolute -bottom-[10%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#3b82f6] opacity-[0.05] blur-[100px] animate-gradient"
        style={{ animationDelay: "8s" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-white sm:text-3xl">{value}</span>
      <span className="mt-1 text-xs text-zinc-500">{label}</span>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4aa]/30 hover:bg-zinc-800/60"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-lg text-zinc-400 transition duration-300 group-hover:scale-110 group-hover:bg-[#00d4aa]/10 group-hover:text-[#00d4aa]">
        {tool.icon}
      </div>
      <h3 className="font-semibold text-zinc-200 transition group-hover:text-white">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
        {tool.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#00d4aa] opacity-0 transition-opacity group-hover:opacity-100">
        打开工具
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function HomeContent() {
  const [query, setQuery] = useState("");
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
    const map = new Map<string, Tool[]>();
    for (const cat of categoryOrder) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length > 0) map.set(cat, items);
    }
    return map;
  }, [query]);

  const categories = Array.from(filteredTools.keys());
  const suggestions = getQuickSuggestions();

  // Read search param from URL on mount (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) setQuery(s);
  }, []);

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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4">
        <HeroBackground />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm"
            style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 0.2s forwards" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d4aa] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d4aa]" />
            </span>
            20+ 免费工具 · 数据本地处理 · 安全私密
          </div>

          {/* Title */}
          <h1
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
            style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 0.4s forwards" }}
          >
            开发者
            <br />
            <span className="bg-gradient-to-r from-[#00d4aa] via-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
              工具箱
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-lg text-lg text-zinc-500"
            style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 0.6s forwards" }}
          >
            不用下载软件，不用注册账号。打开网页，输入需求，即刻解决。
          </p>

          {/* Search */}
          <div
            className="mx-auto mt-10 max-w-xl"
            style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 0.8s forwards" }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#00d4aa]/20 via-[#3b82f6]/20 to-[#8b5cf6]/20 opacity-0 transition-opacity duration-300 focus-within:opacity-100" />
              <div className="relative flex items-center rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl">
                <div className="pl-5 text-zinc-500">
                  {isTyping ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-[#00d4aa]" />
                  ) : aiMatch ? (
                    <svg className="h-5 w-5 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
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
                  placeholder="想做什么？比如：格式化 JSON、生成密码、测试正则..."
                  className="flex-1 bg-transparent py-5 pl-4 pr-4 text-base text-zinc-200 outline-none placeholder:text-zinc-600"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => handleQueryChange("")}
                    className="mr-3 rounded-full p-1.5 text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-400"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* AI Match */}
            {aiMatch && (
              <button
                onClick={() => navigateToTool(aiMatch.tool.slug)}
                className="mt-3 flex w-full items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 text-left backdrop-blur-sm transition hover:border-[#00d4aa]/30 hover:bg-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-lg">
                  {aiMatch.tool.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-zinc-200">{aiMatch.tool.name}</p>
                  <p className="text-sm text-zinc-500">{aiMatch.tool.description}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-[#00d4aa]/10 px-3 py-1 text-sm font-medium text-[#00d4aa]">
                  回车打开
                </span>
              </button>
            )}

            {/* Quick suggestions */}
            {!query && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => navigateToTool(s.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-500 backdrop-blur-sm transition hover:border-zinc-700 hover:text-zinc-300"
                  >
                    <span>{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div
            className="mx-auto mt-16 flex max-w-md justify-around"
            style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 1s forwards" }}
          >
            <StatBadge value="20+" label="免费工具" />
            <div className="w-px bg-zinc-800" />
            <StatBadge value="0ms" label="无需加载" />
            <div className="w-px bg-zinc-800" />
            <StatBadge value="100%" label="本地处理" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out 1.2s forwards" }}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-600">
            <span className="text-xs">浏览全部工具</span>
            <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          {categories.length === 0 ? (
            <div className="py-32 text-center">
              <p className="mb-4 text-5xl">🔍</p>
              <p className="text-lg text-zinc-500">没有找到匹配的工具</p>
              <p className="mt-2 text-sm text-zinc-600">换个说法试试？比如"格式化 JSON"或"生成密码"</p>
            </div>
          ) : (
            categories.map((cat, catIndex) => {
              const items = filteredTools.get(cat) || [];
              return (
                <div key={cat} className={catIndex > 0 ? "mt-20" : ""}>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                      {cat}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((tool) => (
                      <ToolCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-zinc-600">
            ToolStation · 免费在线开发者工具
          </p>
          <p className="mt-2 text-xs text-zinc-700">
            所有数据在浏览器本地处理，不会上传至服务器
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}

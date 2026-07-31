"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { tools, categoryOrder, getToolsByCategory } from "@/lib/tools";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const [query, setQuery] = useState(initialQuery);

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

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-4 py-16 text-center sm:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            🛠️ ToolStation
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            {tools.length} 个免费在线开发工具 · 数据本地处理 · 安全私密
          </p>
          <div className="mx-auto mt-6 max-w-lg">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  const url = new URL(window.location.href);
                  if (e.target.value.trim()) {
                    url.searchParams.set("s", e.target.value.trim());
                  } else {
                    url.searchParams.delete("s");
                  }
                  window.history.replaceState({}, "", url.toString());
                }}
                placeholder="搜索工具..."
                className="w-full rounded-2xl border-0 bg-white/95 py-4 pl-12 pr-4 text-base text-zinc-800 shadow-lg outline-none ring-2 ring-white/30 backdrop-blur transition placeholder:text-zinc-400 focus:ring-white/60 dark:bg-zinc-900/95 dark:text-white dark:placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {categories.length === 0 ? (
          <div className="py-20 text-center text-zinc-400">
            <p className="mb-4 text-5xl">🔍</p>
            <p className="text-lg">没有找到匹配的工具</p>
            <p className="mt-1 text-sm">试试其他关键词？</p>
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

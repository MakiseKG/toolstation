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
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          🛠️ ToolStation
        </h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          免费在线开发工具合集 · 所有数据本地处理，安全私密
        </p>
        <div className="mx-auto mt-4 max-w-md">
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
            placeholder="搜索 12 个工具..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
      </div>

      {/* Tool Grid by Category */}
      {categories.length === 0 ? (
        <div className="py-20 text-center text-zinc-400">
          <p className="text-5xl mb-4">🔍</p>
          <p>没有找到匹配的工具，试试其他关键词？</p>
        </div>
      ) : (
        categories.map((cat) => {
          const items = filteredTools.get(cat) || [];
          return (
            <section key={cat} className="mb-10">
              <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                {cat}工具
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <h3 className="mt-2 font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {tool.name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}

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

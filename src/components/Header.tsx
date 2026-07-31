"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          🛠️ ToolStation
        </Link>
        <div className="flex-1" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim()) {
              window.location.href = `/?s=${encodeURIComponent(search.trim())}`;
            }
          }}
          placeholder="搜索工具..."
          className="hidden w-48 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:block"
        />
      </div>
    </header>
  );
}

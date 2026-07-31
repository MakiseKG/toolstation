"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const isEnglish = pathname.startsWith("/en");
  const switchUrl = isEnglish
    ? pathname.replace(/^\/en/, "") || "/"
    : `/en${pathname}`;
  const switchLabel = isEnglish ? "中文" : "EN";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#030305]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link
          href={isEnglish ? "/en" : "/"}
          className="shrink-0 text-lg font-bold tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] bg-clip-text text-transparent">
            ToolStation
          </span>
        </Link>
        <div className="flex-1" />
        <Link
          href={switchUrl}
          className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-300"
        >
          {switchLabel}
        </Link>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim()) {
              const base = isEnglish ? "/en" : "";
              window.location.href = `${base}/?s=${encodeURIComponent(search.trim())}`;
            }
          }}
          placeholder={isEnglish ? "Search tools..." : "搜索工具..."}
          className="hidden w-48 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-[#00d4aa]/50 sm:block"
        />
      </div>
    </header>
  );
}

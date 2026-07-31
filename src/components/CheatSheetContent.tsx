"use client";

import { useState, useCallback, useMemo } from "react";
import type { CheatSheet } from "@/lib/cheatsheets";

const t = {
  zh: {
    searchPlaceholder: "搜索命令...",
    resultsFound: (n: number) => `找到 ${n} 条匹配`,
    noResults: "没有找到匹配的命令",
    noResultsHint: "换个关键词试试？",
  },
  en: {
    searchPlaceholder: "Search commands...",
    resultsFound: (n: number) => `${n} results found`,
    noResults: "No matching commands found",
    noResultsHint: "Try a different keyword?",
  },
};

export default function CheatSheetContent({ sheet, locale = "zh" }: { sheet: CheatSheet; locale?: "zh" | "en" }) {
  const ui = t[locale];
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sheet.sections;
    const q = search.toLowerCase();
    return sheet.sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.syntax.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sheet, search]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 1500);
    }
  }, []);

  const totalItems = filteredSections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-8">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ui.searchPlaceholder}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-10 pr-4 text-sm text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-[#00d4aa]/50"
          />
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-600 transition hover:text-zinc-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {search && (
          <p className="mt-2 text-xs text-zinc-600">
            {ui.resultsFound(totalItems)}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {filteredSections.map((section, si) => (
          <div key={si}>
            <h2 className="mb-4 flex items-center gap-3 text-base font-bold text-zinc-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00d4aa]/10 text-xs font-bold text-[#00d4aa]">
                {si + 1}
              </span>
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, ii) => {
                const displayCode = item.syntax.length > 120
                  ? item.syntax.substring(0, 120) + "..."
                  : item.syntax;
                const isCopied = copiedCode === item.syntax;

                return (
                  <div
                    key={ii}
                    className="group flex flex-col gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 backdrop-blur-sm transition hover:border-zinc-700/60 sm:flex-row sm:items-start sm:gap-4"
                  >
                    {/* Code */}
                    <div className="min-w-0 flex-1">
                      {item.syntax.includes("\n") ? (
                        <pre className="overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-sm text-zinc-300">
                          <code>{item.syntax}</code>
                        </pre>
                      ) : (
                        <code className="block break-all text-sm text-[#00d4aa]">
                          {displayCode}
                        </code>
                      )}
                      <p className="mt-1.5 text-sm text-zinc-500">{item.description}</p>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(item.syntax)}
                      className={`flex h-9 shrink-0 items-center gap-1.5 self-end rounded-lg border px-3 text-xs font-medium transition sm:self-start ${
                        isCopied
                          ? "border-[#00d4aa]/30 bg-[#00d4aa]/10 text-[#00d4aa]"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-5xl">🔍</p>
          <p className="mt-4 text-lg text-zinc-500">{ui.noResults}</p>
          <p className="mt-2 text-sm text-zinc-600">{ui.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}

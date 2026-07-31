import Link from "next/link";
import type { Metadata } from "next";
import { cheatsheets } from "@/lib/cheatsheets";

export const metadata: Metadata = {
  title: "开发者速查表 — Git、Docker、CSS、React 等命令速查",
  description: "免费开发者速查表：Git 命令、Docker、CSS Flexbox/Grid、React Hooks、JavaScript 数组、Linux、SQL、TypeScript、NPM 等。一键复制命令。",
  alternates: {
    canonical: "https://toolstation-sooty.vercel.app/cheatsheets",
    languages: {
      "zh": "https://toolstation-sooty.vercel.app/cheatsheets",
      "en": "https://toolstation-sooty.vercel.app/en/cheatsheets",
    },
  },
};

export default function CheatSheetsPage() {
  return (
    <div className="min-h-screen bg-[#030305]">
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-[#00d4aa]/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            开发者
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] bg-clip-text text-transparent">
              速查表
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-500">
            常用命令和语法参考，点一下就能复制。省去搜索引擎的 10 秒。
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cheatsheets.map((sheet) => (
            <Link
              key={sheet.slug}
              href={`/cheatsheets/${sheet.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4aa]/30 hover:bg-zinc-800/60"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-2xl transition duration-300 group-hover:scale-110 group-hover:bg-[#00d4aa]/10">
                  {sheet.icon}
                </div>
                <svg className="mt-1 h-5 w-5 shrink-0 text-zinc-700 transition group-hover:text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-200 transition group-hover:text-white">
                  {sheet.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {sheet.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <span className="rounded-full border border-zinc-800 px-2.5 py-0.5">
                  {sheet.sections.length} sections
                </span>
                <span className="rounded-full border border-zinc-800 px-2.5 py-0.5">
                  {sheet.sections.reduce((sum, s) => sum + s.items.length, 0)} commands
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-zinc-900 py-8 text-center text-sm text-zinc-600">
          <p>ToolStation · 开发者速查表</p>
          <p className="mt-1 text-xs text-zinc-700">点一下就能复制的命令参考</p>
        </footer>
      </div>
    </div>
  );
}

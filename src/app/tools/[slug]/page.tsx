import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTool, getAllSlugs, tools } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import JsonFormatter from "@/components/tools/JsonFormatter";
import Base64Tool from "@/components/tools/Base64Tool";
import UrlEncoder from "@/components/tools/UrlEncoder";
import TextDiff from "@/components/tools/TextDiff";
import MarkdownPreview from "@/components/tools/MarkdownPreview";
import WordCounter from "@/components/tools/WordCounter";
import ColorConverter from "@/components/tools/ColorConverter";
import UuidGenerator from "@/components/tools/UuidGenerator";
import TimestampConverter from "@/components/tools/TimestampConverter";
import HtmlEntity from "@/components/tools/HtmlEntity";
import CssMinifier from "@/components/tools/CssMinifier";
import JsMinifier from "@/components/tools/JsMinifier";

const componentMap: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "url-encoder": UrlEncoder,
  "text-diff": TextDiff,
  "markdown-preview": MarkdownPreview,
  "word-counter": WordCounter,
  "color-converter": ColorConverter,
  "uuid-generator": UuidGenerator,
  timestamp: TimestampConverter,
  "html-entity": HtmlEntity,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  const { slug } = params as unknown as { slug: string };
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | ToolStation`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const ToolComponent = componentMap[slug];

  // 相关工具（同分类）
  const relatedTools = tools.filter(
    (t) => t.category === tool.category && t.slug !== slug
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-zinc-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{tool.name}</span>
      </nav>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-3">
            <span className="text-3xl">{tool.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {tool.name}
              </h1>
              <p className="text-sm text-zinc-500">{tool.description}</p>
            </div>
          </div>

          <AdSlot position="top" />

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            {ToolComponent ? <ToolComponent /> : <p>工具开发中...</p>}
          </div>

          <AdSlot position="bottom" />
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          <AdSlot position="sidebar" />

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-500">
                相关工具
              </h3>
              <ul className="space-y-2">
                {relatedTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-white hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                    >
                      <span>{t.icon}</span>
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

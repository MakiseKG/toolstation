import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTool, getAllSlugs, tools } from "@/lib/tools";
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
import HtmlFormatter from "@/components/tools/HtmlFormatter";
import RegexTester from "@/components/tools/RegexTester";
import CsvJson from "@/components/tools/CsvJson";
import LoremIpsum from "@/components/tools/LoremIpsum";
import NumberBase from "@/components/tools/NumberBase";
import ImageToBase64 from "@/components/tools/ImageToBase64";
import JwtDecoder from "@/components/tools/JwtDecoder";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import WorkflowSuggestions from "@/components/WorkflowSuggestions";

const componentMap: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "url-encoder": UrlEncoder,
  "text-diff": TextDiff,
  "markdown-preview": MarkdownPreview,
  "word-counter": WordCounter,
  "html-formatter": HtmlFormatter,
  "regex-tester": RegexTester,
  "csv-json": CsvJson,
  "lorem-ipsum": LoremIpsum,
  "color-converter": ColorConverter,
  "uuid-generator": UuidGenerator,
  timestamp: TimestampConverter,
  "html-entity": HtmlEntity,
  "number-base": NumberBase,
  "image-to-base64": ImageToBase64,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "jwt-decoder": JwtDecoder,
  "password-generator": PasswordGenerator,
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
      <nav className="mb-5 flex items-center gap-2 text-sm text-zinc-400">
        <Link
          href="/"
          className="flex items-center gap-1 transition hover:text-blue-600"
        >
          <span>🏠</span> 首页
        </Link>
        <span className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {tool.name}
        </span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-3xl shadow-sm dark:from-blue-950/40 dark:to-indigo-950/40">
              {tool.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {tool.name}
              </h1>
              <p className="text-sm text-zinc-500">{tool.description}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            {ToolComponent ? <ToolComponent /> : <p>工具开发中...</p>}
          </div>

          <WorkflowSuggestions currentSlug={slug} />
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-60">
          {relatedTools.length > 0 && (
            <div className="sticky top-20 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-400">
                相关工具
              </h3>
              <ul className="space-y-1">
                {relatedTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="font-medium">{t.name}</span>
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

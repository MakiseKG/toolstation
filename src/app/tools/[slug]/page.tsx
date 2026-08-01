import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTool, getAllSlugs, tools } from "@/lib/tools";
import Link from "next/link";
import Script from "next/script";
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
import { LocaleProvider } from "@/components/LocaleProvider";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: `https://toolstation-sooty.vercel.app/tools/${tool.slug}`,
      languages: {
        "en": `https://toolstation-sooty.vercel.app/en/tools/${tool.slug}`,
        "zh": `https://toolstation-sooty.vercel.app/tools/${tool.slug}`,
      },
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: "website",
      locale: "zh_CN",
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
  const relatedTools = tools.filter(
    (t) => t.category === tool.category && t.slug !== slug
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ToolStation",
        item: "https://toolstation-sooty.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.name,
        item: `https://toolstation-sooty.vercel.app/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#030305]">
      {/* Structured data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-[#00d4aa]/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-400" aria-label="面包屑导航">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition hover:text-[#00d4aa]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            首页
          </Link>
          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-zinc-400">{tool.name}</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Header */}
            <div className="mb-8 flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-3xl ring-1 ring-zinc-800">
                {tool.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {tool.name}
                </h1>
                <p className="mt-1.5 text-base text-zinc-500">{tool.description}</p>
              </div>
            </div>

            {/* Tool card */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-sm sm:p-8">
              {ToolComponent ? <LocaleProvider locale="zh"><ToolComponent /></LocaleProvider> : <p className="text-zinc-500">工具开发中...</p>}
            </div>

            <WorkflowSuggestions currentSlug={slug} />

            {/* FAQ Section */}
            {tool.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-lg font-bold text-zinc-300">常见问题</h2>
                <div className="space-y-3">
                  {tool.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-zinc-800/60 bg-zinc-900/40"
                    >
                      <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-zinc-400 transition group-open:text-[#00d4aa]">
                        {faq.q}
                      </summary>
                      <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-500">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            {relatedTools.length > 0 && (
              <div className="sticky top-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-600">
                  同类工具
                </h3>
                <ul className="space-y-1">
                  {relatedTools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tools/${t.slug}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-zinc-800/60 hover:text-zinc-200"
                      >
                        <span className="text-base">{t.icon}</span>
                        <span className="font-medium">{t.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <svg className="h-4 w-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                本地处理
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                你的数据不会离开浏览器。无需注册，无日志记录。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

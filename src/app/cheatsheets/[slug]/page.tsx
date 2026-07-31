import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCheatSheet, getAllCheatSheetSlugs, cheatsheets } from "@/lib/cheatsheets";
import Link from "next/link";
import CheatSheetContent from "@/components/CheatSheetContent";

export function generateStaticParams() {
  return getAllCheatSheetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) return {};
  return {
    title: sheet.seoTitle,
    description: sheet.seoDescription,
    alternates: {
      canonical: `https://toolstation-sooty.vercel.app/cheatsheets/${slug}`,
      languages: {
        "zh": `https://toolstation-sooty.vercel.app/cheatsheets/${slug}`,
        "en": `https://toolstation-sooty.vercel.app/en/cheatsheets/${slug}`,
      },
    },
    openGraph: {
      title: sheet.seoTitle,
      description: sheet.seoDescription,
      type: "website",
      locale: "zh_CN",
    },
  };
}

export default async function CheatSheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();

  const relatedSheets = cheatsheets
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#030305]">
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-[#00d4aa]/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-600">
          <Link href="/" className="flex items-center gap-1.5 transition hover:text-[#00d4aa]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            首页
          </Link>
          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/cheatsheets" className="transition hover:text-[#00d4aa]">
            速查表
          </Link>
          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-zinc-400">{sheet.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10 flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-3xl ring-1 ring-zinc-800">
            {sheet.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{sheet.title}</h1>
            <p className="mt-1.5 text-base text-zinc-500">{sheet.description}</p>
          </div>
        </div>

        {/* Content */}
        <CheatSheetContent sheet={sheet} />

        {/* Related cheatsheets */}
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-bold text-zinc-300">更多速查表</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedSheets.map((s) => (
              <Link
                key={s.slug}
                href={`/cheatsheets/${s.slug}`}
                className="flex items-center gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 backdrop-blur-sm transition hover:border-[#00d4aa]/30 hover:bg-zinc-800/60"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-medium text-zinc-300">{s.title}</p>
                  <p className="text-sm text-zinc-500">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

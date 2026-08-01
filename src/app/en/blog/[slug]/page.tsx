import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";
import BlogPostContent from "@/components/BlogPostContent";

const BASE_URL = "https://toolstation-sooty.vercel.app";

export function generateStaticParams() {
  return getAllPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "en");
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${BASE_URL}/en/blog/${post.slug}`,
      languages: {
        "zh": `${BASE_URL}/blog/${post.slug}`,
        "en": `${BASE_URL}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "en_US",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPageEN({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug, "en");
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/en/blog/${post.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "ToolStation",
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-[#00d4aa]/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-zinc-400" aria-label="Breadcrumb">
          <Link href="/en" className="transition hover:text-[#00d4aa]">
            Home
          </Link>
          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/en/blog" className="transition hover:text-[#00d4aa]">
            Blog
          </Link>
          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="truncate font-medium text-zinc-400">{post.title}</span>
        </nav>

        <BlogPostContent post={post} locale="en" />
      </div>
    </div>
  );
}

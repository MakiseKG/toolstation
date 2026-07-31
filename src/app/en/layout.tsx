import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ToolStation — Free Online Developer Tools",
    template: "%s | ToolStation",
  },
  description:
    "Free online developer tools: JSON formatter, Base64 encoder, URL encoder, text diff, Markdown preview, color converter, and more. All data processed locally in your browser.",
  keywords: [
    "online tools",
    "JSON formatter",
    "Base64",
    "URL encoder",
    "text diff",
    "Markdown",
    "developer tools",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ToolStation — Free Online Developer Tools",
    description: "JSON formatter, Base64 encoder, text diff, Markdown preview, and 20+ free developer tools. All client-side processing.",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://toolstation-sooty.vercel.app/en",
    languages: {
      "en": "https://toolstation-sooty.vercel.app/en",
      "zh": "https://toolstation-sooty.vercel.app",
    },
  },
};

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

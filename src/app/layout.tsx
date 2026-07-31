import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ToolStation — 免费在线开发工具合集",
    template: "%s | ToolStation",
  },
  description:
    "免费的在线开发工具：JSON格式化、Base64编解码、URL编解码、文本对比、Markdown预览、颜色转换等。所有数据本地处理，不传服务器。",
  keywords: [
    "在线工具",
    "JSON格式化",
    "Base64",
    "URL编码",
    "文本对比",
    "Markdown",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ToolStation — 免费在线开发工具合集",
    description: "JSON格式化、Base64、文本对比、Markdown预览等10+实用开发工具",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white dark:bg-zinc-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

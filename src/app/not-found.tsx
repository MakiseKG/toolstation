import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="text-center">
        <p className="text-6xl">🔧</p>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
          404 — 页面未找到
        </h1>
        <p className="mt-2 text-zinc-500">该工具不存在或已被移除</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

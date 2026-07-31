export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-6xl px-4">
        <p>
          © {new Date().getFullYear()} ToolStation — 免费在线开发工具合集
        </p>
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
          所有数据处理均在浏览器本地完成，不会上传到服务器
        </p>
      </div>
    </footer>
  );
}

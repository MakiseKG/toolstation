export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-900 py-8 text-center text-sm text-zinc-600">
      <div className="mx-auto max-w-6xl px-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-zinc-500">ToolStation</span>
          {" "}— 免费在线开发工具
        </p>
        <p className="mt-1 text-xs text-zinc-700">
          所有数据处理均在浏览器本地完成
        </p>
      </div>
    </footer>
  );
}

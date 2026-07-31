"use client";

import { useState, useMemo } from "react";

const REGEX_LIBRARY = [
  { name: "邮箱", pattern: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", flags: "", example: "test@example.com" },
  { name: "手机号（中国）", pattern: "^1[3-9]\\d{9}$", flags: "", example: "13800138000" },
  { name: "URL", pattern: "https?://[\\w.-]+\\.[a-zA-Z]{2,}(/\\S*)?", flags: "i", example: "https://example.com/path" },
  { name: "IPv4", pattern: "^(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)$", flags: "", example: "192.168.1.1" },
  { name: "身份证号", pattern: "^\\d{6}(19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$", flags: "", example: "110101199001011234" },
  { name: "数字", pattern: "^\\d+$", flags: "", example: "12345" },
  { name: "中文", pattern: "[\\u4e00-\\u9fa5]+", flags: "g", example: "你好世界" },
  { name: "日期（YYYY-MM-DD）", pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$", flags: "", example: "2024-01-15" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("[a-z]+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hello World 123");
  const [showLib, setShowLib] = useState(false);

  const result = useMemo(() => {
    if (!pattern || !text) return null;
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = re.exec(text)) !== null) {
          matches.push({ match: m[0], index: m.index });
          if (m[0] === "") break;
        }
      } else {
        m = re.exec(text);
        if (m) matches.push({ match: m[0], index: m.index });
      }
      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: (e as Error).message };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result || result.error || !result.matches.length) return text;
    let html = "";
    let last = 0;
    const sorted = [...result.matches].sort((a, b) => a.index - b.index);
    for (const m of sorted) {
      html += escapeHtml(text.slice(last, m.index));
      html += `<mark class="bg-amber-200 text-amber-900 dark:bg-amber-700 dark:text-amber-100 rounded px-0.5">${escapeHtml(text.slice(m.index, m.index + m.match.length))}</mark>`;
      last = m.index + m.match.length;
    }
    html += escapeHtml(text.slice(last));
    return html;
  }, [text, result]);

  const applyLibrary = (item: typeof REGEX_LIBRARY[0]) => {
    setPattern(item.pattern);
    setFlags(item.flags);
    setText(item.example);
    setShowLib(false);
  };

  return (
    <div className="space-y-4">
      {/* Pattern input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="正则表达式，如 [a-z]+"
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="flags"
          className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm text-center outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>

      {/* Regex Library */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <button
          onClick={() => setShowLib(!showLib)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300"
        >
          <span>📚 常用正则库（点击快速填充）</span>
          <span className="text-zinc-400">{showLib ? "▲" : "▼"}</span>
        </button>
        {showLib && (
          <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {REGEX_LIBRARY.map((item) => (
                <button
                  key={item.name}
                  onClick={() => applyLibrary(item)}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-blue-700"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <textarea
        className="tool-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入测试文本..."
        rows={6}
      />

      {result?.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">
          {result.error}
        </p>
      )}

      {result && !result.error && (
        <>
          <p className="text-sm text-zinc-500">
            匹配到 {result.matches.length} 个结果
          </p>
          <div
            className="min-h-[100px] rounded-lg border border-zinc-200 bg-white p-3 text-sm font-mono leading-relaxed dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </>
      )}
    </div>
  );
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

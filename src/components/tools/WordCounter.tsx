"use client";

import { useState, useMemo } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    if (!text.trim()) return null;
    return {
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, "").length,
      words: text.trim().split(/\s+/).filter(Boolean).length,
      lines: text.split("\n").length,
      paragraphs: text.split("\n\n").filter((p) => p.trim()).length,
      bytes: new TextEncoder().encode(text).length,
      chineseChars: (text.match(/[一-鿿]/g) || []).length,
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="在此输入或粘贴文本..."
        rows={10}
      />
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["字符数", stats.chars],
            ["不含空格", stats.charsNoSpace],
            ["单词数", stats.words],
            ["行数", stats.lines],
            ["段落数", stats.paragraphs],
            ["字节数", stats.bytes],
            ["中文字数", stats.chineseChars],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="text-2xl font-bold text-blue-600">{value}</div>
              <div className="text-xs text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

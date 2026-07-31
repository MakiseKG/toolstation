"use client";

import { useState } from "react";

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // 移除注释
    .replace(/\s+/g, " ")
    .replace(/\s*([{},;:>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/^\s+|\s+$/g, "");
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);

  const minify = () => {
    const original = new TextEncoder().encode(input).length;
    const minified = minifyCss(input);
    setOutput(minified);
    setBefore(original);
    setAfter(new TextEncoder().encode(minified).length);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="粘贴 CSS 代码..."
        rows={10}
      />
      <div className="flex gap-2">
        <button onClick={minify} className="tool-btn tool-btn-primary">
          压缩
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setBefore(0);
            setAfter(0);
          }}
          className="tool-btn"
        >
          清空
        </button>
      </div>
      {output && (
        <>
          <div className="flex gap-4 text-sm text-zinc-500">
            <span>压缩前：{before.toLocaleString()} 字节</span>
            <span>压缩后：{after.toLocaleString()} 字节</span>
            <span className="text-green-600">
              节省 {((1 - after / before) * 100).toFixed(1)}%
            </span>
          </div>
          <textarea
            className="tool-textarea"
            value={output}
            readOnly
            rows={6}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </>
      )}
    </div>
  );
}

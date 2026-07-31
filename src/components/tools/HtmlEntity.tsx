"use client";

import { useState } from "react";

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const REV_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

export default function HtmlEntity() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    if (mode === "encode") {
      setOutput(input.replace(/[&<>"']/g, (ch) => ENTITIES[ch] || ch));
    } else {
      setOutput(
        input.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (m) => REV_ENTITIES[m] || m)
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`tool-btn ${mode === "encode" ? "tool-btn-primary" : ""}`}
        >
          HTML 实体编码
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`tool-btn ${mode === "decode" ? "tool-btn-primary" : ""}`}
        >
          HTML 实体解码
        </button>
      </div>
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encode"
            ? "输入要编码的 HTML 文本..."
            : "输入 HTML 实体字符串..."
        }
        rows={6}
      />
      <div className="flex gap-2">
        <button onClick={process} className="tool-btn tool-btn-primary">
          转换
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
          }}
          className="tool-btn"
        >
          清空
        </button>
      </div>
      {output && (
        <textarea
          className="tool-textarea"
          value={output}
          readOnly
          rows={6}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      )}
    </div>
  );
}

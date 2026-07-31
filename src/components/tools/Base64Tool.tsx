"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setOutput("❌ 输入内容无效，请检查");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`tool-btn ${mode === "encode" ? "tool-btn-primary" : ""}`}
        >
          Base64 编码
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`tool-btn ${mode === "decode" ? "tool-btn-primary" : ""}`}
        >
          Base64 解码
        </button>
      </div>
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encode" ? "输入要编码的文本..." : "输入 Base64 字符串..."
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

"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function UrlEncoder() {
  const t = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input.trim()));
      }
    } catch {
      setOutput("❌ 输入内容无效");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`tool-btn ${mode === "encode" ? "tool-btn-primary" : ""}`}
        >
          {t("urlEncode")}
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`tool-btn ${mode === "decode" ? "tool-btn-primary" : ""}`}
        >
          {t("urlDecode")}
        </button>
      </div>
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("urlHint")}
        rows={6}
      />
      <div className="flex gap-2">
        <button onClick={process} className="tool-btn tool-btn-primary">
          {t("convert")}
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
          }}
          className="tool-btn"
        >
          {t("clear")}
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

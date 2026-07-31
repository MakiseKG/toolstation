"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

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
  const t = useT();
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
          {t("htmlEntityEncode")}
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`tool-btn ${mode === "decode" ? "tool-btn-primary" : ""}`}
        >
          {t("htmlEntityDecode")}
        </button>
      </div>
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encode"
            ? t("input")
            : t("input")
        }
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

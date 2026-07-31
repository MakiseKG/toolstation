"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // 移除注释
    .replace(/\s+/g, " ")
    .replace(/\s*([{},;:>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/^\s+|\s+$/g, "");
}

export default function CssMinifier() {
  const t = useT();
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
        placeholder={t("cssMinify")}
        rows={10}
      />
      <div className="flex gap-2">
        <button onClick={minify} className="tool-btn tool-btn-primary">
          {t("minify")}
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
          {t("clear")}
        </button>
      </div>
      {output && (
        <>
          <div className="flex gap-4 text-sm text-zinc-500">
            <span>{t("originalSize")}：{before.toLocaleString()} {t("bytes")}</span>
            <span>{t("minifiedSize")}：{after.toLocaleString()} {t("bytes")}</span>
            <span className="text-green-600">
              {t("saved")} {((1 - after / before) * 100).toFixed(1)}%
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

"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

function formatHtml(html: string): string {
  let formatted = "";
  let indent = 0;
  const tab = "  ";
  html.split(/></).forEach((element, i) => {
    if (i > 0) element = "<" + element;
    if (element.endsWith("/>")) {
      formatted += tab.repeat(indent) + element + ">\n";
    } else if (element.startsWith("</")) {
      indent--;
      formatted += tab.repeat(indent) + element + ">\n";
    } else if (element.startsWith("<")) {
      formatted += tab.repeat(indent) + element + ">\n";
      if (!element.includes("/>") && !element.startsWith("<!")) indent++;
    } else {
      formatted += tab.repeat(indent) + element + "\n";
    }
  });
  return formatted.trim();
}

function minifyHtml(html: string): string {
  return html
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .replace(/\n/g, "")
    .trim();
}

export default function HtmlFormatter() {
  const t = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("input") + " HTML..."}
        rows={10}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setOutput(formatHtml(input))}
          className="tool-btn tool-btn-primary"
        >
          {t("format")}
        </button>
        <button
          onClick={() => setOutput(minifyHtml(input))}
          className="tool-btn"
        >
          {t("minify")}
        </button>
        <button
          onClick={() => { setInput(""); setOutput(""); }}
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
          rows={12}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      )}
    </div>
  );
}

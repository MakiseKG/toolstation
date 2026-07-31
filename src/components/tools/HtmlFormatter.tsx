"use client";

import { useState } from "react";

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
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="粘贴 HTML 代码..."
        rows={10}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setOutput(formatHtml(input))}
          className="tool-btn tool-btn-primary"
        >
          格式化
        </button>
        <button
          onClick={() => setOutput(minifyHtml(input))}
          className="tool-btn"
        >
          压缩
        </button>
        <button
          onClick={() => { setInput(""); setOutput(""); }}
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
          rows={12}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      )}
    </div>
  );
}

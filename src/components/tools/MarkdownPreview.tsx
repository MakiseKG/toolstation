"use client";

import { useState } from "react";

function renderMarkdown(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold / Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Code blocks
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, "").replace(/```$/, "");
      return `<pre><code>${escapeHtml(code.trimEnd())}</code></pre>`;
    })
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Blockquote
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Tables (simple: | a | b |)
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter((c) => c.trim());
      const isHeader = /^[\s|-]+$/.test(cells.join(""));
      if (isHeader) return "";
      return `<tr>${cells.map((c) => `<td>${c.trim()}</td>`).join("")}</tr>`;
    })
    // Unordered list
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // Ordered list
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Paragraphs (lines that aren't tags)
    .replace(/^(?!<[a-z/])(.+)$/gm, "<p>$1</p>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>\s*)+/g, "<ul>$&</ul>");

  return html;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function MarkdownPreview() {
  const [input, setInput] = useState(`# Markdown 预览

欢迎使用 **Markdown** 编辑器！

## 功能列表

- **粗体** 和 *斜体*
- \`行内代码\`
- [链接](https://example.com)

## 代码块

\`\`\`
console.log("Hello, World!");
\`\`\`

> 这是一段引用文字

---

编辑左侧内容，右侧实时预览。`);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-500">
          编辑
        </label>
        <textarea
          className="tool-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={20}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-500">
          预览
        </label>
        <div
          className="markdown-body min-h-[200px] rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(input) }}
        />
      </div>
    </div>
  );
}

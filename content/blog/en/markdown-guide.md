---
slug: markdown-guide
title: "Markdown Guide: Syntax Cheat Sheet & Real-Time Preview"
description: Master core Markdown syntax and GitHub Flavored Markdown (GFM) extensions, and learn why real-time preview makes writing faster. Includes a syntax cheat sheet.
keywords: [markdown, markdown syntax, markdown editor, GFM, real-time preview]
date: 2026-08-03
toolSlug: markdown-preview
category: Developer Tools
---

Markdown expresses formatting with simple plain-text symbols, letting writers focus on content instead of layout. READMEs, technical docs, blogs, and notes — it's everywhere. The secret to writing good Markdown: **master the core syntax and verify with real-time preview**.

This guide walks through the common syntax and shows how to use a [Markdown editor with live preview](/en/tools/markdown-preview) to see your output as you type.

## Core Syntax Cheat Sheet

```markdown
# Heading 1        ## Heading 2
**bold**           *italic*        ~~strikethrough~~
- unordered list   1. ordered list
[link text](https://example.com)
![image alt](https://example.com/img.png)
> blockquote
`inline code`
```

```js
// Fenced code block with syntax highlighting
const greeting = "Hello, Markdown!";
```

Master these and you cover 90% of everyday writing.

## GFM Extensions: The GitHub Enhancements

GFM (GitHub Flavored Markdown) adds a few high-frequency features on top of the basics — especially useful for technical documentation:

### Tables

```markdown
| Syntax       | Use              |
|--------------|------------------|
| `-` list     | Unordered list   |
| `>` quote    | Blockquote       |
| ` ``` `      | Code highlighting|
```

### Task lists

```markdown
- [x] Completed item
- [ ] Todo item
```

### Math formulas (KaTeX)

```latex
$$ E = mc^2 $$
```

## Why Real-Time Preview

Markdown's pain point: "you don't know what it looks like until it renders." Misaligned table columns, unclosed code fences, broken links — all hard to spot in raw text. A [Markdown live preview tool](/en/tools/markdown-preview) renders on the left side as you type on the right:

- Syntax errors **surface immediately**, not after publishing
- Tables, highlighting, and formulas are WYSIWYG
- Write docs, notes, and blog drafts all in one place

## Common Pitfalls

- **Table missing the header separator**: tables need a `|---|---|` divider row to render
- **Unclosed code fence**: three backticks must pair up, or the whole section becomes code
- **Inconsistent list indentation**: mixing 2-space and 4-space breaks nesting

## Summary

- Core syntax: headings, bold, lists, links, code blocks — enough for most writing
- GFM extensions: tables, task lists, formulas — built for technical docs
- Use the [Markdown online editor](/en/tools/markdown-preview) for real-time preview; writing becomes faster and everything stays local

Open the tool and drop in a draft to see the difference immediately.

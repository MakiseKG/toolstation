---
slug: markdown-guide
title: Markdown 语法与实时预览指南：从入门到 GFM
description: 掌握 Markdown 核心语法、GitHub Flavored Markdown（GFM）扩展特性，以及如何用实时预览编辑器提升写作效率。附常用语法速查表。
keywords: [Markdown, Markdown语法, Markdown编辑器, GFM, 实时预览]
date: 2026-08-03
toolSlug: markdown-preview
category: 开发工具
---

Markdown 用纯文本的简单符号表达排版，让作者专注于内容而不是格式。README、技术文档、博客、笔记，几乎无处不在。写好 Markdown 的秘诀是：**掌握核心语法 + 用实时预览即时验证**。

这篇文章带你过一遍 Markdown 常用语法，并介绍如何用[Markdown 在线编辑器](/tools/markdown-preview)边写边看效果。

## 核心语法速查

```markdown
# 一级标题        ## 二级标题
**加粗**          *斜体*          ~~删除线~~
- 无序列表       1. 有序列表
[链接文字](https://example.com)
![图片描述](https://example.com/img.png)
> 引用文字
`行内代码`
```

```js
// 围栏代码块，支持语法高亮
const greeting = "Hello, Markdown!";
```

记住这几种语法，就能覆盖 90% 的写作需求。

## GFM 扩展：GitHub 风格的加分项

GFM（GitHub Flavored Markdown）在基础语法上增加了几项高频特性，对写技术文档尤其有用：

### 表格

```markdown
| 语法      | 用途         |
|-----------|--------------|
| `-` 列表  | 无序列表     |
| `>` 引用  | 引用块       |
| ` ``` `   | 代码块高亮   |
```

### 任务列表

```markdown
- [x] 已完成的事项
- [ ] 待办事项
```

### 数学公式（KaTeX）

```latex
$$ E = mc^2 $$
```

## 为什么用实时预览

Markdown 的痛点在于「不渲染就不知道效果」。表格列没对齐、代码块没闭合、链接写错，在纯文本里很难发现。[Markdown 实时预览工具](/tools/markdown-preview)左侧写右侧预览，每次敲键立即渲染：

- 语法错误**当场暴露**，不用等发布
- 表格、高亮、公式所见即所得
- 写文档、记笔记、搭博客草稿都能用

## 常见陷阱

- **表格缺少表头分隔行**：表格需要 `|---|---|` 分隔行才能渲染
- **代码块未闭合**：三个反引号必须成对，否则整段变代码
- **列表缩进不一致**：混合 2 空格和 4 空格会导致层级错乱

## 总结

- 核心语法：标题、加粗、列表、链接、代码块——掌握即够用
- GFM 扩展：表格、任务列表、公式，写技术文档的利器
- 用[Markdown 在线编辑器](/tools/markdown-preview)实时预览，写作效率翻倍，内容全部在本地处理

现在就打开工具，把你手头的草稿贴进去试一段吧。

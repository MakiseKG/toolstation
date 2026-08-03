---
slug: html-entity-guide
title: "HTML Entities Guide: Escaping Special Characters & XSS Protection"
description: Learn what HTML entities are, the essential escape table, and why encoding user input is the key defense against XSS attacks.
keywords: [HTML entities, HTML escape, XSS protection, special characters, encoding]
date: 2026-08-03
toolSlug: html-entity
category: Developer Tools
---

The `<` you see on a web page might be written as `&lt;` in the source code — that's an HTML entity. Entities tell the browser "display this as a literal character, don't parse it as a tag." Understanding HTML entities is foundational to **preventing XSS attacks**. This guide covers the mechanics and shows how to encode/decode with the [HTML entity encoder/decoder](/en/tools/html-entity).

## Why HTML Entities Exist

The browser parses `<b>` as a bold tag. To show the literal text `<b>` to a user, you must escape it:

```html
<!-- The browser displays: <b> is the bold tag -->
&lt;b&gt; is the bold tag
```

## The Essential Escape Table

| Char | Entity | Notes |
|------|--------|-------|
| `<` | `&lt;` | less-than |
| `>` | `&gt;` | greater-than |
| `&` | `&amp;` | ampersand (most often forgotten) |
| `"` | `&quot;` | double quote |
| `'` | `&#39;` | single quote |
| `©` | `&copy;` | copyright symbol |

**Note that `&` itself must be escaped** — it's the "entity of entities." Skipping it corrupts the parsing of every entity that follows.

## XSS Attacks and Entity Encoding

XSS (cross-site scripting) most often happens when **user input is inserted into HTML without escaping**. An attacker submits `<script>alert(1)</script>`; if you output it directly, that script executes on your page.

```js
// Dangerous: concatenating user input directly
innerHTML = userInput;

// Safe: HTML-encode first
innerHTML = escapeHtml(userInput);
```

Any user-controlled content — usernames, comments, URL parameters — **must be encoded before being rendered into HTML**. This is a baseline both frontend and backend must enforce.

## Encoding and Decoding in Practice

In the [HTML entity tool](/en/tools/html-entity):

- **Encode**: turn `<script>` into `&lt;script&gt;` for safe output
- **Decode**: restore entities to raw characters for inspection

Both are handy for debugging API responses and verifying that escaping is correct.

## Summary

- Entities make the browser treat characters as literals, not tags
- `&`, `<`, `>`, `"`, `'` are the five you'll escape most
- **Always encode user input before outputting it** — the cornerstone of XSS defense
- Encode/decode instantly with the [HTML entity encoder/decoder](/en/tools/html-entity), fully client-side

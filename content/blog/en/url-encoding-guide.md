---
slug: url-encoding-guide
title: "URL Encoding Explained: Why It Matters & encodeURI vs encodeURIComponent"
description: Understand percent encoding principles and rules, master encodeURI vs encodeURIComponent, and fix broken links caused by Chinese characters and special symbols.
keywords: [URL encoding, URL encode, percent encoding, encodeURI, encodeURIComponent]
date: 2026-08-01
toolSlug: url-encoder
category: Developer Tools
---

Have you ever copied a link containing Chinese characters or special symbols only to get a 404 when you open it? Or passed a query parameter containing `&` or `#` only to have it silently truncated? These are exactly the problems **URL encoding** solves.

## What Is URL Encoding?

URL encoding (also called percent encoding) converts unsafe characters in a URL into `%XX` form, where XX is the character's hexadecimal byte value.

For example:

- Space → `%20`
- `#` → `%23`
- `&` → `%26`
- Non-ASCII characters → their UTF-8 byte sequences

It's called percent encoding because the encoded characters begin with a `%`.

## Why Do We Need URL Encoding?

URLs have strict character rules. The only "safe characters" that can appear directly in a URL are:

- Letters and digits
- Hyphen `-`, underscore `_`, period `.`, tilde `~`

Other characters (spaces, `&`, `#`, `?`, `=`, non-ASCII) can break URL structure in specific contexts:

| Character | Problem |
|---|---|
| Space | Browsers truncate it, breaking the URL |
| `&` | Parsed as a parameter separator in the query string |
| `#` | Parsed as a fragment; everything after it never reaches the server |
| `%` | Itself the encoding symbol; must be escaped as `%25` |
| Non-ASCII | Must be encoded for transmission |

## encodeURI vs encodeURIComponent

This is the pair JavaScript developers confuse most often. The core difference: **encodeURI preserves URL structure characters, encodeURIComponent escapes everything.**

### encodeURI: For the Whole URL

```javascript
encodeURI("https://example.com/search?q=tools");
// Result: https://example.com/search?q=tools (structure preserved)
```

Note: `://`, `?`, `&`, `#`, `=` are **left unchanged**.

### encodeURIComponent: For Parameter Values

```javascript
encodeURIComponent("name=John & developer");
// Result: name%3DJohn%20%26%20developer
```

Note: even `=`, `&`, and space are escaped.

### Correct Usage

| Scenario | Use |
|---|---|
| Encoding an entire URL | `encodeURI` |
| Building a query parameter value | `encodeURIComponent` |
| Encoding a path segment | `encodeURI` (but note `/` is preserved) |

**The most common bug** is using `encodeURI` where `encodeURIComponent` is needed, letting `&` inside a parameter value split the query.

## URL Encoding in Other Languages

- **Python**: `urllib.parse.quote()` for encoding, `urllib.parse.urlencode()` for parameter pairs
- **Node.js**: `encodeURIComponent` behaves identically to the browser
- **PHP**: `urlencode()` and `rawurlencode()` (the latter is stricter)

## Encode/Decode With a Tool

Writing encoding rules by hand is error-prone, especially while debugging APIs. With the [URL encoder/decoder tool](/en/tools/url-encoder), paste your text and encode or decode in one click, supporting:

- URL encoding / decoding
- Automatic handling of non-ASCII characters and special symbols

## Summary

- URL encoding converts unsafe characters to `%XX` form to protect URL structure
- Non-ASCII characters, spaces, `&`, and `#` must be encoded
- `encodeURI` preserves structure; `encodeURIComponent` escapes everything — they serve different purposes
- When debugging APIs, use an online [URL encoding tool](/en/tools/url-encoder) for speed

All client-side, no uploads required.

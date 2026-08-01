---
slug: regex-guide-beginners
title: "Regex Tutorial for Beginners: Master Common Patterns & Debugging"
description: Learn regular expression basics, common patterns, flags, and how to debug efficiently with an online regex tester. Hands-on from zero to production.
keywords: [regex, regular expression, regex tester, regex tutorial, regex flags]
date: 2026-08-01
toolSlug: regex-tester
category: Developer Tools
---

Regular expressions (regex) are one of the most valuable skills a developer can master. They use pattern-matching syntax to find, extract, or replace text that matches a rule. This tutorial builds a complete mental framework from zero.

## What Is Regex?

Simply put, regex is a **template that describes a character pattern**. For example:

```javascript
/^\d{11}$/            // matches exactly 11 digits (US phone number)
/\b[A-Z]{3}\b/        // matches a 3-letter all-caps word
```

Regex shows up everywhere: log processing, data cleaning, form validation, code search…

## Basic Syntax: Literals & Metacharacters

### Literal Characters

Most characters match themselves: `cat` matches "cat" in a string.

### Metacharacters (Special Meanings)

| Metacharacter | Meaning | Example |
|---|---|---|
| `.` | Any single character (except newline) | `c.t` matches cat, cot |
| `\d` | Any digit (0-9) | `\d{4}` matches 4 digits |
| `\w` | Letter, digit, or underscore | `\w+` matches a word |
| `\s` | Whitespace (space, tab, newline) | |
| `^` | Start of string | `^Hello` |
| `$` | End of string | `world$` |
| `\b` | Word boundary | `\bcat\b` matches only the standalone word cat |

### Quantifiers: How Many Times

| Quantifier | Meaning |
|---|---|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 |
| `{n}` | Exactly n |
| `{n,}` | At least n |
| `{n,m}` | Between n and m |

### Character Classes & Groups

```regex
[abc]      // any one of a, b, c
[a-z]      // any lowercase letter
[0-9]      // any digit, same as \d
[^abc]     // any character except a, b, c
(ab|c)     // grouping + alternation
```

## Flags: Changing Match Behavior

| Flag | Meaning | Description |
|---|---|---|
| `g` | Global | Match all occurrences, not just the first |
| `i` | Case-insensitive | `/hello/i` matches Hello, HELLO |
| `m` | Multiline | `^` and `$` apply to each line |
| `s` | Dot matches newline | `.` doesn't match newlines by default |
| `u` | Unicode | Correctly handles non-ASCII characters |

When using the [regex tester tool](/en/tools/regex-tester), flags can be toggled directly.

## Practical Patterns

Here are the highest-frequency patterns used in development — the [regex tester](/en/tools/regex-tester) ships with these templates built in:

| Purpose | Pattern |
|---|---|
| Email | `^[\w.+-]+@[\w-]+\.[\w.-]+$` |
| US phone | `^\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$` |
| URL | `^https?://[\w.-]+(:\d+)?(/[\w./?%&=-]*)?$` |
| IPv4 address | `^(\d{1,3}\.){3}\d{1,3}$` |
| Positive integer | `^\d+$` |
| Hex color | `^#?([0-9a-fA-F]{3}\|[0-9a-fA-F]{6})$` |

## Three Debugging Tips

1. **Test in pieces**: Break long regexes into small chunks and verify each before combining
2. **Use edge-case test strings**: Include empty lines, leading/trailing spaces, mixed case
3. **Start simple**: Use `\d+` first to confirm basic matching, then layer on constraints

## Common Pitfalls

- ❌ Thinking `[abc]+` means "a combination of ab/bc" — it actually means "any of a, b, c repeated"
- ❌ Forgetting to escape `\` inside strings (e.g., `\\d` in JS source)
- ❌ Forgetting the `g` flag, matching only the first result

## Summary

- Regex uses pattern templates: metacharacters + quantifiers + character classes + groups
- Flags control matching scope: `g` global, `i` case-insensitive, `m` multiline
- Reuse battle-tested templates for high-frequency patterns (email, phone, URL)

Open the [online regex tester](/en/tools/regex-tester), enter a pattern and test string, and see highlighted matches in real time — with a built-in library of common patterns. Fully client-side.

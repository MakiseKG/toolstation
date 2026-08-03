---
slug: unix-timestamp-guide
title: "Unix Timestamp Explained: Seconds vs Milliseconds, Common Uses & Conversions"
description: Understand what a Unix timestamp is (1970 epoch, timezone-free), the seconds vs milliseconds gotcha, and how to convert between timestamps and dates in code.
keywords: [Unix timestamp, timestamp converter, epoch time, milliseconds, time format]
date: 2026-08-03
toolSlug: timestamp
category: Developer Tools
---

The Unix timestamp (also called Epoch time) is the most universal way computers represent time — but it's also one of the most common sources of bugs in frontend-backend integration. One developer uses seconds, another uses milliseconds, and suddenly the times don't match. This guide explains how timestamps work, how to convert them, and introduces a [timestamp converter tool](/en/tools/timestamp) for daily use.

## What Is a Unix Timestamp?

A Unix timestamp is the number of seconds (or milliseconds) elapsed since **January 1, 1970 00:00:00 UTC** — the Unix epoch:

- `1754092800` is a **second**-based timestamp
- `1754092800000` is a **millisecond**-based timestamp

Because it carries no timezone information, it's the standard way to exchange time across systems — the same instant produces the same timestamp everywhere on Earth.

## Seconds vs Milliseconds: The #1 Gotcha

Different languages return different precisions by default:

```js
// JavaScript defaults to milliseconds
Date.now();                          // 1754092800000
Math.floor(Date.now() / 1000);       // 1754092800 (seconds)

// PHP defaults to seconds
time();                              // 1754092800
```

Mixing seconds and milliseconds between systems produces times that are **1,000× apart** (about 3 years). **Always confirm the unit before processing a timestamp.**

## Common Use Cases

- **API signatures & expiration**: JWT's `exp` claim, verification-code timeouts
- **Database storage**: `bigint` columns are smaller than date strings and natively sortable
- **Caching & logging**: unified timestamp comparisons for cache TTL and log ordering

## Converting Between Timestamps and Dates

```js
// Timestamp → date
new Date(1754092800000).toISOString();  // "2025-08-01T16:00:00.000Z"

// Date → timestamp
new Date("2025-08-01").getTime();       // 1754092800000
```

With the [timestamp converter tool](/en/tools/timestamp), paste any timestamp to get **local time, ISO format, and UTC format** at once — or reverse a date into both second- and millisecond-based timestamps without any mental math.

## Summary

- Timestamps count from 1970-01-01 UTC and are timezone-free
- **Seconds vs milliseconds** is the most common pitfall — confirm the unit first
- Convert instantly with the [timestamp converter](/en/tools/timestamp); everything runs locally in your browser, and your data never leaves your machine

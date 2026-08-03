---
slug: number-base-guide
title: "Number Base Conversion Guide: Binary, Octal, Decimal, Hexadecimal"
description: Understand binary, octal, decimal, and hexadecimal bases, how to convert between them, the 0b/0o/0x prefixes in code, and why hex pairs with bitwise operations.
keywords: [number base converter, binary to decimal, hexadecimal, octal, radix conversion]
date: 2026-08-03
toolSlug: number-base
category: Developer Tools
---

`255`, `0xFF`, and `0b11111111` are the same number. Understanding number bases is the key to reading low-level code: bitwise operations, memory addresses, color values, and permission masks all use binary and hexadecimal. This guide explains the four bases and conversion math, then introduces a [number base converter tool](/en/tools/number-base) to skip the manual arithmetic.

## The Four Bases

- **Binary (BIN)**: base-2, only `0` and `1` — the native language of computers
- **Octal (OCT)**: base-8, digits `0-7` — famous for Unix file permissions
- **Decimal (DEC)**: base-10, digits `0-9` — everyday human counting
- **Hexadecimal (HEX)**: base-16, digits `0-9` and `A-F` — the usual notation for colors and memory addresses

## Converting Decimal to Other Bases: Short Division

Convert `42` to binary:

```
42 ÷ 2 = 21 rem 0
21 ÷ 2 = 10 rem 1
10 ÷ 2 = 5  rem 0
 5 ÷ 2 = 2  rem 1
 2 ÷ 2 = 1  rem 0
 1 ÷ 2 = 0  rem 1
```

Read the remainders bottom-up: `101010`, so `42 = 0b101010`.

## Base Prefixes in Code

```js
const a = 255;          // decimal
const b = 0xFF;         // hexadecimal, equals 255
const c = 0b11111111;   // binary, equals 255
const d = 0o377;        // octal, equals 255

// Any base → decimal
parseInt("FF", 16);     // 255
// Decimal → any base
(255).toString(16);     // "ff"
```

JavaScript converts between any bases with `parseInt(str, radix)` and `Number.prototype.toString(radix)`.

## Why Bitwise Work Uses Hex

One hex digit maps exactly to **4 binary bits**, so conversion needs no arithmetic:

```
0xF  → 1111
0x3C → 0011 1100
```

That's why permission masks, color values, and protocol fields are written in hex — compact, and a 1:1 fit with binary.

## Converting Efficiently

Enter a number in the [number base converter tool](/en/tools/number-base) and all four bases (BIN/OCT/DEC/HEX) appear at once, with big-number support — no short division by hand.

## Summary

- Binary is the foundation; octal, decimal, and hex are its "shorthand"
- Hex ↔ binary converts 4 bits per digit, no calculation needed
- See all four bases simultaneously with the [number base converter](/en/tools/number-base), fully client-side

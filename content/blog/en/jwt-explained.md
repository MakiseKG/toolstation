---
slug: jwt-explained
title: "JWT Explained: Header, Payload, Signature & Security Best Practices"
description: Understand JWT structure (Header/Payload/Signature), the difference between signing and encoding, safe Token usage, and common security risks.
keywords: [JWT, JWT decoder, Token, JSON Web Token, authentication]
date: 2026-08-01
toolSlug: jwt-decoder
category: Developer Tools
---

JWT (JSON Web Token) is one of the most popular stateless authentication schemes today. You'll encounter it in frontend-backend logins, API authorization, and single sign-on. But JWT's structure, signing, and security are often misunderstood. This article gets it right.

## What Does a JWT Look Like?

A JWT consists of three parts separated by dots `.`:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
```

```
Header.Payload.Signature
```

## Part 1: The Header

The header is a JSON object declaring the token type and signing algorithm:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg`: signing algorithm (HS256, RS256, etc.)
- `typ`: token type, always JWT

It's Base64URL-encoded to form the first segment.

## Part 2: The Payload

The payload holds the actual data (called claims), for example:

```json
{
  "sub": "1234567890",
  "name": "Alice",
  "iat": 1516239022,
  "exp": 1516242622
}
```

Common standard claims:

| Claim | Meaning |
|---|---|
| `sub` | Subject (usually the user ID) |
| `exp` | Expiration time |
| `iat` | Issued at |
| `aud` | Audience (intended recipient) |
| `iss` | Issuer |

**Critical reminder**: The payload is only Base64-encoded, not encrypted. Anyone can decode and read it.

## Part 3: The Signature

The signature is used to **verify the token hasn't been tampered with**. For HMAC, the formula is:

```
HMACSHA256(
  base64url(Header) + "." + base64url(Payload),
  server secret
)
```

- The server holds the secret and recomputes the signature, comparing it to the token's
- If they match, the Header and Payload haven't been altered
- The signature requires the secret, so clients can't forge it

Paste any token into the [JWT decoder tool](/en/tools/jwt-decoder) to see the decoded Header and Payload — fully client-side.

## Signing vs Encoding: The Most Important Lesson

**This is the core security insight of JWT:**

- **Encoding** (Base64): anyone can decode it; provides no protection
- **Signing** (HMAC): only the server holding the secret can verify; prevents tampering

So the payload is "publicly readable but tamper-proof." **Never** put passwords, keys, or other sensitive data in the payload.

## Authentication Flow

1. User logs in; server verifies credentials and issues a JWT
2. Client stores the token (localStorage or cookie)
3. Subsequent requests include the token in the `Authorization: Bearer <token>` header
4. Server verifies the signature, checks the `exp` claim, and reads user info

## Common Security Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Token intercepted | Use HTTPS; store the token in an HttpOnly cookie |
| Sensitive data in payload | Only include non-sensitive data like user IDs |
| `alg: none` attack | Strictly enforce an algorithm allowlist on the server |
| Token can't be revoked | Use short `exp`; for immediate invalidation, use a blacklist/refresh mechanism |

## JWT vs Session

| | JWT | Session |
|---|---|---|
| Server storage | None (stateless) | Requires storage |
| Scalability | Naturally distributed | Needs shared storage (Redis) |
| Revocation | Hard (valid until expiry) | Easy |
| Size | Large (sent on every request) | Small (only a session ID) |

Statelessness is JWT's biggest advantage — the server stores no session state, making it ideal for horizontally scalable microservices.

## Summary

- JWT = Header (algorithm) + Payload (data) + Signature (signing)
- **Encoding ≠ encryption** — the payload can be decoded by anyone
- The signature prevents tampering; the secret stays on the server
- Never put sensitive data like passwords in the payload
- Use the [JWT decoder tool](/en/tools/jwt-decoder) to quickly inspect tokens while debugging

Open the [JWT Decoder](/en/tools/jwt-decoder) to inspect your token right now — local parsing, nothing leaves your browser.

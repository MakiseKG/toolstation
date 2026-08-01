---
slug: jwt-explained
title: JWT 全面解析：Header、Payload、Signature 与安全注意事项
description: 深入理解 JWT 结构（Header/Payload/Signature）、签名与编码的区别、如何安全使用 Token，以及常见的安全风险与防护。
keywords: [JWT, JWT解码, Token, JSON Web Token, 认证]
date: 2026-08-01
toolSlug: jwt-decoder
category: 开发工具
---

JWT（JSON Web Token）是当前最流行的无状态认证方案之一。你在前后端登录、API 鉴权、单点登录中几乎一定会遇到它。但 JWT 的结构、签名和安全性却常常被误解。这篇文章帮你彻底搞懂。

## JWT 长什么样？

一个 JWT 由三部分组成，用点号 `.` 分隔：

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
```

```
Header.Payload.Signature
```

## 第一部分：Header（头部）

Header 是 JSON 对象，声明了令牌类型和签名算法：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg`：签名算法（HS256、RS256 等）
- `typ`：令牌类型，固定为 JWT

它会被 Base64URL 编码成第一段。

## 第二部分：Payload（载荷）

Payload 存放实际数据（称为 Claims），例如：

```json
{
  "sub": "1234567890",
  "name": "Alice",
  "iat": 1516239022,
  "exp": 1516242622
}
```

常用标准 Claims：

| Claim | 含义 |
|---|---|
| `sub` | 主题（通常是用户 ID） |
| `exp` | 过期时间 |
| `iat` | 签发时间 |
| `aud` | 受众（接收方） |
| `iss` | 签发者 |

**关键提醒**：Payload 只是 Base64 编码，不是加密。任何人都能解码看到内容。

## 第三部分：Signature（签名）

签名用于**验证令牌未被篡改**。HMAC 算法的签名公式：

```
HMACSHA256(
  base64url(Header) + "." + base64url(Payload),
  服务端密钥
)
```

- 服务器持有密钥，重新计算签名并与 Token 中的签名比对
- 只要签名一致，说明 Header 和 Payload 没有被改动
- 签名需要密钥，客户端无法伪造

用 [JWT 解码工具](/tools/jwt-decoder) 粘贴任意 Token，即可查看解码后的 Header 和 Payload 内容，全程本地处理。

## 签名 vs 编码：最重要的一课

**这是 JWT 安全的核心认知：**

- **编码**（Base64）：任何人都能解开，不提供任何保护
- **签名**（HMAC）：只有持有密钥的服务器能验证，防止篡改

所以 Payload 里的信息是「公开可读但不可篡改」的。**永远不要**把密码、密钥等敏感信息放进 Payload。

## 使用流程

1. 用户登录，服务器验证凭证后签发 JWT
2. 客户端保存 Token（localStorage 或 Cookie）
3. 后续请求在 `Authorization: Bearer <token>` 中带上 Token
4. 服务器验签、检查 `exp` 过期时间、读取用户信息

## 常见安全风险与防护

| 风险 | 防护措施 |
|---|---|
| Token 被截获 | 使用 HTTPS；将 Token 存在 HttpOnly Cookie |
| Payload 泄露敏感信息 | 只放非敏感数据，如用户 ID |
| `alg: none` 攻击 | 服务端严格校验算法白名单 |
| Token 无法撤销 | 设置较短的 `exp`；需要立即失效时使用黑名单/刷新机制 |

## JWT vs Session

| | JWT | Session |
|---|---|---|
| 服务端存储 | 无（无状态） | 需要存储 |
| 扩展性 | 天然支持分布式 | 需要共享存储（Redis） |
| 撤销 | 难（到期前有效） | 容易 |
| 体积 | 较大（每个请求都携带） | 只传 Session ID |

无状态是 JWT 的最大优势——服务端不需要保存任何会话信息，非常适合水平扩展的微服务架构。

## 总结

- JWT = Header（算法）+ Payload（数据）+ Signature（签名）
- **编码 ≠ 加密**，Payload 可被任何人解码
- 签名防止篡改，密钥只在服务端
- 不要把密码等敏感信息放进 Payload
- 用 [JWT 解码工具](/tools/jwt-decoder) 快速查看 Token 内容，方便调试

立即打开 [JWT Decoder](/tools/jwt-decoder) 验证你的 Token，本地解析，绝不外传。

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  faqs: { q: string; a: string }[];
}

export const tools: Tool[] = [
  // ── 文本工具 ──
  {
    slug: "json-formatter",
    name: "JSON 格式化",
    description: "格式化、验证、压缩 JSON 数据，支持智能修复和 TypeScript 接口生成",
    category: "文本",
    icon: "📋",
    keywords: ["json", "format", "beautify", "minify", "validate"],
    seoTitle: "JSON 格式化工具 — 免费在线 JSON 美化/压缩/验证/转 TypeScript",
    seoDescription: "免费在线 JSON 格式化工具，支持 JSON 美化美化、压缩、验证、智能修复错误、生成 TypeScript 接口。数据本地处理，无需上传。",
    faqs: [
      { q: "这个 JSON 格式化工具安全吗？", a: "完全安全。所有 JSON 数据在你自己的浏览器中处理，不会上传到任何服务器。即使断网也能正常使用。" },
      { q: "JSON 格式错误怎么修复？", a: "点击「智能修复」按钮，工具会自动修复常见问题：单引号改双引号、去除 JavaScript 注释、去除尾随逗号、补全缺失的引号。" },
      { q: "支持多大文件的 JSON？", a: "理论上支持到浏览器内存上限（通常几百 MB）。建议超过 10MB 的数据使用本地编辑器处理。" },
    ],
  },
  {
    slug: "base64",
    name: "Base64 编解码",
    description: "Base64 编码与解码转换",
    category: "文本",
    icon: "🔐",
    keywords: ["base64", "encode", "decode", "编码", "解码"],
    seoTitle: "Base64 编解码工具 — 免费在线 Base64 编码/解码/转图片",
    seoDescription: "免费在线 Base64 编解码工具，支持文本转 Base64、Base64 解码、Base64 图片预览。所有操作本地完成，安全快速。",
    faqs: [
      { q: "Base64 编码有什么用？", a: "Base64 主要用于在文本协议（如 HTTP、JSON、XML）中传输二进制数据。常见场景：邮件附件编码、图片内嵌到 HTML/CSS（Data URI）、API 认证 Header。" },
      { q: "Base64 是否等于加密？", a: "不是。Base64 只是编码方式，不需要密钥就能解码，不能用来保护敏感数据。如需加密请使用 AES 等加密算法。" },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL 编解码",
    description: "URL 编码与解码",
    category: "文本",
    icon: "🔗",
    keywords: ["url", "encode", "decode", "编码", "解码"],
    seoTitle: "URL 编解码工具 — 免费在线 URL Encode/Decode",
    seoDescription: "免费在线 URL 编解码工具，支持 URL 编码（Percent Encoding）和解码。快速转换 URL 中的中文、特殊字符和空格。",
    faqs: [
      { q: "什么时候需要 URL 编码？", a: "当 URL 中包含中文、空格或特殊字符（如 &、=、#）时需要编码，否则可能导致链接失效或参数解析错误。" },
      { q: "encodeURI 和 encodeURIComponent 有什么区别？", a: "encodeURI 保留 URL 结构字符（://?#），适合整个 URL；encodeURIComponent 对所有特殊字符编码，适合 URL 参数值。" },
    ],
  },
  {
    slug: "text-diff",
    name: "文本对比",
    description: "对比两段文本的差异，高亮显示增删内容",
    category: "文本",
    icon: "🔍",
    keywords: ["diff", "compare", "对比", "差异"],
    seoTitle: "文本差异对比工具 — 免费在线 Diff Checker",
    seoDescription: "免费在线文本差异对比工具，快速找出两段文本的增删改动。支持代码对比、文档版本对比、配置文件对比。",
    faqs: [
      { q: "能对比代码吗？", a: "可以。支持任何纯文本的对比，包括代码、配置文件、JSON、XML、日志等。工具会逐行高亮显示新增和删除的内容。" },
    ],
  },
  {
    slug: "markdown-preview",
    name: "Markdown 预览",
    description: "实时编辑和预览 Markdown 内容",
    category: "文本",
    icon: "📝",
    keywords: ["markdown", "preview", "md", "预览"],
    seoTitle: "Markdown 在线编辑器 — 实时预览，免费 Markdown 编辑器",
    seoDescription: "免费在线 Markdown 编辑器，左侧编写右侧实时预览。支持 GFM 语法：表格、代码高亮、任务列表、数学公式。",
    faqs: [
      { q: "支持哪些 Markdown 语法？", a: "支持 GitHub Flavored Markdown (GFM)：标题、加粗斜体、列表、表格、代码块高亮、引用、图片、链接、任务列表等。" },
    ],
  },
  {
    slug: "word-counter",
    name: "字数统计",
    description: "统计字符数、单词数、行数、段落数",
    category: "文本",
    icon: "📊",
    keywords: ["word", "count", "字数", "统计"],
    seoTitle: "在线字数统计工具 — 免费统计字符数、单词数、行数",
    seoDescription: "免费在线字数统计工具，精确统计中文字数、英文单词数、字符数（含/不含空格）、行数、段落数。适合自媒体、论文、SEO 优化。",
    faqs: [
      { q: "中文字数怎么算？", a: "中文每个汉字算一个字，不含标点。英文按空格分隔计算单词数。" },
    ],
  },
  {
    slug: "html-formatter",
    name: "HTML 格式化",
    description: "格式化与压缩 HTML 代码",
    category: "文本",
    icon: "🧩",
    keywords: ["html", "format", "beautify", "minify", "格式化"],
    seoTitle: "HTML 格式化/压缩工具 — 免费在线 HTML Beautifier & Minifier",
    seoDescription: "免费在线 HTML 格式化压缩工具。一键美化混乱的 HTML 代码或压缩为一行，提升网页加载速度。",
    faqs: [
      { q: "为什么要压缩 HTML？", a: "HTML 压缩可以去除注释、空格和换行，减少文件体积 15-30%，从而加快网页加载速度，对 SEO 也有好处。" },
    ],
  },
  {
    slug: "regex-tester",
    name: "正则表达式测试",
    description: "实时测试正则表达式，内置常用正则库",
    category: "文本",
    icon: "🔬",
    keywords: ["regex", "regular", "expression", "正则", "测试"],
    seoTitle: "正则表达式测试工具 — 在线 Regex Tester，含常用正则库",
    seoDescription: "免费在线正则表达式测试工具，输入正则和文本实时显示匹配结果并高亮。内置邮箱、手机号、URL、IP 等常用正则库，一键套用。",
    faqs: [
      { q: "不会写正则表达式怎么办？", a: "点击「常用正则库」展开预设模板，包含邮箱、手机号、URL、IP、身份证等常见场景的正则，一键填充到输入框。" },
      { q: "正则 flags 怎么用？", a: "g = 全局匹配，i = 忽略大小写，m = 多行模式，s = 让 . 匹配换行符，u = Unicode 模式。可以组合使用，如 gi。" },
    ],
  },
  {
    slug: "csv-json",
    name: "CSV / JSON 转换",
    description: "CSV 与 JSON 数据格式互转",
    category: "文本",
    icon: "🔄",
    keywords: ["csv", "json", "convert", "转换"],
    seoTitle: "CSV 转 JSON 工具 — 免费在线 CSV JSON 互转",
    seoDescription: "免费在线 CSV 与 JSON 互转工具。支持 CSV 转 JSON 数组、JSON 转 CSV 表格，适合数据分析、API 开发、数据导入导出。",
    faqs: [
      { q: "CSV 分隔符支持哪些？", a: "支持逗号（,）、制表符（Tab）、分号（;）作为分隔符，建议 CSV 中包含逗号时使用 TSV 格式。" },
    ],
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum 占位文本",
    description: "生成占位文本，支持段落、句子、单词模式",
    category: "文本",
    icon: "📄",
    keywords: ["lorem", "ipsum", "placeholder", "占位符", "文本"],
    seoTitle: "Lorem Ipsum 占位文本生成器 — 一键生成占位文案",
    seoDescription: "免费在线 Lorem Ipsum 占位文本生成器。可生成段落、句子或单词，支持中文和拉丁文。适合 UI 设计、排版预览、WordPress 模板占位。",
    faqs: [
      { q: "Lorem Ipsum 是什么意思？", a: "Lorem Ipsum 源自拉丁语，是一段无意义的占位文本，印刷和设计行业使用了几百年。它看起来像自然语言但不会分散注意力。" },
    ],
  },
  // ── 转换工具 ──
  {
    slug: "color-converter",
    name: "颜色转换",
    description: "HEX / RGB / HSL 颜色格式互转，生成配色方案",
    category: "转换",
    icon: "🎨",
    keywords: ["color", "hex", "rgb", "hsl", "颜色"],
    seoTitle: "颜色格式转换工具 — HEX RGB HSL 互转 & 配色方案生成",
    seoDescription: "免费在线颜色转换工具，支持 HEX、RGB、HSL 格式互转。自动生成单色渐变、类比色、互补色、三角色等专业配色方案。",
    faqs: [
      { q: "HEX、RGB、HSL 有什么区别？", a: "HEX 是网页最常用的十六进制格式（#FF0000）；RGB 是红绿蓝三通道值（255,0,0）；HSL 更符合人类直觉（色相、饱和度、亮度），调色更方便。" },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID 生成器",
    description: "生成 UUID v4，支持批量生成",
    category: "转换",
    icon: "🆔",
    keywords: ["uuid", "guid", "生成", "generator"],
    seoTitle: "UUID 生成器 — 免费在线生成 UUID/GUID，支持批量",
    seoDescription: "免费在线 UUID 生成器，基于 RFC 4122 标准生成 UUID v4。支持单个和批量生成，适合数据库主键、API Token、会话 ID。",
    faqs: [
      { q: "UUID v4 和 v1 有什么区别？", a: "UUID v4 完全随机生成（本工具使用），碰撞概率极低；UUID v1 基于时间和 MAC 地址，可能泄露服务器信息。v4 更适合公开场景。" },
    ],
  },
  {
    slug: "timestamp",
    name: "时间戳转换",
    description: "Unix 时间戳与日期时间互转",
    category: "转换",
    icon: "🕐",
    keywords: ["timestamp", "unix", "时间戳", "日期"],
    seoTitle: "Unix 时间戳转换工具 — 时间戳转日期、日期转时间戳",
    seoDescription: "免费在线 Unix 时间戳转换工具，支持秒/毫秒时间戳与北京时间互转。实时显示当前时间戳，适合程序调试和日志分析。",
    faqs: [
      { q: "时间戳为什么有时是 10 位有时是 13 位？", a: "10 位是秒级时间戳（Unix），13 位是毫秒级时间戳（JavaScript Date.now()）。本工具支持两种格式。" },
    ],
  },
  {
    slug: "html-entity",
    name: "HTML 实体编码",
    description: "HTML 实体编码与解码，防止 XSS 攻击",
    category: "转换",
    icon: "🏷️",
    keywords: ["html", "entity", "encode", "decode", "实体"],
    seoTitle: "HTML 实体编码工具 — 免费在线 HTML Entity Encode/Decode",
    seoDescription: "免费在线 HTML 实体编解码工具。将 <、>、&、\" 等特殊字符转为 HTML 实体，防止 XSS 攻击和页面渲染错误。",
    faqs: [
      { q: "HTML 实体编码有什么用？", a: "主要用途：1) 防止 XSS 攻击，用户输入 <script> 会变成 &lt;script&gt; 不执行；2) 在页面中显示 <、> 等特殊字符而不被浏览器解析。" },
    ],
  },
  {
    slug: "number-base",
    name: "进制转换",
    description: "二进制 / 八进制 / 十进制 / 十六进制互转",
    category: "转换",
    icon: "🔢",
    keywords: ["base", "binary", "hex", "decimal", "进制", "转换"],
    seoTitle: "进制转换工具 — 二进制、八进制、十进制、十六进制在线互转",
    seoDescription: "免费在线进制转换工具，支持二进制(BIN)、八进制(OCT)、十进制(DEC)、十六进制(HEX) 互相转换。适合程序员调试和计算机科学学习。",
    faqs: [
      { q: "各进制的用途是什么？", a: "二进制是计算机底层语言；八进制用于 Linux 文件权限；十进制是日常数字；十六进制用于颜色值、内存地址、Unicode。" },
    ],
  },
  {
    slug: "image-to-base64",
    name: "图片转 Base64",
    description: "上传图片生成 Base64 Data URI，可用于内嵌图片",
    category: "转换",
    icon: "🖼️",
    keywords: ["image", "base64", "data uri", "图片", "转换"],
    seoTitle: "图片转 Base64 工具 — 免费在线 Image to Base64 Data URI",
    seoDescription: "免费在线图片转 Base64 工具，上传图片即可生成 Data URI 字符串。适用于 HTML/CSS 内嵌图片，减少 HTTP 请求提升页面加载速度。",
    faqs: [
      { q: "图片转 Base64 会变慢吗？", a: "Base64 编码后体积约增加 33%，但因为内嵌在 HTML/CSS 中减少了 HTTP 请求，对小图标（<10KB）反而能提升加载速度。大图不建议。" },
    ],
  },
  // ── 开发工具 ──
  {
    slug: "css-minifier",
    name: "CSS 压缩",
    description: "压缩 CSS 代码，移除空格和注释",
    category: "开发",
    icon: "🎯",
    keywords: ["css", "minify", "压缩", "minifier"],
    seoTitle: "CSS 压缩工具 — 免费在线 CSS Minifier，减小样式文件体积",
    seoDescription: "免费在线 CSS 压缩工具，一键压缩 CSS 代码：移除空格、注释、冗余分号。减小 CSS 文件体积 20-40%，提升网站加载速度。",
    faqs: [
      { q: "CSS 压缩和混淆有什么区别？", a: "压缩只移除空格注释，代码可读但体积小；混淆会重命名类名和变量，适合商业项目防抄袭。本工具只做压缩。" },
    ],
  },
  {
    slug: "js-minifier",
    name: "JS 压缩",
    description: "压缩 JavaScript 代码",
    category: "开发",
    icon: "⚡",
    keywords: ["js", "javascript", "minify", "压缩"],
    seoTitle: "JavaScript 压缩工具 — 免费在线 JS Minifier & Uglify",
    seoDescription: "免费在线 JavaScript 压缩工具，快速压缩 JS 代码减小体积。删除注释、空格和换行，提升网页加载性能。",
    faqs: [
      { q: "JS 压缩后能还原吗？", a: "简单的压缩（本工具）去掉空格注释，可以用格式化工具还原结构。混淆（变量重命名、代码重排）则几乎无法还原。" },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT 解码",
    description: "解码 JWT Token 的 Header 和 Payload",
    category: "开发",
    icon: "🛡️",
    keywords: ["jwt", "token", "decode", "json web token", "解码"],
    seoTitle: "JWT 解码工具 — 免费在线 JWT Token Decoder",
    seoDescription: "免费在线 JWT Token 解码工具，解析 JWT 的 Header（算法类型）和 Payload（用户信息、过期时间等）。纯本地处理，Token 不会外传。",
    faqs: [
      { q: "JWT 解码能看到敏感信息吗？", a: "JWT 的 Header 和 Payload 是 Base64 编码而非加密，任何人都能解码查看。因此绝不要把密码等敏感信息放在 Payload 里。" },
      { q: "JWT、Session、OAuth 有什么区别？", a: "JWT 是无状态的 Token，服务端不需存储；Session 是服务端存储的会话；OAuth 是第三方授权协议。三者常用于不同场景。" },
    ],
  },
  {
    slug: "password-generator",
    name: "密码生成器",
    description: "生成随机安全密码，支持自定义长度和字符集",
    category: "开发",
    icon: "🔑",
    keywords: ["password", "generator", "密码", "生成", "随机"],
    seoTitle: "随机密码生成器 — 免费在线强密码生成工具",
    seoDescription: "免费在线随机密码生成工具，支持自定义长度（4-64位）和字符类型（大小写字母、数字、符号）。附密码强度检测，保障账号安全。",
    faqs: [
      { q: "什么样的密码算强密码？", a: "强密码应至少 12 位，包含大小写字母、数字和特殊符号，且不包含个人信息或常见单词。本工具的「极强」等级即满足此标准。" },
      { q: "生成的密码会被记录吗？", a: "不会。密码在你浏览器本地生成，不经过网络传输，不会被服务器记录。但建议使用密码管理器（如 Bitwarden、1Password）保存。" },
    ],
  },
];

export const categoryOrder = ["文本", "转换", "开发"];

export function getToolsByCategory(): Map<string, Tool[]> {
  const map = new Map<string, Tool[]>();
  for (const cat of categoryOrder) {
    map.set(cat, tools.filter((t) => t.category === cat));
  }
  return map;
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug);
}

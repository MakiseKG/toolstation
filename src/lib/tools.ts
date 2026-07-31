export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  keywords: string[];
}

export const tools: Tool[] = [
  // 文本工具
  {
    slug: "json-formatter",
    name: "JSON 格式化",
    description: "格式化、验证、压缩 JSON 数据",
    category: "文本",
    icon: "📋",
    keywords: ["json", "format", "beautify", "minify", "validate"],
  },
  {
    slug: "base64",
    name: "Base64 编解码",
    description: "Base64 编码与解码转换",
    category: "文本",
    icon: "🔐",
    keywords: ["base64", "encode", "decode", "编码", "解码"],
  },
  {
    slug: "url-encoder",
    name: "URL 编解码",
    description: "URL 编码与解码",
    category: "文本",
    icon: "🔗",
    keywords: ["url", "encode", "decode", "编码", "解码"],
  },
  {
    slug: "text-diff",
    name: "文本对比",
    description: "对比两段文本的差异",
    category: "文本",
    icon: "🔍",
    keywords: ["diff", "compare", "对比", "差异"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown 预览",
    description: "实时编辑和预览 Markdown 内容",
    category: "文本",
    icon: "📝",
    keywords: ["markdown", "preview", "md", "预览"],
  },
  {
    slug: "word-counter",
    name: "字数统计",
    description: "统计字符数、单词数、行数",
    category: "文本",
    icon: "📊",
    keywords: ["word", "count", "字数", "统计"],
  },
  {
    slug: "html-formatter",
    name: "HTML 格式化",
    description: "格式化与压缩 HTML 代码",
    category: "文本",
    icon: "🧩",
    keywords: ["html", "format", "beautify", "minify", "格式化"],
  },
  {
    slug: "regex-tester",
    name: "正则表达式测试",
    description: "实时测试正则表达式匹配结果",
    category: "文本",
    icon: "🔬",
    keywords: ["regex", "regular", "expression", "正则", "测试"],
  },
  {
    slug: "csv-json",
    name: "CSV / JSON 转换",
    description: "CSV 与 JSON 数据格式互转",
    category: "文本",
    icon: "🔄",
    keywords: ["csv", "json", "convert", "转换"],
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum",
    description: "生成占位符文本",
    category: "文本",
    icon: "📄",
    keywords: ["lorem", "ipsum", "placeholder", "占位符", "文本"],
  },
  // 转换工具
  {
    slug: "color-converter",
    name: "颜色转换",
    description: "HEX / RGB / HSL 颜色格式互转",
    category: "转换",
    icon: "🎨",
    keywords: ["color", "hex", "rgb", "hsl", "颜色"],
  },
  {
    slug: "uuid-generator",
    name: "UUID 生成器",
    description: "生成 UUID v4，支持批量生成",
    category: "转换",
    icon: "🆔",
    keywords: ["uuid", "guid", "生成", "generator"],
  },
  {
    slug: "timestamp",
    name: "时间戳转换",
    description: "Unix 时间戳与日期时间互转",
    category: "转换",
    icon: "🕐",
    keywords: ["timestamp", "unix", "时间戳", "日期"],
  },
  {
    slug: "html-entity",
    name: "HTML 实体编码",
    description: "HTML 实体编码与解码",
    category: "转换",
    icon: "🏷️",
    keywords: ["html", "entity", "encode", "decode", "实体"],
  },
  {
    slug: "number-base",
    name: "进制转换",
    description: "二进制 / 八进制 / 十进制 / 十六进制互转",
    category: "转换",
    icon: "🔢",
    keywords: ["base", "binary", "hex", "decimal", "进制", "转换"],
  },
  {
    slug: "image-to-base64",
    name: "图片转 Base64",
    description: "上传图片生成 Base64 Data URI",
    category: "转换",
    icon: "🖼️",
    keywords: ["image", "base64", "data uri", "图片", "转换"],
  },
  // 开发工具
  {
    slug: "css-minifier",
    name: "CSS 压缩",
    description: "压缩 CSS 代码",
    category: "开发",
    icon: "🎯",
    keywords: ["css", "minify", "压缩", "minifier"],
  },
  {
    slug: "js-minifier",
    name: "JS 压缩",
    description: "压缩 JavaScript 代码",
    category: "开发",
    icon: "⚡",
    keywords: ["js", "javascript", "minify", "压缩"],
  },
  {
    slug: "jwt-decoder",
    name: "JWT 解码",
    description: "解码 JWT Token 的 Header 和 Payload",
    category: "开发",
    icon: "🛡️",
    keywords: ["jwt", "token", "decode", "json web token", "解码"],
  },
  {
    slug: "password-generator",
    name: "密码生成器",
    description: "生成随机安全密码",
    category: "开发",
    icon: "🔑",
    keywords: ["password", "generator", "密码", "生成", "随机"],
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

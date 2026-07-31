export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string; // emoji
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
    description: "URL 编码与解码（encodeURIComponent）",
    category: "文本",
    icon: "🔗",
    keywords: ["url", "encode", "decode", "编码", "解码"],
  },
  {
    slug: "text-diff",
    name: "文本对比",
    description: "对比两段文本的差异，逐行高亮显示",
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
    description: "统计字符数、单词数、行数、段落数",
    category: "文本",
    icon: "📊",
    keywords: ["word", "count", "字数", "统计"],
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
    description: "生成 UUID v1 / v4，支持批量生成",
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
  // 开发工具
  {
    slug: "css-minifier",
    name: "CSS 压缩",
    description: "压缩 CSS 代码，移除空格和注释",
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

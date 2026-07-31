import { tools, type Tool } from "./tools";

export interface IntentMatch {
  tool: Tool;
  action?: string;
  confidence: number;
}

const intentPatterns: { patterns: string[]; slug: string; action?: string }[] = [
  { patterns: ["json", "格式化", "format json", "beautify json", "json 美化", "整理 json"], slug: "json-formatter", action: "format" },
  { patterns: ["json 压缩", "minify json", "json minify"], slug: "json-formatter", action: "minify" },
  { patterns: ["base64", "base 64", "base-64"], slug: "base64" },
  { patterns: ["url 编码", "url 解码", "url encode", "url decode", "encode url", "decode url", "urlencoder", "urldecoder"], slug: "url-encoder" },
  { patterns: ["diff", "对比", "比较", "差异", "different", "compare text"], slug: "text-diff" },
  { patterns: ["markdown", "md 预览", "markdown 预览", "md preview"], slug: "markdown-preview" },
  { patterns: ["字数", "word count", "字符统计", "统计字数", "count word"], slug: "word-counter" },
  { patterns: ["html 格式化", "format html", "html format", "html 美化"], slug: "html-formatter", action: "format" },
  { patterns: ["html 压缩", "minify html", "html minify"], slug: "html-formatter", action: "minify" },
  { patterns: ["正则", "regex", "regular expression", "regexp", "正则表达式"], slug: "regex-tester" },
  { patterns: ["csv", "csv 转 json", "json 转 csv", "csv json", "csv to json", "json to csv"], slug: "csv-json" },
  { patterns: ["lorem", "ipsum", "占位符", "假文", "placeholder text", "dummy text"], slug: "lorem-ipsum" },
  { patterns: ["颜色", "color", "hex", "rgb", "hsl", "色值", "取色", "color picker"], slug: "color-converter" },
  { patterns: ["uuid", "guid", "唯一标识"], slug: "uuid-generator" },
  { patterns: ["时间戳", "timestamp", "unix 时间", "日期转换", "时间转换"], slug: "timestamp" },
  { patterns: ["html 实体", "html entity", "entity", "&amp;", "&lt;"], slug: "html-entity" },
  { patterns: ["进制", "binary", "hex", "十六进制", "八进制", "binary to hex"], slug: "number-base" },
  { patterns: ["图片转 base64", "image to base64", "图片 base64", "image base64"], slug: "image-to-base64" },
  { patterns: ["css 压缩", "minify css", "css minify"], slug: "css-minifier" },
  { patterns: ["js 压缩", "minify js", "javascript 压缩", "js minify", "uglify"], slug: "js-minifier" },
  { patterns: ["jwt", "token 解码", "jwt decode", "json web token"], slug: "jwt-decoder" },
  { patterns: ["密码", "password", "生成密码", "随机密码", "强密码"], slug: "password-generator" },
];

export function matchIntent(input: string): IntentMatch | null {
  const q = input.toLowerCase().trim();
  if (!q) return null;

  let bestMatch: IntentMatch | null = null;
  let bestScore = 0;

  for (const rule of intentPatterns) {
    for (const pattern of rule.patterns) {
      const p = pattern.toLowerCase();
      let score = 0;

      if (q === p) {
        score = 100; // exact match
      } else if (q.includes(p)) {
        score = 70 + p.length; // substring match, longer = better
      } else if (p.includes(q)) {
        score = 40 + q.length; // query is substring of pattern
      } else {
        // word-level matching
        const qWords = q.split(/\s+/);
        const pWords = p.split(/\s+/);
        const common = qWords.filter((w) => pWords.some((pw) => pw.includes(w) || w.includes(pw)));
        if (common.length > 0) {
          score = 30 + common.length * 15;
        }
      }

      if (score > bestScore) {
        const tool = tools.find((t) => t.slug === rule.slug);
        if (tool) {
          bestScore = score;
          bestMatch = { tool, action: rule.action, confidence: score };
        }
      }
    }
  }

  // Only return if confidence is reasonable
  if (bestMatch && bestMatch.confidence >= 30) {
    return bestMatch;
  }
  return null;
}

export function getQuickSuggestions(): { text: string; icon: string; slug: string }[] {
  return [
    { text: "格式化这段 JSON", icon: "📋", slug: "json-formatter" },
    { text: "测试正则表达式", icon: "🔬", slug: "regex-tester" },
    { text: "生成强密码", icon: "🔑", slug: "password-generator" },
    { text: "转换颜色格式", icon: "🎨", slug: "color-converter" },
    { text: "CSV 转 JSON", icon: "🔄", slug: "csv-json" },
    { text: "解码 JWT", icon: "🛡️", slug: "jwt-decoder" },
  ];
}

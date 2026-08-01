"use client";

import { usePathname } from "next/navigation";
import { useLocaleContext } from "@/components/LocaleProvider";

export type Locale = "zh" | "en";

export function useLocale(): Locale {
  const ctxLocale = useLocaleContext();
  if (ctxLocale !== "zh") return ctxLocale;
  // If default value "zh" returned, try pathname detection for runtime
  const pathname = usePathname();
  if (pathname.startsWith("/en")) return "en";
  return "zh";
}

// Shared UI translations used across tool components
const dict: Record<string, Record<string, string>> = {
  // Common
  copy: { zh: "复制", en: "Copy" },
  copied: { zh: "已复制", en: "Copied" },
  clear: { zh: "清除", en: "Clear" },
  input: { zh: "输入", en: "Input" },
  output: { zh: "输出", en: "Output" },
  result: { zh: "结果", en: "Result" },
  format: { zh: "格式化", en: "Format" },
  minify: { zh: "压缩", en: "Minify" },
  beautify: { zh: "美化", en: "Beautify" },
  validate: { zh: "验证", en: "Validate" },
  encode: { zh: "编码", en: "Encode" },
  decode: { zh: "解码", en: "Decode" },
  encodeAll: { zh: "全部编码", en: "Encode All" },
  decodeAll: { zh: "全部解码", en: "Decode All" },
  upload: { zh: "上传", en: "Upload" },
  download: { zh: "下载", en: "Download" },
  generate: { zh: "生成", en: "Generate" },
  convert: { zh: "转换", en: "Convert" },
  preview: { zh: "预览", en: "Preview" },
  reset: { zh: "重置", en: "Reset" },
  repair: { zh: "智能修复", en: "Smart Repair" },
  generateTs: { zh: "生成 TS 接口", en: "Generate TS Interface" },
  compare: { zh: "对比", en: "Compare" },
  diffResult: { zh: "对比结果", en: "Diff Result" },
  added: { zh: "新增", en: "Added" },
  removed: { zh: "删除", en: "Removed" },

  // JSON formatter
  jsonValid: { zh: "✅ JSON 格式有效", en: "✅ Valid JSON" },
  jsonFormatterHint: { zh: "粘贴 JSON 文本，点击格式化或验证", en: "Paste JSON text, click Format or Validate" },

  // Base64
  base64Encode: { zh: "文本 → Base64", en: "Text → Base64" },
  base64Decode: { zh: "Base64 → 文本", en: "Base64 → Text" },
  base64Hint: { zh: "输入文本或 Base64 字符串", en: "Enter text or Base64 string" },

  // URL encoder
  urlEncode: { zh: "URL 编码", en: "URL Encode" },
  urlDecode: { zh: "URL 解码", en: "URL Decode" },
  urlHint: { zh: "输入文本或 URL", en: "Enter text or URL" },

  // Text diff
  diffOriginal: { zh: "原始文本", en: "Original Text" },
  diffModified: { zh: "修改后文本", en: "Modified Text" },
  diffHint: { zh: "粘贴两段文本进行对比", en: "Paste two texts to compare" },
  diffEmpty: { zh: "请输入两段文本进行对比", en: "Enter both texts to compare" },

  // Markdown
  mdEdit: { zh: "编辑", en: "Edit" },
  mdPreview: { zh: "预览", en: "Preview" },
  mdSplit: { zh: "分屏", en: "Split" },

  // Word counter
  wcChars: { zh: "字符", en: "Characters" },
  wcCharsNoSpace: { zh: "字符 (无空格)", en: "Chars (no spaces)" },
  wcWords: { zh: "单词", en: "Words" },
  wcLines: { zh: "行", en: "Lines" },
  wcParagraphs: { zh: "段落", en: "Paragraphs" },
  wcPlaceholder: { zh: "输入或粘贴文本以统计...", en: "Type or paste text to count..." },

  // Color converter
  colorPicker: { zh: "取色器", en: "Color Picker" },
  colorPalettes: { zh: "配色方案", en: "Color Palettes" },
  colorMonochromatic: { zh: "单色", en: "Monochromatic" },
  colorAnalogous: { zh: "类比色", en: "Analogous" },
  colorComplementary: { zh: "互补色", en: "Complementary" },
  colorTriadic: { zh: "三角色", en: "Triadic" },

  // UUID
  uuidSingle: { zh: "单个生成", en: "Single" },
  uuidBatch: { zh: "批量生成", en: "Batch" },
  uuidCount: { zh: "数量", en: "Count" },
  uuidHistory: { zh: "历史记录", en: "History" },

  // Timestamp
  tsNow: { zh: "当前时间", en: "Current Time" },
  tsToDate: { zh: "时间戳 → 日期", en: "Timestamp → Date" },
  tsDateToTs: { zh: "日期 → 时间戳", en: "Date → Timestamp" },
  tsSeconds: { zh: "秒", en: "Seconds" },
  tsMilliseconds: { zh: "毫秒", en: "Milliseconds" },
  tsLocal: { zh: "本地时间", en: "Local Time" },
  tsIso: { zh: "ISO 格式", en: "ISO Format" },
  tsUtc: { zh: "UTC 格式", en: "UTC Format" },

  // HTML entity
  htmlEntityEncode: { zh: "HTML 实体编码", en: "HTML Entity Encode" },
  htmlEntityDecode: { zh: "HTML 实体解码", en: "HTML Entity Decode" },

  // Number base
  nbBinary: { zh: "二进制 (BIN)", en: "Binary" },
  nbOctal: { zh: "八进制 (OCT)", en: "Octal" },
  nbDecimal: { zh: "十进制 (DEC)", en: "Decimal" },
  nbHex: { zh: "十六进制 (HEX)", en: "Hexadecimal" },
  nbInput: { zh: "输入数字", en: "Enter number" },

  // Image to Base64
  imgDrop: { zh: "拖拽图片到此处，或点击上传", en: "Drop image here or click to upload" },
  imgDataUri: { zh: "Data URI", en: "Data URI" },
  imgBase64Only: { zh: "仅 Base64", en: "Base64 Only" },
  imgHtmlTag: { zh: "HTML 标签", en: "HTML Tag" },
  imgCssBg: { zh: "CSS 背景", en: "CSS Background" },

  // CSS/JS minifier
  cssMinify: { zh: "压缩 CSS", en: "Minify CSS" },
  jsMinify: { zh: "压缩 JS", en: "Minify JS" },
  minifyInput: { zh: "粘贴 CSS 代码...", en: "Paste CSS code..." },
  minifyInputJs: { zh: "粘贴 JS 代码...", en: "Paste JavaScript code..." },
  minifiedOutput: { zh: "压缩后", en: "Minified" },
  originalSize: { zh: "原始大小", en: "Original Size" },
  minifiedSize: { zh: "压缩后大小", en: "Minified Size" },
  saved: { zh: "节省", en: "Saved" },

  // JWT
  jwtHeader: { zh: "Header", en: "Header" },
  jwtPayload: { zh: "Payload", en: "Payload" },
  jwtSignature: { zh: "Signature", en: "Signature" },
  jwtHint: { zh: "粘贴 JWT Token...", en: "Paste JWT token..." },

  // Password
  pwdLength: { zh: "长度", en: "Length" },
  pwdLower: { zh: "小写字母", en: "Lowercase" },
  pwdUpper: { zh: "大写字母", en: "Uppercase" },
  pwdNumbers: { zh: "数字", en: "Numbers" },
  pwdSymbols: { zh: "符号", en: "Symbols" },
  pwdStrength: { zh: "强度", en: "Strength" },
  pwdVeryStrong: { zh: "极强", en: "Very Strong" },
  pwdStrong: { zh: "强", en: "Strong" },
  pwdMedium: { zh: "中等", en: "Medium" },
  pwdWeak: { zh: "弱", en: "Weak" },

  // CSV/JSON
  csvToJson: { zh: "CSV → JSON", en: "CSV → JSON" },
  jsonToCsv: { zh: "JSON → CSV", en: "JSON → CSV" },
  csvDelimiter: { zh: "分隔符", en: "Delimiter" },

  // Regex
  regexPattern: { zh: "正则表达式", en: "Regex Pattern" },
  regexFlags: { zh: "标志", en: "Flags" },
  regexTestString: { zh: "测试文本", en: "Test String" },
  regexMatches: { zh: "匹配结果", en: "Matches" },
  regexLibrary: { zh: "常用正则库", en: "Common Patterns" },

  // Lorem ipsum
  loremParagraphs: { zh: "段落", en: "Paragraphs" },
  loremSentences: { zh: "句子", en: "Sentences" },
  loremWords: { zh: "单词", en: "Words" },
  loremChinese: { zh: "中文", en: "Chinese" },
  loremLatin: { zh: "拉丁文", en: "Latin" },

  // HTML formatter
  htmlFormat: { zh: "格式化 HTML", en: "Format HTML" },
  htmlMinify: { zh: "压缩 HTML", en: "Minify HTML" },

  // JSON repair messages
  repairedAndFormatted: { zh: "已尝试修复并格式化", en: "Repaired and formatted" },
  cannotRepair: { zh: "无法自动修复", en: "Cannot auto-repair" },
  repairHint: { zh: "建议：检查括号是否匹配", en: "Tip: check if brackets match" },

  // Processing
  processing: { zh: "处理中...", en: "Processing..." },
  error: { zh: "错误", en: "Error" },
  success: { zh: "成功", en: "Success" },

  // Workflow
  nextStep: { zh: "下一步", en: "Next Step" },

  // Misc
  noData: { zh: "暂无数据", en: "No data" },
  back: { zh: "返回", en: "Back" },
  selectAll: { zh: "全选", en: "Select All" },
  bytes: { zh: "字节", en: "bytes" },
};

export function useT() {
  const locale = useLocale();
  return (key: string, fallback?: string): string => {
    const entry = dict[key];
    if (!entry) return fallback ?? key;
    return entry[locale] ?? entry.zh;
  };
}

// For non-component usage
export function t(key: string, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] ?? entry.zh;
}

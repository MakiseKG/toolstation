import { toolsEn, getToolEn, type ToolEn } from "@/lib/tools-en";

export interface IntentMatchEn {
  tool: ToolEn;
  action?: string;
  confidence: number;
}

interface KeywordRule {
  keywords: string[];
  slug: string;
  action?: string;
  weight: number;
}

const RULES: KeywordRule[] = [
  // JSON
  { keywords: ["json", "format json", "beautify json", "prettify json", "json format", "json validator", "validate json", "fix json", "repair json", "json to ts", "json to typescript", "minify json", "compress json"], slug: "json-formatter", weight: 10 },
  // Base64
  { keywords: ["base64", "encode base64", "decode base64", "base64 encode", "base64 decode", "base 64", "base64 image"], slug: "base64", weight: 9 },
  // URL
  { keywords: ["url encode", "url decode", "url encoder", "url decoder", "percent encode", "percent encoding", "encode url", "decode url"], slug: "url-encoder", weight: 8 },
  // Diff
  { keywords: ["diff", "text compare", "compare text", "text diff", "difference", "code diff", "file compare", "compare files"], slug: "text-diff", weight: 8 },
  // Markdown
  { keywords: ["markdown", "md preview", "markdown editor", "markdown preview", "md editor", "readme editor"], slug: "markdown-preview", weight: 8 },
  // Word counter
  { keywords: ["word count", "character count", "count words", "count characters", "text statistics", "line count", "word frequency"], slug: "word-counter", weight: 7 },
  // HTML format
  { keywords: ["html format", "html beautify", "format html", "beautify html", "html minify", "minify html", "compress html", "html prettify"], slug: "html-formatter", weight: 7 },
  // Regex
  { keywords: ["regex", "regular expression", "regex test", "regex tester", "regex pattern", "regex match", "test regex"], slug: "regex-tester", weight: 8 },
  // CSV/JSON
  { keywords: ["csv to json", "json to csv", "csv json", "convert csv", "csv converter"], slug: "csv-json", weight: 7 },
  // Lorem
  { keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text", "generate placeholder", "lorem"], slug: "lorem-ipsum", weight: 6 },
  // Color
  { keywords: ["color", "hex to rgb", "rgb to hex", "hsl", "color palette", "color scheme", "color converter", "hex color"], slug: "color-converter", weight: 7 },
  // UUID
  { keywords: ["uuid", "guid", "generate uuid", "uuid generator", "unique id", "random id"], slug: "uuid-generator", weight: 7 },
  // Timestamp
  { keywords: ["timestamp", "unix time", "epoch", "unix timestamp", "date to timestamp", "timestamp to date", "current timestamp"], slug: "timestamp", weight: 7 },
  // HTML Entity
  { keywords: ["html entity", "html encode", "html decode", "entity encode", "xss prevent"], slug: "html-entity", weight: 6 },
  // Number base
  { keywords: ["binary", "hex", "octal", "decimal", "number base", "binary to hex", "hex to binary", "base converter", "binary converter"], slug: "number-base", weight: 7 },
  // Image to Base64
  { keywords: ["image to base64", "img to base64", "base64 image", "image base64", "picture to base64", "data uri"], slug: "image-to-base64", weight: 6 },
  // CSS minify
  { keywords: ["css minify", "minify css", "css compress", "compress css", "css minifier"], slug: "css-minifier", weight: 6 },
  // JS minify
  { keywords: ["js minify", "minify js", "javascript minify", "minify javascript", "js compress", "js minifier"], slug: "js-minifier", weight: 6 },
  // JWT
  { keywords: ["jwt", "decode jwt", "jwt decoder", "json web token", "jwt token", "parse jwt"], slug: "jwt-decoder", weight: 7 },
  // Password
  { keywords: ["password", "generate password", "password generator", "strong password", "random password", "create password"], slug: "password-generator", weight: 8 },
];

export function matchIntentEn(input: string): IntentMatchEn | null {
  const q = input.toLowerCase().trim();
  if (!q) return null;

  let best: IntentMatchEn | null = null;
  let bestScore = 0;

  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      let score = 0;
      if (q === kw) {
        score = rule.weight * 10;
      } else if (q.startsWith(kw)) {
        score = rule.weight * 7;
      } else if (q.includes(kw)) {
        score = rule.weight * 5;
      } else {
        // fuzzy: check word overlap
        const kwWords = kw.split(/\s+/);
        const qWords = q.split(/\s+/);
        const overlap = kwWords.filter((w) => qWords.some((qw) => qw.includes(w) || w.includes(qw))).length;
        if (overlap > 0) score = rule.weight * overlap * 2;
      }

      if (score > bestScore) {
        const tool = getToolEn(rule.slug);
        if (tool) {
          best = { tool, action: rule.action, confidence: Math.min(score, 100) };
          bestScore = score;
        }
      }
    }
  }

  if (best && best.confidence >= 30) return best;
  return null;
}

export function getQuickSuggestionsEn(): { slug: string; icon: string; text: string }[] {
  return [
    { slug: "json-formatter", icon: "📋", text: "Format JSON" },
    { slug: "password-generator", icon: "🔑", text: "Generate Password" },
    { slug: "base64", icon: "🔐", text: "Base64 Encode" },
    { slug: "regex-tester", icon: "🔬", text: "Test Regex" },
    { slug: "markdown-preview", icon: "📝", text: "Markdown Preview" },
    { slug: "text-diff", icon: "🔍", text: "Diff Text" },
  ];
}

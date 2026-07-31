export interface ToolEn {
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

export const toolsEn: ToolEn[] = [
  // ── Text Tools ──
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, minify JSON data with smart repair and TypeScript interface generation",
    category: "Text",
    icon: "📋",
    keywords: ["json", "format", "beautify", "minify", "validate"],
    seoTitle: "JSON Formatter — Free Online JSON Beautifier, Minifier & Validator",
    seoDescription: "Free online JSON formatter & validator. Beautify, minify, validate, repair errors, and generate TypeScript interfaces from JSON. 100% client-side processing.",
    faqs: [
      { q: "Is this JSON formatter safe to use?", a: "Absolutely. All JSON data is processed locally in your browser — nothing is ever uploaded to any server. It even works offline." },
      { q: "How do I fix broken JSON?", a: "Click the 'Smart Repair' button and the tool will auto-fix common issues: single quotes → double quotes, remove JS comments, trailing commas, and add missing quotes around keys." },
      { q: "What's the maximum file size?", a: "Theoretically up to your browser's memory limit (usually several hundred MB). For data over 10MB, we recommend using a local editor." },
    ],
  },
  {
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings",
    category: "Text",
    icon: "🔐",
    keywords: ["base64", "encode", "decode"],
    seoTitle: "Base64 Encoder & Decoder — Free Online Base64 Encoding/Decoding Tool",
    seoDescription: "Free online Base64 encoder and decoder. Encode text to Base64, decode Base64 to text, preview Base64 images. All processing happens locally in your browser.",
    faqs: [
      { q: "What is Base64 used for?", a: "Base64 encodes binary data into ASCII text for safe transmission over text-based protocols (HTTP, JSON, XML). Common uses: email attachments, embedding images in HTML/CSS (Data URIs), API authentication headers." },
      { q: "Is Base64 a form of encryption?", a: "No. Base64 is an encoding scheme, not encryption. It requires no key and can be decoded by anyone. Use AES or similar for actual encryption." },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "URL encode and decode text strings",
    category: "Text",
    icon: "🔗",
    keywords: ["url", "encode", "decode", "percent"],
    seoTitle: "URL Encoder & Decoder — Free Online URL Encoding Tool",
    seoDescription: "Free online URL encoder/decoder. Convert special characters, spaces, and Unicode to percent-encoded format and back. Essential for web development and API work.",
    faqs: [
      { q: "When do I need URL encoding?", a: "Whenever a URL contains spaces, Chinese characters, or special characters (&, =, #, etc.), you need to encode them to prevent broken links or incorrect parameter parsing." },
      { q: "encodeURI vs encodeURIComponent?", a: "encodeURI preserves URL structure characters (://?#), suitable for whole URLs. encodeURIComponent encodes all special characters, ideal for query parameter values." },
    ],
  },
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight additions and deletions",
    category: "Text",
    icon: "🔍",
    keywords: ["diff", "compare", "difference", "checker"],
    seoTitle: "Text Diff Checker — Free Online Diff Tool for Code & Text Comparison",
    seoDescription: "Free online text diff tool. Quickly compare two texts and see line-by-line additions and deletions with color highlighting. Great for code review, document comparison, and config files.",
    faqs: [
      { q: "Can it compare code?", a: "Yes! It works with any plain text — source code, config files, JSON, XML, logs, and more. It highlights additions and deletions line by line." },
    ],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Editor & Preview",
    description: "Edit and preview Markdown in real time",
    category: "Text",
    icon: "📝",
    keywords: ["markdown", "preview", "md", "editor"],
    seoTitle: "Online Markdown Editor — Free Real-Time Preview & GFM Support",
    seoDescription: "Free online Markdown editor with live preview. Write on the left, preview on the right. Full GFM support: tables, syntax highlighting, task lists, math formulas.",
    faqs: [
      { q: "What Markdown features are supported?", a: "GitHub Flavored Markdown (GFM) is fully supported: headings, bold/italic, lists, tables, fenced code blocks with syntax highlighting, blockquotes, images, links, and task lists." },
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count characters, words, lines, and paragraphs",
    category: "Text",
    icon: "📊",
    keywords: ["word", "count", "character", "statistics"],
    seoTitle: "Online Word Counter — Free Character, Word & Line Count Tool",
    seoDescription: "Free online word counter. Count Chinese characters, English words, characters (with/without spaces), lines, and paragraphs. Perfect for writers, bloggers, and SEO optimization.",
    faqs: [
      { q: "How are Chinese characters counted?", a: "Each Chinese character counts as one word (punctuation excluded). English words are counted by splitting on spaces." },
    ],
  },
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    description: "Format and minify HTML code",
    category: "Text",
    icon: "🧩",
    keywords: ["html", "format", "beautify", "minify"],
    seoTitle: "HTML Formatter & Minifier — Free Online HTML Beautifier Tool",
    seoDescription: "Free online HTML formatter and minifier. Beautify messy HTML with proper indentation or compress it to a single line. Reduce file size by 15-30% for faster page loads.",
    faqs: [
      { q: "Why minify HTML?", a: "Minification removes comments, whitespace, and line breaks, reducing file size by 15-30%. This speeds up page loads and benefits SEO rankings." },
    ],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions in real time with a built-in regex library",
    category: "Text",
    icon: "🔬",
    keywords: ["regex", "regular expression", "test", "pattern"],
    seoTitle: "Regex Tester — Free Online Regular Expression Testing Tool",
    seoDescription: "Free online regex tester. Write regex patterns and test them against text with real-time match highlighting. Built-in library with common patterns: email, phone, URL, IP, and more.",
    faqs: [
      { q: "I don't know regex. Where do I start?", a: "Open the 'Common Patterns' panel for ready-to-use templates: email, phone number, URL, IP address, and more. One click fills them into the input." },
      { q: "What do regex flags do?", a: "g = global match (all occurrences), i = case-insensitive, m = multiline mode, s = dot matches newlines, u = Unicode mode. You can combine them, e.g. gi." },
    ],
  },
  {
    slug: "csv-json",
    name: "CSV / JSON Converter",
    description: "Convert between CSV and JSON formats",
    category: "Text",
    icon: "🔄",
    keywords: ["csv", "json", "convert", "transform"],
    seoTitle: "CSV to JSON Converter — Free Online CSV JSON Conversion Tool",
    seoDescription: "Free online CSV/JSON converter. Convert CSV to JSON arrays and JSON to CSV tables. Supports comma, tab, and semicolon delimiters. Perfect for data analysis and API development.",
    faqs: [
      { q: "What delimiters are supported?", a: "Comma (,), Tab, and Semicolon (;). If your CSV contains commas within fields, consider using TSV (Tab-Separated Values) format instead." },
    ],
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text in paragraphs, sentences, or words",
    category: "Text",
    icon: "📄",
    keywords: ["lorem", "ipsum", "placeholder", "filler", "text"],
    seoTitle: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
    seoDescription: "Free online Lorem Ipsum placeholder text generator. Generate paragraphs, sentences, or words. Supports Latin and Chinese. Great for UI design, typography previews, and template mockups.",
    faqs: [
      { q: "What does Lorem Ipsum mean?", a: "Lorem Ipsum is scrambled Latin text used as placeholder in the design and printing industries for centuries. It looks like natural language but doesn't distract from the visual design." },
    ],
  },
  // ── Conversion Tools ──
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert between HEX, RGB, HSL formats and generate color palettes",
    category: "Convert",
    icon: "🎨",
    keywords: ["color", "hex", "rgb", "hsl", "palette"],
    seoTitle: "Color Converter — Free HEX, RGB, HSL Conversion & Palette Generator",
    seoDescription: "Free online color converter. Convert between HEX, RGB, and HSL formats. Auto-generate monochromatic, analogous, complementary, and triadic color palettes for your designs.",
    faqs: [
      { q: "What's the difference between HEX, RGB, and HSL?", a: "HEX is the web standard (#FF0000). RGB uses red/green/blue channels (255,0,0). HSL uses hue/saturation/lightness, which is more intuitive for color adjustment." },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers, with batch generation support",
    category: "Convert",
    icon: "🆔",
    keywords: ["uuid", "guid", "generate", "unique"],
    seoTitle: "UUID Generator — Free Online UUID/GUID v4 Generator with Batch Mode",
    seoDescription: "Free online UUID generator based on RFC 4122. Generate single or batch UUID v4 identifiers. Perfect for database primary keys, API tokens, session IDs, and distributed systems.",
    faqs: [
      { q: "UUID v4 vs v1 — what's the difference?", a: "UUID v4 is purely random (what this tool generates) with negligible collision probability. UUID v1 is based on timestamp + MAC address, which may leak server information. v4 is recommended for public use." },
    ],
  },
  {
    slug: "timestamp",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    category: "Convert",
    icon: "🕐",
    keywords: ["timestamp", "unix", "epoch", "date", "time"],
    seoTitle: "Unix Timestamp Converter — Free Online Epoch & Date Converter",
    seoDescription: "Free online Unix timestamp converter. Convert between seconds/milliseconds timestamps and Beijing time (UTC+8). Live current timestamp display. Great for debugging and log analysis.",
    faqs: [
      { q: "Why are some timestamps 10 digits and others 13?", a: "10-digit timestamps are in seconds (Unix epoch). 13-digit timestamps are in milliseconds (JavaScript's Date.now()). This tool supports both formats." },
    ],
  },
  {
    slug: "html-entity",
    name: "HTML Entity Encoder",
    description: "Encode and decode HTML entities to prevent XSS attacks",
    category: "Convert",
    icon: "🏷️",
    keywords: ["html", "entity", "encode", "decode", "xss"],
    seoTitle: "HTML Entity Encoder — Free Online HTML Entity Encode & Decode",
    seoDescription: "Free online HTML entity encoder/decoder. Convert <, >, &, \" and other special characters to HTML entities. Essential for preventing XSS attacks and rendering code in web pages.",
    faqs: [
      { q: "Why use HTML entities?", a: "Two main reasons: 1) Prevent XSS attacks — user input like <script> becomes &lt;script&gt; which won't execute. 2) Display <, >, and other special characters on a page without them being parsed as HTML." },
    ],
  },
  {
    slug: "number-base",
    name: "Number Base Converter",
    description: "Convert between binary, octal, decimal, and hexadecimal",
    category: "Convert",
    icon: "🔢",
    keywords: ["base", "binary", "hex", "decimal", "octal"],
    seoTitle: "Number Base Converter — Binary, Octal, Decimal, Hexadecimal Online",
    seoDescription: "Free online number base converter. Convert between binary (BIN), octal (OCT), decimal (DEC), and hexadecimal (HEX). Essential for programmers and computer science students.",
    faqs: [
      { q: "What are the different number bases used for?", a: "Binary is the foundation of computing. Octal is used in Linux file permissions. Decimal is everyday numbers. Hexadecimal is used for color values, memory addresses, and Unicode code points." },
    ],
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64",
    description: "Convert images to Base64 Data URIs for inline embedding",
    category: "Convert",
    icon: "🖼️",
    keywords: ["image", "base64", "data uri", "embed", "convert"],
    seoTitle: "Image to Base64 Converter — Free Online Data URI Generator",
    seoDescription: "Free online image to Base64 converter. Upload an image and get a Data URI string for inline HTML/CSS embedding. Reduces HTTP requests and improves page load for small images.",
    faqs: [
      { q: "Does Base64 slow down image loading?", a: "Base64 encoding increases file size by ~33%, but because the image is embedded directly in HTML/CSS, it eliminates an HTTP request. For small icons (<10KB), it actually improves load speed. Not recommended for large images." },
    ],
  },
  // ── Developer Tools ──
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Compress CSS by removing whitespace, comments, and redundant code",
    category: "Dev",
    icon: "🎯",
    keywords: ["css", "minify", "compress", "minifier"],
    seoTitle: "CSS Minifier — Free Online CSS Compression Tool",
    seoDescription: "Free online CSS minifier. Compress CSS by removing whitespace, comments, and unnecessary semicolons. Reduce file size by 20-40% for faster website performance and better PageSpeed scores.",
    faqs: [
      { q: "What's the difference between minification and obfuscation?", a: "Minification removes whitespace and comments — the code is smaller but still readable. Obfuscation renames classes and variables, making code hard to reverse-engineer. This tool only does minification." },
    ],
  },
  {
    slug: "js-minifier",
    name: "JavaScript Minifier",
    description: "Compress JavaScript code by removing whitespace and comments",
    category: "Dev",
    icon: "⚡",
    keywords: ["js", "javascript", "minify", "compress"],
    seoTitle: "JavaScript Minifier — Free Online JS Compression & Minification",
    seoDescription: "Free online JavaScript minifier. Quickly compress JS code by removing comments, whitespace, and newlines. Improve page load performance and reduce bandwidth usage.",
    faqs: [
      { q: "Can minified JS be reversed?", a: "Basic minification (like this tool) can be reversed with a formatter to restore structure. Obfuscation (variable renaming, code rearrangement) is nearly impossible to reverse." },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JWT token headers and payloads",
    category: "Dev",
    icon: "🛡️",
    keywords: ["jwt", "token", "decode", "json web token"],
    seoTitle: "JWT Decoder — Free Online JWT Token Debugger & Decoder",
    seoDescription: "Free online JWT decoder. Parse JWT headers (algorithm) and payload (user info, expiration). 100% client-side — your tokens never leave your browser. Essential for debugging auth flows.",
    faqs: [
      { q: "Can JWT decoding expose sensitive data?", a: "JWT headers and payloads are Base64-encoded, not encrypted — anyone can decode them. Never put passwords, credit card numbers, or other secrets in a JWT payload." },
      { q: "JWT vs Session vs OAuth?", a: "JWT is a stateless token (no server storage needed). Sessions are server-stored. OAuth is a third-party authorization protocol. Each serves different authentication scenarios." },
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong random passwords with customizable length and character sets",
    category: "Dev",
    icon: "🔑",
    keywords: ["password", "generator", "strong", "random", "security"],
    seoTitle: "Password Generator — Free Online Strong Random Password Creator",
    seoDescription: "Free online random password generator. Customize length (4-64 chars) and character types (uppercase, lowercase, numbers, symbols). Includes password strength meter. Keep your accounts secure.",
    faqs: [
      { q: "What makes a strong password?", a: "A strong password should be at least 12 characters, include uppercase and lowercase letters, numbers, and symbols. Avoid personal info or common words. This tool's 'Very Strong' rating meets these criteria." },
      { q: "Are generated passwords stored or logged?", a: "No. Passwords are generated locally in your browser and never transmitted over the network. We recommend saving them in a password manager like Bitwarden or 1Password." },
    ],
  },
];

export const categoryOrderEn = ["Text", "Convert", "Dev"];

export function getToolsByCategoryEn(): Map<string, ToolEn[]> {
  const map = new Map<string, ToolEn[]>();
  for (const cat of categoryOrderEn) {
    map.set(cat, toolsEn.filter((t) => t.category === cat));
  }
  return map;
}

export function getToolEn(slug: string): ToolEn | undefined {
  return toolsEn.find((t) => t.slug === slug);
}

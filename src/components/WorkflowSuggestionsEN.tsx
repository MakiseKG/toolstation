import Link from "next/link";
import { getToolEn } from "@/lib/tools-en";

const workflowMap: Record<string, string[]> = {
  "json-formatter": ["csv-json", "jwt-decoder"],
  "csv-json": ["json-formatter", "html-formatter"],
  base64: ["url-encoder", "image-to-base64"],
  "url-encoder": ["base64", "html-entity"],
  "text-diff": ["word-counter", "regex-tester"],
  "markdown-preview": ["html-formatter", "word-counter"],
  "word-counter": ["lorem-ipsum", "text-diff"],
  "html-formatter": ["css-minifier", "js-minifier"],
  "css-minifier": ["js-minifier", "html-formatter"],
  "js-minifier": ["html-formatter", "css-minifier"],
  "regex-tester": ["text-diff", "csv-json"],
  "lorem-ipsum": ["word-counter", "markdown-preview"],
  "color-converter": ["image-to-base64", "html-formatter"],
  "uuid-generator": ["timestamp", "password-generator"],
  timestamp: ["uuid-generator", "jwt-decoder"],
  "html-entity": ["url-encoder", "html-formatter"],
  "number-base": ["base64", "uuid-generator"],
  "image-to-base64": ["base64", "color-converter"],
  "jwt-decoder": ["json-formatter", "timestamp"],
  "password-generator": ["base64", "uuid-generator"],
};

interface WorkflowSuggestionsENProps {
  currentSlug: string;
}

export default function WorkflowSuggestionsEN({ currentSlug }: WorkflowSuggestionsENProps) {
  const nextSlugs = workflowMap[currentSlug] || [];
  const nextTools = nextSlugs.map((slug) => getToolEn(slug)).filter(Boolean);

  if (nextTools.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-zinc-400">
        <svg className="h-4 w-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Next Step
      </h3>
      <div className="flex flex-wrap gap-2">
        {nextTools.map((tool) => (
          <Link
            key={tool!.slug}
            href={`/en/tools/${tool!.slug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-400 transition hover:-translate-y-0.5 hover:border-[#00d4aa]/30 hover:text-zinc-200"
          >
            <span>{tool!.icon}</span>
            <span className="font-medium">{tool!.name}</span>
            <svg className="h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

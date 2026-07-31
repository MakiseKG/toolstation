"use client";

import { useState, useMemo } from "react";
import { useT } from "@/lib/i18n";

export default function TextDiff() {
  const t = useT();
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = useMemo(() => {
    if (!left && !right) return [];
    const leftLines = left.split("\n");
    const rightLines = right.split("\n");
    const result: { type: "same" | "added" | "removed"; text: string; num: number }[] = [];

    const maxLen = Math.max(leftLines.length, rightLines.length);
    for (let i = 0; i < maxLen; i++) {
      const l = leftLines[i] ?? "";
      const r = rightLines[i] ?? "";
      if (i < leftLines.length && i >= rightLines.length) {
        result.push({ type: "removed", text: l, num: i + 1 });
      } else if (i >= leftLines.length && i < rightLines.length) {
        result.push({ type: "added", text: r, num: i + 1 });
      } else if (l === r) {
        result.push({ type: "same", text: l, num: i + 1 });
      } else {
        result.push({ type: "removed", text: l, num: i + 1 });
        result.push({ type: "added", text: r, num: i + 1 });
      }
    }
    return result.length > 0 ? result : [{ type: "same", text: "", num: 0 }];
  }, [left, right]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-500">
            {t("diffOriginal")}
          </label>
          <textarea
            className="tool-textarea"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder={t("diffHint")}
            rows={8}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-500">
            {t("diffModified")}
          </label>
          <textarea
            className="tool-textarea"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder={t("diffHint")}
            rows={8}
          />
        </div>
      </div>
      {diff.length > 0 && diff[0].num !== 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
          {diff.map((line, i) => (
            <div
              key={i}
              className={`flex ${
                line.type === "added"
                  ? "diff-added"
                  : line.type === "removed"
                    ? "diff-removed"
                    : ""
              }`}
            >
              <span className="w-12 shrink-0 select-none border-r border-zinc-200 px-2 text-right text-zinc-400 dark:border-zinc-700">
                {line.num}
              </span>
              <span className="px-3 py-0.5">
                {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}
                {line.text || " "}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

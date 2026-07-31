"use client";

import { useState, useCallback } from "react";
import { useT } from "@/lib/i18n";

function generateV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const t = useT();
  const [uuids, setUuids] = useState<string[]>([generateV4()]);
  const [count, setCount] = useState(5);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, generateV4));
  }, [count]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">
          {t("uuidCount")}：
        </label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, +e.target.value || 1)))}
          className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <button onClick={generate} className="tool-btn tool-btn-primary">
          {t("uuidBatch")}
        </button>
        <button onClick={copyAll} className="tool-btn">
          {t("selectAll")}
        </button>
      </div>
      <div className="space-y-1 rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
        {uuids.map((u, i) => (
          <div
            key={i}
            className="cursor-pointer rounded px-2 py-0.5 text-zinc-700 hover:bg-blue-50 dark:text-zinc-300 dark:hover:bg-blue-900/30"
            onClick={() => {
              navigator.clipboard.writeText(u);
            }}
            title={t("copy")}
          >
            {u}
          </div>
        ))}
      </div>
    </div>
  );
}

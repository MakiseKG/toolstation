"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

const bases = [2, 8, 10, 16];

export default function NumberBase() {
  const t = useT();
  const [value, setValue] = useState("255");
  const [fromBase, setFromBase] = useState(10);

  const results = bases.map((base) => {
    try {
      const dec = parseInt(value, fromBase);
      if (isNaN(dec)) return "—";
      return dec.toString(base).toUpperCase();
    } catch {
      return "—";
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("nbInput")}
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <select
          value={fromBase}
          onChange={(e) => setFromBase(+e.target.value)}
          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        >
          <option value={2}>{t("nbBinary")}</option>
          <option value={8}>{t("nbOctal")}</option>
          <option value={10}>{t("nbDecimal")}</option>
          <option value={16}>{t("nbHex")}</option>
        </select>
      </div>
      <div className="grid gap-2">
        {bases.map((base, i) => (
          <div
            key={base}
            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <span className="text-zinc-500">
              {base === 2
                ? t("nbBinary")
                : base === 8
                  ? t("nbOctal")
                  : base === 10
                    ? t("nbDecimal")
                    : t("nbHex")}
            </span>
            <span className="select-all font-semibold text-zinc-900 dark:text-white">
              {results[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

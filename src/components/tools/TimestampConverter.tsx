"use client";

import { useState, useEffect, useMemo } from "react";
import { useT } from "@/lib/i18n";

export default function TimestampConverter() {
  const t = useT();
  // 初始为空：避免 SSR 与客户端水合时秒数不同（React #418）
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"timestamp-to-date" | "date-to-timestamp">(
    "timestamp-to-date"
  );

  useEffect(() => {
    setInput(String(Math.floor(Date.now() / 1000)));
  }, []);

  const result = useMemo(() => {
    if (!input.trim()) return null;
    try {
      if (mode === "timestamp-to-date") {
        const ts = input.length > 10 ? +input : +input * 1000;
        const d = new Date(ts);
        if (isNaN(d.getTime())) return null;
        return {
          local: d.toLocaleString("zh-CN"),
          iso: d.toISOString(),
          utc: d.toUTCString(),
          ms: d.getTime(),
        };
      } else {
        const d = new Date(input);
        if (isNaN(d.getTime())) return null;
        return {
          seconds: Math.floor(d.getTime() / 1000),
          ms: d.getTime(),
        };
      }
    } catch {
      return null;
    }
  }, [input, mode]);

  const now = () => {
    if (mode === "timestamp-to-date") {
      setInput(String(Math.floor(Date.now() / 1000)));
    } else {
      setInput(new Date().toISOString().slice(0, 19));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("timestamp-to-date")}
          className={`tool-btn ${mode === "timestamp-to-date" ? "tool-btn-primary" : ""}`}
        >
          {t("tsToDate")}
        </button>
        <button
          onClick={() => setMode("date-to-timestamp")}
          className={`tool-btn ${mode === "date-to-timestamp" ? "tool-btn-primary" : ""}`}
        >
          {t("tsDateToTs")}
        </button>
        <button onClick={now} className="tool-btn">
          {t("tsNow")}
        </button>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "timestamp-to-date"
            ? t("tsSeconds")
            : t("tsDateToTs")
        }
        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      {result && (
        <div className="space-y-2">
          {"seconds" in result ? (
            <>
              <div className="flex justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-zinc-500">{t("tsSeconds")}</span>
                <span className="select-all text-zinc-900 dark:text-white">{result.seconds}</span>
              </div>
              <div className="flex justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-zinc-500">{t("tsMilliseconds")}</span>
                <span className="select-all text-zinc-900 dark:text-white">{result.ms}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-zinc-500">{t("preview")}</span>
                <span className="select-all text-zinc-900 dark:text-white">{result.local}</span>
              </div>
              <div className="flex justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-zinc-500">{t("format")}</span>
                <span className="select-all text-zinc-900 dark:text-white">{result.iso}</span>
              </div>
              <div className="flex justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-zinc-500">{t("format")}</span>
                <span className="select-all text-zinc-900 dark:text-white">{result.utc}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";

const CHARS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSymbol, setUseSymbol] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let pool = "";
    if (useLower) pool += CHARS.lower;
    if (useUpper) pool += CHARS.upper;
    if (useNumber) pool += CHARS.number;
    if (useSymbol) pool += CHARS.symbol;
    if (!pool) return;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
    setPassword(result);
  }, [length, useLower, useUpper, useNumber, useSymbol]);

  const strength = () => {
    if (!password) return { label: "", color: "" };
    let score = 0;
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    if (score >= 6) return { label: "极强", color: "bg-green-500" };
    if (score >= 4) return { label: "强", color: "bg-blue-500" };
    if (score >= 2) return { label: "中等", color: "bg-amber-500" };
    return { label: "弱", color: "bg-red-500" };
  };

  const s = strength();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm">长度：{length}</label>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(+e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        {[
          ["小写字母", useLower, setUseLower],
          ["大写字母", useUpper, setUseUpper],
          ["数字", useNumber, setUseNumber],
          ["符号", useSymbol, setUseSymbol],
        ].map(([label, checked, setter]) => (
          <label key={label as string} className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={checked as boolean}
              onChange={(e) => (setter as React.Dispatch<React.SetStateAction<boolean>>)(e.target.checked)}
            />
            {label as string}
          </label>
        ))}
      </div>
      <button onClick={generate} className="tool-btn tool-btn-primary w-full justify-center">
        生成密码
      </button>
      {password && (
        <>
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center font-mono text-lg tracking-widest outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(password)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-zinc-200 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300"
            >
              复制
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className={`h-full ${s.color}`} style={{ width: `${(s.label === "极强" ? 100 : s.label === "强" ? 75 : s.label === "中等" ? 50 : 25)}%` }} />
            </div>
            <span className="text-xs text-zinc-500">{s.label}</span>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [input, setInput] = useState("#3b82f6");
  const [error, setError] = useState("");

  const color = useMemo(() => {
    setError("");
    try {
      let r = 0, g = 0, b = 0;
      const val = input.trim();

      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        ({ r, g, b } = hexToRgb(val));
      } else if (/^#[0-9a-fA-F]{3}$/.test(val)) {
        ({ r, g, b } = hexToRgb("#" + val[1]+val[1]+val[2]+val[2]+val[3]+val[3]));
      } else {
        const rgbMatch = val.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          r = +rgbMatch[1]; g = +rgbMatch[2]; b = +rgbMatch[3];
        } else {
          return null;
        }
      }

      if ([r, g, b].some((c) => c < 0 || c > 255)) return null;
      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` };
    } catch {
      return null;
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {color && (
          <div
            className="h-10 w-10 rounded-lg border border-zinc-300 shadow-inner"
            style={{ backgroundColor: color.hex }}
          />
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="#3b82f6 或 rgb(59,130,246)"
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      {color && (
        <div className="grid gap-2">
          {[
            ["HEX", color.hex],
            ["RGB", color.rgb],
            ["HSL", color.hsl],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <span className="text-zinc-500">{label}</span>
              <span
                className="cursor-pointer select-all text-zinc-900 dark:text-white"
                onClick={(e) => {
                  navigator.clipboard.writeText(val);
                  (e.target as HTMLElement).textContent = "已复制!";
                  setTimeout(() => {
                    (e.target as HTMLElement).textContent = val;
                  }, 1000);
                }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      )}
      {!color && input && (
        <p className="text-sm text-red-500">无法识别的颜色格式，请输入 #HEX 或 rgb(r,g,b)</p>
      )}
    </div>
  );
}

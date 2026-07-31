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

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
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
      return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, r, g, b, h: hsl.h, s: hsl.s, l: hsl.l };
    } catch {
      return null;
    }
  }, [input]);

  const palettes = useMemo(() => {
    if (!color) return null;
    const { h, s, l } = color;

    // Monochromatic
    const mono = [90, 70, 50, 30, 10].map((lightness) => hslToHex(h, s, lightness));

    // Analogous
    const analogous = [-30, -15, 0, 15, 30].map((offset) => hslToHex((h + offset + 360) % 360, s, l));

    // Complementary
    const comp = hslToHex((h + 180) % 360, s, l);
    const complementary = [hslToHex(h, s, l), comp];

    // Triadic
    const triadic = [0, 120, 240].map((offset) => hslToHex((h + offset) % 360, s, l));

    return { mono, analogous, complementary, triadic };
  }, [color]);

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
        <>
          {/* Base formats */}
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

          {/* Palettes */}
          {palettes && (
            <div className="space-y-4 pt-2">
              <PaletteRow title="单色渐变（Monochromatic）" colors={palettes.mono} />
              <PaletteRow title="类比色（Analogous）" colors={palettes.analogous} />
              <PaletteRow title="互补色（Complementary）" colors={palettes.complementary} />
              <PaletteRow title="三角色（Triadic）" colors={palettes.triadic} />
            </div>
          )}
        </>
      )}

      {!color && input && (
        <p className="text-sm text-red-500">无法识别的颜色格式，请输入 #HEX 或 rgb(r,g,b)</p>
      )}
    </div>
  );
}

function PaletteRow({ title, colors }: { title: string; colors: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{title}</p>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => navigator.clipboard.writeText(c)}
            className="group relative h-12 flex-1 rounded-lg border border-zinc-200 shadow-sm transition hover:scale-105 hover:shadow-md dark:border-zinc-700"
            style={{ backgroundColor: c }}
            title={c}
          >
            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 text-xs font-mono text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              {c}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

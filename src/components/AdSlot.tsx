"use client";

interface AdSlotProps {
  position: "top" | "bottom" | "sidebar";
}

export default function AdSlot({ position }: AdSlotProps) {
  const height = position === "sidebar" ? "h-[600px]" : "h-[90px]";
  const label =
    position === "top"
      ? "顶部广告位 — 728×90"
      : position === "bottom"
        ? "底部广告位 — 728×90"
        : "侧边栏广告位 — 300×600";

  return (
    <div
      className={`${height} my-4 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-100 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500`}
      data-ad-slot={position}
    >
      {label}
    </div>
  );
}

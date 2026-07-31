"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  position: "top" | "bottom" | "sidebar";
}

// 广告位 ID — 替换为 AdSense 后台创建的广告单元 ID
const AD_UNITS: Record<string, string> = {
  top: "1234567890",
  bottom: "0987654321",
  sidebar: "1122334455",
};

export default function AdSlot({ position }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    try {
      // 每个广告位单独触发渲染
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense 被广告拦截器屏蔽时静默失败
    }
  }, []);

  const style: React.CSSProperties =
    position === "sidebar"
      ? { display: "block", minHeight: "600px", width: "100%" }
      : { display: "block", minHeight: "90px" };

  return (
    <div className="my-4 flex justify-center overflow-hidden rounded-lg">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-6204139410729703"
        data-ad-slot={AD_UNITS[position]}
        data-ad-format={position === "sidebar" ? "vertical" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}

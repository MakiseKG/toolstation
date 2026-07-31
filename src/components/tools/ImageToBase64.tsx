"use client";

import { useState, useCallback } from "react";
import { useT } from "@/lib/i18n";

export default function ImageToBase64() {
  const t = useT();
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0, bytes: 0 });

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setBase64(result);
        setSize((s) => ({ ...s, bytes: new TextEncoder().encode(result).length }));
        const img = new Image();
        img.onload = () => {
          setSize({ width: img.naturalWidth, height: img.naturalHeight, bytes: new TextEncoder().encode(result).length });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-600">
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
        <div className="text-center">
          <p className="text-3xl">📤</p>
          <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {t("imgDrop")}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {t("upload")}
          </p>
        </div>
      </label>

      {base64 && (
        <>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
            <span>{fileName}</span>
            <span>{size.width}×{size.height}</span>
            <span>{(size.bytes / 1024).toFixed(1)} KB</span>
          </div>
          <img
            src={base64}
            alt="preview"
            className="max-h-48 rounded-lg border border-zinc-200 object-contain dark:border-zinc-700"
          />
          <textarea
            className="tool-textarea"
            value={base64}
            readOnly
            rows={4}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </>
      )}
    </div>
  );
}

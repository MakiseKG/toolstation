"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function JwtDecoder() {
  const t = useT();
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [decoded, setDecoded] = useState<{ header: string; payload: string; error: string } | null>(null);

  const decode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("JWT 必须由三段组成 (header.payload.signature)");
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      setDecoded({
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        error: "",
      });
    } catch (e) {
      setDecoded({ header: "", payload: "", error: (e as Error).message });
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder={t("jwtHint")}
        rows={4}
      />
      <div className="flex gap-2">
        <button onClick={decode} className="tool-btn tool-btn-primary">
          {t("decode")}
        </button>
        <button
          onClick={() => { setToken(""); setDecoded(null); }}
          className="tool-btn"
        >
          {t("clear")}
        </button>
      </div>
      {decoded?.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">
          {decoded.error}
        </p>
      )}
      {decoded && !decoded.error && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-500">{t("jwtHeader")}</label>
            <pre className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-800">
              {decoded.header}
            </pre>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-500">{t("jwtPayload")}</label>
            <pre className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-800">
              {decoded.payload}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

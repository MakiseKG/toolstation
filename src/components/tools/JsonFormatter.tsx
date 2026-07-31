"use client";

import { useState, useCallback } from "react";
import { useT } from "@/lib/i18n";

export default function JsonFormatter() {
  const t = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const minify = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, [input]);

  const validate = useCallback(() => {
    try {
      JSON.parse(input);
      setError("✅ " + t("jsonValid"));
      setOutput("");
    } catch (e) {
      setError("❌ " + (e as Error).message);
    }
  }, [input, t]);

  const repair = useCallback(() => {
    let text = input.trim();
    if (!text) return;

    // Remove JavaScript-style comments
    text = text.replace(/\/\/.*$/gm, "");
    text = text.replace(/\/\*[\s\S]*?\*\//g, "");

    // Fix single quotes to double quotes (simple cases)
    text = text.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

    // Fix trailing commas
    text = text.replace(/,(\s*[}\]])/g, "$1");

    // Fix unquoted keys (simple cases)
    text = text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

    try {
      const obj = JSON.parse(text);
      setOutput(JSON.stringify(obj, null, 2));
      setError("✅ " + t("repairedAndFormatted"));
    } catch (e) {
      setError("❌ " + t("cannotRepair") + ": " + (e as Error).message);
    }
  }, [input, t]);

  const generateTs = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      const ts = jsonToTs(obj, "Root");
      setOutput(ts);
      setError("");
    } catch (e) {
      setError("❌ " + (e as Error).message);
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("jsonFormatterHint")}
        rows={8}
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="tool-btn tool-btn-primary">
          {t("format")}
        </button>
        <button onClick={minify} className="tool-btn">
          {t("minify")}
        </button>
        <button onClick={validate} className="tool-btn">
          {t("validate")}
        </button>
        <button onClick={repair} className="tool-btn">
          🔧 {t("repair")}
        </button>
        <button onClick={generateTs} className="tool-btn">
          {t("generateTs")}
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="tool-btn"
        >
          {t("clear")}
        </button>
      </div>

      {error && (
        <p
          className={`rounded-lg p-3 text-sm whitespace-pre-line ${
            error.startsWith("✅")
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {error}
        </p>
      )}

      {output && (
        <textarea
          className="tool-textarea"
          value={output}
          readOnly
          rows={12}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      )}
    </div>
  );
}

function jsonToTs(value: unknown, name: string): string {
  if (value === null) return `type ${name} = null;`;
  if (typeof value === "string") return `type ${name} = string;`;
  if (typeof value === "number") return `type ${name} = number;`;
  if (typeof value === "boolean") return `type ${name} = boolean;`;
  if (Array.isArray(value)) {
    if (value.length === 0) return `type ${name} = unknown[];`;
    const itemType = inferTypeName(value[0]);
    if (itemType) {
      return `type ${name} = ${itemType}[];`;
    }
    return `type ${name} = unknown[];`;
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const fields = Object.entries(obj).map(([key, val]) => {
      const optional = val === undefined;
      const type = getTsType(val);
      return `  ${key}${optional ? "?" : ""}: ${type};`;
    });
    return `interface ${name} {\n${fields.join("\n")}\n}`;
  }
  return `type ${name} = unknown;`;
}

function getTsType(val: unknown): string {
  if (val === null) return "null";
  if (typeof val === "string") return "string";
  if (typeof val === "number") return "number";
  if (typeof val === "boolean") return "boolean";
  if (Array.isArray(val)) {
    if (val.length === 0) return "unknown[]";
    const itemType = getTsType(val[0]);
    return `${itemType}[]`;
  }
  if (typeof val === "object") {
    const obj = val as Record<string, unknown>;
    const fields = Object.entries(obj).map(([k, v]) => `${k}: ${getTsType(v)}`);
    return `{ ${fields.join("; ")} }`;
  }
  return "unknown";
}

function inferTypeName(val: unknown): string | null {
  if (val === null) return "unknown";
  if (typeof val === "string") return "string";
  if (typeof val === "number") return "number";
  if (typeof val === "boolean") return "boolean";
  if (Array.isArray(val)) return null;
  if (typeof val === "object") return null;
  return null;
}

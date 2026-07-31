"use client";

import { useState } from "react";

function csvToJson(csv: string): unknown[] {
  const lines = csv.trim().split("\n");
  if (!lines.length) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let val = "";
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"' && !inQuotes) {
        inQuotes = true;
      } else if (ch === '"' && inQuotes) {
        inQuotes = false;
      } else if (ch === "," && !inQuotes) {
        values.push(val.trim());
        val = "";
      } else {
        val += ch;
      }
    }
    values.push(val.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? "";
    });
    return obj;
  });
}

function jsonToCsv(json: unknown[]): string {
  if (!json.length || typeof json[0] !== "object" || json[0] === null) return "";
  const headers = Object.keys(json[0]);
  const rows = json.map((row) =>
    headers
      .map((h) => {
        const v = String((row as Record<string, unknown>)[h] ?? "");
        return v.includes(",") ? `"${v}"` : v;
      })
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export default function CsvJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"csv-to-json" | "json-to-csv">("csv-to-json");

  const convert = () => {
    try {
      if (mode === "csv-to-json") {
        setOutput(JSON.stringify(csvToJson(input), null, 2));
      } else {
        const arr = JSON.parse(input);
        if (!Array.isArray(arr)) throw new Error("JSON 必须是数组");
        setOutput(jsonToCsv(arr));
      }
    } catch (e) {
      setOutput("❌ " + (e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("csv-to-json")}
          className={`tool-btn ${mode === "csv-to-json" ? "tool-btn-primary" : ""}`}
        >
          CSV → JSON
        </button>
        <button
          onClick={() => setMode("json-to-csv")}
          className={`tool-btn ${mode === "json-to-csv" ? "tool-btn-primary" : ""}`}
        >
          JSON → CSV
        </button>
      </div>
      <textarea
        className="tool-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "csv-to-json"
            ? "name,age\nAlice,30\nBob,25"
            : '[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
        }
        rows={8}
      />
      <div className="flex gap-2">
        <button onClick={convert} className="tool-btn tool-btn-primary">
          转换
        </button>
        <button
          onClick={() => { setInput(""); setOutput(""); }}
          className="tool-btn"
        >
          清空
        </button>
      </div>
      {output && (
        <textarea
          className="tool-textarea"
          value={output}
          readOnly
          rows={10}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      )}
    </div>
  );
}

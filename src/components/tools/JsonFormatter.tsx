"use client";

import { useState, useCallback } from "react";

export default function JsonFormatter() {
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
      setError("✅ JSON 格式有效");
      setOutput("");
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
        placeholder='粘贴 JSON 数据，例如：{"name": "hello", "value": 123}'
        rows={8}
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="tool-btn tool-btn-primary">
          格式化
        </button>
        <button onClick={minify} className="tool-btn">
          压缩
        </button>
        <button onClick={validate} className="tool-btn">
          验证
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="tool-btn"
        >
          清空
        </button>
      </div>
      {error && (
        <p
          className={`rounded-lg p-3 text-sm ${
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

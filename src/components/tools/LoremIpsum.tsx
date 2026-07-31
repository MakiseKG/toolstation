"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

function generateParagraph(wordCount: number): string {
  let text = "";
  for (let i = 0; i < wordCount; i++) {
    text += LOREM_WORDS[i % LOREM_WORDS.length] + " ";
  }
  text = text.trim() + "。";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function LoremIpsum() {
  const t = useT();
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerPara, setWordsPerPara] = useState(50);
  const [output, setOutput] = useState("");

  const generate = () => {
    const paras: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      paras.push(generateParagraph(wordsPerPara));
    }
    setOutput(paras.join("\n\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          {t("loremParagraphs")}：
          <input
            type="number"
            min={1}
            max={20}
            value={paragraphs}
            onChange={(e) => setParagraphs(+e.target.value || 1)}
            className="w-16 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-center dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          {t("loremWords")}：
          <input
            type="number"
            min={5}
            max={200}
            value={wordsPerPara}
            onChange={(e) => setWordsPerPara(+e.target.value || 10)}
            className="w-16 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-center dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </label>
        <button onClick={generate} className="tool-btn tool-btn-primary">
          {t("generate")}
        </button>
      </div>
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

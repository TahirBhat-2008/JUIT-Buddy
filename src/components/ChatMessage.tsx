"use client";

import { memo, useState, useMemo } from "react";
import { Message } from "@/lib/types";

interface ChatMessageProps {
  message: Message;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 text-gray-100 shadow-md max-w-full">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-gray-900/90 border-b border-gray-800 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="uppercase text-[10px] font-bold text-gray-400 ml-1 tracking-wider">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <span className="text-emerald-400">✓</span>
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code Content */}
      <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed text-gray-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function formatInlineParts(text: string): React.ReactNode {
  const inlineRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(inlineRegex);

  return parts.map((part, partIdx) => {
    // Markdown link: [text](url)
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (match) {
        return (
          <a
            key={partIdx}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 break-words transition-colors"
          >
            <span>{match[1]}</span>
            <span className="text-[10px] opacity-75">↗</span>
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={partIdx} className="font-semibold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**") && part.length >= 2) {
      return (
        <em key={partIdx} className="italic text-gray-800 dark:text-gray-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={partIdx}
          className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-pink-600 dark:text-pink-400 font-semibold break-words"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={partIdx}>{part}</span>;
  });
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-3 overflow-x-auto max-w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs bg-white dark:bg-gray-900/60 touch-pan-x">
      <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-xs">
        <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 font-semibold border-b border-gray-200 dark:border-gray-800">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-bold tracking-wide">
                {formatInlineParts(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-gray-700 dark:text-gray-300">
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-3 py-2 whitespace-normal break-words">
                  {formatInlineParts(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatTextBlock(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let tableAccumulator: string[] = [];

  const flushTable = (keyPrefix: string) => {
    if (tableAccumulator.length > 0) {
      if (tableAccumulator.length >= 2 && tableAccumulator[1].includes("---")) {
        const headers = tableAccumulator[0]
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        const rows = tableAccumulator
          .slice(2)
          .map((r) =>
            r
              .split("|")
              .slice(1, -1)
              .map((c) => c.trim())
          );
        elements.push(
          <TableBlock
            key={`${keyPrefix}-table`}
            headers={headers}
            rows={rows}
          />
        );
      } else {
        // Render regular lines
        tableAccumulator.forEach((tLine, tIdx) => {
          elements.push(
            <div key={`${keyPrefix}-raw-${tIdx}`} className="leading-relaxed">
              {formatInlineParts(tLine)}
            </div>
          );
        });
      }
      tableAccumulator = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Check if line is part of a markdown table
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      tableAccumulator.push(trimmed);
      return;
    }

    // Flush any pending table before regular lines
    flushTable(`line-${lineIdx}`);

    // Headers
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={`h4-${lineIdx}`} className="font-bold text-base mt-3 mb-1 text-gray-900 dark:text-gray-100">
          {line.replace("### ", "")}
        </h4>
      );
      return;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={`h3-${lineIdx}`} className="font-bold text-lg mt-3.5 mb-1.5 text-gray-900 dark:text-white">
          {line.replace("## ", "")}
        </h3>
      );
      return;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={`h2-${lineIdx}`} className="font-bold text-xl mt-4 mb-2 text-gray-900 dark:text-white">
          {line.replace("# ", "")}
        </h2>
      );
      return;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${lineIdx}`}
          className="border-l-3 border-blue-500 dark:border-blue-400 pl-3 my-2 text-xs sm:text-sm italic text-gray-600 dark:text-gray-400 bg-blue-50/30 dark:bg-blue-950/20 py-1 rounded-r-lg"
        >
          {formatInlineParts(line.replace(/^>\s*/, ""))}
        </blockquote>
      );
      return;
    }

    // Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      elements.push(
        <div key={`ul-${lineIdx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 flex-shrink-0" />
          <div className="flex-1 min-w-0 leading-relaxed text-sm">
            {formatInlineParts(trimmed.replace(/^[-*]\s+/, ""))}
          </div>
        </div>
      );
      return;
    }

    // Ordered List (1. 2.)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      elements.push(
        <div key={`ol-${lineIdx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">
            {olMatch[1]}.
          </span>
          <div className="flex-1 min-w-0 leading-relaxed text-sm">
            {formatInlineParts(olMatch[2])}
          </div>
        </div>
      );
      return;
    }

    // Empty line / paragraph break
    if (!trimmed) {
      elements.push(<div key={`blank-${lineIdx}`} className="h-2" />);
      return;
    }

    // Normal line
    elements.push(
      <div key={`norm-${lineIdx}`} className="leading-relaxed text-sm">
        {formatInlineParts(line)}
      </div>
    );
  });

  flushTable("end");
  return elements;
}

function parseContent(text: string): React.ReactNode {
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <div key={`text-${lastIndex}`}>
          {formatTextBlock(text.substring(lastIndex, match.index))}
        </div>
      );
    }
    const lang = match[1] || "";
    const code = match[2] || "";
    elements.push(
      <CodeBlock key={`code-${match.index}`} code={code.trimEnd()} language={lang} />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(
      <div key={`text-${lastIndex}`}>
        {formatTextBlock(text.substring(lastIndex))}
      </div>
    );
  }

  return elements;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const renderedContent = useMemo(() => {
    return isUser ? null : parseContent(message.content);
  }, [isUser, message.content]);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-3 fade-slide-in">
        <div className="flex items-start gap-2 max-w-[88%] sm:max-w-[80%] flex-row-reverse min-w-0">
          {/* User Avatar */}
          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-xs">
            👤
          </div>

          {/* User Bubble */}
          <div className="rounded-2xl rounded-tr-sm px-3.5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/15 min-w-0 break-words break-anywhere">
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal break-words break-anywhere">
              {message.content}
            </div>
            <div className="flex items-center justify-end gap-1 text-[10px] text-blue-200/80 mt-1">
              <span>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-blue-200/80 font-mono">✓✓</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-3 fade-slide-in">
      <div className="flex items-start gap-2 sm:gap-2.5 max-w-[96%] sm:max-w-[90%] group min-w-0">
        {/* Assistant Avatar */}
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-sm sm:text-base shadow-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white animate-avatar-halo ring-1 ring-blue-400/20">
          🎓
        </div>

        {/* Message Bubble Card */}
        <div className="flex-1 rounded-2xl rounded-tl-md px-3 sm:px-4 py-2.5 sm:py-3 glass-surface border border-gray-200/80 dark:border-gray-800/90 border-l-[3px] border-l-blue-500 dark:border-l-blue-400 shadow-xs min-w-0 overflow-hidden">
          {/* Compact Top Bar — muted unless hovered */}
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-gray-100/80 dark:border-gray-800/50 text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-[11px]">JUIT Buddy</span>
              <span className="px-1 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">AI</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
              <button
                onClick={handleCopyMessage}
                title="Copy message"
                className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-0.5"
              >
                {copied ? (
                  <span className="text-emerald-500 text-[10px] font-semibold">✓ Copied</span>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
              <span className="text-[10px]">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Message Content */}
          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-1">
            {renderedContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatMessage);

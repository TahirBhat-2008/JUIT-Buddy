"use client";

import { useState, useRef } from "react";

import { MessageImage } from "@/lib/types";

interface NotesUploadProps {
  onUpload: (content: string, fileName: string, images?: MessageImage[]) => void;
}

/** Max inline image size sent to the vision model (base64 inflates ~33%) */
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export default function NotesUpload({ onUpload }: NotesUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    const validTypes = ["application/pdf", "text/plain", "image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF, text file, or image (PNG/JPG)");
      return;
    }

    setIsProcessing(true);

    try {
      let content = "";
      let imagePayload: MessageImage | undefined = undefined;

      if (file.type === "text/plain") {
        content = await file.text();
      } else if (file.type.startsWith("image/")) {
        // Bug fix: previously the base64 was computed and then THROWN AWAY —
        // only a placeholder string was sent, so "vision" silently did nothing.
        if (file.size > MAX_IMAGE_BYTES) {
          alert(`Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please upload an image under 4 MB.`);
          return;
        }
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          // Bug fix: a failed read previously left the spinner stuck forever
          reader.onerror = () => reject(new Error("Could not read the image file"));
          reader.readAsDataURL(file);
        });
        imagePayload = { mimeType: file.type, data: base64 };
        content = `[Image uploaded: ${file.name}]\n\nPlease analyze this image and explain what you see. If it contains academic content, summarize it and explain the key concepts.`;
      } else if (file.type === "application/pdf") {
        content = `[PDF uploaded: ${file.name}]\n\nI've uploaded a PDF document. Please help me understand this document by:\n1. Summarizing the main topics\n2. Explaining key concepts\n3. Creating practice questions based on the content\n\nNote: For best results with PDFs, try copying and pasting the text content directly.`;
      }

      onUpload(content, file.name, imagePayload ? [imagePayload] : undefined);
    } catch {
      alert("Error processing file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 w-full max-w-full min-w-0 overflow-hidden">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">📝 Upload Notes</h3>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30"
            : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Processing file...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">📄</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Drop a file here or click to upload
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Supports PDF, TXT, PNG, JPG
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept=".pdf,.txt,.png,.jpg,.jpeg"
        className="hidden"
      />

      <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        💡 Tip: For PDFs, copy-paste the text content for better AI analysis
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStudentName?: string;
  defaultStudentEmail?: string;
}

interface UserChatMessage {
  id: string;
  timestamp: string;
  studentName: string;
  studentEmail?: string;
  studentBatch: string;
  mode: string;
  message: string;
}

interface SubmittedReport {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  category: string;
  message: string;
}

const CATEGORIES = [
  { id: "bug", label: "🐛 Bug / Error", desc: "Something isn't working right" },
  { id: "feature", label: "💡 Feature Request", desc: "Suggest a new idea or tool" },
  { id: "syllabus", label: "📚 Missing Material", desc: "Notes, syllabus or schedule update" },
  { id: "general", label: "💬 General Feedback", desc: "Questions, thoughts or appreciation" },
];

export default function ReportModal({
  isOpen,
  onClose,
  defaultStudentName = "",
  defaultStudentEmail = "",
}: ReportModalProps) {
  const [activeTab, setActiveTab] = useState<"report" | "inbox">("report");
  const [name, setName] = useState(defaultStudentName);
  const [email, setEmail] = useState(defaultStudentEmail);
  const [category, setCategory] = useState("bug");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Admin Inbox State
  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatMessages, setChatMessages] = useState<UserChatMessage[]>([]);
  const [reportsList, setReportsList] = useState<SubmittedReport[]>([]);
  const [inboxSearch, setInboxSearch] = useState("");
  const [inboxSubView, setInboxSubView] = useState<"chat" | "reports">("chat");

  useEffect(() => {
    if (defaultStudentName && !name) setName(defaultStudentName);
    if (defaultStudentEmail && !email) setEmail(defaultStudentEmail);
  }, [defaultStudentName, defaultStudentEmail]);

  // Remember if Tahir already unlocked admin on this device
  useEffect(() => {
    const savedKey = localStorage.getItem("juit-admin-passcode");
    if (savedKey === "tahir2008") {
      setIsAdminUnlocked(true);
      setAdminPasscode("tahir2008");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Fetch messages when inbox is unlocked
  const fetchAdminMessages = async (pass = adminPasscode) => {
    setIsLoadingMessages(true);
    setAdminError("");
    try {
      const res = await fetch(`/api/messages?passcode=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setChatMessages(data.chatMessages || []);
        setReportsList(data.reports || []);
        setIsAdminUnlocked(true);
        localStorage.setItem("juit-admin-passcode", pass);
      } else {
        setAdminError(data.error || "Invalid passcode. Please try again.");
      }
    } catch {
      setAdminError("Failed to fetch messages. Check network connection.");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPasscode.trim()) {
      setAdminError("Please enter passcode.");
      return;
    }
    fetchAdminMessages(adminPasscode.trim());
  };

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tahirbhat2008@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg("Please write your message before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonymous Student",
          email: email.trim() || "not-provided@juitbuddy.local",
          category: CATEGORIES.find((c) => c.id === category)?.label || category,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to deliver report. Please try again.");
      }
    } catch {
      setErrorMsg("Network issue occurred. You can still email directly to tahirbhat2008@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setSubmitted(false);
    setErrorMsg("");
  };

  const mailtoUrl = `mailto:tahirbhat2008@gmail.com?subject=${encodeURIComponent(
    `[JUIT Buddy] ${CATEGORIES.find((c) => c.id === category)?.label || "Report"} from ${name || "Student"}`
  )}&body=${encodeURIComponent(message || "Hi Tahir,\n\nI would like to report...")}`;

  const filteredChatMessages = chatMessages.filter((m) => {
    if (!inboxSearch.trim()) return true;
    const q = inboxSearch.toLowerCase();
    return (
      m.message.toLowerCase().includes(q) ||
      m.studentName.toLowerCase().includes(q) ||
      m.studentBatch.toLowerCase().includes(q) ||
      m.mode.toLowerCase().includes(q)
    );
  });

  const filteredReports = reportsList.filter((r) => {
    if (!inboxSearch.trim()) return true;
    const q = inboxSearch.toLowerCase();
    return (
      r.message.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity fade-slide-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Tabs */}
        <div className="p-2.5 sm:p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2 bg-gray-50/90 dark:bg-gray-800/90 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 p-0.5 rounded-xl bg-gray-200/80 dark:bg-gray-700/80 text-xs font-bold min-w-0">
            <button
              type="button"
              onClick={() => setActiveTab("report")}
              className={`px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === "report"
                  ? "bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-xs scale-[1.02]"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              <span>🚩</span>
              <span><span className="hidden sm:inline">Send </span>Message</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("inbox");
                if (isAdminUnlocked) fetchAdminMessages();
              }}
              className={`px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === "inbox"
                  ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-[1.02]"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              <span>📥</span>
              <span><span className="hidden sm:inline">Developer </span>Inbox</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm cursor-pointer flex-shrink-0"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Tab 1 (Send Report/Message) */}
        {activeTab === "report" && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Developer Contact Quick Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-blue-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👨‍💻</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Tahir Bhat
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300">
                      Lead Developer • JUIT Buddy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* LinkedIn Link */}
                  <a
                    href="https://www.linkedin.com/in/tahirbhat-2008-cse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#0077b5] text-white hover:bg-[#005f93] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    title="Open Tahir's LinkedIn Profile"
                  >
                    <span>in</span>
                    <span>LinkedIn</span>
                    <span className="text-[10px]">↗</span>
                  </a>

                  {/* Copy Email Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Copy email to clipboard"
                  >
                    <span>✉️</span>
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 dark:border-gray-700 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300 flex-wrap gap-1">
                <span>
                  Direct Email: <strong className="font-mono text-gray-900 dark:text-gray-100">tahirbhat2008@gmail.com</strong>
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Delivered straight to inbox
                </span>
              </div>
            </div>

            {/* Form / Success State */}
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 fade-slide-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-2xl mx-auto shadow-sm">
                  ✓
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                  Your message has been dispatched directly to <strong>tahirbhat2008@gmail.com</strong>.
                  Thank you for your feedback!
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Category Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                    Report Type:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORIES.map((cat) => {
                      const isSelected = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 shadow-2xs ring-1 ring-blue-400/40"
                              : "bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <p className="text-xs font-bold">{cat.label}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                            {cat.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Optional Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Your Name (or Batch):
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul / 26BT11"
                      className="w-full text-xs font-medium p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Your Contact Email (Optional):
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For response from Tahir"
                      className="w-full text-xs font-medium p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Your Message / Feedback: <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10.5px] text-gray-400">
                      {message.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here without leaving the website... What happened? Which tool or feature? Any suggestions?"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none"
                  />
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                  <a
                    href={mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
                    title="Prefer standard mail client?"
                  >
                    Open in Mail App ↗
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !message.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>✉️</span>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Modal Body: Tab 2 (Admin Developer Inbox) */}
        {activeTab === "inbox" && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
            {!isAdminUnlocked ? (
              <form onSubmit={handleUnlockAdmin} className="p-6 text-center space-y-3">
                <span className="text-3xl">🔐</span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Developer Passcode Required
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Only the site owner (Tahir Bhat) can view live user chat queries and reports.
                </p>
                <div className="max-w-xs mx-auto space-y-2">
                  <input
                    type="password"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="Enter passcode (tahir2008)"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  {adminError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold">{adminError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoadingMessages}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    {isLoadingMessages ? "Unlocking..." : "Unlock Messages"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                {/* Inbox Stats & Controls */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setInboxSubView("chat")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        inboxSubView === "chat"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      💬 Chat Queries ({chatMessages.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setInboxSubView("reports")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        inboxSubView === "reports"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      🚩 Reports ({reportsList.length})
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => fetchAdminMessages()}
                    disabled={isLoadingMessages}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>🔄</span>
                    <span>{isLoadingMessages ? "Refreshing..." : "Refresh"}</span>
                  </button>
                </div>

                {/* Search Bar */}
                <input
                  type="text"
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                  placeholder="Filter messages by student name, query, batch..."
                  className="w-full text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />

                {/* Messages List: Chat Queries */}
                {inboxSubView === "chat" && (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {filteredChatMessages.length === 0 ? (
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-6">
                        No user chat messages recorded yet.
                      </p>
                    ) : (
                      filteredChatMessages.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/70 dark:bg-gray-800/60 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-1 text-[10.5px] text-gray-500 dark:text-gray-400">
                            <span className="font-bold text-gray-800 dark:text-gray-200">
                              👤 {m.studentName} ({m.studentBatch})
                            </span>
                            <span className="font-mono">
                              {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed break-words break-all">
                            "{m.message}"
                          </p>
                          <div className="flex items-center gap-1.5 pt-0.5 text-[10px]">
                            <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold uppercase">
                              Mode: {m.mode}
                            </span>
                            {m.studentEmail && (
                              <span className="text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                                ✉️ {m.studentEmail}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Messages List: Submitted Reports */}
                {inboxSubView === "reports" && (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {filteredReports.length === 0 ? (
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-6">
                        No feedback reports recorded yet.
                      </p>
                    ) : (
                      filteredReports.map((r) => (
                        <div
                          key={r.id}
                          className="p-3 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/70 dark:bg-gray-800/60 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-1 text-[10.5px] text-gray-500 dark:text-gray-400">
                            <span className="font-bold text-rose-700 dark:text-rose-400">
                              {r.category} • from {r.name}
                            </span>
                            <span className="font-mono">
                              {new Date(r.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed break-words break-all">
                            "{r.message}"
                          </p>
                          {r.email && (
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                              Reply to: {r.email}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

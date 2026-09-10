"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import QuickActions from "@/components/QuickActions";
import AIModeSelector, { AIMode } from "@/components/AIModeSelector";
import Timetable from "@/components/Timetable";
import MessMenu from "@/components/MessMenu";
import CampusInfo from "@/components/CampusInfo";
import CampusMap from "@/components/CampusMap";
import NotesUpload from "@/components/NotesUpload";
import ProblemSolver from "@/components/ProblemSolver";
import CalendarPanel from "@/components/CalendarPanel";
import FacultyDirectory from "@/components/FacultyDirectory";
import ClubsDirectory from "@/components/ClubsDirectory";
import QuickNavDock from "@/components/QuickNavDock";
import MobileTabBar from "@/components/MobileTabBar";
import ReportModal from "@/components/ReportModal";
import { Message } from "@/lib/types";

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getWelcomeMessage(mode: AIMode): Message {
  const welcomeMessages: Record<AIMode, string> = {
    study: `Hey there! 👋 I'm **JUIT Buddy** in **Study Mode** 📚

I can help you with:
- 📚 **Explain concepts** — Break down tough topics into simple terms
- 🧮 **Physics & Maths** — Solve problems step-by-step
- ❓ **Practice questions** — Generate MCQs and problem sets
- 📝 **Summarize notes** — Upload PDFs and get summaries

What would you like to study today?`,
    "juit-info": `Hey there! 👋 I'm **JUIT Buddy** in **JUIT Info Mode** 🏫

I can help you with:
- 🏫 **Campus information** — Departments, facilities, locations
- 🗺️ **Campus map** — Terraces, hostels, mess, classrooms
- 📚 **Syllabus** — Course structure for all semesters
- 📅 **Timetable** — View and manage your schedule
- 🚨 **Contacts & Emergency** — 24x7 security (+91-1792-239222), ambulance (+91-1792-239225), police & offices

What do you want to know about JUIT?`,
    coding: `Hey there! 👋 I'm **JUIT Buddy** in **Coding Mode** 💻

I can help you with:
- 💻 **Programming** — C, C++, Python, Java, JavaScript, TypeScript
- 📊 **Data Structures & Algorithms** — Implementations and complexity
- 🌐 **Web Development** — React, Next.js, HTML, CSS, Node.js
- 🗄️ **Databases** — SQL, MongoDB, DBMS concepts
- 🖥️ **OS & Networks** — Core CS concepts explained

What do you want to code today?`,
  };

  return {
    id: "welcome",
    role: "assistant",
    content: welcomeMessages[mode],
    timestamp: new Date(),
  };
}

type SidebarPanel =
  | "none"
  | "timetable"
  | "mess"
  | "campus"
  | "map"
  | "notes"
  | "problems"
  | "calendar"
  | "faculty"
  | "clubs";

const PANEL_TABS: { id: SidebarPanel; label: string; icon: string }[] = [
  { id: "timetable", label: "Timetable", icon: "📅" },
  { id: "calendar",  label: "Calendar",  icon: "🗓️" },
  { id: "faculty",   label: "Faculty",   icon: "👨‍🏫" },
  { id: "clubs",     label: "Clubs",     icon: "🎭" },
  { id: "mess",      label: "Mess",      icon: "🍽️" },
  { id: "map",       label: "Map",       icon: "🗺️" },
  { id: "campus",    label: "Campus",    icon: "🏫" },
  { id: "notes",     label: "Notes",     icon: "📝" },
  { id: "problems",  label: "Solver",    icon: "🧮" },
];


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<AIMode>("study");
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState<SidebarPanel>("none");
  const [renderedPanel, setRenderedPanel] = useState<SidebarPanel>("none");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Manage smooth opening and closing animations for navbar panel
  useEffect(() => {
    if (activePanel !== "none") {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setRenderedPanel(activePanel);
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
      closeTimerRef.current = setTimeout(() => {
        setRenderedPanel("none");
        closeTimerRef.current = null;
      }, 250);
    }
  }, [activePanel]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Keyboard accessibility: Escape smoothly closes navbar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePanel !== "none") {
        setActivePanel("none");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePanel]);

  const [showJumpToBottom, setShowJumpToBottom] = useState(false);
  const [drawerDragX, setDrawerDragX] = useState(0);
  const drawerTouchRef = useRef<{ startX: number; startY: number; active: boolean }>({
    startX: 0,
    startY: 0,
    active: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentBatch, setStudentBatch] = useState("26BT11");
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginBatch, setLoginBatch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const isStreamingRef = useRef(false);

  // Load chat history from localStorage
  useEffect(() => {
    // Restore last AI mode first so the welcome message matches
    const savedMode = localStorage.getItem("juit-buddy-mode");
    const restoredMode: AIMode =
      savedMode === "study" || savedMode === "juit-info" || savedMode === "coding"
        ? savedMode
        : currentMode;
    setCurrentMode(restoredMode);

    const saved = localStorage.getItem("juit-buddy-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const valid = (Array.isArray(parsed) ? parsed : [])
          .filter(
            (m: Message) =>
              m &&
              typeof m.content === "string" &&
              !m.content.startsWith("Sorry, I ran into an issue")
          )
          .map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
        setMessages(valid.length > 0 ? valid : [getWelcomeMessage(restoredMode)]);
      } catch {
        setMessages([getWelcomeMessage(restoredMode)]);
      }
    } else {
      setMessages([getWelcomeMessage(restoredMode)]);
    }

    // Check if logged in
    const loggedIn = localStorage.getItem("juit-buddy-logged-in");
    const name = localStorage.getItem("juit-buddy-name");
    const email = localStorage.getItem("juit-buddy-email");
    const savedBatch = localStorage.getItem("juit-buddy-batch");
    if (loggedIn === "true" && name) {
      setIsLoggedIn(true);
      setStudentName(name);
      setStudentEmail(email || "");
      // Batch is remembered across the whole app (defaults to 26BT11)
      setStudentBatch(savedBatch && savedBatch.trim() ? savedBatch : "26BT11");
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("juit-buddy-chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll chat to bottom efficiently without smooth-scroll fighting
  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) return;

    if (isStreamingRef.current) {
      // Instant direct scroll during streaming eliminates choppy jitter
      container.scrollTop = container.scrollHeight;
    } else {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Track scroll position to show/hide the jump-to-latest button
  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      setShowJumpToBottom(distanceFromBottom > 240);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    const cleanName = loginName.trim();
    const cleanBatch = loginBatch.trim().toUpperCase();
    if (!cleanName || cleanBatch.length < 4) return;
    setIsLoggedIn(true);
    setStudentName(cleanName);
    setStudentEmail(loginEmail);
    setStudentBatch(cleanBatch);
    localStorage.setItem("juit-buddy-logged-in", "true");
    localStorage.setItem("juit-buddy-name", cleanName);
    localStorage.setItem("juit-buddy-email", loginEmail);
    localStorage.setItem("juit-buddy-batch", cleanBatch);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentName("");
    setStudentEmail("");
    setStudentBatch("26BT11");
    localStorage.removeItem("juit-buddy-logged-in");
    localStorage.removeItem("juit-buddy-name");
    localStorage.removeItem("juit-buddy-email");
    localStorage.removeItem("juit-buddy-batch");
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const assistantId = generateId();
    let hasAddedAssistantMsg = false;

    try {
      const apiMessages = messages
        .filter(
          (m) =>
            m.id !== "welcome" &&
            typeof m.content === "string" &&
            !m.content.startsWith("Sorry, I ran into an issue")
        )
        .map((m) => ({ role: m.role, content: m.content }));

      apiMessages.push({ role: "user", content });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          mode: currentMode,
          studentBatch,
          studentName: studentName || "Anonymous Student",
          studentEmail: studentEmail || "",
          currentDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        let errorMsg = "Something went wrong";
        try {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } catch {
          // ignore
        }
        throw new Error(errorMsg);
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      isStreamingRef.current = true;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let lastRenderTime = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        const now = performance.now();

        if (!hasAddedAssistantMsg) {
          hasAddedAssistantMsg = true;
          // Hide thinking spinner as soon as the first token arrives
          setIsLoading(false);
          lastRenderTime = now;
          setMessages((prev) => [
            ...prev,
            {
              id: assistantId,
              role: "assistant",
              content: accumulatedText,
              timestamp: new Date(),
            },
          ]);
        } else if (now - lastRenderTime > 35) {
          // Throttle state update to at most once per ~35ms to preserve 60fps responsiveness
          lastRenderTime = now;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: accumulatedText } : m
            )
          );
        }
      }

      // Final flush of any remaining buffer
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: accumulatedText } : m
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: `Sorry, I ran into an issue: ${
          error instanceof Error ? error.message : "Unknown error"
        }\n\nPlease check your connection and try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      isStreamingRef.current = false;
      setIsLoading(false);
    }
  };


  const clearChat = () => {
    setMessages([getWelcomeMessage(currentMode)]);
    localStorage.removeItem("juit-buddy-chat");
  };

  const handleModeChange = (mode: AIMode) => {
    setCurrentMode(mode);
    setMessages([getWelcomeMessage(mode)]);
    localStorage.setItem("juit-buddy-mode", mode);
    localStorage.removeItem("juit-buddy-chat");
  };

  const userMessageCount = messages.filter((m) => m.role === "user").length;

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="aurora-bg flex flex-col h-dvh min-h-dvh w-full overflow-y-auto overflow-x-hidden items-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="my-auto bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-2xl shadow-xl p-5 sm:p-8 w-full max-w-sm sm:max-w-md fade-slide-in">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎓</div>
            <h1 className="text-2xl font-black tracking-tight animate-brand-shimmer">
              JUIT Buddy
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Your AI Campus Assistant</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your name"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Batch *
              </label>
              <input
                type="text"
                value={loginBatch}
                onChange={(e) =>
                  setLoginBatch(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="e.g. 26BT11"
                maxLength={8}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-400 dark:placeholder-gray-500 font-mono tracking-widest uppercase"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Your batch code from JUIT (e.g. 26BT11, 25BT21)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your.name@juit.ac.in"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-400 dark:placeholder-gray-500"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={!loginName.trim() || loginBatch.trim().length < 4}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Get Started 🚀
            </button>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
            Welcome to JUIT Buddy — your personal AI study companion
          </p>
          <div className="flex justify-center mt-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 dark:bg-black text-white text-[11px] font-mono tracking-wide shadow-md border border-gray-700/80 dark:border-gray-800/90 hover:border-cyan-500/60 transition-all select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse animate-glow-border" />
              <span className="text-gray-400 text-[10px] uppercase font-sans tracking-wider font-bold">created by</span>
              <span className="font-black tracking-wider animate-continuous-color">
                NULL &amp; VOID
              </span>
              <span className="text-[10px] text-cyan-400 font-sans animate-glow-border">⚡</span>
            </div>
          </div>
        </div>
      </div>


    );
  }

  // Main Chat Interface
  return (
    <div className="aurora-bg flex flex-col h-dvh w-full max-w-full overflow-x-hidden">
      <Header
        onClearChat={clearChat}
        messageCount={userMessageCount}
        studentName={studentName}
        onLogout={handleLogout}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isNavOpen={activePanel !== "none"}
        onToggleNav={() => setActivePanel(activePanel === "none" ? "timetable" : "none")}
        onOpenReport={() => setIsReportOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden w-full max-w-full min-w-0">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-5 pb-20 md:pb-5">
              {userMessageCount === 0 && (
                <div className="mb-3.5">
                  <QuickActions
                    onSelect={sendMessage}
                    mode={currentMode}
                    studentName={studentName}
                  />
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <ChatInput onSend={sendMessage} isLoading={isLoading} />

          {/* Jump-to-latest floating pill */}
          <button
            onClick={() => {
              const container = chatScrollRef.current;
              if (container) {
                container.scrollTo({
                  top: container.scrollHeight,
                  behavior: "smooth",
                });
              }
            }}
            className={`absolute bottom-28 right-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 md:bottom-24 ${
              showJumpToBottom
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 pointer-events-none"
            }`}
            aria-label="Jump to latest message"
          >
            <span className="text-sm">↓</span>
            <span>Latest</span>
            {isLoading && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile/Tablet Backdrop Scrim with Smooth Fade Transition */}
        {renderedPanel !== "none" && (
          <div
            className={`fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-xs transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setActivePanel("none")}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Panel Drawer (Smooth Enter/Exit Animation for Mobile, Tablet, and Desktop) */}
        {renderedPanel !== "none" && (
          <aside
            onTouchStart={(e) => {
              const t = e.touches[0];
              drawerTouchRef.current = { startX: t.clientX, startY: t.clientY, active: true };
            }}
            onTouchMove={(e) => {
              if (!drawerTouchRef.current.active) return;
              const t = e.touches[0];
              const dx = t.clientX - drawerTouchRef.current.startX;
              const dy = t.clientY - drawerTouchRef.current.startY;
              // Only track clearly-horizontal swipes; ignore vertical scrolling
              if (Math.abs(dx) > Math.abs(dy) && dx > 0) {
                setDrawerDragX(Math.min(dx, 120));
              } else if (Math.abs(dy) > 8) {
                setDrawerDragX(0);
              }
            }}
            onTouchEnd={() => {
              if (drawerDragX > 80) {
                setActivePanel("none");
              }
              setDrawerDragX(0);
              drawerTouchRef.current.active = false;
            }}
            style={
              drawerDragX > 0 && isDrawerOpen
                ? { transform: `translateX(${drawerDragX}px)`, transition: "none" }
                : undefined
            }
            className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[26rem] max-w-full shadow-2xl lg:shadow-none lg:static lg:z-30 flex flex-col overflow-hidden bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDrawerOpen
                ? "translate-x-0 lg:w-[26rem] lg:opacity-100"
                : "translate-x-full lg:w-0 lg:opacity-0 lg:border-transparent pointer-events-none"
            }`}
          >
            {/* Inner fixed-width container to preserve layout and avoid text reflow during width collapse */}
            <div className="w-full sm:w-[26rem] max-w-full h-full flex flex-col flex-shrink-0 min-w-0">
              {/* Sticky Header with Title, Quick Switcher & Close Button */}
              <div className="p-3 sm:p-4 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md space-y-2.5 flex-shrink-0 min-w-0">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <h2 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate min-w-0">
                    {renderedPanel === "timetable" && "📅 Weekly Timetable"}
                    {renderedPanel === "mess"      && "🍽️ Hostel Mess Menu"}
                    {renderedPanel === "campus"    && "🏫 Campus Info & Syllabus"}
                    {renderedPanel === "map"       && "🗺️ Campus Map Guide"}
                    {renderedPanel === "notes"     && "📝 Notes & PDF Summarizer"}
                    {renderedPanel === "problems"  && "🧮 Problem Solver"}
                    {renderedPanel === "calendar"  && "🗓️ Academic Calendar 2026–27"}
                    {renderedPanel === "faculty"   && "👨‍🏫 Faculty Directory"}
                    {renderedPanel === "clubs"     && "🎭 JUIT Clubs & Communities"}
                  </h2>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setIsReportOpen(true)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/80 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                      title="Report issue or send message to developer Tahir Bhat"
                    >
                      🚩
                    </button>
                    <button
                      onClick={() => setActivePanel("none")}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base font-bold cursor-pointer flex-shrink-0 active:scale-95"
                      title="Close navbar panel (Esc)"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Quick Tab Switcher: 1-click switch between tools without having to close */}
                <div className="flex flex-wrap gap-1">
                  {PANEL_TABS.map((tab) => {
                    const isCurrent = activePanel === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActivePanel(tab.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
                          isCurrent
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Content Body with gentle cross-fade transition on tab switch */}
              <div key={renderedPanel} className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 fade-slide-in min-w-0 max-w-full">
                {renderedPanel === "timetable" && <Timetable batch={studentBatch} />}
                {renderedPanel === "mess" && <MessMenu />}
                {renderedPanel === "campus" && (
                  <CampusInfo onOpenMap={() => setActivePanel("map")} onOpenReport={() => setIsReportOpen(true)} />
                )}
                {renderedPanel === "map" && <CampusMap />}
                {renderedPanel === "notes" && (
                  <NotesUpload
                    onUpload={(content) => {
                      sendMessage(content);
                      setActivePanel("none");
                    }}
                  />
                )}
                {renderedPanel === "problems" && (
                  <ProblemSolver
                    onSolve={(problem) => {
                      sendMessage(problem);
                      setActivePanel("none");
                    }}
                  />
                )}
                {renderedPanel === "calendar" && <CalendarPanel />}
                {renderedPanel === "faculty" && <FacultyDirectory />}
                {renderedPanel === "clubs" && <ClubsDirectory />}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Floating Modern Quick-Access Dock (desktop/tablet only) */}
      <QuickNavDock
        activePanel={activePanel}
        onTogglePanel={(panel) => setActivePanel(panel)}
      />

      {/* Mobile bottom tab bar (phones only) */}
      <MobileTabBar
        activePanel={activePanel}
        onTogglePanel={(panel) => setActivePanel(panel)}
      />

      {/* Direct In-App Report & Feedback Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        defaultStudentName={studentName}
        defaultStudentEmail={studentEmail}
      />
    </div>
  );
}


"use client";

import { useState } from "react";
import { AIMode } from "./AIModeSelector";

interface QuickActionsProps {
  onSelect: (message: string) => void;
  mode: AIMode;
  studentName?: string;
}

interface ActionItem {
  icon: string;
  label: string;
  description: string;
  prompt: string;
  category: string;
}

const actionsByMode: Record<AIMode, ActionItem[]> = {
  study: [
    {
      icon: "💡",
      label: "Explain a Concept",
      description: "OOP explained simply with examples",
      prompt: "Explain the concept of Object-Oriented Programming in simple terms with examples",
      category: "Concepts",
    },
    {
      icon: "❓",
      label: "Practice Questions",
      description: "5 MCQs on Data Structures with answers",
      prompt: "Generate 5 practice MCQ questions on Data Structures (arrays, linked lists, trees)",
      category: "Exams",
    },
    {
      icon: "📝",
      label: "Study Strategies",
      description: "Proven revision schedule for end-sem exams",
      prompt: "Give me effective study strategies for preparing for end-semester exams",
      category: "Exams",
    },
    {
      icon: "🧮",
      label: "Calculus & Math",
      description: "Step-by-step: ∫(x²eˣ)dx",
      prompt: "Solve this integral step by step: ∫(x²eˣ)dx",
      category: "Math",
    },
    {
      icon: "🔬",
      label: "Physics Mechanics",
      description: "Projectile motion: height & time of flight",
      prompt: "A ball is thrown upward with velocity 20 m/s. Find the maximum height and time of flight.",
      category: "Math",
    },
    {
      icon: "📑",
      label: "Summarize Notes",
      description: "Concise key takeaways for revision",
      prompt: "I'll paste my notes below. Please create a concise summary with key points for exam revision.",
      category: "Concepts",
    },
  ],
  "juit-info": [
    {
      icon: "🏫",
      label: "Campus Overview",
      description: "Departments, labs & 3-terrace layout",
      prompt: "Tell me about JUIT campus — departments, facilities, and key locations",
      category: "Campus",
    },
    {
      icon: "🗺️",
      label: "Campus Navigator",
      description: "Academic blocks, hostels, mess & bus route",
      prompt: "Where are the academic block, library, hostels, and mess on the JUIT campus? Explain the three terraces and how to reach Waknaghat.",
      category: "Campus",
    },
    {
      icon: "📚",
      label: "CSE Syllabus",
      description: "Full semester breakdown for B.Tech CSE",
      prompt: "What are the subjects in B.Tech CSE at JUIT across all semesters?",
      category: "Academics",
    },
    {
      icon: "🚨",
      label: "Emergency Contacts",
      description: "24x7 security, ambulance, police",
      prompt: "What are the 24x7 emergency contacts at JUIT for campus security control room, dispensary ambulance, Kandaghat police, anti-ragging helpline, and Solan hospital?",
      category: "Directory",
    },
    {
      icon: "📞",
      label: "Official Contacts",
      description: "Academic council, wardens, placement",
      prompt: "What are the important office contacts at JUIT (academic, placement, hostel)?",
      category: "Directory",
    },
    {
      icon: "📖",
      label: "Library & LRC",
      description: "Hours, digital books & catalog search",
      prompt: "Tell me about JUIT library — timings, resources, and how to access digital content",
      category: "Services",
    },
    {
      icon: "🚌",
      label: "Bus Timetable",
      description: "Solan ⇄ Waknaghat ⇄ Shimla times",
      prompt: "What is the bus timetable between Solan, Waknaghat (JUIT cut), and Shimla? List departure times and fares.",
      category: "Transit",
    },
    {
      icon: "📊",
      label: "CGPA Calculator",
      description: "JUIT 10-point SGPA & CGPA guide",
      prompt: "How are SGPA and CGPA calculated at JUIT? Explain the 10-point letter grading system (A+ to F), credit weighting formula, 4.5 1st-year promotion cutoff, and 5.0 degree threshold.",
      category: "Academics",
    },
  ],
  coding: [
    {
      icon: "🌳",
      label: "DSA: Binary Trees",
      description: "BST insertion, deletion & traversals in Python",
      prompt: "Explain binary search tree operations with code implementation in Python",
      category: "Algorithms",
    },
    {
      icon: "🌐",
      label: "React Component",
      description: "Glassmorphic profile card with Tailwind",
      prompt: "Create a responsive React component for a user profile card with Tailwind CSS",
      category: "Web Dev",
    },
    {
      icon: "🗄️",
      label: "SQL Window Functions",
      description: "Second highest salary & partition queries",
      prompt: "Write a SQL query to find the second highest salary from an Employees table",
      category: "Database",
    },
    {
      icon: "🐍",
      label: "Python Algorithms",
      description: "Clean palindrome checker with O(1) space",
      prompt: "Write a Python function to check if a string is a valid palindrome",
      category: "Algorithms",
    },
    {
      icon: "⚡",
      label: "Code Debugger",
      description: "Diagnose logic bugs & race conditions",
      prompt: "I have a bug in my code. Can you help me find and fix it?",
      category: "Debug",
    },
    {
      icon: "🎯",
      label: "BFS vs DFS",
      description: "Traversal mechanics & complexity",
      prompt: "Explain the difference between BFS and DFS with time complexity analysis",
      category: "Algorithms",
    },
  ],
};

const modeMeta: Record<
  AIMode,
  {
    heroIcon: string;
    title: string;
    badge: string;
    badgeColor: string;
    borderHover: string;
    iconBg: string;
  }
> = {
  study: {
    heroIcon: "🎓",
    title: "Study & Exam Assistant",
    badge: "Academic AI",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    borderHover: "hover:border-blue-400/60 dark:hover:border-blue-500/60",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
  },
  "juit-info": {
    heroIcon: "🏫",
    title: "JUIT Campus Navigator",
    badge: "Campus Guide",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    borderHover: "hover:border-emerald-400/60 dark:hover:border-emerald-500/60",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  },
  coding: {
    heroIcon: "💻",
    title: "Coding & DSA Co-Pilot",
    badge: "Code & Fix",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    borderHover: "hover:border-purple-400/60 dark:hover:border-purple-500/60",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
  },
};

export default function QuickActions({ onSelect, mode, studentName }: QuickActionsProps) {
  const actions = actionsByMode[mode];
  const meta = modeMeta[mode];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(actions.map((a) => a.category)))];
  const filteredActions =
    selectedCategory === "All" ? actions : actions.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2 fade-slide-in">
      {/* ── Compact Hero Strip ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 glass-surface border border-gray-200/80 dark:border-gray-800/80 rounded-xl px-3 py-2 shadow-xs">
        {/* Left: icon + greeting + badge */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 rounded-lg glass-pill flex items-center justify-center text-sm border border-gray-200/80 dark:border-gray-700/60">
              {meta.heroIcon}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-gray-900" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                {studentName ? `Hi, ${studentName.split(" ")[0]}!` : "Welcome!"}
              </span>
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${meta.badgeColor}`}>
                ✨ {meta.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Right: category filter chips (drop to own full-width row on narrow screens) */}
        <div className="flex items-center flex-wrap gap-1 flex-1 basis-full sm:basis-auto min-w-0 sm:flex-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10.5px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xs font-semibold"
                    : "bg-gray-100/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Prompt Tiles Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
        {filteredActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onSelect(action.prompt)}
            className={`hero-action-card group flex items-center gap-2 py-1.5 px-2.5 rounded-xl text-left glass-surface border border-gray-200/80 dark:border-gray-800/80 shadow-2xs hover:shadow-xs cursor-pointer ${meta.borderHover}`}
          >
            {/* Icon */}
            <div
              className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-sm ${meta.iconBg} group-hover:scale-110 transition-transform duration-150 shadow-2xs`}
            >
              {action.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">
                {action.label}
              </h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {action.description}
              </p>
            </div>

            {/* Arrow */}
            <span className="text-xs text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

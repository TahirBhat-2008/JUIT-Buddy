"use client";

import { useState } from "react";

type Subject = "physics" | "maths";

interface ProblemSolverProps {
  onSolve: (problem: string) => void;
}

export default function ProblemSolver({ onSolve }: ProblemSolverProps) {
  const [subject, setSubject] = useState<Subject>("physics");
  const [problem, setProblem] = useState("");

  const placeholders = {
    physics: "e.g., A ball is thrown upward with velocity 20 m/s. Find the maximum height and time of flight.",
    maths: "e.g., Solve the integral ∫(2x² + 3x - 1)dx or find the derivative of f(x) = x³sin(x)",
  };

  const handleSubmit = () => {
    if (!problem.trim()) return;

    const prefix =
      subject === "physics"
        ? "Solve this physics problem step by step with explanations:\n\n"
        : "Solve this maths problem step by step with detailed working:\n\n";

    onSolve(prefix + problem);
    setProblem("");
  };

  const quickProblems = {
    physics: [
      "Newton's Laws - Find acceleration of blocks on incline",
      "Circular Motion - Calculate centripetal force",
      "Thermodynamics - Heat engine efficiency",
      "Optics - Lens combination focal length",
    ],
    maths: [
      "Integration - ∫(x²eˣ)dx",
      "Matrices - Find eigenvalues of 3x3 matrix",
      "Differential Equations - Solve dy/dx + y = eˣ",
      "Probability - Bayes theorem problem",
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 w-full max-w-full min-w-0 overflow-hidden">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">🧮 Problem Solver</h3>

      {/* Subject Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setSubject("physics")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            subject === "physics"
              ? "bg-orange-500 text-white"
              : "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50"
          }`}
        >
          🔬 Physics
        </button>
        <button
          onClick={() => setSubject("maths")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            subject === "maths"
              ? "bg-purple-500 text-white"
              : "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          }`}
        >
          🧮 Maths
        </button>
      </div>

      {/* Problem Input */}
      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder={placeholders[subject]}
        rows={3}
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-400"
      />

      <button
        onClick={handleSubmit}
        disabled={!problem.trim()}
        className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        🚀 Solve Step-by-Step
      </button>

      {/* Quick Problems */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try these problems:</p>
        <div className="space-y-1.5">
          {quickProblems[subject].map((qp) => (
            <button
              key={qp}
              onClick={() => {
                setProblem(qp);
              }}
              className="w-full text-left text-xs px-3 py-2 bg-gray-50 dark:bg-gray-700/70 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-gray-600 dark:text-gray-300"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

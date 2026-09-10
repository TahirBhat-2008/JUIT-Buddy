# JUIT Buddy 🎓

> **Your All-in-One AI Campus Companion for Jaypee University of Information Technology (JUIT), Waknaghat.**

JUIT Buddy is a modern, student-focused web platform designed to simplify university life. It integrates an intelligent AI companion with essential academic resources, 4-year curriculum roadmaps, campus utilities, transit schedules, and student tools into a unified, responsive interface.

---

## ✨ Features

- 🤖 **AI Campus Companion**: Multi-mode assistant powered by Google Gemini (Gemini 2.5 Flash Lite) with specialized modes:
  - **Academic Advisor**: Course advice, study plans, subject explanations, and exam guidance.
  - **Campus Guide**: Directions, department contacts, mess timings, and student facilities.
  - **Quick Answers**: Rapid answers for day-to-day campus queries.
- 📚 **Accurate 4-Year B.Tech Syllabus**:
  - Full semester-by-semester breakdown for all 8 semesters (CSE / IT).
  - Detailed credits, lecture/tutorial/practical (L-T-P) hours.
  - Course overviews, key modules, recommended textbooks, and prerequisites.
  - Departmental and open elective tracks (AI/ML, Data Science, Cyber Security, Cloud, Web/Mobile).
- 📊 **SGPA & CGPA Calculator**:
  - Interactive credit-weighted grade point calculator with real-time grade conversion.
- 🚌 **Bus Timetable & Transit Schedule**:
  - Accurate weekday and weekend bus timings between JUIT Campus, Waknaghat, Solan, and Shimla.
- 🗺️ **Interactive Campus Navigator**:
  - Campus directory with search and directions to academic blocks, labs, hostels, mess, dispensary, and sports complexes.
- 🛡️ **Feedback & Reporting System**:
  - Built-in reporting system for reporting incorrect AI responses or submitting campus suggestions.
- 📱 **Responsive Modern Design**:
  - Optimized for mobile phones (iPhone SE, modern Android/iOS), tablets (iPad Mini, iPad Air), and desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini API)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17+ or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TahirBhat-2008/JUIT-Buddy.git
   cd JUIT-Buddy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view JUIT Buddy.

---

## 🌐 Deployment

The easiest way to deploy JUIT Buddy is via [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add `GEMINI_API_KEY` under **Environment Variables**.
4. Click **Deploy**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

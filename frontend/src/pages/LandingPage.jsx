import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiCpu,
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
  FiCalendar,
  FiPieChart,
  FiArrowRight,
  FiShield,
  FiZap
} from 'react-icons/fi';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-14 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold animate-in fade-in zoom-in-95 duration-300">
          <FiZap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Next-Gen Career Acceleration for Students</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Master Your Internship Search with <br className="hidden sm:inline" />
          <span className="gradient-text">AI-Powered Intelligence</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The all-in-one MERN platform for students. Track applications on an interactive Kanban board, analyze resumes for ATS fit, bridge skill gaps, and generate interview questions with AI.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition"
          >
            <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <FiBriefcase className="w-4 h-4 text-indigo-500" />
            <span>Explore Internships</span>
          </Link>
        </div>

        {/* Demo Credentials hint */}
        <div className="p-3 max-w-md mx-auto rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          💡 Demo login ready: <strong>student@demo.com</strong> / <strong>Password123!</strong>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Engineered for End-to-End Success
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Everything you need from finding opportunities to accepting your dream tech offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <FiCpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              AI Resume & ATS Matcher
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload your resume and get immediate semantic compatibility scores, matched skills, and tailored advice for any job listing.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <FiTrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Skill-Gap Career Roadmaps
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Target roles like Full Stack, Frontend, or DevOps. Uncover missing technologies and follow a week-by-week learning plan.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <FiCalendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Interactive Kanban & Deadlines
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Move applications across Wishlist, Applied, In Review, Interviewing, and Offered stages with automatic deadline alerts.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <FiZap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              AI Interview Questions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate role and company-tailored interview questions complete with difficulty levels, evaluation rubrics, and STAR response hints.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <FiPieChart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Analytics & Conversion Rates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Visualize monthly trends, pipeline distributions, and interview response rates using dynamic interactive charts.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <FiShield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Admin & Recruiter Control
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Dedicated recruiter/admin panel to post, manage, and feature verified internships and review applicant volume.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-2xl relative overflow-hidden text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black">
          Ready to Land Your Dream Internship?
        </h3>
        <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto">
          Join thousands of students who organize applications and sharpen their skills with AI guidance.
        </p>
        <div className="pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white text-indigo-900 font-bold text-sm shadow-lg hover:bg-indigo-50 transition active:scale-95"
          >
            <span>Create Free Student Account</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

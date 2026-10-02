import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HeroScene from '../components/3d/HeroScene';
import ThreeCard from '../components/3d/ThreeCard';
import ThreeButton from '../components/3d/ThreeButton';
import {
  FiCpu,
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
  FiCalendar,
  FiPieChart,
  FiArrowRight,
  FiShield,
  FiZap,
  FiAward,
  FiCompass,
  FiLayers,
  FiUsers,
} from 'react-icons/fi';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-24 pb-20">
      {/* 3D Hero Section - Split Layout */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Modern Bold Typography & CTAs */}
        <div className="w-full lg:w-1/2 space-y-6 text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-[#30211B]/90 border border-[#F5B895]/50 shadow-sm text-xs font-extrabold text-[#C85C45] dark:text-[#F5B895]">
            <span className="flex h-2 w-2 rounded-full bg-[#E9785B] animate-pulse" />
            <FiZap className="w-3.5 h-3.5 text-[#E9785B]" />
            <span>ThreeUI 3D Next-Gen Internship Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#3D2B24] dark:text-[#FFF8ED] leading-[1.12]">
            Master Your Career in <br className="hidden sm:inline" />
            <span className="gradient-text-warm">Intelligent 3D Space</span>
          </h1>

          <p className="text-base sm:text-lg text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 max-w-xl font-medium leading-relaxed">
            The modern full-stack platform engineered for ambitious students. Track applications on interactive Kanban boards, analyze resumes for instant ATS fit, close skill gaps, and prepare for interviews with AI.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to={isAuthenticated ? '/dashboard' : '/register'}>
              <ThreeButton variant="primary" size="lg" className="rounded-2xl">
                <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}</span>
                <FiArrowRight className="w-4 h-4 ml-1" />
              </ThreeButton>
            </Link>

            <Link to="/internships">
              <ThreeButton variant="secondary" size="lg" className="rounded-2xl">
                <FiBriefcase className="w-4 h-4 text-[#E9785B] mr-1" />
                <span>Explore Internships</span>
              </ThreeButton>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 border-t border-[#F6EBDD] dark:border-[#553B30] grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-black text-[#C85C45] dark:text-[#F5B895]">15k+</p>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-semibold">Tracked Roles</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#8F78C8] dark:text-[#B9A7E8]">98%</p>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-semibold">ATS Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#7D9A7B] dark:text-[#9DB79B]">3.5x</p>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-semibold">Interview Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive ThreeUI 3D Hero Scene with Floating Badges */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Interactive Three.js Canvas */}
            <HeroScene />

            {/* Floating 3D Dimensional Badges */}
            <div className="absolute top-6 -left-4 sm:left-2 z-20 pointer-events-none">
              <div className="glass-card p-3.5 rounded-2xl bg-white/90 dark:bg-[#30211B]/90 backdrop-blur-md border border-white/80 dark:border-[#553B30] shadow-[0_12px_32px_-8px_rgba(200,92,69,0.2)] transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-[#E9785B] to-[#C85C45] text-white shadow-sm">
                    <FiZap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">ATS Match Score</p>
                    <p className="text-xs font-black text-[#3D2B24] dark:text-[#FFF8ED]">98% • Top Candidate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -right-2 sm:right-4 z-20 pointer-events-none">
              <div className="glass-card p-3.5 rounded-2xl bg-white/90 dark:bg-[#30211B]/90 backdrop-blur-md border border-white/80 dark:border-[#553B30] shadow-[0_12px_32px_-8px_rgba(143,120,200,0.2)] transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-[#B9A7E8] to-[#8F78C8] text-white shadow-sm">
                    <FiCalendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">Interview Ready</p>
                    <p className="text-xs font-black text-[#3D2B24] dark:text-[#FFF8ED]">Google Prep Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid using ThreeCard 3D Tilt */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] text-xs font-bold">
            <FiAward className="w-3.5 h-3.5" />
            <span>End-to-End Career Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
            Engineered for Precision & Success
          </h2>
          <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 font-medium">
            Everything you need from uncovering top internships to optimizing your resume and acing technical interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: AI Resume Analyzer */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#E9785B]/20 to-[#F5B895]/30 text-[#C85C45] dark:text-[#F5B895] flex items-center justify-center p-3.5 shadow-sm border border-[#E9785B]/30">
              <FiCpu className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Resume & ATS Matcher
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Instant semantic compatibility scoring, keyword detection, skill extraction, and personalized actionable suggestions for any internship.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#C85C45] dark:text-[#F5B895]">
              <span>Real-Time Scoring</span>
              <span>•</span>
              <span>Keyword Extraction</span>
            </div>
          </ThreeCard>

          {/* Card 2: Skill-Gap Roadmap */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#B9A7E8]/20 to-[#8F78C8]/30 text-[#6C54A7] dark:text-[#B9A7E8] flex items-center justify-center p-3.5 shadow-sm border border-[#B9A7E8]/30">
              <FiTrendingUp className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              Skill-Gap Roadmaps
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Target specialized software engineering, AI, DevOps, or data roles. Compare your current skillset with live market expectations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#8F78C8] dark:text-[#B9A7E8]">
              <span>Dynamic Radar</span>
              <span>•</span>
              <span>Curated Learning</span>
            </div>
          </ThreeCard>

          {/* Card 3: Interactive Kanban Tracker */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#9DB79B]/20 to-[#7D9A7B]/30 text-[#5C7D5A] dark:text-[#9DB79B] flex items-center justify-center p-3.5 shadow-sm border border-[#9DB79B]/30">
              <FiLayers className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              Dimensional Kanban Tracker
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Fluid workflow across Wishlist, Applied, In Review, Interviewing, and Offered stages with deadlines and interview links.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#5C7D5A] dark:text-[#9DB79B]">
              <span>Deadline Tracking</span>
              <span>•</span>
              <span>Status Analytics</span>
            </div>
          </ThreeCard>

          {/* Card 4: AI Interview Questions */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#F5B895]/25 to-[#E9785B]/30 text-[#C85C45] dark:text-[#F5B895] flex items-center justify-center p-3.5 shadow-sm border border-[#F5B895]/40">
              <FiCalendar className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Interview Preparation
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Generate role-targeted interview questions based on actual job listings, complete with evaluation rubrics and STAR response hints.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#C85C45] dark:text-[#F5B895]">
              <span>Behavioral & Technical</span>
              <span>•</span>
              <span>STAR Model</span>
            </div>
          </ThreeCard>

          {/* Card 5: Analytics & Metrics */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#8F78C8]/20 to-[#B9A7E8]/30 text-[#6C54A7] dark:text-[#B9A7E8] flex items-center justify-center p-3.5 shadow-sm border border-[#8F78C8]/30">
              <FiPieChart className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              Pipeline Analytics
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Track conversion funnels, response times, monthly submission volume, and interview ratios with warm dimensional charts.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#6C54A7] dark:text-[#B9A7E8]">
              <span>Funnel Visualization</span>
              <span>•</span>
              <span>Conversion Rates</span>
            </div>
          </ThreeCard>

          {/* Card 6: Verified Opportunities */}
          <ThreeCard maxTilt={8} className="p-7 space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#C85C45]/20 to-[#E9785B]/30 text-[#A84532] dark:text-[#F5B895] flex items-center justify-center p-3.5 shadow-sm border border-[#C85C45]/30">
              <FiShield className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-[#3D2B24] dark:text-[#FFF8ED]">
              Verified Opportunities
            </h3>
            <p className="text-sm text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 leading-relaxed font-normal">
              Curated tech, product, and data internships with verified stipend details, location tags, deadlines, and direct application links.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#C85C45] dark:text-[#F5B895]">
              <span>No Spam Postings</span>
              <span>•</span>
              <span>Recruiter Backed</span>
            </div>
          </ThreeCard>
        </div>
      </section>

      {/* Warm 3D CTA Section */}
      <section className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#E9785B] via-[#C85C45] to-[#8F78C8] text-white shadow-[0_20px_50px_-10px_rgba(200,92,69,0.38)] overflow-hidden text-center space-y-5">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
            <FiZap className="w-3.5 h-3.5" />
            <span>Launch Your Career</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Ready to Land Your Dream Internship?
          </h3>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-medium leading-relaxed">
            Join students organizing applications, closing skill gaps, and speeding up their job search with intelligent 3D career management.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <ThreeButton variant="secondary" size="lg" className="rounded-2xl font-black bg-white text-[#C85C45] hover:bg-[#FFF8ED] shadow-xl">
                <span>Create Free Student Account</span>
                <FiArrowRight className="w-4 h-4 ml-1" />
              </ThreeButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi, internshipApi } from '../services/api';
import ResumeAnalyzerCard from '../components/ai/ResumeAnalyzerCard';
import SkillGapChart from '../components/ai/SkillGapChart';
import InterviewQuestionsModal from '../components/ai/InterviewQuestionsModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  FiCpu,
  FiFileText,
  FiTrendingUp,
  FiHelpCircle,
  FiCompass,
  FiMail,
  FiCopy,
  FiCheck,
  FiExternalLink
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AiHubPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('resume'); // 'resume', 'skillgap', 'interview', 'recommendations', 'coverletter'

  // Interview questions state
  const [interviewRole, setInterviewRole] = useState('Frontend Engineer Intern');
  const [interviewCompany, setInterviewCompany] = useState('Stripe');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  // Recommendations state
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Cover letter state
  const [coverCompany, setCoverCompany] = useState('Spotify');
  const [coverRole, setCoverRole] = useState('Full Stack Software Engineer Intern');
  const [coverLetterResult, setCoverLetterResult] = useState(null);
  const [generatingCover, setGeneratingCover] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeTab === 'recommendations') {
      fetchRecommendations();
    }
  }, [activeTab]);

  const fetchRecommendations = async () => {
    try {
      setLoadingRecs(true);
      const res = await aiApi.getRecommendations();
      if (res.data.success) {
        setRecommendations(res.data.recommendations || []);
      }
    } catch (err) {
      toast.error('Failed to load AI recommendations');
    } finally {
      setLoadingRecs(false);
    }
  };

  const handleGenerateQuestions = async () => {
    try {
      setGeneratingQuestions(true);
      const res = await aiApi.generateInterviewQuestions({
        role: interviewRole,
        company: interviewCompany,
        skills: user?.skills || ['React', 'JavaScript']
      });
      if (res.data.success) {
        setGeneratedQuestions(res.data.questions || []);
        toast.success('Generated 5 tailored interview questions!');
      }
    } catch (err) {
      toast.error('Failed to generate interview questions');
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    try {
      setGeneratingCover(true);
      const res = await aiApi.generateCoverLetter({
        internshipDetails: {
          title: coverRole,
          company: coverCompany
        }
      });
      if (res.data.success) {
        setCoverLetterResult(res.data.coverLetter);
        toast.success('Cover letter generated!');
      }
    } catch (err) {
      toast.error('Failed to generate cover letter');
    } finally {
      setGeneratingCover(false);
    }
  };

  const handleCopyCoverLetter = () => {
    if (!coverLetterResult?.letterBody) return;
    navigator.clipboard.writeText(coverLetterResult.letterBody);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <FiCpu className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            AI Career Suite
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Cutting-edge AI tools to evaluate your resume, uncover skill gaps, practice interview rounds, and generate pitches
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'resume', label: 'Resume ATS Scanner', icon: FiFileText },
          { id: 'skillgap', label: 'Skill Gap & Roadmap', icon: FiTrendingUp },
          { id: 'recommendations', label: 'AI Job Recommendations', icon: FiCompass },
          { id: 'interview', label: 'Interview Prep Bot', icon: FiHelpCircle },
          { id: 'coverletter', label: 'Cover Letter Pitch', icon: FiMail },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                active
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Resume Analyzer */}
      {activeTab === 'resume' && <ResumeAnalyzerCard />}

      {/* Tab 2: Skill Gap Chart */}
      {activeTab === 'skillgap' && <SkillGapChart />}

      {/* Tab 3: Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Skill-Ranked Opportunities
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              These active internships match the skills discovered in your candidate profile ({user?.skills?.join(', ') || 'General'}).
            </p>
          </div>

          {loadingRecs ? (
            <LoadingSpinner text="Computing skill compatibility scores..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {item.internship.company}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.internship.title}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          {item.score}% Match
                        </span>
                        <span className="text-[10px] block text-slate-400">
                          {item.matchCount} of {item.totalRequired} skills
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                      {item.internship.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.internship.skillsRequired?.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {item.internship.stipendDisplay || 'Competitive'}
                    </span>
                    <a
                      href={item.internship.applyUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Apply on Portal</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Interview Question Generator */}
      {activeTab === 'interview' && (
        <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Technical & Behavioral Question Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter target role and company name to simulate challenging interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={interviewRole}
                onChange={(e) => setInterviewRole(e.target.value)}
                placeholder="e.g. Software Engineer Intern"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={interviewCompany}
                onChange={(e) => setInterviewCompany(e.target.value)}
                placeholder="e.g. Stripe, Google, Spotify"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateQuestions}
            disabled={generatingQuestions}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition disabled:opacity-50"
          >
            {generatingQuestions ? 'Generating Questions...' : 'Generate 5 Custom AI Questions'}
          </button>

          {generatedQuestions.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Generated Questions for {interviewCompany}:
              </h4>
              {generatedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Question {idx + 1} • {q.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">
                      {q.difficulty}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h5>
                  {q.hint && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50">
                      💡 <strong>Interviewer rubric:</strong> {q.hint}
                    </p>
                  )}
                  {q.practiceAnswer && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      🎯 <strong>Model response outline:</strong> {q.practiceAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Cover Letter Pitch */}
      {activeTab === 'coverletter' && (
        <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Tailored Outreach & Cover Letter Draft
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate a personalized cover letter highlighting your skills tailored to the target role
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={coverRole}
                onChange={(e) => setCoverRole(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Company
              </label>
              <input
                type="text"
                value={coverCompany}
                onChange={(e) => setCoverCompany(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            disabled={generatingCover}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition disabled:opacity-50"
          >
            {generatingCover ? 'Generating Draft...' : 'Generate Pitch Draft'}
          </button>

          {coverLetterResult && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subject: {coverLetterResult.subject}
                </span>
                <button
                  onClick={handleCopyCoverLetter}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Letter'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows="10"
                value={coverLetterResult.letterBody}
                className="w-full text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-hidden font-mono leading-relaxed"
              ></textarea>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiHubPage;

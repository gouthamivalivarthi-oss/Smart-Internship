import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi, internshipApi } from '../services/api';
import ResumeAnalyzerCard from '../components/ai/ResumeAnalyzerCard';
import SkillGapChart from '../components/ai/SkillGapChart';
import InterviewQuestionsModal from '../components/ai/InterviewQuestionsModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ThreeCard from '../components/3d/ThreeCard';
import ThreeButton from '../components/3d/ThreeButton';
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
  const [activeTab, setActiveTab] = useState('resume');

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
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
            <FiCpu className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
            AI Career Suite
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
          Cutting-edge AI tools to evaluate your resume, uncover skill gaps, practice interview rounds, and generate pitches
        </p>
      </div>

      {/* Tabs with rounded pill styling */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#F6EBDD]/60 dark:bg-[#35231C]/60 border border-[#F5B895]/25">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-[0_4px_14px_rgba(200,92,69,0.35)] scale-[1.02]'
                  : 'text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 hover:bg-white/80 dark:hover:bg-[#452E25]'
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
          <ThreeCard maxTilt={3} className="p-5">
            <h3 className="text-base font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Skill-Ranked Opportunities
            </h3>
            <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-0.5">
              These active internships match the skills discovered in your candidate profile ({user?.skills?.join(', ') || 'General'}).
            </p>
          </ThreeCard>

          {loadingRecs ? (
            <LoadingSpinner text="Computing skill compatibility scores in 3D..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((item, idx) => (
                <ThreeCard
                  key={idx}
                  maxTilt={5}
                  className="p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
                          {item.internship.company}
                        </span>
                        <h4 className="text-sm font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
                          {item.internship.title}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-[#C85C45] dark:text-[#F5B895]">
                          {item.score}% Match
                        </span>
                        <span className="text-[10px] block text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">
                          {item.matchCount} of {item.totalRequired} skills
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 line-clamp-2 mb-3 font-medium">
                      {item.internship.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.internship.skillsRequired?.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#FFF8ED] dark:bg-[#3D2B24] text-[#3D2B24] dark:text-[#FFF8ED] border border-[#F5B895]/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F6EBDD] dark:border-[#553B30] flex items-center justify-between text-xs">
                    <span className="text-[#5C7D5A] font-bold">
                      {item.internship.stipendDisplay || 'Competitive'}
                    </span>
                    <a
                      href={item.internship.applyUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#C85C45] dark:text-[#F5B895] hover:underline"
                    >
                      <span>Apply on Portal</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </ThreeCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Interview Question Generator */}
      {activeTab === 'interview' && (
        <ThreeCard maxTilt={3} className="p-6 sm:p-7 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Technical & Behavioral Question Simulator
            </h3>
            <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-0.5">
              Enter target role and company name to simulate challenging interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={interviewRole}
                onChange={(e) => setInterviewRole(e.target.value)}
                placeholder="e.g. Software Engineer Intern"
                className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={interviewCompany}
                onChange={(e) => setInterviewCompany(e.target.value)}
                placeholder="e.g. Stripe, Google, Spotify"
                className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
              />
            </div>
          </div>

          <ThreeButton
            onClick={handleGenerateQuestions}
            disabled={generatingQuestions}
            loading={generatingQuestions}
            variant="primary"
            className="rounded-2xl shadow-sm"
          >
            <span>{generatingQuestions ? 'Generating Questions...' : 'Generate 5 Custom AI Questions'}</span>
          </ThreeButton>

          {generatedQuestions.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#F6EBDD] dark:border-[#553B30]">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
                Generated Questions for {interviewCompany}:
              </h4>
              {generatedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/50 dark:bg-[#3D2B24]/40 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
                      Question {idx + 1} • {q.category}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F6EBDD] dark:bg-[#553B30] text-[#3D2B24] dark:text-[#FFF8ED]">
                      {q.difficulty}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
                    {q.question}
                  </h5>
                  {q.hint && (
                    <p className="text-xs text-[#A84532] dark:text-[#F5B895] bg-[#F5B895]/20 dark:bg-[#452E25] p-2.5 rounded-xl border border-[#F5B895]/40 font-medium">
                      💡 <strong>Interviewer rubric:</strong> {q.hint}
                    </p>
                  )}
                  {q.practiceAnswer && (
                    <p className="text-xs text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 bg-white dark:bg-[#281B16] p-2.5 rounded-xl border border-[#F6EBDD] dark:border-[#553B30] font-medium">
                      🎯 <strong>Model response outline:</strong> {q.practiceAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </ThreeCard>
      )}

      {/* Tab 5: Cover Letter Pitch */}
      {activeTab === 'coverletter' && (
        <ThreeCard maxTilt={3} className="p-6 sm:p-7 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Tailored Outreach & Cover Letter Draft
            </h3>
            <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-0.5">
              Generate a personalized cover letter highlighting your skills tailored to the target role
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={coverRole}
                onChange={(e) => setCoverRole(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Target Company
              </label>
              <input
                type="text"
                value={coverCompany}
                onChange={(e) => setCoverCompany(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
              />
            </div>
          </div>

          <ThreeButton
            onClick={handleGenerateCoverLetter}
            disabled={generatingCover}
            loading={generatingCover}
            variant="primary"
            className="rounded-2xl shadow-sm"
          >
            <span>{generatingCover ? 'Generating Draft...' : 'Generate Pitch Draft'}</span>
          </ThreeButton>

          {coverLetterResult && (
            <div className="p-4 rounded-2xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/30 dark:bg-[#281B16] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F6EBDD] dark:border-[#553B30]">
                <span className="text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED]">
                  Subject: {coverLetterResult.subject}
                </span>
                <button
                  onClick={handleCopyCoverLetter}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#3D2B24] border border-[#F5B895]/40 text-xs font-bold text-[#C85C45] dark:text-[#F5B895] hover:bg-[#FFF8ED] transition"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-[#5C7D5A]" /> : <FiCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Letter'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows="10"
                value={coverLetterResult.letterBody}
                className="w-full text-xs text-[#3D2B24] dark:text-[#FFF8ED] bg-[#FFF8ED]/60 dark:bg-[#30211B] p-3.5 rounded-xl border border-[#F6EBDD] dark:border-[#553B30] focus:outline-none font-mono leading-relaxed"
              ></textarea>
            </div>
          )}
        </ThreeCard>
      )}
    </div>
  );
};

export default AiHubPage;

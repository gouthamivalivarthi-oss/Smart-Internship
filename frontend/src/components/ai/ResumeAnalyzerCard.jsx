import React, { useState } from 'react';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiCpu, FiAward, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { aiApi } from '../../services/api';
import toast from 'react-hot-toast';

export const ResumeAnalyzerCard = () => {
  const { user, uploadResume } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const result = await uploadResume(selectedFile);
    if (result && result.success) {
      handleRunAiAnalysis();
    }
  };

  const handleRunAiAnalysis = async () => {
    try {
      setAnalyzing(true);
      const res = await aiApi.analyzeResume(user?.resumeParsedText || '');
      if (res.data.success) {
        setAnalysisResult(res.data.analysis);
        toast.success('AI Resume Analysis Complete!');
      }
    } catch (err) {
      toast.error('Failed to run AI analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  const score = analysisResult?.score || user?.resumeScore || 0;

  return (
    <div className="glass-card rounded-2xl p-6 border shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FiCpu className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              AI Resume ATS Analyzer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Evaluate your resume against top tech company applicant tracking systems
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer active:scale-95 transition">
          <FiUploadCloud className="w-4 h-4" />
          <span>{user?.resumeFileName ? 'Re-upload Resume' : 'Upload Resume (PDF/TXT)'}</span>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {user?.resumeFileName && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <FiFileText className="w-4 h-4 text-indigo-500" />
            <span>Active Resume: <strong>{user.resumeFileName}</strong></span>
          </div>
          <button
            onClick={handleRunAiAnalysis}
            disabled={analyzing}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
          >
            {analyzing ? 'Analyzing with AI...' : 'Re-analyze with AI'}
          </button>
        </div>
      )}

      {/* Score & Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Score gauge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900 border border-indigo-100/80 dark:border-indigo-900/40 text-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-1000 ease-out"
                strokeDasharray={`${score || 50}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {score || '--'}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                / 100
              </span>
            </div>
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-2">
            ATS Readiness Score
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {score >= 80 ? 'Top 10% ATS Candidate' : score >= 65 ? 'Competitive Profile' : 'Needs Optimization'}
          </p>
        </div>

        {/* Strengths & Improvements */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
              <FiCheckCircle className="w-4 h-4" />
              Key Strengths Detected
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {(analysisResult?.strengths || [
                'Demonstrates technical competency in core web frameworks',
                'Clear academic background in Computer Science or related degree',
                'Modern developer tooling listed (Git, APIs)'
              ]).map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-2">
              <FiAlertCircle className="w-4 h-4" />
              High-Impact Recommendations
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {(analysisResult?.improvements || [
                'Incorporate measurable metrics (e.g. "improved latency by 35%")',
                'Add direct links to deployed GitHub live demos',
                'Highlight testing frameworks (Jest, Cypress) and containerization'
              ]).map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Extracted Skills Pills */}
      {user?.skills && user.skills.length > 0 && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Identified Technical Skills ({user.skills.length})
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerCard;

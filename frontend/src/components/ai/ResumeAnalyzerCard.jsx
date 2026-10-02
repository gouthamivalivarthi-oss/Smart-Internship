import React, { useState } from 'react';
import ThreeCard from '../3d/ThreeCard';
import ThreeButton from '../3d/ThreeButton';
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
    <ThreeCard maxTilt={4} className="p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F6EBDD] dark:border-[#553B30]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
              <FiCpu className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Resume ATS Analyzer
            </h3>
          </div>
          <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
            Evaluate your resume against top tech company applicant tracking systems
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white text-xs font-bold shadow-[0_4px_14px_rgba(200,92,69,0.35)] hover:shadow-[0_6px_20px_rgba(200,92,69,0.5)] cursor-pointer active:scale-95 transition">
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
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8ED] dark:bg-[#3D2B24]/50 border border-[#F5B895]/40 text-xs">
          <div className="flex items-center gap-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium">
            <FiFileText className="w-4 h-4 text-[#E9785B]" />
            <span>Active Resume: <strong>{user.resumeFileName}</strong></span>
          </div>
          <button
            onClick={handleRunAiAnalysis}
            disabled={analyzing}
            className="text-xs font-bold text-[#C85C45] dark:text-[#F5B895] hover:underline disabled:opacity-50"
          >
            {analyzing ? 'Analyzing with AI...' : 'Re-analyze with AI'}
          </button>
        </div>
      )}

      {/* Score & Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Score gauge with warm coral & peach styling */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#FFF8ED] to-[#F6EBDD] dark:from-[#35231C] dark:to-[#281B16] border border-[#F5B895]/40 text-center shadow-xs">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#F6EBDD] dark:text-[#553B30]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#E9785B] stroke-current transition-all duration-1000 ease-out"
                strokeDasharray={`${score || 50}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED]">
                {score || '--'}
              </span>
              <span className="text-[10px] font-extrabold text-[#C85C45] dark:text-[#F5B895] uppercase tracking-widest">
                / 100
              </span>
            </div>
          </div>
          <h4 className="font-extrabold text-sm text-[#3D2B24] dark:text-[#FFF8ED] mt-2.5">
            ATS Readiness Score
          </h4>
          <p className="text-[11px] text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-semibold mt-0.5">
            {score >= 80 ? 'Top 10% ATS Candidate' : score >= 65 ? 'Competitive Profile' : 'Needs Optimization'}
          </p>
        </div>

        {/* Strengths & Improvements */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#5C7D5A] dark:text-[#9DB79B] flex items-center gap-1.5 mb-2">
              <FiCheckCircle className="w-4 h-4" />
              Key Strengths Detected
            </h5>
            <ul className="space-y-1.5 text-xs text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 font-medium">
              {(analysisResult?.strengths || [
                'Demonstrates technical competency in core modern web frameworks',
                'Clear academic background in Computer Science or related degree',
                'Modern developer tooling listed (Git, APIs, cloud deployments)'
              ]).map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7D9A7B] mt-1.5 shrink-0"></span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895] flex items-center gap-1.5 mb-2">
              <FiAlertCircle className="w-4 h-4" />
              High-Impact Recommendations
            </h5>
            <ul className="space-y-1.5 text-xs text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 font-medium">
              {(analysisResult?.improvements || [
                'Incorporate measurable metrics (e.g. "improved latency by 35%")',
                'Add direct links to deployed GitHub live demos and portfolios',
                'Highlight automated testing frameworks and containerization (Docker)'
              ]).map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E9785B] mt-1.5 shrink-0"></span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Extracted Skills Pills */}
      {user?.skills && user.skills.length > 0 && (
        <div className="pt-4 border-t border-[#F6EBDD] dark:border-[#553B30]">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 mb-2.5">
            Identified Technical Skills ({user.skills.length})
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-bold px-3 py-1 rounded-xl bg-[#FFF8ED] dark:bg-[#3D2B24] text-[#C85C45] dark:text-[#F5B895] border border-[#F5B895]/40 shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </ThreeCard>
  );
};

export default ResumeAnalyzerCard;

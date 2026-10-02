import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { aiApi } from '../../services/api';
import { FiCpu, FiCheckCircle, FiAlertTriangle, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AiMatchModal = ({ isOpen, onClose, internship, onTrack }) => {
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    if (isOpen && internship) {
      setLoading(true);
      aiApi.matchInternship(internship._id, internship)
        .then((res) => {
          if (res.data.success) {
            setMatchData(res.data.match);
          }
        })
        .catch((err) => {
          toast.error('AI match check failed');
        })
        .finally(() => setLoading(false));
    } else {
      setMatchData(null);
    }
  }, [isOpen, internship]);

  if (!internship) return null;

  const score = matchData?.matchScore || 0;
  const rating = matchData?.matchRating || 'Evaluating...';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`AI Match: ${internship.company} - ${internship.title}`}
      maxWidth="max-w-xl"
    >
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Scanning candidate skills against job requirements...
          </h4>
          <p className="text-xs text-slate-400 mt-1">Calculating semantic fit with AI</p>
        </div>
      ) : matchData ? (
        <div className="space-y-5">
          {/* Match Score Header */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-900 to-indigo-700 text-white shadow-lg shadow-indigo-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                Compatibility Rating
              </span>
              <h3 className="text-2xl font-black mt-0.5">{rating}</h3>
              <p className="text-xs text-indigo-100 mt-1 max-w-xs">
                Candidate profile analyzed against {internship.title}
              </p>
            </div>
            <div className="w-18 h-18 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-black">{score}%</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-200">
                Fit Score
              </span>
            </div>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                <FiCheckCircle className="w-4 h-4" />
                <span>Matched Skills ({matchData.matchedSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {matchData.matchedSkills?.length === 0 ? (
                  <span className="text-xs text-slate-400">None detected</span>
                ) : (
                  matchData.matchedSkills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
                <FiAlertTriangle className="w-4 h-4" />
                <span>Missing Requirements ({matchData.missingSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {matchData.missingSkills?.length === 0 ? (
                  <span className="text-xs text-emerald-600 font-medium">All required skills present!</span>
                ) : (
                  matchData.missingSkills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Strategic Advice */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              AI Tailoring Strategy
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {matchData.advice}
            </p>
          </div>

          {/* Action footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onTrack(internship);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              <FiPlus className="w-4 h-4" />
              <span>Track This Opportunity</span>
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default AiMatchModal;

import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { aiApi } from '../../services/api';
import { FiHelpCircle, FiChevronDown, FiChevronUp, FiCheck, FiCpu } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const InterviewQuestionsModal = ({ isOpen, onClose, role = 'Frontend Engineer', company = 'Tech Company', skills = [] }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await aiApi.generateInterviewQuestions({ role, company, skills });
      if (res.data.success) {
        setQuestions(res.data.questions || []);
      }
    } catch (err) {
      toast.error('Failed to generate interview questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen, role, company]);

  const getDifficultyBadge = (diff) => {
    if (diff === 'Hard') return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
    if (diff === 'Medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`AI Interview Prep: ${company} (${role})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs">
          <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
            <FiCpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Targeting <strong>{role}</strong> at <strong>{company}</strong></span>
          </div>
          <button
            onClick={fetchQuestions}
            disabled={loading}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Synthesizing company-specific technical & behavioral questions...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Q{idx + 1} • {q.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${getDifficultyBadge(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <FiChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      {q.hint && (
                        <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
                          <p className="font-bold text-amber-900 dark:text-amber-200 mb-0.5">
                            💡 Interviewer Evaluation Focus / STAR Hint:
                          </p>
                          <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                            {q.hint}
                          </p>
                        </div>
                      )}

                      {q.practiceAnswer && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700">
                          <p className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">
                            🎯 Model Answer Strategy:
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {q.practiceAnswer}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InterviewQuestionsModal;

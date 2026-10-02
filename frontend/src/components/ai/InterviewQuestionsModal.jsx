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
      if (res.data?.success) {
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
    if (diff === 'Hard') return 'bg-terracotta/20 text-terracotta border border-terracotta/30';
    if (diff === 'Medium') return 'bg-peach/30 text-coral border border-peach/50';
    return 'bg-sage/20 text-sage border border-sage/30';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`AI Interview Prep: ${company} (${role})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-cream/90 border border-peach/40 text-xs">
          <div className="flex items-center gap-2 text-brown font-semibold">
            <FiCpu className="w-4 h-4 text-coral" />
            <span>Targeting <strong>{role}</strong> at <strong>{company}</strong></span>
          </div>
          <button
            onClick={fetchQuestions}
            disabled={loading}
            className="text-xs font-bold text-coral hover:text-terracotta underline disabled:opacity-50 transition"
          >
            {loading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 rounded-full border-4 border-peach border-t-coral animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-bold text-brown">
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
                  className="rounded-2xl border border-peach/30 bg-white/90 overflow-hidden shadow-xs transition-all hover:border-peach/60"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-peach/10 transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brown/50">
                          Q{idx + 1} • {q.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getDifficultyBadge(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-brown leading-snug">
                        {q.question}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <FiChevronUp className="w-4 h-4 text-brown/50 shrink-0 mt-1" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 text-brown/50 shrink-0 mt-1" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-peach/20 text-xs bg-cream/30">
                      {q.hint && (
                        <div className="p-3.5 rounded-xl bg-peach/20 border border-peach/40">
                          <p className="font-bold text-brown mb-0.5">
                            💡 Interviewer Evaluation Focus / STAR Hint:
                          </p>
                          <p className="text-brown/80 leading-relaxed font-normal">
                            {q.hint}
                          </p>
                        </div>
                      )}

                      {q.practiceAnswer && (
                        <div className="p-3.5 rounded-xl bg-white border border-peach/30">
                          <p className="font-bold text-brown mb-0.5">
                            🎯 Model Answer Strategy:
                          </p>
                          <p className="text-brown/75 leading-relaxed font-normal">
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

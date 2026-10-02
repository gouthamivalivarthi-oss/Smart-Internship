import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ThreeButton from '../3d/ThreeButton';
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
          if (res.data?.success) {
            setMatchData(res.data.match);
          }
        })
        .catch(() => {
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
          <div className="w-12 h-12 rounded-full border-4 border-peach border-t-coral animate-spin mx-auto mb-4"></div>
          <h4 className="text-sm font-bold text-brown">
            Scanning candidate skills against job requirements...
          </h4>
          <p className="text-xs text-brown/60 mt-1 font-medium">Calculating semantic fit with AI</p>
        </div>
      ) : matchData ? (
        <div className="space-y-5">
          {/* Match Score Header */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-coral via-terracotta to-coral text-white shadow-3d flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-peach">
                Compatibility Rating
              </span>
              <h3 className="text-2xl font-black mt-0.5">{rating}</h3>
              <p className="text-xs text-cream/90 mt-1 max-w-xs font-medium">
                Candidate profile analyzed against {internship.title}
              </p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-2xl font-black">{score}%</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-peach">
                Fit Score
              </span>
            </div>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-sage/40 bg-sage/15">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brown mb-2">
                <FiCheckCircle className="w-4 h-4 text-sage" />
                <span>Matched Skills ({matchData.matchedSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchData.matchedSkills?.length === 0 ? (
                  <span className="text-xs text-brown/50">None detected</span>
                ) : (
                  matchData.matchedSkills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/90 text-brown border border-sage/30 shadow-xs"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-peach/40 bg-peach/15">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brown mb-2">
                <FiAlertTriangle className="w-4 h-4 text-coral" />
                <span>Missing Requirements ({matchData.missingSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchData.missingSkills?.length === 0 ? (
                  <span className="text-xs text-sage font-bold">All required skills present!</span>
                ) : (
                  matchData.missingSkills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/90 text-coral border border-peach/40 shadow-xs"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Strategic Advice */}
          <div className="p-4 rounded-2xl bg-cream/80 border border-peach/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brown/60 mb-1.5">
              AI Tailoring Strategy
            </h4>
            <p className="text-xs text-brown/85 leading-relaxed font-normal">
              {matchData.advice}
            </p>
          </div>

          {/* Action footer */}
          <div className="flex items-center justify-between pt-3 border-t border-peach/20">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-brown/70 hover:text-brown transition"
            >
              Close
            </button>
            <ThreeButton
              onClick={() => {
                onTrack(internship);
                onClose();
              }}
              variant="primary"
              size="sm"
            >
              <FiPlus className="w-4 h-4" />
              <span>Track This Opportunity</span>
            </ThreeButton>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default AiMatchModal;

import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import ThreeButton from '../3d/ThreeButton';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiCalendar, FiExternalLink, FiPlus, FiCpu, FiCheck } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

export const InternshipDetailModal = ({
  isOpen,
  onClose,
  internship,
  onTrack,
  onCheckAiMatch
}) => {
  if (!internship) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={internship.title} maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Header summary */}
        <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-cream/90 border border-peach/40 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coral">
              {internship.company}
            </span>
            <h2 className="text-xl font-bold text-brown mt-0.5">
              {internship.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-brown/70 font-medium">
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3.5 h-3.5 text-coral" />
                {internship.location} ({internship.type})
              </span>
              <span className="flex items-center gap-1 font-bold text-sage">
                <FiDollarSign className="w-3.5 h-3.5" />
                {internship.stipendDisplay || 'Competitive'}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5 text-brown/50" />
                {internship.duration || 'Summer 2026'}
              </span>
            </div>
          </div>

          <Badge variant="coral" size="md">
            {internship.category}
          </Badge>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brown/60 mb-2">
            About the Role
          </h4>
          <p className="text-xs leading-relaxed text-brown/85 whitespace-pre-line font-normal">
            {internship.description}
          </p>
        </div>

        {/* Requirements */}
        {internship.requirements && internship.requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brown/60 mb-2">
              Key Requirements
            </h4>
            <ul className="space-y-1.5 text-xs text-brown/80 font-medium">
              {internship.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills required */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brown/60 mb-2">
            Skills & Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {internship.skillsRequired?.map((skill, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-peach/20 text-brown border border-peach/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deadline notice */}
        <div className="p-3.5 rounded-2xl bg-peach/15 border border-peach/30 flex items-center gap-2 text-xs text-brown font-medium">
          <FiClock className="w-4 h-4 text-coral shrink-0" />
          <span>
            Application Deadline: <strong className="text-coral">{formatDate(internship.deadline)}</strong>
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-peach/20">
          <button
            onClick={() => onCheckAiMatch(internship)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender/25 hover:bg-lavender/35 text-purple text-xs font-bold border border-lavender/40 transition"
          >
            <FiCpu className="w-4 h-4 text-purple" />
            <span>Evaluate AI Resume Match</span>
          </button>

          <div className="flex items-center gap-2">
            {internship.applyUrl && (
              <a
                href={internship.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-brown/70 hover:text-brown hover:bg-peach/20 rounded-xl transition"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                <span>External Link</span>
              </a>
            )}
            <ThreeButton
              onClick={() => onTrack(internship)}
              variant="primary"
              size="sm"
            >
              <FiPlus className="w-4 h-4" />
              <span>Track Application</span>
            </ThreeButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InternshipDetailModal;

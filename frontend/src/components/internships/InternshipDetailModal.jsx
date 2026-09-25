import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
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
        <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {internship.company}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {internship.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                {internship.location} ({internship.type})
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <FiDollarSign className="w-3.5 h-3.5" />
                {internship.stipendDisplay || 'Competitive'}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                {internship.duration || 'Summer 2026'}
              </span>
            </div>
          </div>

          <Badge variant="primary" size="md">
            {internship.category}
          </Badge>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            About the Role
          </h4>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {internship.description}
          </p>
        </div>

        {/* Requirements */}
        {internship.requirements && internship.requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Key Requirements
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {internship.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills required */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Skills & Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {internship.skillsRequired?.map((skill, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deadline notice */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
          <FiClock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Application Deadline: <strong>{formatDate(internship.deadline)}</strong>
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onCheckAiMatch(internship)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 transition"
          >
            <FiCpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Evaluate AI Resume Match</span>
          </button>

          <div className="flex items-center gap-2">
            {internship.applyUrl && (
              <a
                href={internship.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                <span>External Link</span>
              </a>
            )}
            <button
              onClick={() => onTrack(internship)}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              <FiPlus className="w-4 h-4" />
              <span>Track Application</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InternshipDetailModal;

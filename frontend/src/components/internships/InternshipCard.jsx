import React from 'react';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiExternalLink, FiPlus, FiCpu } from 'react-icons/fi';
import { formatDate, formatRelativeTime } from '../../utils/helpers';
import Badge from '../common/Badge';

export const InternshipCard = ({
  internship,
  onApplyOrTrack,
  onViewDetails,
  onCheckAiMatch
}) => {
  const {
    _id,
    title,
    company,
    location,
    type,
    category,
    stipendDisplay,
    deadline,
    skillsRequired = [],
    featured,
    applyUrl
  } = internship;

  const getTypeVariant = (t) => {
    if (t === 'Remote') return 'success';
    if (t === 'Hybrid') return 'purple';
    return 'default';
  };

  return (
    <div className="glass-card rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative group hover:border-indigo-200 dark:hover:border-indigo-900/60">
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-indigo-50 dark:from-slate-800 dark:to-indigo-950 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200/80 dark:border-slate-700 shadow-sm shrink-0">
              <FiBriefcase className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate block">
                {company}
              </span>
              <h3
                onClick={() => onViewDetails && onViewDetails(internship)}
                className="font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer line-clamp-1 transition"
              >
                {title}
              </h3>
            </div>
          </div>

          <Badge variant={getTypeVariant(type)} size="xs">
            {type}
          </Badge>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate text-emerald-600 dark:text-emerald-400 font-semibold">
            <FiDollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{stipendDisplay || 'Competitive'}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate col-span-2 text-amber-600 dark:text-amber-400">
            <FiClock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              Deadline: {formatDate(deadline)} ({formatRelativeTime(deadline)})
            </span>
          </div>
        </div>

        {/* Skills pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skillsRequired.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {skillsRequired.length > 4 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-400">
              +{skillsRequired.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onCheckAiMatch && onCheckAiMatch(internship)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
        >
          <FiCpu className="w-3.5 h-3.5" />
          <span>AI Match</span>
        </button>

        <div className="flex items-center gap-2">
          {applyUrl && (
            <a
              href={applyUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Official Application Link"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => onApplyOrTrack && onApplyOrTrack(internship)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs active:scale-95 transition"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;

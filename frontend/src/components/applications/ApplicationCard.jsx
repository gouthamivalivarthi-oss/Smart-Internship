import React from 'react';
import { FiCalendar, FiMapPin, FiDollarSign, FiClock, FiTrash2, FiEdit3, FiExternalLink, FiCpu } from 'react-icons/fi';
import { formatDate, formatRelativeTime, getStatusBadgeStyle, getPriorityBadgeStyle } from '../../utils/helpers';

export const ApplicationCard = ({ application, onStatusChange, onEdit, onDelete }) => {
  const {
    _id,
    company,
    role,
    location,
    stipend,
    status,
    priority,
    deadline,
    appliedDate,
    jobUrl,
    notes,
    aiMatchScore
  } = application;

  const statuses = ['Wishlist', 'Applied', 'In Review', 'Interviewing', 'Offered', 'Rejected'];

  return (
    <div className="glass-card rounded-2xl p-4 border shadow-sm relative group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {company}
          </span>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug truncate">
            {role}
          </h4>
        </div>

        {/* Priority Badge */}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${getPriorityBadgeStyle(priority)}`}>
          {priority}
        </span>
      </div>

      {/* Meta details */}
      <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
        {location && (
          <div className="flex items-center gap-1.5 truncate">
            <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {stipend && (
          <div className="flex items-center gap-1.5 truncate text-emerald-600 dark:text-emerald-400 font-medium">
            <FiDollarSign className="w-3.5 h-3.5 shrink-0" />
            <span>{stipend}</span>
          </div>
        )}
        {deadline && (
          <div className="flex items-center gap-1.5 truncate text-amber-600 dark:text-amber-400">
            <FiClock className="w-3.5 h-3.5 shrink-0" />
            <span>Deadline: {formatDate(deadline)} ({formatRelativeTime(deadline)})</span>
          </div>
        )}
      </div>

      {/* AI Match Badge if available */}
      {aiMatchScore !== null && aiMatchScore !== undefined && (
        <div className="mb-3 flex items-center justify-between p-2 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
          <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            <FiCpu className="w-3.5 h-3.5" />
            <span>AI Match Score</span>
          </div>
          <span className="font-black text-xs px-2 py-0.5 rounded-lg bg-indigo-600 text-white shadow-xs">
            {aiMatchScore}%
          </span>
        </div>
      )}

      {/* Notes snippet */}
      {notes && (
        <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg italic line-clamp-2 mb-3 border border-slate-100 dark:border-slate-800">
          "{notes}"
        </p>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        {/* Quick status selector */}
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-hidden transition ${getStatusBadgeStyle(status)}`}
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
              {s}
            </option>
          ))}
        </select>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {jobUrl && (
            <a
              href={jobUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Open Job Link"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onEdit(application)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Edit Application"
          >
            <FiEdit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Remove"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;

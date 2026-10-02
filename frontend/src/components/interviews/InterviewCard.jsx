import React from 'react';
import { FiCalendar, FiClock, FiVideo, FiTrash2, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { formatDate, formatRelativeTime } from '../../utils/helpers';

export const InterviewCard = ({ interview, onViewQuestions, onDelete, onStatusUpdate }) => {
  const {
    _id,
    company,
    role,
    roundTitle,
    scheduledDate,
    durationMinutes,
    locationOrLink,
    status,
    notes,
    aiQuestions = []
  } = interview;

  const dateObj = new Date(scheduledDate);
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="glass-card rounded-2xl p-5 border shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {company}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
            {roundTitle}
          </h3>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
            {role}
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            status === 'Completed'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : status === 'Cancelled'
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <FiCalendar className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            {formatDate(scheduledDate)} at {timeStr}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FiClock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{durationMinutes || 45} Minutes Duration</span>
        </div>

        {locationOrLink && (
          <div className="flex items-center gap-1.5 col-span-2 truncate">
            <FiVideo className="w-4 h-4 text-emerald-500 shrink-0" />
            <a
              href={locationOrLink.startsWith('http') ? locationOrLink : `https://${locationOrLink}`}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline truncate"
            >
              {locationOrLink}
            </a>
          </div>
        )}
      </div>

      {notes && (
        <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          Notes: "{notes}"
        </p>
      )}

      {/* Footer & AI Questions Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewQuestions(interview)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 transition active:scale-95"
        >
          <FiCpu className="w-3.5 h-3.5" />
          <span>AI Prep ({aiQuestions.length} Questions)</span>
        </button>

        <div className="flex items-center gap-2">
          {status !== 'Completed' && (
            <button
              onClick={() => onStatusUpdate(_id, 'Completed')}
              className="p-1.5 text-xs text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Mark Completed"
            >
              <FiCheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 text-xs text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Delete Interview"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;

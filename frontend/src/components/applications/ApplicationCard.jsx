import React from 'react';
import ThreeCard from '../3d/ThreeCard';
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
    <ThreeCard maxTilt={5} className="p-4 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
            {company}
          </span>
          <h4 className="font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] text-sm sm:text-base leading-snug truncate">
            {role}
          </h4>
        </div>

        {/* Priority Badge */}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${getPriorityBadgeStyle(priority)}`}>
          {priority}
        </span>
      </div>

      {/* Meta details */}
      <div className="space-y-1.5 text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 mb-3 font-medium">
        {location && (
          <div className="flex items-center gap-1.5 truncate">
            <FiMapPin className="w-3.5 h-3.5 text-[#E9785B] shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {stipend && (
          <div className="flex items-center gap-1.5 truncate text-[#5C7D5A] font-bold">
            <FiDollarSign className="w-3.5 h-3.5 shrink-0" />
            <span>{stipend}</span>
          </div>
        )}
        {deadline && (
          <div className="flex items-center gap-1.5 truncate text-[#C85C45] dark:text-[#F5B895]">
            <FiClock className="w-3.5 h-3.5 shrink-0" />
            <span>Deadline: {formatDate(deadline)} ({formatRelativeTime(deadline)})</span>
          </div>
        )}
      </div>

      {/* AI Match Badge if available */}
      {aiMatchScore !== null && aiMatchScore !== undefined && (
        <div className="mb-3 flex items-center justify-between p-2 rounded-xl bg-[#E9785B]/10 dark:bg-[#3D2B24]/50 border border-[#E9785B]/25">
          <div className="flex items-center gap-1.5 text-[#C85C45] dark:text-[#F5B895] font-bold text-xs">
            <FiCpu className="w-3.5 h-3.5" />
            <span>AI Match Score</span>
          </div>
          <span className="font-black text-xs px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-xs">
            {aiMatchScore}%
          </span>
        </div>
      )}

      {/* Notes snippet */}
      {notes && (
        <p className="text-xs text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 bg-[#FFF8ED]/60 dark:bg-[#281B16]/50 p-2 rounded-xl italic line-clamp-2 mb-3 border border-[#F6EBDD] dark:border-[#553B30]">
          "{notes}"
        </p>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F6EBDD] dark:border-[#553B30] flex items-center justify-between gap-2">
        {/* Quick status selector */}
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none transition ${getStatusBadgeStyle(status)}`}
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-white dark:bg-[#30211B] text-[#3D2B24] dark:text-[#FFF8ED]">
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
              className="p-1.5 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 hover:text-[#E9785B] dark:hover:text-[#F5B895] rounded-xl hover:bg-[#FFF8ED] dark:hover:bg-[#452E25] transition"
              title="Open Job Link"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onEdit(application)}
            className="p-1.5 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 hover:text-[#E9785B] dark:hover:text-[#F5B895] rounded-xl hover:bg-[#FFF8ED] dark:hover:bg-[#452E25] transition"
            title="Edit Application"
          >
            <FiEdit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 hover:text-[#C85C45] rounded-xl hover:bg-[#FDECE4] dark:hover:bg-[#452E25] transition"
            title="Remove"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </ThreeCard>
  );
};

export default ApplicationCard;

import React from 'react';
import ThreeCard from '../3d/ThreeCard';
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
    <ThreeCard maxTilt={5} className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
            {company}
          </span>
          <h3 className="font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] text-base leading-snug">
            {roundTitle}
          </h3>
          <p className="text-xs text-[#8F78C8] dark:text-[#B9A7E8] font-bold mt-0.5">
            {role}
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            status === 'Completed'
              ? 'bg-[#9DB79B]/25 text-[#5C7D5A] dark:text-[#9DB79B] border border-[#9DB79B]/40'
              : status === 'Cancelled'
              ? 'bg-[#C85C45]/15 text-[#A84532] dark:text-[#E9785B] border border-[#C85C45]/30'
              : 'bg-[#B9A7E8]/25 text-[#6C54A7] dark:text-[#B9A7E8] border border-[#B9A7E8]/40'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 font-medium">
        <div className="flex items-center gap-1.5">
          <FiCalendar className="w-4 h-4 text-[#E9785B] shrink-0" />
          <span>
            {formatDate(scheduledDate)} at {timeStr}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FiClock className="w-4 h-4 text-[#F5B895] shrink-0" />
          <span>{durationMinutes || 45} Minutes Duration</span>
        </div>

        {locationOrLink && (
          <div className="flex items-center gap-1.5 col-span-2 truncate">
            <FiVideo className="w-4 h-4 text-[#5C7D5A] shrink-0" />
            <a
              href={locationOrLink.startsWith('http') ? locationOrLink : `https://${locationOrLink}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#C85C45] dark:text-[#F5B895] hover:underline truncate font-semibold"
            >
              {locationOrLink}
            </a>
          </div>
        )}
      </div>

      {notes && (
        <p className="text-xs text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 italic bg-[#FFF8ED]/60 dark:bg-[#3D2B24]/50 p-2.5 rounded-xl border border-[#F6EBDD] dark:border-[#553B30]">
          Notes: "{notes}"
        </p>
      )}

      {/* Footer & AI Questions Button */}
      <div className="pt-3 border-t border-[#F6EBDD] dark:border-[#553B30] flex items-center justify-between gap-2">
        <button
          onClick={() => onViewQuestions(interview)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85C45] dark:text-[#F5B895] hover:text-[#E9785B] px-3 py-1.5 rounded-xl bg-[#E9785B]/15 hover:bg-[#E9785B]/25 border border-[#E9785B]/30 transition active:scale-95"
        >
          <FiCpu className="w-3.5 h-3.5" />
          <span>AI Prep ({aiQuestions.length} Questions)</span>
        </button>

        <div className="flex items-center gap-2">
          {status !== 'Completed' && (
            <button
              onClick={() => onStatusUpdate(_id, 'Completed')}
              className="p-1.5 text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 hover:text-[#5C7D5A] rounded-xl hover:bg-[#FFF8ED] dark:hover:bg-[#452E25] transition"
              title="Mark Completed"
            >
              <FiCheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(_id)}
            className="p-1.5 text-xs text-[#3D2B24]/40 dark:text-[#FFF8ED]/40 hover:text-[#C85C45] rounded-xl hover:bg-[#FDECE4] dark:hover:bg-[#452E25] transition"
            title="Delete Interview"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </ThreeCard>
  );
};

export default InterviewCard;

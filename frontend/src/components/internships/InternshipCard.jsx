import React from 'react';
import ThreeCard from '../3d/ThreeCard';
import Badge from '../common/Badge';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiExternalLink, FiPlus, FiCpu } from 'react-icons/fi';
import { formatDate, formatRelativeTime } from '../../utils/helpers';

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
    if (t === 'Remote') return 'sage';
    if (t === 'Hybrid') return 'lavender';
    return 'peach';
  };

  return (
    <ThreeCard maxTilt={6} className="p-5 flex flex-col justify-between group">
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E9785B]/20 via-[#F5B895]/30 to-[#B9A7E8]/20 flex items-center justify-center font-bold text-[#C85C45] dark:text-[#F5B895] border border-[#F5B895]/40 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
              <FiBriefcase className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895] truncate block">
                {company}
              </span>
              <h3
                onClick={() => onViewDetails && onViewDetails(internship)}
                className="font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] text-base hover:text-[#E9785B] cursor-pointer line-clamp-1 transition"
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
        <div className="grid grid-cols-2 gap-2 text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 mb-4 font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <FiMapPin className="w-3.5 h-3.5 text-[#E9785B] shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate text-[#5C7D5A] font-bold">
            <FiDollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{stipendDisplay || 'Competitive'}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate col-span-2 text-[#C85C45] dark:text-[#F5B895]">
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
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#FFF8ED] dark:bg-[#3D2B24] text-[#3D2B24] dark:text-[#FFF8ED] border border-[#F5B895]/30 shadow-2xs"
            >
              {skill}
            </span>
          ))}
          {skillsRequired.length > 4 && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-[#F6EBDD]/60 dark:bg-[#3D2B24]/60 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50">
              +{skillsRequired.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F6EBDD] dark:border-[#553B30] flex items-center justify-between gap-2">
        <button
          onClick={() => onCheckAiMatch && onCheckAiMatch(internship)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85C45] dark:text-[#F5B895] hover:text-[#E9785B] px-3 py-1.5 rounded-xl hover:bg-[#E9785B]/10 transition"
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
              className="p-2 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 hover:text-[#E9785B] dark:hover:text-[#F5B895] rounded-xl hover:bg-[#FFF8ED] dark:hover:bg-[#452E25] transition"
              title="Official Application Link"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => onApplyOrTrack && onApplyOrTrack(internship)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white text-xs font-bold shadow-[0_4px_12px_rgba(200,92,69,0.3)] hover:shadow-[0_6px_16px_rgba(200,92,69,0.45)] active:scale-95 transition"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </div>
      </div>
    </ThreeCard>
  );
};

export default InternshipCard;

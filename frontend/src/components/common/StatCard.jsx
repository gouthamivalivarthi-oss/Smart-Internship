import React from 'react';
import ThreeCard from '../3d/ThreeCard';

export const StatCard = ({ title, value, icon: Icon, change, trend = 'neutral', subtitle, color = 'coral' }) => {
  const colorMap = {
    coral: 'bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border-[#E9785B]/30',
    peach: 'bg-[#F5B895]/20 text-[#C85C45] dark:text-[#F5B895] border-[#F5B895]/40',
    lavender: 'bg-[#B9A7E8]/25 text-[#6C54A7] dark:text-[#B9A7E8] border-[#B9A7E8]/40',
    sage: 'bg-[#9DB79B]/20 text-[#5C7D5A] dark:text-[#9DB79B] border-[#9DB79B]/40',
    terracotta: 'bg-[#C85C45]/20 text-[#A84532] dark:text-[#F5B895] border-[#C85C45]/40',
    indigo: 'bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border-[#E9785B]/30', // Fallback for previous props
  };

  return (
    <ThreeCard maxTilt={6} className="p-5 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${colorMap[color] || colorMap.coral} transition-transform group-hover:scale-110 duration-200`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`font-bold px-2 py-0.5 rounded-full ${
                trend === 'up'
                  ? 'bg-[#9DB79B]/20 text-[#5C7D5A] dark:text-[#9DB79B]'
                  : trend === 'down'
                  ? 'bg-[#C85C45]/15 text-[#A84532] dark:text-[#E9785B]'
                  : 'bg-[#F6EBDD] text-[#3D2B24] dark:bg-[#3D2B24] dark:text-[#FFF8ED]'
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">{subtitle}</span>}
        </div>
      )}
    </ThreeCard>
  );
};

export default StatCard;

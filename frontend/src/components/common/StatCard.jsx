import React from 'react';
import ThreeCard from '../3d/ThreeCard';

export const StatCard = ({ title, value, icon: Icon, change, trend = 'neutral', subtitle, color = 'copper' }) => {
  const colorMap = {
    copper: 'bg-[#B87333]/15 text-[#B87333] dark:text-[#D6A85F] border-[#B87333]/30',
    terracotta: 'bg-[#C96B4B]/15 text-[#C96B4B] dark:text-[#D6A85F] border-[#C96B4B]/30',
    gold: 'bg-[#D6A85F]/20 text-[#B87333] dark:text-[#D6A85F] border-[#D6A85F]/40',
    sage: 'bg-[#7E9278]/20 text-[#5F725A] dark:text-[#7E9278] border-[#7E9278]/40',
    orange: 'bg-[#E28A45]/20 text-[#C86E2A] dark:text-[#E28A45] border-[#E28A45]/40',
    // Fallback mappings
    coral: 'bg-[#C96B4B]/15 text-[#C96B4B] dark:text-[#D6A85F] border-[#C96B4B]/30',
    peach: 'bg-[#E28A45]/20 text-[#C86E2A] dark:text-[#E28A45] border-[#E28A45]/40',
    lavender: 'bg-[#D6A85F]/20 text-[#B87333] dark:text-[#D6A85F] border-[#D6A85F]/40',
  };

  return (
    <ThreeCard maxTilt={6} className="p-5 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#292722]/60 dark:text-[#F7F3EA]/60 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-[#292722] dark:text-[#FFFDF7] mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-3d-sm ${colorMap[color] || colorMap.copper} transition-transform group-hover:scale-110 duration-200`}>
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
                  ? 'bg-[#7E9278]/20 text-[#5F725A] dark:text-[#7E9278]'
                  : trend === 'down'
                  ? 'bg-[#C96B4B]/15 text-[#A85133] dark:text-[#E28A45]'
                  : 'bg-[#E9E0D2] text-[#292722] dark:bg-[#35312B] dark:text-[#FFFDF7]'
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="text-[#292722]/70 dark:text-[#F7F3EA]/70 font-semibold">{subtitle}</span>}
        </div>
      )}
    </ThreeCard>
  );
};

export default StatCard;

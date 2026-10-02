import React from 'react';
import ThreeCard from '../3d/ThreeCard';
import { FiSearch, FiFilter, FiSliders } from 'react-icons/fi';

export const InternshipFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  sort,
  setSort,
}) => {
  return (
    <ThreeCard maxTilt={3} className="p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="relative md:col-span-5">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search internships by company, role, or skill..."
            className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-4 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
          />
        </div>

        {/* Category filter */}
        <div className="md:col-span-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 transition"
          >
            <option value="All">All Categories</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
            <option value="Mobile Development">Mobile Development</option>
          </select>
        </div>

        {/* Work type filter */}
        <div className="md:col-span-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 transition"
          >
            <option value="All">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Sort filter */}
        <div className="md:col-span-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 transition"
          >
            <option value="newest">Recently Posted</option>
            <option value="deadline">Upcoming Deadline</option>
            <option value="stipend">Highest Stipend</option>
          </select>
        </div>
      </div>
    </ThreeCard>
  );
};

export default InternshipFilter;

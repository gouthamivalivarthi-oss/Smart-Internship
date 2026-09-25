import React from 'react';
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
  categories = []
}) => {
  return (
    <div className="glass-card rounded-2xl p-4 border shadow-sm space-y-3 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="relative md:col-span-5">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search internships by company, role, or skill..."
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
          />
        </div>

        {/* Category filter */}
        <div className="md:col-span-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
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
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
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
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
          >
            <option value="newest">Recently Posted</option>
            <option value="deadline">Upcoming Deadline</option>
            <option value="stipend">Highest Stipend</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InternshipFilter;

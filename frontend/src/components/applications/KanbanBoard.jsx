import React from 'react';
import ApplicationCard from './ApplicationCard';
import { FiPlus, FiCheckCircle } from 'react-icons/fi';

const COLUMNS = [
  { id: 'Wishlist', title: 'Wishlist', color: 'border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/40', badgeColor: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  { id: 'Applied', title: 'Applied', color: 'border-sky-300 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/20', badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
  { id: 'In Review', title: 'In Review', color: 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { id: 'Interviewing', title: 'Interviewing', color: 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
  { id: 'Offered', title: 'Offered 🎉', color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  { id: 'Rejected', title: 'Archived / Rejected', color: 'border-rose-300 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20', badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
];

export const KanbanBoard = ({ applications, onStatusChange, onEdit, onDelete, onAddClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
      {COLUMNS.map((column) => {
        const columnApps = applications.filter((app) => app.status === column.id);

        return (
          <div
            key={column.id}
            className={`rounded-2xl border ${column.color} p-3.5 min-h-[500px] flex flex-col backdrop-blur-xs`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {column.title}
                </h4>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${column.badgeColor}`}>
                  {columnApps.length}
                </span>
              </div>
              {column.id === 'Wishlist' && onAddClick && (
                <button
                  onClick={onAddClick}
                  className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition"
                  title="Add new to Wishlist"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Applications List */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-0.5">
              {columnApps.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                  <p className="text-xs">No applications</p>
                </div>
              ) : (
                columnApps.map((app) => (
                  <ApplicationCard
                    key={app._id}
                    application={app}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

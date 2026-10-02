import React from 'react';
import ApplicationCard from './ApplicationCard';
import { FiPlus } from 'react-icons/fi';

const COLUMNS = [
  { id: 'Wishlist', title: 'Wishlist', color: 'border-[#F5B895]/40 bg-[#FFF8ED]/60 dark:bg-[#30211B]/40', badgeColor: 'bg-[#F6EBDD] text-[#3D2B24] dark:bg-[#3D2B24] dark:text-[#FFF8ED]' },
  { id: 'Applied', title: 'Applied', color: 'border-[#F5B895]/60 bg-[#F5B895]/15 dark:bg-[#3D2B24]/40', badgeColor: 'bg-[#F5B895]/30 text-[#C85C45] dark:text-[#F5B895]' },
  { id: 'In Review', title: 'In Review', color: 'border-[#E9785B]/60 bg-[#E9785B]/15 dark:bg-[#3D2B24]/40', badgeColor: 'bg-[#E9785B]/25 text-[#A84532] dark:text-[#F5B895]' },
  { id: 'Interviewing', title: 'Interviewing', color: 'border-[#B9A7E8]/60 bg-[#B9A7E8]/15 dark:bg-[#30211B]/40', badgeColor: 'bg-[#B9A7E8]/30 text-[#6C54A7] dark:text-[#B9A7E8]' },
  { id: 'Offered', title: 'Offered 🎉', color: 'border-[#9DB79B]/60 bg-[#9DB79B]/15 dark:bg-[#30211B]/40', badgeColor: 'bg-[#9DB79B]/30 text-[#5C7D5A] dark:text-[#9DB79B]' },
  { id: 'Rejected', title: 'Archived / Rejected', color: 'border-[#C85C45]/40 bg-[#C85C45]/10 dark:bg-[#30211B]/40', badgeColor: 'bg-[#C85C45]/20 text-[#A84532] dark:text-[#F5B895]' },
];

export const KanbanBoard = ({ applications, onStatusChange, onEdit, onDelete, onAddClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
      {COLUMNS.map((column) => {
        const columnApps = applications.filter((app) => app.status === column.id);

        return (
          <div
            key={column.id}
            className={`rounded-3xl border ${column.color} p-3.5 min-h-[520px] flex flex-col backdrop-blur-md shadow-xs`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F6EBDD] dark:border-[#553B30]">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#3D2B24] dark:text-[#FFF8ED]">
                  {column.title}
                </h4>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${column.badgeColor}`}>
                  {columnApps.length}
                </span>
              </div>
              {column.id === 'Wishlist' && onAddClick && (
                <button
                  onClick={onAddClick}
                  className="p-1 text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 hover:text-[#E9785B] dark:hover:text-[#F5B895] rounded-xl hover:bg-white dark:hover:bg-[#452E25] transition"
                  title="Add new to Wishlist"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Applications List */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-0.5">
              {columnApps.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-[#3D2B24]/40 dark:text-[#FFF8ED]/40 border border-dashed border-[#F5B895]/30 dark:border-[#553B30] rounded-2xl">
                  <p className="text-xs font-medium">No applications</p>
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

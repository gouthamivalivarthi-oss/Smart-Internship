import React, { useState, useEffect } from 'react';
import { applicationApi } from '../services/api';
import KanbanBoard from '../components/applications/KanbanBoard';
import ApplicationCard from '../components/applications/ApplicationCard';
import ApplicationModal from '../components/applications/ApplicationModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ThreeButton from '../components/3d/ThreeButton';
import ThreeCard from '../components/3d/ThreeCard';
import { FiPlus, FiGrid, FiList, FiSearch, FiFilter, FiLayers } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationApi.getAll({
        search: search || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        priority: priorityFilter !== 'All' ? priorityFilter : undefined
      });
      if (res.data.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, statusFilter, priorityFilter]);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update
    setApplications(prev =>
      prev.map(app => (app._id === id ? { ...app, status: newStatus } : app))
    );

    try {
      const res = await applicationApi.updateStatus(id, newStatus);
      if (res.data.success) {
        toast.success(`Application updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error('Failed to update status on server');
      fetchApplications();
    }
  };

  const handleSaveApplication = async (formData) => {
    try {
      if (editingApplication) {
        const res = await applicationApi.update(editingApplication._id, formData);
        if (res.data.success) {
          toast.success('Application updated');
          setIsModalOpen(false);
          setEditingApplication(null);
          fetchApplications();
        }
      } else {
        const res = await applicationApi.create(formData);
        if (res.data.success) {
          toast.success('Application tracked successfully');
          setIsModalOpen(false);
          fetchApplications();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save application');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this application?')) return;
    try {
      await applicationApi.delete(id);
      setApplications(prev => prev.filter(app => app._id !== id));
      toast.success('Application removed');
    } catch (err) {
      toast.error('Failed to delete application');
    }
  };

  const handleEdit = (app) => {
    setEditingApplication(app);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
              <FiLayers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
              Application Tracker
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
            Organize your recruitment lifecycle from wishlist to final offer on dimensional boards
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-[#F6EBDD]/70 dark:bg-[#35231C]/70 border border-[#F5B895]/30">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#3D2B24] text-[#C85C45] dark:text-[#F5B895] shadow-xs'
                  : 'text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 hover:text-[#3D2B24] dark:hover:text-[#FFF8ED]'
              }`}
              title="Kanban Board View"
            >
              <FiGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#3D2B24] text-[#C85C45] dark:text-[#F5B895] shadow-xs'
                  : 'text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 hover:text-[#3D2B24] dark:hover:text-[#FFF8ED]'
              }`}
              title="List View"
            >
              <FiList className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <ThreeButton
            onClick={() => {
              setEditingApplication(null);
              setIsModalOpen(true);
            }}
            variant="primary"
            className="rounded-2xl shadow-sm"
          >
            <FiPlus className="w-4 h-4 mr-1" />
            <span>Track New</span>
          </ThreeButton>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <ThreeCard maxTilt={2} className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="relative sm:col-span-6">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications by company or role..."
              className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
            >
              <option value="All">All Statuses</option>
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="In Review">In Review</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </ThreeCard>

      {/* Main View: Kanban vs List */}
      {loading ? (
        <LoadingSpinner text="Refreshing application tracker..." />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No applications in tracker"
          description="Start tracking internship applications or add new opportunities to your wishlist."
          actionLabel="Track Your First Application"
          onAction={() => {
            setEditingApplication(null);
            setIsModalOpen(true);
          }}
        />
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          applications={applications}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddClick={() => {
            setEditingApplication(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        onSubmit={handleSaveApplication}
        initialData={editingApplication}
      />
    </div>
  );
};

export default ApplicationsPage;

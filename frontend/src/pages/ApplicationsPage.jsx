import React, { useState, useEffect } from 'react';
import { applicationApi } from '../services/api';
import KanbanBoard from '../components/applications/KanbanBoard';
import ApplicationCard from '../components/applications/ApplicationCard';
import ApplicationModal from '../components/applications/ApplicationModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
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
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FiLayers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Application Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize your recruitment lifecycle from wishlist to final offer
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Kanban Board View"
            >
              <FiGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="List View"
            >
              <FiList className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <button
            onClick={() => {
              setEditingApplication(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition"
          >
            <FiPlus className="w-4 h-4" />
            <span>Track New</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="relative sm:col-span-6">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications by company or role..."
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 shadow-xs"
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
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 shadow-xs"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

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

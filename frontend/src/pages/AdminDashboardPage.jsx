import React, { useState, useEffect } from 'react';
import { analyticsApi, internshipApi } from '../services/api';
import StatCard from '../components/common/StatCard';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  FiShield,
  FiUsers,
  FiBriefcase,
  FiLayers,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

export const AdminDashboardPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Remote',
    type: 'Remote',
    category: 'Software Engineering',
    description: '',
    skillsRequired: '',
    stipendDisplay: '$7,000 / month',
    deadline: '',
    applyUrl: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, internshipsRes] = await Promise.all([
        analyticsApi.getAdmin(),
        internshipApi.getAll({ limit: 50 })
      ]);

      if (analyticsRes.data.success) {
        setAdminData(analyticsRes.data.data);
      }
      if (internshipsRes.data.success) {
        setInternships(internshipsRes.data.internships || []);
      }
    } catch (err) {
      toast.error('Failed to load admin telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      company: '',
      location: 'Remote',
      type: 'Remote',
      category: 'Software Engineering',
      description: '',
      skillsRequired: '',
      stipendDisplay: '$7,000 / month',
      deadline: '',
      applyUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      company: item.company,
      location: item.location,
      type: item.type,
      category: item.category,
      description: item.description,
      skillsRequired: (item.skillsRequired || []).join(', '),
      stipendDisplay: item.stipendDisplay || '',
      deadline: item.deadline ? item.deadline.split('T')[0] : '',
      applyUrl: item.applyUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveInternship = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingItem) {
        const res = await internshipApi.update(editingItem._id, payload);
        if (res.data.success) {
          toast.success('Internship updated');
          setIsModalOpen(false);
          fetchData();
        }
      } else {
        const res = await internshipApi.create(payload);
        if (res.data.success) {
          toast.success('Internship posted successfully');
          setIsModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save internship');
    }
  };

  const handleDeleteInternship = async (id) => {
    if (!window.confirm('Delete this internship posting?')) return;
    try {
      await internshipApi.delete(id);
      setInternships(prev => prev.filter(i => i._id !== id));
      toast.success('Internship removed');
    } catch (err) {
      toast.error('Failed to delete internship');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading admin control console..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <FiShield className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Admin & Recruiter Control Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage system-wide internship listings, student applications, and platform telemetry
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition"
        >
          <FiPlus className="w-4 h-4" />
          <span>Post New Internship</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={adminData?.totalUsers || 0}
          icon={FiUsers}
          subtitle={`${adminData?.totalStudents || 0} students`}
          color="indigo"
        />
        <StatCard
          title="Active Listings"
          value={adminData?.activeInternships || 0}
          icon={FiBriefcase}
          subtitle={`Across ${adminData?.totalInternships || 0} total posts`}
          color="emerald"
        />
        <StatCard
          title="Total Applications"
          value={adminData?.totalApplications || 0}
          icon={FiLayers}
          subtitle="Platform tracking volume"
          color="purple"
        />
        <StatCard
          title="Top Category"
          value={adminData?.topCategories?.[0]?._id || 'Software Eng'}
          icon={FiShield}
          subtitle={`${adminData?.topCategories?.[0]?.count || 0} opportunities`}
          color="sky"
        />
      </div>

      {/* Internships Management Table */}
      <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Managed Internship Listings ({internships.length})
            </h3>
            <p className="text-xs text-slate-500">
              Create, modify or archive opportunities visible to candidates
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-2">Role & Company</th>
                <th className="py-3 px-2">Location</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Stipend</th>
                <th className="py-3 px-2">Deadline</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {internships.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3 px-2 font-medium text-slate-900 dark:text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {item.company}
                      </span>
                      <span className="font-bold">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                    {item.location} ({item.type})
                  </td>
                  <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.stipendDisplay || 'Competitive'}
                  </td>
                  <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                    {formatDate(item.deadline)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Edit Listing"
                      >
                        <FiEdit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteInternship(item._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Delete Listing"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Internship Listing' : 'Post New Internship Opportunity'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveInternship} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Role Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Backend Software Engineer Intern"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Stripe, OpenAI, Microsoft"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. San Francisco / Remote"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Work Mode
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Mobile Development">Mobile Development</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Stipend Display
              </label>
              <input
                type="text"
                value={formData.stipendDisplay}
                onChange={(e) => setFormData({ ...formData, stipendDisplay: e.target.value })}
                placeholder="e.g. $8,000 / month"
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              required
              value={formData.skillsRequired}
              onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
              placeholder="e.g. React, Node.js, MongoDB, TypeScript, Git"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Application Portal Link
            </label>
            <input
              type="url"
              value={formData.applyUrl}
              onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
              placeholder="https://company.com/jobs/internship"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description & Requirements *
            </label>
            <textarea
              rows="4"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the engineering scope, team culture, and responsibilities..."
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              {editingItem ? 'Save Changes' : 'Publish Opportunity'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;

import React, { useState, useEffect } from 'react';
import { analyticsApi, internshipApi } from '../services/api';
import StatCard from '../components/common/StatCard';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ThreeButton from '../components/3d/ThreeButton';
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

      if (analyticsRes.data?.success) {
        setAdminData(analyticsRes.data.data);
      }
      if (internshipsRes.data?.success) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-cream/90 via-soft-cream/80 to-peach/20 p-6 rounded-3xl border border-peach/30 shadow-3d backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-coral/15 text-coral border border-coral/30 shadow-inner">
              <FiShield className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-brown">
              Admin & Recruiter Control Center
            </h1>
          </div>
          <p className="text-xs text-brown/70 mt-1 font-medium">
            Manage system-wide internship listings, student applications, and platform telemetry
          </p>
        </div>

        <ThreeButton
          onClick={handleOpenCreateModal}
          variant="primary"
          size="sm"
          className="shadow-3d hover:shadow-3d-hover"
        >
          <FiPlus className="w-4 h-4" />
          <span>Post New Internship</span>
        </ThreeButton>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={adminData?.totalUsers || 0}
          icon={FiUsers}
          subtitle={`${adminData?.totalStudents || 0} students`}
          color="coral"
        />
        <StatCard
          title="Active Listings"
          value={adminData?.activeInternships || 0}
          icon={FiBriefcase}
          subtitle={`Across ${adminData?.totalInternships || 0} total posts`}
          color="sage"
        />
        <StatCard
          title="Total Applications"
          value={adminData?.totalApplications || 0}
          icon={FiLayers}
          subtitle="Platform tracking volume"
          color="lavender"
        />
        <StatCard
          title="Top Category"
          value={adminData?.topCategories?.[0]?._id || 'Software Eng'}
          icon={FiShield}
          subtitle={`${adminData?.topCategories?.[0]?.count || 0} opportunities`}
          color="terracotta"
        />
      </div>

      {/* Internships Management Table */}
      <div className="glass-warm rounded-3xl p-6 border border-peach/30 shadow-3d space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-peach/20">
          <div>
            <h3 className="font-bold text-base text-brown">
              Managed Internship Listings ({internships.length})
            </h3>
            <p className="text-xs text-brown/65">
              Create, modify or archive opportunities visible to candidates
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-peach/20 text-brown/60 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Role & Company</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Stipend</th>
                <th className="py-3 px-3">Deadline</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach/15">
              {internships.map((item) => (
                <tr key={item._id} className="hover:bg-peach/10 transition-colors">
                  <td className="py-3 px-3 font-medium text-brown">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-coral block tracking-wider">
                        {item.company}
                      </span>
                      <span className="font-bold text-brown">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-brown/75 font-medium">
                    {item.location} ({item.type})
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-1 rounded-lg bg-lavender/25 text-purple font-semibold border border-lavender/30">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-sage">
                    {item.stipendDisplay || 'Competitive'}
                  </td>
                  <td className="py-3 px-3 text-brown/75 font-medium">
                    {formatDate(item.deadline)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-brown/60 hover:text-coral rounded-xl hover:bg-peach/20 transition-all"
                        title="Edit Listing"
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInternship(item._id)}
                        className="p-1.5 text-brown/60 hover:text-terracotta rounded-xl hover:bg-terracotta/10 transition-all"
                        title="Delete Listing"
                      >
                        <FiTrash2 className="w-4 h-4" />
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
              <label className="block text-xs font-bold text-brown mb-1.5">
                Role Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Backend Software Engineer Intern"
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Stripe, OpenAI, Microsoft"
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brown mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. San Francisco / Remote"
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1.5">
                Work Mode
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
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
              <label className="block text-xs font-bold text-brown mb-1.5">
                Stipend Display
              </label>
              <input
                type="text"
                value={formData.stipendDisplay}
                onChange={(e) => setFormData({ ...formData, stipendDisplay: e.target.value })}
                placeholder="e.g. $8,000 / month"
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1.5">
                Application Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              required
              value={formData.skillsRequired}
              onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
              placeholder="e.g. React, Node.js, MongoDB, TypeScript, Git"
              className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Application Portal Link
            </label>
            <input
              type="url"
              value={formData.applyUrl}
              onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
              placeholder="https://company.com/jobs/internship"
              className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Description & Requirements *
            </label>
            <textarea
              rows="4"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the engineering scope, team culture, and responsibilities..."
              className="w-full text-xs rounded-xl border border-peach/40 bg-cream/70 focus:bg-white px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-peach/20">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-brown/70 hover:bg-peach/20 rounded-xl transition"
            >
              Cancel
            </button>
            <ThreeButton
              type="submit"
              variant="primary"
              size="sm"
            >
              {editingItem ? 'Save Changes' : 'Publish Opportunity'}
            </ThreeButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;

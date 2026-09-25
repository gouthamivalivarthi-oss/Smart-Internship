import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { internshipApi } from '../../services/api';

export const ApplicationModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: 'Remote',
    stipend: '',
    status: 'Applied',
    priority: 'Medium',
    deadline: '',
    jobUrl: '',
    notes: '',
    internshipId: ''
  });
  const [availableInternships, setAvailableInternships] = useState([]);
  const [isManual, setIsManual] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        role: initialData.role || '',
        location: initialData.location || 'Remote',
        stipend: initialData.stipend || '',
        status: initialData.status || 'Applied',
        priority: initialData.priority || 'Medium',
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
        jobUrl: initialData.jobUrl || '',
        notes: initialData.notes || '',
        internshipId: initialData.internship?._id || initialData.internship || ''
      });
      setIsManual(true);
    } else {
      setFormData({
        company: '',
        role: '',
        location: 'Remote',
        stipend: '',
        status: 'Applied',
        priority: 'Medium',
        deadline: '',
        jobUrl: '',
        notes: '',
        internshipId: ''
      });
      // Fetch available internships to select from
      internshipApi.getAll({ limit: 20 })
        .then((res) => {
          if (res.data.success) {
            setAvailableInternships(res.data.internships || []);
          }
        })
        .catch(() => {});
    }
  }, [initialData, isOpen]);

  const handleSelectInternship = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setIsManual(true);
      return;
    }
    const found = availableInternships.find((i) => i._id === selectedId);
    if (found) {
      setIsManual(false);
      setFormData({
        ...formData,
        internshipId: found._id,
        company: found.company,
        role: found.title,
        location: found.location,
        stipend: found.stipendDisplay || `${found.stipend?.amount ? '$' + found.stipend.amount + '/mo' : ''}`,
        deadline: found.deadline ? found.deadline.split('T')[0] : '',
        jobUrl: found.applyUrl || ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Application Details' : 'Track New Internship Application'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!initialData && availableInternships.length > 0 && (
          <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 mb-2">
            <label className="block text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">
              Quick Pick from Open Internships Directory
            </label>
            <select
              value={formData.internshipId}
              onChange={handleSelectInternship}
              className="w-full text-xs rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-800 dark:text-slate-200"
            >
              <option value="">-- Or enter custom application manually below --</option>
              {availableInternships.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.company} - {item.title} ({item.location})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Stripe, Google, Spotify"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Role / Position Title *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Frontend Engineer Intern"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Location / Mode
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Remote, San Francisco"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Stipend / Salary
            </label>
            <input
              type="text"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              placeholder="e.g. $7,500 / month"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Current Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="In Review">In Review</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Job Posting / Application URL
          </label>
          <input
            type="url"
            value={formData.jobUrl}
            onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
            placeholder="https://company.com/careers/internship-id"
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Preparation Notes & Strategy
          </label>
          <textarea
            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Key talking points, recruiter name, referral info, portfolio projects mentioned..."
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition"
          >
            {initialData ? 'Save Changes' : 'Track Application'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationModal;

import React, { useState } from 'react';
import Modal from '../common/Modal';

export const ScheduleInterviewModal = ({ isOpen, onClose, onSubmit, applications = [] }) => {
  const [formData, setFormData] = useState({
    applicationId: '',
    roundTitle: 'Technical Coding Round',
    scheduledDate: '',
    scheduledTime: '14:00',
    durationMinutes: 45,
    locationOrLink: 'https://meet.google.com',
    notes: '',
    autoGenerateAiQuestions: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicationId) return;

    // Combine date and time
    const dateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);

    onSubmit({
      applicationId: formData.applicationId,
      roundTitle: formData.roundTitle,
      scheduledDate: dateTime,
      durationMinutes: Number(formData.durationMinutes),
      locationOrLink: formData.locationOrLink,
      notes: formData.notes,
      autoGenerateAiQuestions: formData.autoGenerateAiQuestions
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Interview & Generate AI Questions">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Linked Internship Application *
          </label>
          <select
            required
            value={formData.applicationId}
            onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
          >
            <option value="">-- Select an active application --</option>
            {applications.map((app) => (
              <option key={app._id} value={app._id}>
                {app.company} - {app.role} ({app.status})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Interview Round Title *
            </label>
            <input
              type="text"
              required
              value={formData.roundTitle}
              onChange={(e) => setFormData({ ...formData, roundTitle: e.target.value })}
              placeholder="e.g. Round 1: Algorithms & Data Structures"
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Duration (Minutes)
            </label>
            <input
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Time *
            </label>
            <input
              type="time"
              required
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Meeting Link or Room Location
          </label>
          <input
            type="text"
            value={formData.locationOrLink}
            onChange={(e) => setFormData({ ...formData, locationOrLink: e.target.value })}
            placeholder="e.g. https://meet.google.com/xyz-abc or Zoom URL"
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Interviewer Info & Preparation Focus
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Interviewer name, questions to ask them, areas to revise..."
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
          ></textarea>
        </div>

        <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex items-center gap-2">
          <input
            type="checkbox"
            id="aiQGen"
            checked={formData.autoGenerateAiQuestions}
            onChange={(e) => setFormData({ ...formData, autoGenerateAiQuestions: e.target.checked })}
            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="aiQGen" className="text-xs font-semibold text-purple-900 dark:text-purple-200 cursor-pointer">
            Automatically generate 5 tailored AI interview questions for this role & company
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition"
          >
            Schedule Interview
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleInterviewModal;

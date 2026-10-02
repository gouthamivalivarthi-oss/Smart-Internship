import React, { useState } from 'react';
import Modal from '../common/Modal';
import ThreeButton from '../3d/ThreeButton';

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
          <label className="block text-xs font-bold text-brown mb-1.5">
            Linked Internship Application *
          </label>
          <select
            required
            value={formData.applicationId}
            onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
            className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition font-medium"
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
            <label className="block text-xs font-bold text-brown mb-1.5">
              Interview Round Title *
            </label>
            <input
              type="text"
              required
              value={formData.roundTitle}
              onChange={(e) => setFormData({ ...formData, roundTitle: e.target.value })}
              placeholder="e.g. Round 1: Algorithms & Data Structures"
              className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Duration (Minutes)
            </label>
            <input
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
              className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brown mb-1.5">
              Time *
            </label>
            <input
              type="time"
              required
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brown mb-1.5">
            Meeting Link or Room Location
          </label>
          <input
            type="text"
            value={formData.locationOrLink}
            onChange={(e) => setFormData({ ...formData, locationOrLink: e.target.value })}
            placeholder="e.g. https://meet.google.com/xyz-abc or Zoom URL"
            className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brown mb-1.5">
            Interviewer Info & Preparation Focus
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Interviewer name, questions to ask them, areas to revise..."
            className="w-full text-xs rounded-xl border border-peach/40 bg-white/90 px-3.5 py-2.5 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
          ></textarea>
        </div>

        <div className="p-3.5 rounded-2xl bg-lavender/25 border border-lavender/40 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="aiQGen"
            checked={formData.autoGenerateAiQuestions}
            onChange={(e) => setFormData({ ...formData, autoGenerateAiQuestions: e.target.checked })}
            className="rounded accent-coral text-coral focus:ring-coral/50 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="aiQGen" className="text-xs font-bold text-brown cursor-pointer">
            Automatically generate 5 tailored AI interview questions for this role & company
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-peach/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-brown/70 hover:bg-peach/20 rounded-xl transition"
          >
            Cancel
          </button>
          <ThreeButton
            type="submit"
            variant="primary"
            size="sm"
          >
            Schedule Interview
          </ThreeButton>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleInterviewModal;

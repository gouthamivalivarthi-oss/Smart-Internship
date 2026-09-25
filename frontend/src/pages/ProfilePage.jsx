import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiMapPin, FiBook, FiCalendar, FiUploadCloud, FiTrash2, FiPlus, FiGithub, FiLinkedin, FiGlobe, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { user, updateProfile, uploadResume } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    bio: user?.bio || '',
    location: user?.location || '',
    university: user?.university || '',
    graduationYear: user?.graduationYear || 2026,
    socialLinks: {
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      portfolio: user?.socialLinks?.portfolio || ''
    }
  });

  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile({
        ...formData,
        skills
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResumeFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadResume(file);
      if (res?.success && res.data?.extractedSkills) {
        setSkills(prev => Array.from(new Set([...prev, ...res.data.extractedSkills])));
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <FiUser className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Candidate Profile & Resume
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Keep your professional details and resume updated for accurate AI evaluations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left card: User badge & Resume status */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border shadow-xs text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-indigo-500/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {user?.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.headline || 'Aspiring Software Engineer'}
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Resume Upload Card */}
          <div className="glass-card rounded-2xl p-5 border shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Resume Document
            </h4>
            {user?.resumeFileName ? (
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold mb-1">
                  <FiFileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.resumeFileName}</span>
                </div>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                  ATS Score: <strong>{user.resumeScore || 85}/100</strong>
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No resume uploaded yet.</p>
            )}

            <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition">
              <FiUploadCloud className="w-4 h-4" />
              <span>{uploading ? 'Processing Resume...' : 'Upload PDF / DOCX'}</span>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleResumeFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right card: Profile Form & Skills */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="glass-card rounded-2xl p-6 border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Senior CS Major | React Developer"
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bio & Career Objectives
              </label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
              ></textarea>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Online Profiles & Portfolios
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.socialLinks.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, github: e.target.value }
                      })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="relative">
                  <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                      })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="url"
                    placeholder="Portfolio URL"
                    value={formData.socialLinks.portfolio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, portfolio: e.target.value }
                      })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Skills tag editor */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Skills & Technologies ({skills.length})
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. Next.js, PyTorch, GraphQL)..."
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900 text-xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-indigo-400 hover:text-rose-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

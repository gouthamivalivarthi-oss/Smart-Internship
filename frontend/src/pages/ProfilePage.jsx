import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ThreeCard from '../components/3d/ThreeCard';
import ThreeButton from '../components/3d/ThreeButton';
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
            <FiUser className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
            Candidate Profile & Resume
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
          Keep your professional details and resume updated for accurate 3D AI evaluations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left card: User badge & Resume status */}
        <div className="space-y-6">
          <ThreeCard maxTilt={5} className="p-6 text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#E9785B] via-[#C85C45] to-[#8F78C8] text-white font-black text-3xl flex items-center justify-center mx-auto shadow-[0_8px_20px_rgba(200,92,69,0.35)]">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#3D2B24] dark:text-[#FFF8ED]">
                {user?.name}
              </h3>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">
                {user?.headline || 'Aspiring Software Engineer'}
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
                {user?.role}
              </span>
            </div>
          </ThreeCard>

          {/* Resume Upload Card */}
          <ThreeCard maxTilt={5} className="p-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3D2B24]/60 dark:text-[#FFF8ED]/60">
              Resume Document
            </h4>
            {user?.resumeFileName ? (
              <div className="p-3.5 rounded-2xl bg-[#9DB79B]/20 dark:bg-[#9DB79B]/10 border border-[#9DB79B]/40 text-xs">
                <div className="flex items-center gap-2 text-[#5C7D5A] dark:text-[#9DB79B] font-bold mb-1">
                  <FiFileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.resumeFileName}</span>
                </div>
                <p className="text-[11px] text-[#5C7D5A]/90 dark:text-[#9DB79B] font-medium">
                  ATS Score: <strong className="font-extrabold">{user.resumeScore || 85}/100</strong>
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 font-medium">No resume uploaded yet.</p>
            )}

            <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white text-xs font-bold shadow-md shadow-coral/30 cursor-pointer active:scale-95 transition">
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
          </ThreeCard>
        </div>

        {/* Right card: Profile Form & Skills */}
        <div className="md:col-span-2 space-y-6">
          <ThreeCard maxTilt={3} className="p-6 sm:p-7 space-y-5">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="text-base font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] pb-2 border-b border-[#F6EBDD] dark:border-[#553B30]">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    placeholder="e.g. Senior CS Major | Full Stack Developer"
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                    University / College
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                  Bio & Career Objectives
                </label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] p-3 text-[#3D2B24] dark:text-[#FFF8ED] font-medium leading-relaxed"
                ></textarea>
              </div>

              {/* Social Links */}
              <div className="space-y-3 pt-3 border-t border-[#F6EBDD] dark:border-[#553B30]">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3D2B24]/60 dark:text-[#FFF8ED]/60">
                  Online Profiles & Portfolios
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C85C45] w-3.5 h-3.5" />
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
                      className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-9 pr-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                    />
                  </div>

                  <div className="relative">
                    <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F78C8] w-3.5 h-3.5" />
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
                      className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-9 pr-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                    />
                  </div>

                  <div className="relative">
                    <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C7D5A] w-3.5 h-3.5" />
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
                      className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-9 pr-3 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Skills tag editor */}
              <div className="space-y-3 pt-3 border-t border-[#F6EBDD] dark:border-[#553B30]">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3D2B24]/60 dark:text-[#FFF8ED]/60">
                  Skills & Technologies ({skills.length})
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill (e.g. Next.js, PyTorch, GraphQL)..."
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] px-3.5 py-2 text-[#3D2B24] dark:text-[#FFF8ED] font-medium focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50"
                  />
                  <ThreeButton
                    type="button"
                    onClick={handleAddSkill}
                    variant="secondary"
                    size="sm"
                    className="rounded-xl px-4"
                  >
                    Add
                  </ThreeButton>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFF8ED] dark:bg-[#3D2B24] text-[#C85C45] dark:text-[#F5B895] border border-[#F5B895]/40 text-xs font-bold shadow-2xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-[#C85C45]/60 hover:text-[#C85C45] font-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <ThreeButton
                  type="submit"
                  disabled={saving}
                  loading={saving}
                  variant="primary"
                  className="rounded-2xl px-6 shadow-md"
                >
                  <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
                </ThreeButton>
              </div>
            </form>
          </ThreeCard>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

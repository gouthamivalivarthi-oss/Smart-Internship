import React, { useState, useEffect } from 'react';
import ThreeCard from '../3d/ThreeCard';
import { FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { aiApi } from '../../services/api';
import toast from 'react-hot-toast';

const TARGET_ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist / AI Engineer',
  'DevOps Engineer'
];

export const SkillGapChart = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [gapData, setGapData] = useState(null);

  const fetchSkillGap = async (role) => {
    try {
      setLoading(true);
      const res = await aiApi.getSkillGap(role);
      if (res.data.success) {
        setGapData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to analyze skill gap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [selectedRole]);

  return (
    <ThreeCard maxTilt={4} className="p-6 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F6EBDD] dark:border-[#553B30]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-[#B9A7E8]/20 text-[#6C54A7] dark:text-[#B9A7E8] border border-[#B9A7E8]/35">
              <FiTrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
              AI Skill-Gap & Career Roadmap
            </h3>
          </div>
          <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
            Compare your current skill set with industry job requirements to prioritize your learning
          </p>
        </div>

        {/* Target Role Selector */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="text-xs font-bold rounded-2xl border border-[#F5B895]/50 bg-[#FFF8ED] dark:bg-[#3D2B24] px-4 py-2 text-[#C85C45] dark:text-[#F5B895] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 transition"
        >
          {TARGET_ROLES.map((role) => (
            <option key={role} value={role}>
              Target: {role}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#C85C45] animate-pulse font-semibold">
          Generating AI skill-gap assessment in 3D...
        </div>
      ) : gapData ? (
        <div className="space-y-6">
          {/* Readiness Progress Bar with warm gradient */}
          <div className="p-5 rounded-3xl bg-[#FFF8ED] dark:bg-[#3D2B24]/40 border border-[#F5B895]/40 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[#3D2B24] dark:text-[#FFF8ED]">
                {selectedRole} Readiness
              </span>
              <span className="text-[#C85C45] dark:text-[#F5B895] font-black text-sm">
                {gapData.readinessScore}% Match
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F6EBDD] dark:bg-[#553B30] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#E9785B] via-[#F5B895] to-[#8F78C8] transition-all duration-700 ease-out shadow-xs"
                style={{ width: `${gapData.readinessScore}%` }}
              ></div>
            </div>
          </div>

          {/* Acquired vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Acquired - Sage Green */}
            <div className="p-4 rounded-2xl border border-[#9DB79B]/40 bg-[#9DB79B]/15 dark:bg-[#9DB79B]/10">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#5C7D5A] dark:text-[#9DB79B] mb-3">
                <FiCheckCircle className="w-4 h-4" />
                <span>Skills You Already Have ({gapData.acquiredSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {gapData.acquiredSkills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1 rounded-xl bg-white/80 dark:bg-[#30211B]/80 text-[#5C7D5A] dark:text-[#9DB79B] border border-[#9DB79B]/30 shadow-2xs"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing - Coral / Terracotta */}
            <div className="p-4 rounded-2xl border border-[#E9785B]/40 bg-[#E9785B]/15 dark:bg-[#E9785B]/10">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C85C45] dark:text-[#F5B895] mb-3">
                <FiAlertTriangle className="w-4 h-4" />
                <span>Recommended Skills to Learn ({gapData.missingSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {gapData.missingSkills?.length === 0 ? (
                  <p className="text-xs text-[#5C7D5A] font-bold">You have covered all core requirements!</p>
                ) : (
                  gapData.missingSkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-3 py-1 rounded-xl bg-white/80 dark:bg-[#30211B]/80 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30 shadow-2xs"
                    >
                      + {skill}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Actionable Learning Roadmap */}
          {gapData.learningRoadmap && gapData.learningRoadmap.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 mb-3 flex items-center gap-1.5">
                <FiBookOpen className="w-4 h-4 text-[#E9785B]" />
                Custom Learning Roadmap
              </h4>
              <div className="space-y-2.5">
                {gapData.learningRoadmap.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#3D2B24]/40 flex items-start gap-3 shadow-2xs hover:border-[#F5B895] transition"
                  >
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30 shrink-0 mt-0.5">
                      {item.week}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs sm:text-sm font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
                          Master {item.skill}
                        </h5>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          item.priority === 'High' ? 'bg-[#C85C45]/20 text-[#A84532] dark:text-[#F5B895]' : 'bg-[#F6EBDD] text-[#3D2B24] dark:bg-[#553B30] dark:text-[#FFF8ED]'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-[#3D2B24]/75 dark:text-[#FFF8ED]/75 mt-1 leading-relaxed font-medium">
                        {item.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </ThreeCard>
  );
};

export default SkillGapChart;
